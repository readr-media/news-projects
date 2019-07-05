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
        <LandingIntro
          class="swiper-slide"
          @nextSlide="mySwiper.slideNext()"
        />
        <LandingPosters
          class="swiper-slide"
          :isActive="activeIndex === 1"
          @nextSlide="mySwiper.slideNext()"
        />
        <Article
          class="swiper-slide"
        />
      </template>
      <template v-else>
        <LandingIntro
          class="swiper-slide"
          @nextSlide="mySwiper.slideNext()"
        />
        <LandingPoster
          class="swiper-slide"
          :img="'1990'"
        />
        <LandingPoster
          class="swiper-slide"
          :img="'2020'"
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

import LandingIntro from './components/LandingIntro.vue'
import LandingPosters from './components/LandingPosters.vue'
import LandingPoster from './components/LandingPoster.vue'
import RichBadge from './modules/article/components/RichBadge.vue'
import Article from './modules/article/index.vue'
import Footer from './modules/article/components/Footer.vue'

import mixinGA from './mixinGA'

const debug = require('debug')('china-company')

export default {
  mixins: [ mixinGA ],
  metaInfo () {
    return {
      title: '錢進來，人出去，中國讓你發大財！ 解密臺商領取的中國補助款',
      description: '在「中國因素」愈來愈敏感之際，臺灣企業旺旺及鴻海陷入領取高額中國補助款的輿論風暴。READr 針對中港上市的臺商，調查超過百份財報，發現中國在這 10 年內針對 42 家臺商發放了 663 億（新台幣）的補助款，光旺旺、鴻海、頂新就包辦了六成。這些補助款代表什麼意義？靠錢打造的中國夢近年來又發生什麼變化？',
      metaUrl: 'china-company',
      metaImage: 'china-company/ogimage.png',
      customScript: `
        <script src="https://public.flourish.studio/resources/embed.js"><\/script>
      `
    }
  },
  components: {
    LandingIntro,
    LandingPosters,
    LandingPoster,
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
      ts: undefined,
      activeIndex: 0
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
      this.activeIndex = this.mySwiper.activeIndex
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
