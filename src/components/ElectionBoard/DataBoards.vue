<template>
  <div class="data-boards">
    <h3>{{ candidate.name }}<span>{{ candidate.party }}</span></h3>
    <p>{{ county }}{{ type }}候選人</p>
    <div v-show="loaded" class="boards-container">
      <div class="boards" @scroll="handleLoadMore">
        <div v-for="board in boards" :key="`b-${board.id}`" class="boards__item" @click="openDataBoard(board.id)">
          <div class="img-container">
            <img :src="`https://www.readr.tw${board.image}`" alt="">
          </div>
          <p>{{ board.county.length < 3 ? `${board.county}市` : board.county }}{{ board.district.length < 3 ? `${board.district}區` : board.district }}{{ board.road }}</p>
          <p class="date" v-text="moment(board.uploaded_at).format('M 月 D 日上傳')"></p>
        </div>
      </div>
    </div>
    <div class="action">
      <button class="btn btn--back" @click="$router.push(`/project/election-board/data`)"><img src="/proj-assets/election-board/images/arrow.png"></button>
      <button class="btn btn--upload" @click="goUpload">我也要上傳</button>
    </div>
    <DataBoard v-show="showDataBoard && board" :board="board" @closeDataBoard="closeDataBoard"/>
  </div>
</template>
<script>
import DataBoard from './DataBoard.vue'
import moment from 'moment'

const DEFAULT_PAGE = 1

const fetchBoards = (store, {
  candidates,
  page = DEFAULT_PAGE,
  maxResults = 12,
} = {}) => {
  return store.dispatch('ElectionBoard/FETCH_BOARDS', {
    candidates,
    page,
    maxResults,
    verifiedAmount: 3,
    notBoardAmount: 2,
  })
}

export default {
  name: 'DataBoards',
  components: {
    DataBoard,
  },
  props: {
    candidate: {
      required: true
    }
  },
  data () {
    return {
      board: undefined,
      count: 0,
      fetching: false,
      hasError: false,
      loaded: false,
      page: DEFAULT_PAGE,
      showDataBoard: false,
    }
  },
  computed: {
    boards () {
      return this.$store.state.ElectionBoard.boards
    },
    county () {
      return this.candidate.county.replace('臺', '台')
    },
    type () {
      if (this.candidate.type === 'mayors') {
        return '市長'
      }
      return '議員'
    }
  },
  beforeMount () {
    this.fetching = true
    fetchBoards(this.$store, { candidates: this.candidate.id })
    .then(res => {
      this.loaded = true
      this.fetching = false
      this.count = res.count
    })
    .catch(() => {
      this.loaded = true
      this.fetching = false
      this.hasError = true
    })
  },
  methods: {
    closeDataBoard () {
      this.board = undefined
      this.showDataBoard = false
    },
    goUpload() {
      this.$router.push(`/project/election-board/upload`)
      window.ga('send', 'event', 'projects', 'click', `go upload from candidate`, { nonInteraction: false })
    },
    handleLoadMore () {
      if (this.boards.length < this.count) {
        const boardsContainer = document.querySelector('.boards')
        const boards = document.querySelectorAll('.boards__item')
        const board = boards[boards.length - 3]
        if (!this.hasError && !this.fetching && board.getBoundingClientRect().top < boardsContainer.getBoundingClientRect().bottom) {
          this.fetching = true
          fetchBoards(this.$store, { candidates: this.candidate.id, page: this.page + 1 })
          .then(res => {
            this.fetching = false
            this.page = this.page + 1
          })
          .catch(err => {
            this.fetching = false
            this.hasError = true
          })
        }
      }
    },
    moment,
    openDataBoard (id) {
      this.board = this.boards.find(board => board.id === id)
      this.showDataBoard = true
      window.ga('send', 'event', 'projects', 'click', `go board ${id} from candidate`, { nonInteraction: false })
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #4897db

.data-boards
  display flex
  flex-direction column
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 10
  width 100%
  padding 60px 25px 90px
  background-color #000
  h3
    color #fff
    font-size 1.25rem
    font-weight 500
    > span
      margin-left .5em
      font-size .875rem
      font-weight 300
  p
    color #4897db
    font-size .875rem
  button
    cursor pointer
  .boards-container
    flex 1
    position relative
    margin-top 25px
    .boards
      display flex
      justify-content space-between
      align-items flex-start
      flex-wrap wrap
      position absolute
      top 0
      right 0
      left 0
      bottom 0
      width 100%
      height 100%
      padding-bottom 10px
      overflow-y auto
      &__item
        width calc((100% - 15px) / 2)
        margin-top 10px
        cursor pointer
        &:nth-of-type(1), &:nth-of-type(2)
          margin-top 0
        > p
          color #fff
          text-align justify
          &.date
            color #a0a0a0 
        .img-container
          position relative
          display block
          width 100%
          padding-top 100%
          margin-bottom .5em
          background-color #a0a0a0
          img
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            width 100%
            height 100%
            object-fit cover
            object-position center center
  .action
    display flex
    justify-content space-between
    position absolute
    bottom 0
    left 0
    right 0
    width 100%
    padding 25px
    background-color #000
    .btn
      height 50px
      font-size 1.25rem
      font-weight 700
      border none
      border-radius 2px
      &--back
        width 55px
        padding 11px
        background-color #a0a0a0
        > img 
          width 34px
      &--upload
        flex 1
        margin-left 15px
        background-color theme-color

@media (min-width: 768px)
  .data-boards
    padding 60px calc((100% - 600px) / 2) 170px
    h3
      font-size 2.25rem
      > span
        font-size 1.25rem
    p
      font-size 1.25rem
    .boards-container
      left -15px
      width calc(100% + 30px)
      margin-top 20px
      .boards
        justify-content flex-start
        &__item
          width calc((100% - 120px) / 4)
          margin 15px
          &:nth-of-type(1), &:nth-of-type(2)
            margin-top 15px
    .action
      bottom 65px
      width 450px
      margin 0 auto
      padding 0
      .btn
        &--back
          width 95px

</style>
