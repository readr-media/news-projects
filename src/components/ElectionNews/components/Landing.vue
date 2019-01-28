<template>
  <section class="landing">
    <img
      v-show="showAside"
      class="landing__readr-logo"
      src="/proj-assets/logo_readr_with_text.png"
      alt=""
      @click="newTab('https://www.readr.tw')"
      ga-on="click"
      ga-event-category="projects"
      ga-event-action="click"
      ga-event-label="back to home"
    >
    <!-- <img
      v-show="showAside"
      class="landing__share"
      src="/proj-assets/election-news/img/share.png"
      alt=""
      @click="newTab('https://www.facebook.com/share.php?u=https://www.readr.tw/project/election-news')"
    > -->
    <Share
      class="landing__share"
      :shareUrl="'https://www.readr.tw/project/election-news'"
      direction="down"
    />
    <LandingTitles/>
    <Credits class="landing__credits"/>
    <div class="landing__arrow-wrapper">
      <div class="landing__arrow" @click="scroll"></div>
    </div>
    <div class="landing__intro">
      <p>媒體在報導不同的政治人物時會有情緒差異嗎？針對同一位候選人，媒體報導的情緒在選舉前後會不會有所轉變？我們借助 Google 人工智慧來嘗試解答這些問題，並將持續追蹤至 2020 年。</p>
    </div>
    <div class="landing__navs navs">
      <Button
        class="navs__nav"
        @click.native="navigate({ param: defaultParams })"
        ga-on="click"
        ga-event-category="projects"
        ga-event-action="click"
        ga-event-label="sigle keyword button"
      >
        看關鍵字風向
      </Button>
      <Button
        class="navs__nav"
        @click.native="navigate({ param: defaultParams, subparam: defaultSubparams})"
        ga-on="click"
        ga-event-category="projects"
        ga-event-action="click"
        ga-event-label="PK button"
      >
        多關鍵字 PK
      </Button>
    </div>
    <div class="landing__navs-insight navs-insight">
      <div class="navs-insight__nav" @click="newTab('https://www.readr.tw')">使用說明書</div>
      <div class="navs-insight__nav" @click="newTab('https://www.readr.tw')">我們發現了什麼</div>
    </div>
  </section>
</template>

<script>
import { debounce } from 'lodash'

import LandingTitles from './LandingTitles.vue'
import Credits from './Credits.vue'
import Button from './Button.vue'
import Share from 'src/components/Share.vue'

import { mapState as mapStateRoot } from 'vuex'

const debug = require('debug')('ELECTION-NEWS:CLIENT:Landing.vue')

export default {
  components: {
    LandingTitles,
    Credits,
    Button,
    Share
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
    top 20px !important
    right 20px !important
    // width 30px
    cursor pointer
    & >>> .toggle
      background-image url(/proj-assets/election-news/img/share.png) !important
      background-size 30px auto !important
      background-position center center !important
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

.navs-insight
  width 100%
  margin 30px 0 0 0
  &__nav
    width 100%
    height 30px
    display flex
    justify-content center
    align-items center
    background-color #eae9eb
    font-size 14px
    font-weight 800
    cursor pointer
    & + &
      margin 10px 0 0 0

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
      top 40px !important
      right 40px !important
      // width 40px
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
      max-width 560px
      margin 60px 0 0 0

  .navs-insight
    width 560px
</style>