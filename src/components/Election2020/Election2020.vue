<template>
  <section
    id="election-2020"
    class="election-2020"
  >
    <Header />
    <LatestNews @update="updateLatestNews" />
    <section class="section">
      <h1>2020 總統大選<br>即時看</h1>
      <p>您想透過優雅的方式參與這場盛事嗎？只需要一雙雪亮的眼睛，就能和 READr 一起追蹤 2020 總統大選的最新消息，這裡有網友幫你嘴、圖表輕鬆看，還有最新選情一目了然。</p>
      <h2>下屆總統會是誰</h2>
      <Countdown />
    </section>
    <section class="section">
      <h2>立委激戰搶席次</h2>
      <Countdown />
    </section>
    只是測試用：
    <SeatTotal
      :count="79"
    />
    <lazy-component class="section credits">
      <TheCredits />
    </lazy-component>
    <lazy-component class="section subscr">
      <SubscriptionWithLogoMsg />
    </lazy-component>
    <FirebaseCreateUpdate />
    <FirebaseRead />
  </section>
</template>

<script>
import storeModule from 'src/store/modules/Election2020'
import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapMutations } = createNamespacedHelpers('Election2020')
import Countdown from './components/Countdown.vue'
import FirebaseRead from './templates/FirebaseRead.vue'
import FirebaseCreateUpdate from './templates/FirebaseCreateUpdate.vue'
import Header from './components/Header.vue'
import SeatTotal from './components/SeatTotal.vue'

const fetchLatestNews = store => store.dispatch('Election2020/FETCH_GOOGLE_SHEET', {
  params: {
    spreadsheetId: '1p9GfrjPdcXbkq8aRIYTk3IFB7gmIR1lO2rLrxagp8do',
    range: '記者填寫區!A3:G',
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
    Countdown,
    FirebaseCreateUpdate,
    FirebaseRead,
    Header,
    LatestNews: () => import('./components/LatestNews.vue'),
    TheCredits: () => import('./components/TheCredits.vue'),
    SubscriptionWithLogoMsg: () => import('src/components/SubscriptionWithLogoMsg.vue'),
    SeatTotal
  },
  beforeMount () {
    this.registerStoreModule(true)
  },
  destroyed() {
    this.$store.unregisterModule('Election2020')
  },
  methods: {
    registerStoreModule (shouldPreserveState = false) {
      this.$store.registerModule('Election2020', storeModule, { preserveState: shouldPreserveState })
    },
    updateLatestNews () {
      fetchLatestNews(this.$store)
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './styles/common.styl'

$content-width-mobile = 90%
$content-width-tablet = 60%

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
      {$margin-center}
      line-height 1.87
      text-align justify
      & + h2
        margin-top 98px
    h2
      & + div
        margin-top 10px
  .subscr
    width $content-width-mobile
    {$margin-center}
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
    .subscr
      width $content-width-tablet

// @media (min-width: 1024px)

@media (min-width: 1440px)
  .election-2020
    h1
      br
        display none
</style>
