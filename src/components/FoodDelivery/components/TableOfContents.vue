<template>
  <section ref="toc" class="table-of-contents">
    <UserState ref="userState" />
    <HeaderIcons />
      <nav ref="nav">
        <svg class="table-of-contents__line" width="1" :height="lineH" xmlns="http://www.w3.org/2000/svg"><path :d="`M.5 0v${lineH}`" stroke="#979797" fill="none" fill-rule="evenodd" stroke-dasharray="6" stroke-linecap="square"/></svg>
        <ul>
          <li
            v-for="content in contents"
            :key="`content-${content.id}`"
            @click="showReport(content.id)"
            :class="{ 'can-hover': !isTOCTransition && !isPrompt, 'spotlight': content.id === 1 && isPrompt }">
            <div class="table-of-contents__num">
              <MapMarker :class="{ 'table-of-contents__map-marker': content.id !== 1 && isBeginning }" :num="content.id" />
            </div>
            <div class="table-of-contents__text">
              <p class="table-of-contents__title">{{ content.title }}</p>
              <p class="table-of-contents__time">閱讀時間：{{ content.time }}</p>
            </div>
            <img class="table-of-contents__arrow" src="/proj-assets/food-delivery/img/icon/enter.svg" alt="" loading="lazy">
          </li>
        </ul>
      </nav>
    <transition name="fade-out-nav" @after-enter="isPoint = true" @after-leave="afterLeavePrompt">
      <div class="table-of-contents__prompt" v-if="isPrompt">
        <div class="table-of-contents__prompt-mask"></div>
        <div class="table-of-contents__prompt-action">
          <div :class="{ point: isPoint }">
            <img src="/proj-assets/food-delivery/img/icon/finger.svg" alt="" loading="lazy">
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
      isPrompt: false,
      isTOCTransition: false,
      isPoint: false,
      lineH: 0,
      canUpdateLineH: false,
      isBeginning: true
    }
  },
  mounted () {
    if (this.isReportContent) {
      gsap.set(this.$refs.toc, {
        y: 0
      })
      this.isBeginning = false
      this.canUpdateLineH = true
      this.lineH = this.$refs.nav.offsetHeight - 60.4
    }
    window.addEventListener('resize', this.updateLineH)
    window.addEventListener('orientationChange', this.updateLineH)
  },
  computed: {
    ...mapState([
      'contents',
      'isTOC',
      'isReportContent'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleReportContent',
      'changeCurrentReadReportId',
      'toggleBodyScrollBar'
    ]),
    updateLineH () {
      if (this.canUpdateLineH) {
        this.lineH = this.$refs.nav.offsetHeight - 60.4
      }
    },
    showReport (id) {
      if (this.isPrompt || this.isTOCTransition) return
      this.changeCurrentReadReportId(id)
      this.toggleReportContent(true)
      this.toggleBodyScrollBar(false)
      this.$router.push(`/project/food-delivery/order${id}`).catch((err) => {})

      let gaLabel = ''
      switch (id) {
        case 1:
          gaLabel = '如何成為外送員'
          break
        case 2:
          gaLabel = '美食外送平台解決了什麼問題'
          break
        case 3:
          gaLabel = '司機管理仰賴檢舉和評價'
          break
        case 4:
          gaLabel = '外送員最害怕的事：車禍'
          break
        case 5:
          gaLabel = '平台經濟帶來的好與壞'
          break
        default:
          break
      }
      window.ga('send', 'event', 'projects', 'click', gaLabel)
    },
    showPrompt () {
      this.isPrompt = true
      this.isTOCTransition = false
      this.toggleBodyScrollBar(true)
    },
    afterLeavePrompt () {
      this.$refs.userState.typing()
      gsap.to('.table-of-contents__map-marker', {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.5,
      })
      gsap.to(this, {
        lineH: this.$refs.nav.offsetHeight - 60.4,
        duration: 5,
        ease: 'none',
        omComplete: () => {
          this.canUpdateLineH = true
        }
      })
      window.ga('send', 'event', 'projects', 'scroll', '第一屏')
    }
  },
  watch: {
    isTOC (newVal) {
      if (newVal) {
        this.isTOCTransition = true
        gsap.to(this.$refs.toc, {
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          onComplete: () => {
            this.showPrompt()
          }
        })
      }
    },
    isReportContent (newVal) {
      if (!newVal) {
        this.$refs.userState.setState()
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateLineH)
    window.removeEventListener('orientationChange', this.updateLineH)
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'
@import '../util/transition.styl'

.table-of-contents
  min-height 100vh
  background-color rgba(#000, 0.3)
  overflow hidden
  position relative
  transition opacity 0.45s $easeOutExpo
  transform translateY(100%)
  & nav
    position relative
  &__num
    margin-right 10px
    user-select none
    z-index 1
    & > svg
      width 25.42px
      height 35.8px
      display block
  &__map-marker
    transform scale(0)
  &__text
    color #4a4a4a
    line-height normal
    transition all 0.45s $easeOutCirc
  &__title
    font-size 1.8rem
    font-weight 700
  &__time
    font-size 1.4rem
  &__arrow
    width 20px
    margin-left auto
  & ul
    background-color #ffdc03
    border-top-left-radius 24px
    border-top-right-radius 24px
    overflow hidden
    background-color #ffdc03
    min-height calc(100vh - 84px)
    user-select none
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
    transition background-color 0.6s $easeOutCirc
    &.spotlight
      z-index 499
      position relative
    @media (min-width $mobile)
      padding-left 45px
      padding-right 45px
    &:first-child
      padding-top 20px
      border-top-left-radius 24px
      border-top-right-radius 24px
    &.can-hover:hover
      background-color #ffec78
      & .table-of-contents__text
        color #000
      & .marker-color
        fill #000
  &__line
    position absolute
    // 20 + (45 - 35.8) / 2 + 35.8
    top 60.4px
    // 10 + (25.42 / 2) - (1 / 2)
    left 22.21px
    @media (min-width $mobile)
      // 45 + (25.42 / 2) - (1 / 2)
      left 57.21px
  &__prompt
    position absolute
    width 100%
    height 100%
    top 0
    left 0
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
      & > div
        text-align center
        &.point
          animation point 2s $easeInOutSine infinite both
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
      & p
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
        transition all 0.45s $easeOutCirc
        &:hover
          background-color #fff
          color #000
        &:active
          background-color #c4c4c4
</style>
