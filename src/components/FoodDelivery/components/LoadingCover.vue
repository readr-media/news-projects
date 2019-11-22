<template>
  <transition name="fade-out-cover" @before-leave="showBeginningContent">
    <section class="loading-cover" v-if="isCover">
      <div class="loading-cover__wrapper">
        <h1>記者來當外送員：<br>開箱美食外送秘辛！</h1>
        <div class="loading-cover__progress">
          <!-- <div :class="[ 'inner-bar', { loading: isMounted } ]" @transitionend="hideCover" @oTransitionEnd="hideCover" @webkitTransitionEnd="hideCover"></div> -->
          <div ref="innerBar" class="inner-bar"></div>
        </div>
      </div>
      <!-- <img src="/proj-assets/food-delivery/img/cover.jpg" alt=""> -->
    </section>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('FoodDelivery')

export default {
  name: 'LoadingCover',
  data () {
    return {
      isCover: true
    }
  },
  computed: {
    ...mapState([
      'isMounted'
    ])
    // whichTransitionEnd () {
    //   const innerBar = this.$refs.innerBar
    //   // const innerBar = document.getElementById('inner-bar')
    //   return 'transitionend'
    // }
  },
  methods: {
    ...mapMutations([
      'showBeginningContent'
    ]),
    hideCover () {
      this.isCover = false
    }
  },
  watch: {
    isMounted (newVal) {
      if (newVal) {
        gsap.to(this.$refs.innerBar, {
          width: '100%',
          duration: 1,
          ease: 'circ.in',
          onComplete: () => {
            this.hideCover()
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'
@import '../util/transition.styl'

.loading-cover
  background-image url(/proj-assets/food-delivery/img/cover.png)
  background-color #000
  background-size cover
  background-position center top
  background-repeat no-repeat
  height 100vh
  // position relative
  position absolute
  width 100%
  z-index 699
  &__wrapper
    position absolute
    background-color #000
    padding 11px 14px 14px 14px
    text-align center
    width 100%
    bottom 6.52%
    max-width 680px
    left 50%
    transform translateX(-50%)
    @media (min-width $tablet)
      padding 18px 45px 20px 45px
      bottom 11.39%
  & h1
    font-size 3.0rem
    font-weight 700
    line-height 1.2
    color #fff
    margin-bottom 16px
    @media (min-width $tablet)
      font-size 5.0rem
      line-height 1.36
      margin-bottom 25px
  &__progress
    border-radius 6px
    border 1px solid #ffdc03
    padding 4px 5px
    box-shadow 0 0 8px rgba(#ffdc03, 0.8)
    // easeInOutCirc
    animation shining 1s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86) alternate
    @keyframes shining
      100%
        box-shadow 0 0 16px rgba(#ffdc03, 0.8)
    & .inner-bar
      width 0%
      height 4px
      border-radius 6px
      background-color #ffdc03
      // easeInCirc
      // transition width 3s cubic-bezier(0.6, 0.04, 0.98, 0.335)
      // &.loading
      //   width 100%
</style>