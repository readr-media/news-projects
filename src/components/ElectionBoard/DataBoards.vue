<template>
  <div class="data-boards">
    <div class="data-boards__content">
      <h3>{{ candidate.name }}<span>{{ candidate.party }}</span></h3>
      <p>{{ county }} / {{ type }}候選人</p>

      <div class="data-boards__contrib">
        <p>政治獻金</p>
        <div>
          <p class="money">NT$ 1, 234, 567, 890</p>
          <a href="#" target="_blank" v-if="isLapW">看蘇貞昌政治獻金資料</a>
        </div>
        <p class="descrip">宣傳支出與看板有關的金額總計為 5000000 元，並未區分單塊看板明細。</p>
        <a href="#" target="_blank" v-if="isMobW">看蘇貞昌政治獻金資料</a>
      </div>

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
      wEl: null,
      ww: 0,
      isMounted: false
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
      return this.candidate.type === 'mayors' ? '市長' : '議員'
    },
    isMobW () {
      return this.isMounted && this.ww < 767.98
    },
    isLapW () {
      return this.isMounted && this.ww >= 768
    }
  },
  beforeMount () {
    this.fetching = true
    this.wEl = window
    this.ww = this.wEl.innerWidth

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
  mounted () {
    this.isMounted = true
    // todo debounce
    this.wEl.addEventListener('resize', this.alterWindowWidth)
    this.wEl.addEventListener('orientationChange', this.alterWindowWidth)
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
    },
    alterWindowWidth () {
      this.ww = this.wEl.innerWidth
    }
  },
  beforeDestroy () {
    this.wEl.removeEventListener('resize', this.alterWindowWidth)
    this.wEl.removeEventListener('orientationChange', this.alterWindowWidth)
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #4897db

.data-boards
  // display flex
  // flex-direction column
  // position fixed
  top 0
  left 0
  // right 0
  // bottom 0
  // z-index 10
  // width 100%
  // padding 60px 25px 115px
  width 100%
  background-color #000
  z-index 10
  position fixed
  height 100vh
  &__content
    display flex
    flex-direction column
    padding 60px 25px 113px
    position relative
    // position fixed
    top 0
    left 0
    height 100vh
    width 100%
    // right 0
    // bottom 0
    @media (min-width 768px)
      max-width 602px
      padding 50px 0 123px 0
      margin-left auto
      margin-right auto
  & h3
    color #fff
    font-size 1.25rem
    font-weight 600
    margin-bottom 10px
    & > span
      margin-left 10px
      font-size .875rem
      font-weight 400
      // font-weight 300
  & p
    // color #4897db
    color #fff
    font-size .875rem
    &.money
      font-size 1.25rem
      font-weight 600
      margin-top 6px
      margin-bottom 8px
      @media (min-width 768px)
        margin-top 8px
        font-size 2.25rem
        margin-bottom 20px
    &.descrip
      color #a0a0a0
      line-height 1.8
      margin-bottom 10px
      @media (min-width 768px)
        font-size 1rem
        margin-bottom 0
  &__contrib
    margin-top 16px
    @media (min-width 768px)
      margin-top 24px
      & > div
        display flex
        justify-content space-between
        align-items center
    & a
      text-decoration underline
      font-weight 600
      font-size .875rem
      color theme-color
      display block
      text-align right
      @media (min-width 768px)
        font-size 1rem
  & button
    cursor pointer
  & .boards-container
    flex 1
    position relative
    margin-top 30px
    margin-right -7px
    margin-left -7px
    // todo depend on 政治獻金描述多寡
    // min-height 206px
    @media (min-width 768px)
      margin-right -15px
      margin-left -15px
    & .boards
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
      // height 100%
      // margin-bottom 35px
      overflow-y auto
      &__item
        // width calc((100% - 15px) / 2)
        // width calc(50% - 7px)
        width 50%
        margin-top 14px
        cursor pointer
        padding-left 7px
        padding-right 7px
        &:nth-of-type(1), &:nth-of-type(2)
          margin-top 0
        @media (min-width 576px)
          width 33.33%
          &:nth-of-type(3)
            margin-top 0
        @media (min-width 768px)
          width 25%
          padding-left 15px
          padding-right 15px
          margin-top 30px
          &:nth-of-type(4)
            margin-top 0
          // width calc(25% - 22.5px)
        & > p
          // color #fff
          // text-align justify
          line-height 1.64
          @media (min-width 768px)
            font-size 1rem
          &.date
            color #a0a0a0
            font-size 0.875rem
            margin-top 2px
            // @media (min-width 768px)
            //   margin-top 2px
        & .img-container
          position relative
          display block
          width 100%
          padding-top 100%
          margin-bottom 10px
          background-color #a0a0a0
          & img
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            width 100%
            height 100%
            object-fit cover
            object-position center center
  & .action
    display flex
    justify-content space-between
    position absolute
    bottom 0
    left 0
    right 0
    width 100%
    padding 0 25px 30px 25px
    // padding-bottom 30px
    background-color #000
    @media (min-width 768px)
      padding 0 0 45px 0
      width 100%
    & .btn
      height 48px
      font-size 1.25rem
      font-weight 700
      border none
      border-radius 2px
      padding 0
      line-height 48px
      @media (min-width 768px)
        border-radius 6px
      &--back
        width 56px
        // padding 11px
        background-color #a0a0a0
        display flex
        justify-content center
        align-items center
        & > img 
          width 34px
          height auto
      &--upload
        flex 1
        margin-left 14px
        background-color theme-color
        @media (min-width 768px)
          margin-left 20px

@media (min-width 768px)
  .data-boards
    // padding 60px calc((100% - 600px) / 2) 170px
    & h3
      font-size 2.25rem
      margin-bottom 12px
      & > span
        font-size 1.25rem
        margin-left 12px
    & p
      font-size 1.25rem
    // & .boards-container
    //   left -15px
    //   width calc(100% + 30px)
    //   margin-top 20px
    //   & .boards
    //     justify-content flex-start
    //     &__item
    //       width calc((100% - 120px) / 4)
    //       margin 15px
    //       &:nth-of-type(1), &:nth-of-type(2)
    //         margin-top 15px
    .action
      // bottom 65px
      // width 450px
      // margin 0 auto
      // padding 0
      .btn
        &--back
          width 95px
</style>
