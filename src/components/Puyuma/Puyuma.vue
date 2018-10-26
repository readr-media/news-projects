<template>
  <section id="puyuma" class="puyuma">
    <transition name="fade" mode="out-in">
      <AppLanding
        v-show="showLanding"
        @click.native="closeLanding"
        @scroll.native="closeLanding"
        @touchmove.native="closeLanding"
      />
    </transition>
    <div class="puyuma__dimmed">
      <div class="puyuma__dimmed-buttons dimmed-buttons">
        <img
          class="dimmed-buttons__logo-img"
          src="/proj-assets/logo_readr_with_text.png"
          alt=""
          @click.stop="linkTo(`https://${READR_DOMAIN_PROD}`)"
          ga-on="click"
          ga-event-category="Logo"
          ga-event-action="clickReadrLogoDimmed"
        >
        <img
          class="dimmed-buttons__share-img"
          src="/proj-assets/puyuma/share-desktop.png"
          alt=""
          @click="share"
          ga-on="click"
          ga-event-category="share"
          ga-event-action="shareToFBDimmed"
        >
      </div>
      <div class="puyuma__dimmed-captions">
        <p>關鍵<span>43</span>分鐘</p>
        <p>圖解對話紀錄</p>
      </div>
    </div>
    <AppHeader
      class="puyuma__header"
      :stationPrev="currentTimeInTimeline.stationPrev || ''"
      :time="currentTimeInTimeline.time || ''"
      :stationNext="currentTimeInTimeline.stationNext || ''"
    />
    <AppConversations
      class="puyuma__conversations"
      :style="{ paddingBottom: `${footerHeight + 10}px` }"
      :timeline="TIMELINE"
      :footerHeight="footerHeight"
      @stepsRefChange="handleTimeline"
    />
    <AppConversationsLegends
      class="puyuma__legends"
      :style="{ bottom: `${footerHeight}px` }"
    />
    <AppFooter
      class="puyuma__footer"
      :status="currentTimeInTimeline.status"
      :mapIndex="mapIndex"
    />
  </section>
</template>

<script>
import { get, findIndex, } from 'lodash'

import AppLanding from './components/AppLanding.vue'
import AppHeader from './components/AppHeader.vue'
import AppConversations from './components/AppConversations.vue'
import AppConversationsLegends from './components/AppConversationsLegends.vue'
import AppFooter from './components/AppFooter.vue'

import { READR_DOMAIN_PROD, } from 'src/constants'
import { TIMELINE, } from './PuyumaTimeline.js'

export default {
  metaInfo () {
    return {
      title: '關鍵 43 分鐘，圖解對話紀錄',
      description: '10 月 21 日下午 4:50，普悠瑪 6432 列車發生出軌翻覆意外，10 月 25 日台鐵調度員與駕駛的通聯記錄曝光，我們將透過地圖與互動方式讓讀者來回顧當天的狀況。',
      metaUrl: 'puyuma',
      metaImage: 'puyuma/ogimage.jpg'
    }
  },
  components: {
    AppLanding,
    AppHeader,
    AppConversations,
    AppConversationsLegends,
    AppFooter
  },
  data () {
    return {
      READR_DOMAIN_PROD,
      TIMELINE,
      footerHeight: 0,
      stepsRef: [],
      // currentIndex: 0,
      currentIndexCache: undefined,
      showLanding: true,
    }
  },
  computed: {
    currentIndex () {
      const index = findIndex(this.stepsRef, [ 'state', 'enter' ])
      if (index !== -1) {
        this.currentIndexCache = index
        return index
      } else {
        return this.currentIndexCache
      }
    },
    currentTimeInTimeline () {
      return get(TIMELINE, this.currentIndex, [])
    },
    mapIndex () {
      return get(this.currentTimeInTimeline, 'stationNext')
    }
  },
  methods: {
    handleTimeline (stepsRef) {
      this.$set(this, 'stepsRef', stepsRef)
    },
    closeLanding () {
      this.showLanding = false
    },
    linkTo (url) {
      window.open(url)
    },
    share () {
      window.open(`https://www.facebook.com/share.php?u=https://${READR_DOMAIN_PROD}${this.$route.fullPath}`)
    }
  },
  mounted () {
    // window.ga('send', 'pageview')
    require('autotrack')
    ga('require', 'cleanUrlTracker')
    ga('require', 'maxScrollTracker')
    ga('require', 'eventTracker')
    ga('require', 'pageVisibilityTracker')
    ga('send', 'pageview')

    this.footerHeight = document.querySelector('.puyuma__footer').offsetHeight
    window.onresize = () => {
      this.footerHeight = document.querySelector('.puyuma__footer').offsetHeight
    }

    window.onscroll = () => {
      if (this.showLanding) {
        this.closeLanding()
      }
    }
  }
}
</script>

<style lang="stylus">
#puyuma
  h1
    margin 0
  p
    margin 0
  ol
    margin 0
    padding 0
    list-style none

.puyuma
  height 100vh
  display flex
  flex-direction column
  &__dimmed
    display none
  &__header
    position fixed
    top 0
    left 0
    z-index 2
  &__legends
    width 100%
    position fixed
    left 0
  &__footer
    position fixed
    bottom 0
    left 0
    z-index 2

.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity 0

@media (min-width 1023px)
  .puyuma
    width 414px
    &__dimmed
      display initial
      position fixed
      top 0
      left 0
      width 100vw
      height 100vh
      background-color rgba(0, 0, 0, 0.85)
      padding 32px 44px
    &__dimmed-buttons
      width 100%
      display flex
      justify-content space-between
      align-items center
    &__dimmed-captions
      position absolute
      padding 32px 44px
      left 0
      bottom 0
      width 100%
      display flex
      justify-content space-between
      align-items center
      p
        color white
        font-size 30px
        font-weight bold
        opacity .3
        span
          font-size 1.5em
          margin 0 5px
          color #d0021b
    &__header
      width 414px !important
      left calc(50vw - 414px / 2)
    &__conversations
      position fixed
      top 0
      left calc(50vw - 414px / 2)
    &__legends
      width 414px !important
      left calc(50vw - 414px / 2)
    &__footer
      width 414px !important
      left calc(50vw - 414px / 2)

  .dimmed-buttons
    &__logo-img
      height 70px
      cursor pointer
    &__share-img
      height 40px
      cursor pointer
</style>

