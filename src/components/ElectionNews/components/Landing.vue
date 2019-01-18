<template>
  <section class="landing">
    <img
      v-show="showAside"
      class="landing__readr-logo"
      src="/proj-assets/logo_readr_with_text.png"
      alt=""
      @click="newTab('https://www.readr.tw')"
    >
    <img
      v-show="showAside"
      class="landing__share"
      src="/proj-assets/election-news/img/share.png"
      alt=""
      @click="newTab('https://www.facebook.com/share.php?u=https://www.readr.tw/project/election-news')"
    >
    <LandingTitles/>
    <Credits class="landing__credits"/>
    <div class="landing__arrow-wrapper">
      <div class="landing__arrow" @click="scroll"></div>
    </div>
    <div class="landing__intro">
      <p>前言同王北鄉：一言的時創好演；助查有樣印化上了不在思要天；理沒星早們；委士紀北風起不少滿或很變基教足老興說洲南不創公河有臺以著年這要學們不。</p>
      <p>一力口水地道該起黃的喜老查中路物死學呢民外，病心師站力而受媽；所發夫，才則聲電在醫間各以教全小今精人而不視。</p>
    </div>
    <div class="landing__navs navs">
      <Button
        class="navs__nav"
        @click.native="navigate({ param: defaultParams })"
      >
        單一關鍵字
      </Button>
      <Button
        class="navs__nav"
        @click.native="navigate({ param: defaultParams, subparam: defaultSubparams})"
      >
        我要看 PK
      </Button>
    </div>
  </section>
</template>

<script>
import { debounce } from 'lodash'

import LandingTitles from './LandingTitles.vue'
import Credits from './Credits.vue'
import Button from './Button.vue'

import { mapState as mapStateRoot } from 'vuex'

const debug = require('debug')('ELECTION-NEWS:CLIENT:Landing.vue')

export default {
  components: {
    LandingTitles,
    Credits,
    Button
  },
  watch: {
    viewport () {
      this.debounceResize()
    }
  },
  data () {
    return {
      defaultParams: '韓國瑜',
      defaultSubparams: '陳其邁',
      showAside: true
    }
  },
  computed: {
    ...mapStateRoot({
      viewport: state => state.viewport
    })
  },
  methods: {
    navigate ({ param = '', subparam = '' }) {
      const { params, subparams } = this.$route.params
      const shouldScroll = (param === params) || ((param === params) && (subparam === subparams) )
      if (shouldScroll) {
        this.$scrollTo('.content')
      }

      this.$router.navigate({ param, subparam })
    },
    scroll () {
      this.$scrollTo(
        '.landing__intro',
        500,
        {
          offset: 0
        }
      )
    },
    createScroller () {
      require('intersection-observer')
      const scrollama = require('scrollama')
      this.scroller = scrollama()

      this.scroller
        .setup({
          step: '.landing',
          offset: .2
        })
        .onStepEnter(({element, index, direction}) => {
          if (direction === 'up') {
            this.showAside = true
          }
        })
        .onStepExit(({element, index, direction}) => {
          if (direction === 'down') {
            this.showAside = false
          }
        })
    },
    scrollerResize () {
      this.scroller.resize()
    },
    newTab (url) {
      window.open(url)
    }
  },
  mounted () {
    this.createScroller()
    this.debounceResize = debounce(this.scrollerResize, 500)
  }
}
</script>

<style lang="stylus" scoped>
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3d(0, -50%, 0);
  }

  50% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.landing
  display flex
  flex-direction column
  align-items center
  justify-content flex-end
  padding 100px 14px 50px 14px
  background-color rgba(0, 0, 0, 0.85)
  &__readr-logo
    position fixed
    top 20px
    left 20px
    width 50px
    cursor pointer
  &__share
    position fixed
    top 29px
    right 20px
    width 30px
    cursor pointer
  &__credits
    margin 24px 0 0 0
  &__arrow-wrapper
    animation-name fadeInDown
    animation-duration 3s
    animation-iteration-count infinite
  &__arrow
    margin 80px 0 0 0
    width 30px
    height 30px
    border-left 4px solid white
    border-bottom 4px solid white
    transform rotate(-45deg)
  &__intro
    margin 80px 0 0 0
    p
      color white
      margin 40px 0
      line-height 1.7
      font-size 14px
      text-align justify
  &__navs
    display flex
    justify-content space-between
    width 100%

@media (min-width 1024px)
  .landing
    padding 161px 14px 88px 14px
    &__readr-logo
      position fixed
      top 40px
      left 40px
      width 60px
      cursor pointer
    &__share
      position fixed
      top 40px
      right 40px
      width 40px
      cursor pointer
    &__credits
      margin 63px 0 0 0
    &__arrow-wrapper
      display none
    &__intro
      max-width 560px
      margin 23px 0 0 0
      p
        font-size 20px
    &__navs
      max-width 450px
      margin 60px 0 0 0
</style>