<template>
  <section class="table-of-contents">
    <UserState />
    <HeaderIcons />
    <transition name="popOutNav" @before-enter="isNavTransition = true" @after-enter="afterEnterNav">
      <nav ref="nav" v-show="isNav">
        <svg class="table-of-contents__line" width="1" :height="isPrompt ? 0 : navH" xmlns="http://www.w3.org/2000/svg"><path :d="`M.5 0v${lineH}`" stroke="#979797" fill="none" fill-rule="evenodd" stroke-dasharray="6" stroke-linecap="square"/></svg>
        <ul>
          <li
            v-for="content in contents"
            :key="`content-${content.id}`"
            @click="showReport(content.id)"
            :class="{ 'can-hover': !isNavTransition && !isPrompt, 'spotlight': content.id === 1 && isPrompt }">
          <!-- <li v-for="content in contents" :key="`content-${content.id}`" @click="$emit('showReport', content.id)"> -->
            <div class="table-of-contents__num">
              <MapMarker :num="content.id" />
            </div>
            <div class="table-of-contents__text">
              <p class="table-of-contents__title">{{ content.title }}</p>
              <!-- todo 預估？閱讀？時間 -->
              <p class="table-of-contents__time">預估時間：{{ content.time }}</p>
            </div>
            <!-- <div class="table-of-contents__arrow"> -->
            <img class="table-of-contents__arrow" src="/proj-assets/food-delivery/img/enter--comp.svg" alt="">
            <!-- </div> -->
          </li>
        </ul>
      </nav>
    </transition>
    <transition name="fade-out-nav" @after-enter="isPoint = true">
      <div class="table-of-contents__prompt" v-if="isPrompt">
        <div class="table-of-contents__prompt-mask"></div>
        <div class="table-of-contents__prompt-action">
          <div :class="{ point: isPoint }">
            <img src="/proj-assets/food-delivery/img/icon/finger.svg" alt="">
            <!-- todo text -->
            <p>點選以閱讀報導</p>
          </div>
          <button type="button" @click="isPrompt = false">我知道了</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('FoodDelivery')

import UserState from './UserState.vue'
import MapMarker from './MapMarker.vue'
import HeaderIcons from './HeaderIcons.vue'

export default {
  name: 'TableOfContents',
  components: {
    UserState,
    MapMarker,
    HeaderIcons
  },
  data () {
    return {
      navH: 0,
      isPrompt: false,
      isNavTransition: true,
      isPoint: false
    }
  },
  mounted () {
    // this.updateNavH()
    window.addEventListener('resize', this.updateNavH)
    window.addEventListener('orientationChange', this.updateNavH)
  },
  computed: {
    ...mapState([
      'contents',
      'isNav'
    ]),
    lineH () {
      // 24.6 + 35.8
      // const height = this.navH - 60.4
      const height = this.navH - 24.6
      return (height >= 0 ? height : 0)
    }
  },
  methods: {
    ...mapMutations([
      'toggleReportContent',
      'changeCurrentReadReportId'
    ]),
    updateNavH () {
      this.navH = this.$refs.nav.offsetHeight      
    },
    showReport (id) {
      if (this.isPrompt || this.isNavTransition) return
      this.changeCurrentReadReportId(id)
      this.toggleReportContent(true)
      this.$router.push(`/project/food-delivery/order${id}`).catch((err) => {})
    },
    afterEnterNav () {
      this.isPrompt = true
      this.isNavTransition = false
      this.updateNavH()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateNavH)
    window.removeEventListener('orientationChange', this.updateNavH)
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'
@import '../util/transition.styl'

.table-of-contents
  // background-image url(/proj-assets/food-delivery/img/map.jpg)
  // background-size cover
  // background-position center
  // background-repeat no-repeat
  min-height 100vh
  background-color rgba(#000, 0.3)
  overflow hidden
  position relative
  // &.hide
  //   visibility hidden
  & nav
    position relative
  &__num
    // width 25.42px
    // height 35.8px
    margin-right 10px
    user-select none
    z-index 1
    & > svg
      width 25.42px
      height 35.8px
      display block
  &__text
    color #4a4a4a
    line-height normal
    transition all 0.2s
  // todo max-width
  &__title
    font-size 1.8rem
    // font-weight 500
  &__time
    font-size 1.4rem
  &__arrow
    width 20px
    margin-left auto
  & ul
    background-color #ffdc03
    border-top-left-radius 24px
    border-top-right-radius 24px
    // padding-top 10px
    overflow hidden
    background-color #ffdc03
    min-height calc(100vh - 84px)
    @media (min-width $mobile)
      min-height calc(100vh - 120px)
  & li
    background-color #ffdc03
    padding-left 10px
    padding-right 20px
    padding-top 10px
    padding-bottom 10px
    display flex
    align-items center
    cursor pointer
    transition background-color 0.2s
    &.spotlight
      z-index 499
      position relative
    // position relative
    @media (min-width $mobile)
      padding-left 45px
      padding-right 45px
    &:first-child
      padding-top 20px
    &.can-hover:hover
      background-color #ffec78
      & .table-of-contents__text
        font-weight 500
        color #000
      & .marker-color
        fill #000
  &__line
    position absolute
    // 20 + (45 - 35.8) / 2
    top 24.6px
    // 20 + (45 - 35.8) / 2 + 35.8
    // top 60.4px
    // 10 + (25.42 / 2) - (1 / 2)
    left 22.21px
    transition height 5.5s linear
    @media (min-width $mobile)
      // 45 + (25.42 / 2) - (1 / 2)
      left 57.21px
  &__prompt
    position absolute
    // background-color rgba(#000, 0.8)
    width 100%
    height 100%
    top 0
    left 0
    // z-index 199
    &-mask
      position absolute
      top 0
      left 0
      background-color rgba(#000, 0.8)
      width 100%
      height 100%
      z-index 199
    &-action
      position absolute
      top 162px
      width 100%
      display flex
      flex-direction column
      align-items center
      color #fff
      font-size 2.4rem
      z-index 599
      user-select none
      @media (min-width $mobile)
        top 198px
      // text-align center
      // margin-right auto
      // margin-left auto
      & > div
        text-align center
        &.point
          // easeInOutSine
          animation point 2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite both
          @keyframes point
            0%
              transform translateY(0px)
            14%
              transform translateY(-10px)
            28%
              transform translateY(0px)
            42%
              transform translateY(-10px)
            70%
              transform translateY(0px)
      & img
        width 50px
        vertical-align top
        // display block
      & p
        // font-size 2.4rem
        line-height normal
        margin-top 10px
        margin-bottom 20px
      & button
        border-radius 10px
        border 1px solid #fff
        background-color transparent
        color #fff
        width 100%
        max-width 240px
        padding-top 8px
        padding-bottom 8px
        // easeOutCirc
        transition all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)
        &:hover
          background-color #fff
          color #000
        &:active
          background-color darken(#fff, 10%)
</style>
