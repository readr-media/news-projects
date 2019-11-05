<template>
  <div class="verify-boards">
    <div class="boards">
      <div class="boards-container">
        <div
          v-for="item in boards"
          :key="`vb-${item.id}`"
          :style="{ backgroundImage: `url(${item.image})` }"
          class="board"
          @click="selectBoard($event, item.id)">
        </div>
      </div>
    </div>
    <div class="action">
      <div class="action-text">這是同一個使用者上傳的資料，哪些<span>是</span>競選看板的照片？請點選。</div>
      <button @click="submit">送出</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'VerifyBoards',
  data () {
    return {
      isBoardIds: [],
    }
  },
  computed: {
    boards () {
      return this.$store.state.ElectionBoard.boards
    },
    boardIds () {
      return this.boards.map(board => board.id)
    },
    notBoardIds () {
      return this.boardIds.filter(id => !this.isBoardIds.includes(id))
    }
  },
  methods: {
    selectBoard (e, id) {
      const index = this.isBoardIds.findIndex((value, index, arr) => value === id)
      if (index > -1) {
        this.isBoardIds.splice(index, 1)
      } else {
        this.isBoardIds.push(id)
      }
      e.target.classList.toggle('selected')
    },
    submit () {
      const stateEB = this.$store.state.ElectionBoard
      stateEB.loadingStatus = 'upload board'
      const body = {
        isBoard: this.isBoardIds,
        notBoard: this.notBoardIds,
        createdBy: this.$store.state.ElectionBoard.userID
      }
      axios.get('/project-api/token')
      .then((response) => {
        console.log('11');
        
        const token = response.data.token
        return axios.post('/project-api/election-board/verify/boards', body, { headers: { Authorization: token }})
      })
      .then(res => {
        console.log('22');
        stateEB.loadingStatus = ''
        this.$emit('closeVerifyBoards')
      })
      .catch(err => {
        console.log('33');
        stateEB.loadingStatus = ''
        this.$emit('closeVerifyBoards')
      })
      window.ga('send', 'event', 'projects', 'click', 'verified data false done')
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #ffdb5c

.verify-boards
  display flex
  flex-direction column
  position absolute
  top 0
  left 0
  right 0
  z-index 1000
  width 100%
  height 100vh
  background-color theme-color
  .boards
    flex 1
    padding-top 40px
    padding-left 25px
    padding-right 25px
    background-color #000
    overflow-y auto
    &-container
      display flex
      flex-wrap wrap
      justify-content space-between
      align-items flex-start
      width 100%
      max-width 620px
      margin-right auto
      margin-left auto
      padding-bottom 40px
      // overflow-y auto
      .board
        position relative
        width calc(50% - 7px)
        padding-top calc(50% - 7px)
        margin-top 14px
        background-color #a0a0a0
        background-size cover
        background-position center
        background-repeat no-repeat
        cursor pointer
        user-select none
        border-radius 1px
        &:nth-of-type(1), &:nth-of-type(2)
          margin-top 0
        &.selected
          border 2px solid theme-color
          // width calc(50% - 19px)
          padding-top calc(50% - 11px)
          &::after
            content ''
            position absolute
            top calc(50% - 10px)
            left 50%
            transform translate(-50%, -50%) rotate(45deg)
            width 30px
            height 45px
            border 1px solid theme-color
            border-width 0 10px 10px 0     
  & .action
    padding-top 25px
    padding-bottom 25px
    width calc(100% - 50px)
    max-width 620px
    margin-right auto
    margin-left auto
    & .action-text
      // margin 0 auto
      color #000
      font-size 1.25rem
      font-weight 500
      line-height 1.64
      // max-width 450px
      // margin-right auto
      // margin-left auto
      // text-align justify
      & > span
        border-bottom 5px solid #000
    & > button
      width 100%
      height 48px
      line-height 48px
      margin-top 20px
      // padding .5em .5em
      padding 0
      font-size 1.25rem
      font-weight 700
      background-color #a0a0a0
      border none
      border-radius 2px
      cursor pointer
      // max-width 450px
      margin-right auto
      margin-left auto

@media (min-width 576px)
  .verify-boards
    & .boards
      padding-top 50px
      // padding-bottom 50px
    & .boards-container
      // flex none
      justify-content flex-start
      padding-bottom 50px
      // align-items center
      // width 620px
      // margin 0 auto
      & .board
        width calc((100% / 3) - 20px)
        padding-top calc((100% / 3) - 20px)
        margin-top 30px
        margin-right 30px
        // margin 20px 10px 0
        &:nth-child(3n)
          margin-right 0
        &:nth-of-type(3)
          margin-top 0
        &.selected
          padding-top calc((100% / 3) - 24px)
          // width calc((100% - 60px) / 3)
          // padding-top calc((100% - 60px) / 3 - 4px)
    & .action
      display flex
      flex-direction column
      justify-content center
      // padding 50px calc((100% - 450px) / 2)
      padding 35px 0
      // & button
      //   border-radius 6px
@media (min-width 768px)
  .verify-boards .action button
    border-radius 6px
</style>
