<template>
  <div class="data-boards">
    <h3>{{ address }}</h3>
    <p>附近的看板</p>
    <div class="boards-container" :class="{ none: !boards.length }">
      <div class="boards" @scroll="handleLoadMore" ref="boards">
        <div v-for="board in boards" :key="`b-${board.id}`" class="boards__item" @click="openDataBoard(board.id)">
          <div class="img-container">
            <img :src="`https://www.readr.tw${board.image}`" alt="">
          </div>
          <p>{{ board.county.length < 3 ? `${board.county}市` : board.county }}{{ board.district.length < 3 ? `${board.district}區` : board.district }}{{ board.road }}</p>
          <p class="date" v-text="moment(board.uploaded_at).format('M 月 D 日上傳')"></p>
        </div>
      </div>
      <p v-if="boards.length < 1">{{ this.isLoading ? '正在努力加載看板⋯' : '該位置目前尚無其它看板' }}</p>
    </div>
    <div class="action">
      <button class="btn btn--back" @click="$emit('close')"><img src="/proj-assets/election-board/images/arrow.png"></button>
      <button class="btn btn--upload" @click="goUpload">我也要上傳</button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import moment from 'moment'

const DEFAULT_PAGE = 1

const fetchBoards = (store, {
  coordinates,
  page = DEFAULT_PAGE,
  maxResults = 12,
  // maxResults = 3,
  electionYear = 2020
} = {}) => {
  return store.dispatch('ElectionBoard/FETCH_BOARDS_BY_COORDINATE', {
    coordinates,
    page,
    maxResults,
    electionYear,
    verifiedAmount: 3,
    notBoardAmount: 2
  })
}

export default {
  name: 'DataBoardsByCoordinate',
  props: {
    address: {
    },
    boardID: {
      required: true
    },
    coordinates: {
      required: true
    }
  },
  data () {
    return {
      count: 0,
      page: DEFAULT_PAGE,
      electionYear: 2020,
      isLoading: false
    }
  },
  computed: {
    boards () {
      return this.$store.state.ElectionBoard.boardsByCoordinate.filter((board) => board.id !== this.boardID)
    },
  },
  beforeMount () {
    this.isLoading = true
    this.electionYear = (this.$route.params.params.includes('2018') ? 2018 : 2020)
    fetchBoards(this.$store, { coordinates: this.coordinates, electionYear: this.electionYear })
    .then((res) => {
      this.isLoading = false
      this.count = res.count
    })
  },
  methods: {
    goUpload () {
      this.$router.push(`/project/election-board/upload`)
      window.ga('send', 'event', 'projects', 'click', 'go upload from coordinate')
    },
    handleLoadMore () {
      if (this.boards.length < (this.count - 1)) {
        // const boardsContainer = document.querySelector('.boards')
        // const boards = document.querySelectorAll('.boards__item')
        // const board = boards[boards.length - 3]
        // if (board.getBoundingClientRect().top < boardsContainer.getBoundingClientRect().bottom) {
        //   fetchBoards(this.$store, { coordinates: this.coordinates, page: this.page + 1, electionYear: this.electionYear })
        //   .then((res) => {
        //     this.page = this.page + 1
        //   })
        // }
        const boards = this.$refs.boards
        const scrollH = boards.scrollHeight - boards.offsetHeight * 1.5
        const scrollT = boards.scrollTop
        if (scrollT >= scrollH) {
          fetchBoards(this.$store, { coordinates: this.coordinates, page: this.page + 1, electionYear: this.electionYear })
          .then((res) => {
            this.page = this.page + 1
          })
        }
      }
    },
    moment,
    openDataBoard (id) {
      this.$emit('openDataBoard', this.boards.find((board) => board.id === id))
      window.ga('send', 'event', 'projects', 'click', `go board ${id} from coordinate`)
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
  padding 60px 25px 113px
  background-color #000
  h3
    color #fff
    font-size 1.25rem
    font-weight 300
    > span
      margin-left .5em
      font-size .875rem
      font-weight 300
  p
    color #4897db
    font-size .875rem
    line-height 1.64
    // margin-top 2px
    &.date
      margin-top 2px
  button
    cursor pointer
  .boards-container
    flex 1
    position relative
    margin-top 25px
    margin-left -7px
    margin-right -7px
    &.none
      margin-left 0
      margin-right 0
    > p
      color #a0a0a0
      font-size 1.25rem
    .boards
      display flex
      // justify-content space-between
      // align-items flex-start
      flex-wrap wrap
      position absolute
      top 0
      right 0
      left 0
      bottom 0
      width 100%
      height 100%
      // padding-bottom 10px
      overflow-y auto
      // margin-left -7px
      // margin-right -7px
      &__item
        // width calc((100% - 14px) / 2)
        width 50%
        padding-left 7px
        padding-right 7px
        margin-top 14px
        cursor pointer
        &:nth-of-type(1), &:nth-of-type(2)
          margin-top 0
        > p
          color #fff
          // text-align justify
          &.date
            color #a0a0a0 
        .img-container
          position relative
          display block
          width 100%
          padding-top 100%
          margin-bottom 10px
          background-color #a0a0a0
          border-radius 1px
          overflow hidden
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
            // border-radius 1px
  .action
    display flex
    justify-content space-between
    position absolute
    bottom 0
    left 0
    right 0
    width 100%
    padding 0 25px 30px 25px
    background-color #000
    .btn
      height 48px
      line-height 48px
      font-size 1.25rem
      font-weight 700
      border none
      border-radius 2px
      padding 0
      @media (min-width 768px)
        border-radius 6px
      &--back
        width 56px
        background-color #a0a0a0
        display flex
        justify-content center
        align-items center
        @media (min-width 768px)
          width 95px
        > img 
          width 34px
          height auto
      &--upload
        flex 1
        margin-left 14px
        background-color theme-color
        @media (min-width 768px)
          margin-left 20px

@media (min-width: 768px)
  .data-boards
    padding 50px calc((100% - 602px) / 2) 123px
    h3
      font-size 2.25rem
      margin-bottom 2px
      > span
        font-size 1.25rem
    p
      font-size 1rem
    .boards-container
      margin-left -15px
      margin-right -15px
      // left -15px
      // width calc(100% + 30px)
      margin-top 30px
      .boards
        // margin-left -15px
        // margin-right -15px
        // justify-content flex-start
        &__item
          // width calc((100% - 120px) / 4)
          width 25%
          // margin 15px
          padding-left 15px
          padding-right 15px
          margin-top 30px
          &:nth-of-type(3), &:nth-of-type(4)
            margin-top 0
          // &:nth-of-type(1), &:nth-of-type(2)
          //   margin-top 15px
    .action
      // bottom 65px
      // width 450px
      max-width 602px
      margin 0 auto
      padding 0 0 45px 0
      .btn
        &--back
          width 95px

</style>
