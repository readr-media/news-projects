<template>
  <section class="table-of-contents">
    <UserState />
    <HeaderIcons />
    <nav ref="nav">
      <svg class="table-of-contents__line" width="1" :height="lineH" xmlns="http://www.w3.org/2000/svg"><path :d="`M.5 0v${lineH}`" stroke="#979797" fill="none" fill-rule="evenodd" stroke-dasharray="6" stroke-linecap="square"/></svg>
      <ul>
        <li v-for="content in contents" :key="`content-${content.id}`" @click="showReport(content.id)" :style="(content.id === 1 && isPrompt)? { zIndex: 499, position: 'relative' } : ''">
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
    <div class="table-of-contents__prompt" v-if="isPrompt">
      <div class="table-of-contents__prompt-mask"></div>
      <div class="table-of-contents__prompt-action">
        <!-- todo change finger -->
        <img src="/proj-assets/food-delivery/img/icon/finger.svg" alt="">
        <!-- todo text -->
        <p>點選以閱讀報導</p>
        <button type="button" @click="isPrompt = false">我知道了</button>
      </div>
    </div>
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
      isPrompt: true
    }
  },
  mounted () {
    this.updateNavH()
    window.addEventListener('resize', this.updateNavH)
    window.addEventListener('orientationChange', this.updateNavH)
  },
  computed: {
    ...mapState([
      'contents'
    ]),
    lineH () {
      const height = this.navH - 24.6
      return height >= 0 ? height : 0
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
      this.changeCurrentReadReportId(id)
      this.toggleReportContent(true)
      this.$router.push(`/project/food-delivery/order${id}`).catch((err) => {})
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

.table-of-contents
  // background-image url(/proj-assets/food-delivery/img/map.jpg)
  // background-size cover
  // background-position center
  // background-repeat no-repeat
  // min-height 100vh
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
    // position relative
    @media (min-width $mobile)
      padding-left 45px
      padding-right 45px
    &:first-child
      padding-top 20px
    &:hover
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
    // 10 + (25.42 / 2) - (1 / 2)
    left 22.21px
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
      top 159px
      width 100%
      display flex
      flex-direction column
      align-items center
      color #fff
      font-size 2.4rem
      z-index 599
      @media (min-width $mobile)
        top 195px
      // text-align center
      // margin-right auto
      // margin-left auto
      & img
        width 50px
        display block
        // transform rotate(-90deg)
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
</style>
