<template>
  <section
    id="election-2020"
    class="election-2020"
  >
    <Header />
    <LatestNews @update="updateLatestNews" />
    <section class="section">
      <h1 id="js-title">2020 總統大選<br>即時看</h1>
      <p>您想透過優雅的方式參與這場盛事嗎？只需要一雙雪亮的眼睛，就能和 READr 一起追蹤 2020 總統大選的最新消息，這裡有網友幫你嘴、圖表輕鬆看，還有最新選情一目了然。</p>
      <h2>下屆總統會是誰</h2>
      <Countdown />
      <PresidentCount class="president-count"/>
      <PresidentCountChart class="president-count-chart" />
    </section>
    <section class="section">
      <h2>立委激戰搶席次</h2>
      <Countdown
        :updateTime="updateTimeLegislator"
      />
      <LegislatorDistrict />
      <LegislatorParty />
    </section>
    <section class="section">
      <h2>賓果預測大贏家</h2>
      <BingoSection/>
    </section>
    <lazy-component class="credits">
      <TheCredits />
    </lazy-component>
    <lazy-component class="donate">
      <TheDonateFooter />
    </lazy-component>
    <lazy-component class="section subscr">
      <SubscriptionWithLogoMsg />
    </lazy-component>
    <section class="section comment">
      <div
        class="fb-comments"
        data-href="https://www.readr.tw/project/election-2020"
        data-width="100%"
        data-numposts="5"
      />
    </section>
  </section>
</template>

<script>
import storeModule from 'src/store/modules/Election2020'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('Election2020')
import Countdown from './components/Countdown.vue'
import Header from './components/Header.vue'
import PresidentCount from './components/president/PresidentCount.vue'
import LegislatorDistrict from './components/legislator/LegislatorDistrict.vue'
import LegislatorParty from './components/legislator/LegislatorParty.vue'
import BingoSection from './components/bingo/BingoSection.vue'

const fetchLatestNews = store => store.dispatch('Election2020/FETCH_GOOGLE_SHEET', {
  params: {
    spreadsheetId: '1p9GfrjPdcXbkq8aRIYTk3IFB7gmIR1lO2rLrxagp8do',
    range: '記者填寫區!A4:G',
    redisTimeout: 300
  }
})

export default {
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'election2020',
      metaImage: 'election2020/ogimage.png'
    }
  },
  serverPrefetch () {
    this.registerStoreModule()
    
    return Promise.all([
      fetchLatestNews(this.$store)
    ])
      .catch(err => console.error(err)) // need error handle
  },
  components: {
    BingoSection,
    Countdown,
    Header,
    InfoDetailed: () => import('./components/InfoDetailed.vue'), // for test
    LegislatorDistrict,
    LegislatorParty,
    LatestNews: () => import('./components/LatestNews.vue'),
    PresidentCount,
    PresidentCountChart: () => import('./components/president/PresidentCountChart.vue'),
    TheCredits: () => import('./components/TheCredits.vue'),
    TheDonateFooter: () => import('./components/TheDonateFooter.vue'),
    SubscriptionWithLogoMsg: () => import('src/components/SubscriptionWithLogoMsg.vue')
  },
  created () {
    this.$store.dispatch('realtimePresidents/openDBChannel')
  },
  beforeMount () {
    this.registerStoreModule(true)
    this.$store.dispatch('Election2020/gcs/FETCH_SOURCES')
  },
  mounted() {
    this.INIT_TIMER()
  },
  destroyed() {
    this.$store.unregisterModule('Election2020')
  },
  methods: {
    ...mapActions({
      INIT_TIMER: 'timer/INIT_TIMER'
    }),
    registerStoreModule (shouldPreserveState = false) {
      this.$store.registerModule('Election2020', storeModule, { preserveState: shouldPreserveState })
    },
    updateLatestNews () {
      fetchLatestNews(this.$store)
        .catch(err => console.error(err))
    }
  },
  computed: {
    ...mapState({
      updateTimeLegislator: state => state.updateTime.legislator
    })
  }
}
</script>

<style lang="stylus" scoped>
$content-width-mobile = 90%
$content-width-tablet = 60%
$content-width-tablet-extend = 80%
$content-max-width = 650px

$margin-center =
  margin-left auto
  margin-right auto

.election-2020
  padding 44px 0 0
  h1, h2, p
    margin 0
  h1, h2
    font-family $font-family-serif
  h1, p
    color $color-black-light
  h1
    font-size 2.625rem
    line-height 1.38
    & + *
      margin-top 30px
  h2
    color $color-black
    font-size 1.625rem
    line-height 1.42
  p
    font-size .9375rem
  .section
    padding 50px 0
    text-align center
    > p
      width $content-width-mobile
      max-width $content-max-width
      {$margin-center}
      line-height 1.87
      text-align justify
      & + h2
        margin-top 98px
    h2
      & + div
        margin-top 10px
  
  .president-count-chart
    display none
  .subscr, .comment
    width $content-width-mobile
    {$margin-center}
  .subscr
    max-width $content-max-width
    >>> .subscr-l-m__heading
      p
        color $color-black-lighter

@media (min-width: 768px)
  .election-2020
    h1
      font-size 4.5rem
    h2
      font-size 3rem
    p
      font-size 1rem
    .section
      > p
        width $content-width-tablet
    .president-count, .president-count-chart
      width $content-width-tablet-extend
      max-width 1000px
      max-height 610px
      {$margin-center}
    .subscr, .comment
      width $content-width-tablet

@media (min-width: 1024px)
  .election-2020
    padding-top 70px
    .president-count
      margin-top 60px
      height 170px
      &.counting
        height calc(40vw + 110px)
    .president-count-chart
      display block
      margin-top 66px
@media (min-width: 1440px)
  .election-2020
    h1
      br
        display none
</style>
