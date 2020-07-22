<template>
  <div class="eid">
    <TheCover
      v-if="shouldOpenTheCover"
      @changePage="handleChangePageOfTheCover"
    />
    <div class="eid__container">
      <HeaderBar
        v-if="currentPage !== ''"
        :currentPage="currentPage"
        @changePage="setPage"
      />
      <div
        v-if="shouldOpenThePage('interactive')"
        v-show="shouldShowThePage('interactive')"
      >
        <GamePage
          v-show="shouldOpenGamePage"
          @generateResult="handleGenerateResult"
          ref="gamePage"
        />
        <ResultPage
          v-if="hasRendered.result || !shouldOpenGamePage"
          v-show="hasRendered.result && !shouldOpenGamePage"
          :result="gameResult"
          :profileId="profileId"
          @gotoReport="setPage"
          @replayGame="gotoGame"
        />
      </div>
      <ReportPage
        v-if="shouldOpenThePage('report')"
        v-show="shouldShowThePage('report')"
      />
    </div>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import TheCover from './components/TheCover.vue'
import GamePage from './components/GamePage.vue'
import ResultPage from './components/ResultPage.vue'
import ReportPage from './components/ReportPage.vue'

import gameResults from './data/game-results.js'

export default {
  name: 'Eid',
  metaInfo () {
    const year = this.$route.params.params
    const metaUrl = `eid${year ? `/${year}` : ''}`
    const metaImage = `eid/og/${year || 'default'}.png`
    let title = '智慧政府還是全面監控？數位身分證一篇就懂！'
    const description = year ?
      '臺灣人的身分證已經歷經 6 次轉變，來看看你自製欄位的身分證，最符合哪個年代的版本？這張獨特的身分證將在報導中帶給你更多體驗！'
      : '身分證要改版了！紙卡身分證即將「數位化」，你知道它的功能有哪些嗎？為什麼有人反對？READr 透過採訪與線上投票數據，解析數位身分證雙方的爭議點；並透過情境模擬讓你體驗數位時代下隱私暴露的風險。'

    switch (year) {
      case '36':
        title = `我的選擇最接近民國${year}年發行的第一代身分證！你的結果呢？`
        break
      case '43':
        title = `我的選擇最接近民國${year}年發行的第二代身分證！你的結果呢？`
        break
      case '54':
        title = `我的選擇最接近民國${year}年發行的第三代身分證！你的結果呢？`
        break
      case '65':
        title = `我的選擇最接近民國${year}年發行的第四代身分證！你的結果呢？`
        break
      case '75':
        title = `我的選擇最接近民國${year}年發行的第五代身分證！你的結果呢？`
        break
      case '94':
        title = `我的選擇最接近民國${year}年發行的第六代身分證！你的結果呢？`
        break
    }

    return {
      title,
      description,
      metaUrl,
      metaImage
    }
  },
  components: {
    HeaderBar,
    TheCover,
    GamePage,
    ResultPage,
    ReportPage
  },
  data () {
    return {
      currentPage: '',
      shouldOpenTheCover: true,
      shouldOpenGamePage: true,
      hasRendered: { interactive: false, report: false, result: false },
      gameResult: {},
      profileId: 1
    }
  },
  methods: {
    handleChangePageOfTheCover (page) {
      this.shouldOpenTheCover = false
      this.setPage(page)
    },
    setPage (page) {
      if (this.currentPage === page) {
        return
      }
      this.currentPage = page

      if (!this.hasRendered[page]) {
        this.hasRendered[page] = true
      }

      this.backToTop()
    },
    backToTop () {
      document.documentElement.scrollTop = 0
    },
    shouldOpenThePage (page) {
      return this.hasRendered[page] || this.currentPage === page
    },
    shouldShowThePage (page) {
      return this.hasRendered[page] && this.currentPage === page
    },
    gotoResult () {
      if (!this.hasRendered.result) {
        this.hasRendered.result = true
      }

      this.shouldOpenGamePage = false
      this.backToTop()
    },
    gotoGame () {
      this.shouldOpenGamePage = true
      this.$refs.gamePage.refreshFields()
      this.backToTop()
    },
    handleGenerateResult ([resultIdx, profileIdx]) {
      this.gameResult = gameResults[resultIdx]
      this.profileId = profileIdx + 1

      this.gotoResult()
    }
  }
}
</script>

<style lang="stylus">
@import '../../util/reset.css'
@import './variables.styl'

$ff-sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-family $ff-sans-serif
.eid
  &__container
    padding-top 60px
    @media (min-width $breakpoint-md)
      padding-top 76px

.btn-wrapper-bottom
  position relative
  z-index 1
  background-color #eae7e0
  padding 35px 30px 38px 30px
  @media (min-width $breakpoint-md)
    display flex
    justify-content center
    align-items flex-start
    padding 58px 0 64px 0

picture
  display block
button,
a
  font-family $ff-sans-serif
  cursor pointer
  user-select none
  &.normal, &::after
    display block
    border-radius 6px
    width 100%
  &.normal
    text-decoration none
    background-color #fbc11a
    font-size 15px
    line-height 1.46
    text-align center
    letter-spacing 2.5px
    color rgba(0, 0, 0, 0.87)
    padding 12px 12px 8px 12px
    border none
    font-weight 700
    position relative
    transition background-color 0.15s
    @media (min-width $breakpoint-md)
      max-width 200px
    &:hover
      background-color #ffbd00
    &:active
      background-color rgba(251, 193, 26, 0.5)
      &::after
        background-color #b4840b
    &::after
      content ''
      position absolute
      background-color #e0a50e
      height 100%
      top 0
      left 0
      transform translateY(4px)
      z-index -1
      @media (min-width $breakpoint-md)
        transform translateY(6px)
    &--two
      @media (min-width $breakpoint-md)
        &:first-child
          order: 2
        &:last-child
          order: 1
      &:last-child
        margin-top 12px
        @media (min-width $breakpoint-md)
          margin-top 0
          margin-right 60px
    &--three
      + button.normal--three
        margin-top 12px
        @media (min-width $breakpoint-md)
          margin-top 0
          margin-left 60px
    &.emphasize
      background-color #5f6c11
      color #fff
      &::after
        background-color #3d450b
      &:hover
        background-color #687900
      &:active
        background-color rgba(95, 108, 17, 0.5)
        
a:focus
  outline none
h1
  font-weight 900
  font-size 28px
  line-height 1.46
  text-align center
  letter-spacing 0.15em
  margin-bottom 30px
  @media (min-width $breakpoint-md)
    font-size 36px
h2
  &.sub
    font-weight 900
    font-size 21px
    line-height 1.9
    letter-spacing 2.5px
    color rgba(0, 0, 0, 0.87)
    @media (min-width $breakpoint-md)
      font-size 25px
      line-height 1.8
    &--profile
      margin-bottom 18px
.intro
  letter-spacing 2.5px
  color rgba(#000, 0.9)
  font-size 15px
  line-height 2
  @media (min-width $breakpoint-md)
    font-size 18px
  p + p
    margin-top 2em
</style>
