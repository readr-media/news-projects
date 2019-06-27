<template>
  <section
    id="china-company"
    :style="{
      overflowY: isSwiperLastSlide ? 'scroll' : 'hidden'
    }"
    v-swiper:mySwiper="swiperOption"
    @slideNextTransitionEnd="onSlideNextTransitionEnd"
    @slideChangeTransitionStart="onSlideChangeTransitionStart"
    @scroll="onScroll"
    @wheel="onWheel"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
  >
    <RichBadge
      v-show="showOuterFrames"
      class="rich-badge"
    />
    <div class="swiper-wrapper">
      <template v-if="vw > 1400">
        <LandingPage
          class="swiper-slide"
          :title="'1980 年'"
          :description="`
            <span>中國向華資招手，</span><br>
            <span>台商變成中國經濟起飛的重要因素</span>
          `"
          :img="'poster1'"
        />
        <LandingPage
          class="swiper-slide"
          :direction="'reverse'"
          :title="'2020 年'"
          :description="`
            <span>中國成為世界第二大經濟體，</span><br>
            <span>台商不再那麼重要，</span><br>
            <span>因政治因素向各行各業的台灣人</span><br>
            <span>（尤其青年）招手，</span><br>
            <span>而中國的強大也成為對台人的一股吸引力</span>
          `"
          :img="'poster2'"
        />
        <Article
          class="swiper-slide"
        />
      </template>
      <template v-else>
        <LandingPagePoster
          class="swiper-slide"
          :img="'poster1'"
        />
        <LandingPageIntro
          class="swiper-slide"
          :title="'1980 年'"
          :description="`
            <span>中國向華資招手，</span><br>
            <span>台商變成中國經濟起飛的重要因素</span>
          `"
        />
        <LandingPagePoster
          class="swiper-slide"
          :img="'poster2'"
        />
        <LandingPageIntro
          class="swiper-slide"
          :direction="'reverse'"
          :title="'2020 年'"
          :description="`
            <span>中國成為世界第二大經濟體，</span><br>
            <span>台商不再那麼重要，</span><br>
            <span>因政治因素向各行各業的台灣人</span><br>
            <span>（尤其青年）招手，</span><br>
            <span>而中國的強大也成為對台人的一股吸引力</span>
          `"
        />
        <Article
          class="swiper-slide"
        />
      </template>
    </div>
    <Footer
      v-show="showOuterFrames"
      class="rich-footer"
    />
  </section>
</template>

<script>
import Vue from 'vue'
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}
import 'swiper/dist/css/swiper.css'

import LandingPage from './modules/landing/components/PageStory.vue'
import LandingPagePoster from './modules/landing/components/PageStoryPoster.vue'
import LandingPageIntro from './modules/landing/components/PageStoryIntro.vue'
import RichBadge from './modules/article/components/RichBadge.vue'
import Article from './modules/article/index.vue'
import Footer from './modules/article/components/Footer.vue'

const debug = require('debug')('china-company')

export default {
  metaInfo () {
    return {
      title: '中國發大財',
      description: '',
      metaUrl: '',
      metaImage: '',
      customScript: `
        <script src="https://public.flourish.studio/resources/embed.js"><\/script>
      `
    }
  },
  components: {
    LandingPage,
    LandingPagePoster,
    LandingPageIntro,
    RichBadge,
    Article,
    Footer
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        mousewheel: true,
        keyboard: true,

        /*
        ** If true,
        ** Swiper will accept mouse events like touch events
        ** (click and drag to change slides)
        */
        simulateTouch: false,

        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // },
        // scrollbar: {
        //   el: '.swiper-scrollbar'
        // },
        effect: 'fade'
      },
      isSwiperLastSlide: false,
      isScrollbarReachTop: true,
      showOuterFrames: false,
      vw: 0,
      ts: undefined
    }
  },
  watch: {
    isSwiperLastSlide (value) {
      if (value) {
        debug('Swiper at last slide')
        this.disallowSlideChange()
      } else {
        debug('Swiper not at last slide')
        this.allowSlideChange()
      }
    },
    isScrollbarReachTop (value) {
      const action = value ? 'reach': 'leave'
      debug(`Scroll bar ${action} top`)
    },
    '$store.state.viewport' (value) {
      this.vw = value[0]
    },
    vw () {
      debug('vw changed, exec mySwiper.update()')
      this.mySwiper.update()
    }
  },
  mounted () {
    this.vw = this.$store.state.viewport[0]
    this.mySwiper.update()
  },
  methods: {
    allowSlideChange () {
      debug('allowSlideChange')
      this.mySwiper.mousewheel.enable()
      this.mySwiper.allowTouchMove = true
    },
    disallowSlideChange () {
      debug('disallowSlideChange')
      this.mySwiper.mousewheel.disable()
      this.mySwiper.allowTouchMove = false
    },
    onSlideChangeTransitionStart () {
      debug('Handle slideChangeTransitionStart event')
      const isLastSlide = this.mySwiper.activeIndex === this.mySwiper.slides.length - 1
      this.showOuterFrames = isLastSlide
    },
    onSlideNextTransitionEnd () {
      debug('Handle slideNextTransitionEnd event')
      this.isSwiperLastSlide = this.mySwiper.activeIndex === this.mySwiper.slides.length - 1
    },
    onScroll (e) {
      debug('Handle scroll event')
      this.isScrollbarReachTop = e.target.scrollTop <= 0
    },
    onWheel (e) {
      if (this.isSwiperLastSlide) {
        debug('Handle wheel event')
        const isUp = e.deltaY < 0
        const isDown = e.deltaY > 0
        if (isUp) {
          debug('Wheel up')
          if (this.isScrollbarReachTop) {
            this.allowSlideChange()
          }
        }
        if (isDown) {
          debug('Wheel down')
        }
      }
    },
    onTouchStart (e) {
      this.ts = e.touches[0].clientY
    },
    onTouchMove (e) {
      if (this.isSwiperLastSlide) {
        debug('Handle touch event')
        const te = e.changedTouches[0].clientY
        const isUp = this.ts < te - 5
        const isDown = this.ts > te + 5
        if (isUp) {
          debug('touch move up')
          if (this.isScrollbarReachTop) {
            this.allowSlideChange()
          }
        }
        if (isDown) {
          debug('touch move down')
        }
      }
    }
  }
}
</script>

<style lang="stylus">
#china-company
  background-color #000537
  width 100vw
  height 100vh
  -webkit-overflow-scrolling touch

.rich-badge
  position fixed
  top 0
  left 0
  width 100vw

.rich-footer
  position fixed
  bottom 0
  left 0
  width 100vw
</style>
