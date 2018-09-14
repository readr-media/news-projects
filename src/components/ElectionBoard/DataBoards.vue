<template>
  <div class="data-boards">
    <h3>蘇貞昌<span>民主進步黨</span></h3>
    <p>新北市市長候選人</p>
    <div class="boards-container">
      <div class="boards">
        <div v-for="item in 12" :key="item" class="boards__item" @click="openDataBoard()">
          <img src="" alt="">
          <p>新北市淡水區淡金路二段</p>
          <p class="date">9 月 10 日上傳</p>
        </div>
      </div>
    </div>
    <div class="action">
      <button class="btn btn--back" @click="$router.back()"><img src="/proj-assets/election-board/images/arrow.png"></button>
      <button class="btn btn--upload" @click="$router.push('/project/election-board/upload?candidate=')">我也要上傳</button>
    </div>
    <DataBoard v-show="showDataBoard" @closeDataBoard="showDataBoard = false"/>
  </div>
</template>
<script>
import DataBoard from './DataBoard.vue'

export default {
  name: 'DataBoards',
  data () {
    return {
      showDataBoard: false,
    }
  },
  components: {
    DataBoard,
  },
  methods: {
    openDataBoard () {
      this.showDataBoard = true
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
  z-index 10
  width 100%
  height 100vh
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
  .boards-container
    flex 1
    position relative
    margin-top 25px
    .boards
      display flex
      justify-content space-between
      flex-wrap wrap
      position absolute
      top 0
      right 0
      left 0
      bottom 0
      width 100%
      height 100%
      overflow-y auto
      &__item
        width calc((100% - 15px) / 2)
        margin-top 10px
        &:nth-of-type(1), &:nth-of-type(2)
          margin-top 0
        > img
          display block
          width 100%
          padding-top 100%
          height auto
          margin-bottom .5em
          background-color #a0a0a0
        > p
          color #fff
          text-align justify
          &.date
            color #a0a0a0 
        
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
    padding 60px calc((100% - 600px) / 2) 130px
    h3
      font-size 2.25rem
      > span
        font-size 1.25rem
    p
      font-size 1.25rem
    .boards-container
      margin-top 35px
      .boards
        &__item
          width calc((100% - 90px) / 4)
          margin-top 30px
          &:nth-of-type(3), &:nth-of-type(4)
            margin-top 0
    .action
      padding 25px calc((100% - 450px) / 2)

</style>
