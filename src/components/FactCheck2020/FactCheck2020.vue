<template>
  <div class="fact-check">
    <section class="section landing">
      <div class="landing__title">
        <h1><span class="small">2020 總統候選人</span><br>事實查核計畫</h1>
        <h3>2020 總統大選在即，總統候選人在公開的發言中，<br>有幾分真？幾分假？我們一起來看看！</h3>
      </div>
      <div class="landing__image">
        <picture>
          <source media="(min-width: 768px)" srcset="/proj-assets/fact-check/landing_desktop.webp" type="image/webp"/>
          <source media="(min-width: 768px)" srcset="/proj-assets/fact-check/landing_desktop.png" />
          <source srcset="/proj-assets/fact-check/landing_mobile.webp" type="image/webp">
          <img src="/proj-assets/fact-check/landing_mobile.png" alt="2020 總統候選人事實查核計畫">
        </picture>
      </div>
    </section>
    <section class="section process">
      <h2>本專案透過四個步驟進行</h2>
      <div class="process__steps">
        <StepBlock
          class="process__step hidden-effect"
          contentText="將候選人的發言影片轉換成逐字稿"
          imgSrc="/proj-assets/fact-check/step-01.png"
          indexText="步驟一"
          :link="getTypeLink()"
          :linkText="untypedTranscriptList.length > 0 ? '我要打逐字稿' : '目前無逐字稿需謄打'"
          :progress="progress[1]"
          @click="clickTypeLinkBtn"
        />
        <StepBlock
          class="process__step hidden-effect"
          contentText="驗證逐字稿是否正確"
          imgSrc="/proj-assets/fact-check/step-02.png"
          indexText="步驟二"
          :disabled="untypedTranscriptList.length < 1"
          :link="getVerifyLink()"
          :linkText="unverifiedTranscriptList.length > 0 ? '我要驗證逐字稿' : '目前無逐字稿需驗證'"
          :progress="progress[2]"
          @click="clickVerifyLinkBtn"
        />
        <StepBlock
          :progress="progress[3]"
          class="process__step hidden-effect"
          contentText="針對逐字稿內容進行標籤其屬性"
          imgSrc="/proj-assets/fact-check/step-03.png"
          indexText="步驟三"
        />
        <StepBlock
          :progress="progress[4]"
          class="process__step hidden-effect"
          contentText="各家媒體針對需驗證的項目進行查證"
          imgSrc="/proj-assets/fact-check/step-04.png"
          indexText="步驟四"
        >
          <template v-slot:additionalText>
            <p class="small" >
              合作媒體（按筆畫排序）： iThome、READr、Right Plus 多多益善研究站、上下游News&Market、公視P# 新聞實驗室、未來城市＠天下、沃草、華視、環境資訊中心、鏡週刊、關鍵評論網<br>協作單位：公視新聞、中央社新聞學院、新興科技媒體中心
            </p>
          </template>
        </StepBlock>
      </div>
      <p>媒體查證結果將隨計畫同步進度更新至選舉結束。 
        <a
          href="https://beta.hackfoldr.org/2020electionfactcheck/"
          target="_blank"
          @click="sendGaClickEvent('點擊「點我看計畫緣起」')"
        >
          點我看計畫緣起
        </a>
      </p>
    </section>
    <lazy-component class="section subscr">
      <h2>留下你的 E-mail</h2>
      <div class="subscr-container">
        <p>有更新資料與最新報導出爐時，第一時間通知你！</p>
        <Subscription />
      </div>
    </lazy-component>
    <lazy-component class="section statistics narrow-width hidden-effect">
      <h2>最新查核狀況</h2>
      <DisinformationStatistics
        v-for="(data, index) in statistics"
        :key="data.candidate"
        :data="data"
        :index="index"
      />
    </lazy-component>
    <lazy-component class="section narrow-width">
      <h2>候選人談話資料庫</h2>
      <DisinformationData
        :switchLoading="switchLoading"
        @updateDataList="updateDataList"
      />
    </lazy-component>
    <lazy-component class="section cooperation narrow-width">
      <h2>功德牆</h2>
      <template v-if="netizenList.length > 0">
        <h3>赴湯蹈火鄉民</h3>
        <div class="cooperation__list">
          <p
            v-for="(name, index) in netizenList"
            :key="`netizen-${index}`"
            v-text="name"
          />
        </div>
      </template>
      <template v-if="volunteerList.length > 0">
        <h3>雪中送炭志工</h3>
        <div class="cooperation__list">
          <p
            v-for="(name, index) in volunteerList"
            :key="`volunteer-${index}`"
            v-text="name"
          />
        </div>
      </template>
      <h3>事實查核媒體</h3>
      <div class="cooperation__list media">
        <picture>
          <img src="/proj-assets/fact-check/logo/ithome.png" style="transform: scale(2);" alt="iThome">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/readr.svg" style="transform: scale(0.8);" alt="READr">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/right-plus.svg" alt="Right Plus 多多益善研究站">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/newsmarket.png" alt="上下游News&Market">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/newslab.svg" style="transform: scale(1.4);" alt="公視 P# 新聞實驗室">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/futurecity.png" alt="未來城市＠天下">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/watchout.png" alt="沃草">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/cts.png" style="transform: scale(0.9);" alt="華視">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/e-info.png" style="transform: scale(1.3);" alt="環境資訊中心">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/mirrormedia.svg" style="transform: scale(0.8);" alt="鏡週刊">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/thenewslens-v2.png" alt="關鍵評論網">
        </picture>
      </div>
      <h3>查核協作單位</h3>
      <div class="cooperation__list media center">
        <picture>
          <img src="/proj-assets/fact-check/logo/pts.png" alt="公視新聞">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/cna.png" style="transform: scale(0.9);" alt="中央社新聞學院">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/smctw.svg" style="transform: scale(1.5);" alt="新興科技媒體中心">
        </picture>
      </div>
    </lazy-component>
    <section class="section credit">
      <div class="credit-container">
        <p>文字：李又如</p>
        <p>工程：Tin Chen & HY Tan</p>
        <p>設計：Weiwei Hsu</p>
        <p>資料整理：李昭妟</p>
        <p>監製：簡信昌</p>
      </div>
    </section>
    <div
      v-show="showFixedInfo && untypedTranscriptList.length > 0"
      class="info-fixed"
    >
      <a :href="getTypeLink()" target="_blank" @click="sendGaClickEvent('點擊「我願意盡一份力！ 點我開始編打逐字稿」')"><span>我願意盡一份力！</span>點我開始編打逐字稿</a>
      <button @click="showFixedInfo = false"><img src="/proj-assets/fact-check/close.png" alt="關閉"></button>
    </div>
  </div>
</template>
<script>
import DisinformationData from './components/DisinformationData.vue'
import DisinformationStatistics from './components/DisinformationStatistics.vue'
import StepBlock from './components/StepBlock.vue'
import Subscription from 'src/components/Subscription.vue'
import { READR_SITE_URL } from '../../constants'
import { get, throttle, union, uniq } from 'lodash'

import storeModule from '../../store/modules/FactCheck'

const fetchGoogleSheet = (store, { stateName, spreadsheetId, range, majorDimension = 'ROWS', isLoadMore, useRedis = true }) => store
  .dispatch('FactCheck/FETCH_GOOGLE_SHEET', {
    name: stateName,
    params: {
      spreadsheetId,
      range,
      majorDimension
    },
    isLoadMore,
    useRedis
  })

const fetchTranscriptData = store => fetchGoogleSheet(store, {
  stateName: 'transcript',
  spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
  range: '1.貼上影片與秒數!E:Q',
  useRedis: false
})

const fetchVolunteerList = store => Promise.all([
  fetchGoogleSheet(store, {
    stateName: 'typeNetizen',
    spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
    range: '顯示在網站的志工名單!A:A'
  }),
  fetchGoogleSheet(store, {
    stateName: 'verifyNetizen',
    spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
    range: '顯示在網站的志工名單!B:B'
  }),
  fetchGoogleSheet(store, {
    stateName: 'volunteer',
    spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
    range: '顯示在網站的志工名單!C:C'
  })
])

const fetchProgressData = store => fetchGoogleSheet(store, {
  stateName: 'progress',
  spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
  range: 'Dashboard!E:E'
})

const fetchStatisticsData = store => fetchGoogleSheet(store, {
  stateName: 'statistics',
  spreadsheetId: '1YR6C5hTKxCguXH9txtajEcbOW7YNMiMFZTC3M3guuf8',
  range: '排行榜!B2:C18',
  majorDimension: 'COLUMNS'
})

const fetchVerifiedData = (store, { sheet = '全部資料', page = 1, isLoadMore = false } = {}) =>{
  const MAX_RESULT = 5
  return Promise.all([
    fetchGoogleSheet(store, {
      stateName: 'verifiedDataItems',
      spreadsheetId: '1YR6C5hTKxCguXH9txtajEcbOW7YNMiMFZTC3M3guuf8',
      range: `${sheet}!A${(page - 1) * MAX_RESULT + 2}:Q${page * MAX_RESULT + 1}`,
      isLoadMore
    }),
    fetchGoogleSheet(store, {
      stateName: 'verifiedDataCount',
      spreadsheetId: '1YR6C5hTKxCguXH9txtajEcbOW7YNMiMFZTC3M3guuf8',
      range: `${sheet}!K1:K1`
    })
  ])
}

export default {
  name: 'FactCheck',
  components: {
    DisinformationData,
    DisinformationStatistics,
    StepBlock,
    Subscription
  },
  metaInfo() {
    return {
      title: '2020 總統候選人之事實查核計畫',
      description: '2020 總統大選在即，總統候選人在公開的發言中，有幾分真？幾分假？我們一起來看看！',
      metaUrl: 'fact-check-2020',
      metaImage: 'fact-check/og-v3.jpg',
    }
  },
  data () {
    return {
      READR_SITE_URL,
      current: 0,
      maxReadingDepth: 0,
      switchLoading: false,
      showFixedInfo: false,
      typeLinkClicked: '',
      verifyLinkClicked: '',
      verifyLinkClickedIndex: undefined
    }
  },
  computed: {
    netizenList () {
      const typeNetizen = uniq((get(this.$store, 'state.FactCheck.googleSheet.typeNetizen') || [])
        .map(item => item[0]).slice(2).filter(item => typeof item === 'string'))
      const verifyNetizen = uniq((get(this.$store, 'state.FactCheck.googleSheet.verifyNetizen') || [])
        .map(item => item[0]).slice(2).filter(item => typeof item === 'string'))
      return union(typeNetizen, verifyNetizen)
        .map(item => item.trim())
        .filter(item => item)
        .sort()
    },
    page () {
      return this.$store.state.FactCheck.page
    },
    progress () {
      const data = get(this.$store, 'state.FactCheck.googleSheet.progress') || []
      return data.map(item => item[0]).filter(item => typeof item === 'string')
    },
    statistics () {
      return get(this.$store, 'getters.FactCheck/statisticsFormated') || []
    },
    transcriptData () {
      return get(this.$store, 'state.FactCheck.googleSheet.transcript') || []
    },
    untypedTranscriptList () {
      return this.transcriptData
        .filter(item => item[0] && item[1] && item[8] !== this.typeLinkClicked && item[9] < 1)
        .sort((a, b) => a[9] - b[9])
        .map(item => item[8])
    },
    unverifiedTranscriptList () {
      return this.transcriptData
        .filter(item => Array.isArray(item) && typeof item[12] === 'string')
        .filter(item => item[12].match(/docs.google.com/) && item[12] !== this.verifyLinkClicked)
        .map(item => item[12])
    },
    volunteerList () {
      return uniq((get(this.$store, 'state.FactCheck.googleSheet.volunteer') || [])
        .map(item => item[0]).slice(2).filter(item => typeof item === 'string'))
    }
  },
  serverPrefetch () {
    this.registerStoreModule()
    return Promise.resolve()
  },
  beforeMount () {
    this.registerStoreModule(true)
    fetchTranscriptData(this.$store)
      .then(() => this.detectToRedirect())
    
    fetchVolunteerList(this.$store)
    fetchProgressData(this.$store)
    fetchStatisticsData(this.$store)
    this.$store.commit('FactCheck/SET_LOADING_STATUS', { status: true })
    fetchVerifiedData(this.$store)
      .then(() => this.$store.commit('FactCheck/SET_LOADING_STATUS', { status: false }))
  },
  mounted () {
    this.detectHiddenEle()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScrollForHiddenEffect)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScrollForHiddenEffect)
    this.$store.unregisterModule('FactCheck')
  },
  watch: {
    current (value) {
      const gaScrollLabel = {
        1: '讀到「本專案透過四個步驟進行」',
        2: '讀到「留下你的 E-mail」',
        3: '讀到「目前最新查核狀況」',
        4: '讀到「候選人談話資料庫」',
        5: '讀到「功德牆」',
        6: '讀到 credit '
      }
      if (value > 0 && !this.showFixedInfo) {
        this.showFixedInfo = true
      }
      if (value > this.maxReadingDepth && window.ga) {
        this.maxReadingDepth = value
        gaScrollLabel[value] && window.ga('send', 'event', 'projects', 'scroll', gaScrollLabel[value], { nonInteraction: false })
      }
    }
  },
  methods: {
    clickTypeLinkBtn (e) {
      this.typeLinkClicked = e.target.href
      fetchTranscriptData(this.$store)
      this.sendGaClickEvent('點擊「我要打逐字稿」')
    },
    clickVerifyLinkBtn (e) {
      this.verifyLinkClicked = this.unverifiedTranscriptList[this.verifyLinkClickedIndex]
      fetchTranscriptData(this.$store)
      this.sendGaClickEvent('點擊「我要驗證逐字稿」')
    },
    detectCurrent () {
      const sections = [ ...document.querySelectorAll('.section') ]
      sections.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        if (rect.top <= viewportHeight && rect.bottom >= viewportHeight) {
          return this.current = index
        }
      })
    },
    detectHiddenEle () {
      const eles = [ ...document.querySelectorAll('.hidden-effect:not(.active)') ]
      if (eles.length < 1) {
        window.removeEventListener('scroll', this.handleScrollForHiddenEffect)
      }
      eles.forEach(item => {
        const rect = item.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        if (rect.top <= viewportHeight * 2/3 || rect.bottom <= viewportHeight ) {
          item.classList.add('active')
        }
      })
    },
    detectToRedirect () {
      const params = this.$route.params.params
      const isTypeUrl = params === 'transcript-type'
      const isVerifyUrl = params === 'transcript-verify'
      const canGoToTypePage = this.untypedTranscriptList.length > 0
      const canGoToVerifyPage = this.unverifiedTranscriptList.length > 0
      if (isTypeUrl && canGoToTypePage) {
        window.location.replace(this.getTypeLink())
      } else if (isTypeUrl && canGoToVerifyPage) {
        window.location.replace(this.getVerifyLink())
      } else if (isVerifyUrl && canGoToVerifyPage) {
        window.location.replace(this.getVerifyLink())
      } else if (isVerifyUrl && canGoToTypePage) {
        window.location.replace(this.getTypeLink())
      }
    },
    getTypeLink () {
      const random = Math.floor(Math.random() * this.untypedTranscriptList.length)
      return this.untypedTranscriptList[random]
    },
    getVerifyLink () {
      const random = Math.floor(Math.random() * this.unverifiedTranscriptList.length)
      this.verifyLinkClickedIndex = random
      return this.unverifiedTranscriptList[random]
    },
    handleScroll: throttle(function () {
      this.detectCurrent()
    }, 300),
    handleScrollForHiddenEffect: throttle(function () {
      this.detectHiddenEle()
    }, 300),
    registerStoreModule (shouldPreserveState = false) {
      this.$store.registerModule('FactCheck', storeModule, { preserveState: shouldPreserveState })
    },
    sendGaClickEvent (label) {
      window.ga && window.ga('send', 'event', 'projects', 'click', label, { nonInteraction: false })
    },
    updateDataList ({ authenticity = '', candidate = '', isLoadMore = false, page }) {
      const candidateSheetName = candidate ?  candidate : '全部'
      const authenticitySheetName = authenticity ? authenticity : '全部資料'
      let sheetName = '全部資料'
      if (authenticity || candidate) {
        sheetName = `${candidateSheetName}${authenticitySheetName}`
      }
      this.$store.commit('FactCheck/SET_LOADING_STATUS', { status: true })
      if (isLoadMore) {
        this.$store.commit('FactCheck/SET_PAGE', this.page + 1)
      } else if (page) {
        this.$store.commit('FactCheck/SET_PAGE', Number(page))
      } else {
        this.switchLoading = true
        this.$store.commit('FactCheck/SET_PAGE', 1)
      }
      fetchVerifiedData(this.$store, { sheet: sheetName , page: this.page, isLoadMore })
        .then(() => {
          this.$store.commit('FactCheck/SET_LOADING_STATUS', { status: false })
          this.switchLoading = false
        })
    }
  }
}
</script>
<style lang="stylus">
.fact-check
  color #fff
  background-color #07172e
  h1, h2, h3, h4, p
    margin 0
  h1
    font-size 2.625rem
    font-weight 600
    text-align center
  h2
    font-size 1.625rem
    font-weight 500
    text-align center
  h3
    font-size 1.25rem
    font-weight normal
  p
    font-size 1rem
    &.small
      font-size .875rem
    > a
      color #e56300
  a
    color #fff
    text-decoration none
  button
    background-color transparent
    border none
    cursor pointer
  .landing
    position relative
    display flex
    flex-direction column
    min-height 100vh
    padding 0 !important
    text-align center
    overflow hidden
    &__title
      position absolute
      top 45%
      left 50%
      transform translate(-50%, -100%)
      width 255px
      z-index 1
      h1
        margin 0 auto
        color #e56300
        line-height 1.3
        span.small
          font-size 2rem
      h3
        max-width 252px
        margin 20px auto 0
        font-size 1.125rem
        line-height 1.7
        text-align justify
        br
          display none
    &__image
      position absolute
      left 0
      bottom 0
      width 100%
      img, picture
        width 100%
      picture
        display block

  .section
    padding 20px 0 75px
  .process
    padding-top 40px
    > p
      max-width 95%
      margin 20px auto 0
      text-align center
      line-height 1.3
    &__step
      width 95%
      margin 20px auto 0
      &:last-child
        img
          transform translateX(10px)
  
  .subscr
    padding 20px 2.5% 20px
    margin-bottom 55px
    > *
      & + *
        margin-top 20px
    &-container
      padding 1em
      background-color rgba(255, 255, 255, .1)
      border-radius 4px
      > p
        line-height 1.45 
      .subscription-wrapper
        margin-top 20px
        .info.success
          font-size 1rem
      .subscription__btn
        background-color #e56300
  
  .statistics
    .statistics-data.first
      margin-top 20px
  
  .d-data
    margin-top 20px

  .cooperation
    h3
      margin-top 2em
      text-align center
    &__list
      margin-top 1em
      width calc(90% + 1em)
      p
        display inline-block
        margin .2em .5em
        word-break break-all
        word-wrap break-word
      picture
        position relative
        display inline-block
        width calc(50% - 1em)
        margin .2em .5em
        padding-top calc((50% - 1em) * 0.5625)
        overflow hidden
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          object-position center center
          object-fit contain

  .info-fixed
    display flex
    justify-content center
    align-content center
    position fixed
    left 0
    bottom 0
    z-index 999
    width 100%
    height 55px
    background-color #e56300
    a
      display flex
      align-items center
      padding 0 1em
      font-size 1.25rem
      span
        display none
    button
      position absolute
      top 50%
      right 10px
      transform translateY(-50%)
      padding 10px
      font-size 0
      img
        width 15px
        height 15px
  .credit
    text-align center
    background-color #010a2b
    p
      font-size .875rem
      & + p
        margin-top .5em
  
  .narrow-width
    > *
      width 90%
      margin-left auto
      margin-right auto

  .hidden-effect
    opacity 0
    transition opacity .9s
    &.active
      opacity 1

@media (max-width: 767px)
  .fact-check
    .landing
      h3
        br
          display none

@media (min-width: 768px)
  .fact-check
    .landing
      &__title
        top 45%
        width 60%
        transform translate(-50%, -50%)
        h1
          font-size 4.625rem
          span.small
            font-size 3rem
        h3
          max-width 440px
          margin-top 30px
          font-size 1.625rem
          text-align center
    .process
      > p
        max-width 60%
      h2
        margin-bottom 80px
      &__steps
        display flex
        flex-wrap wrap
        align-items flex-start
        width 95%
        max-width 1140px
        margin 0 auto
      &__step
        width calc(50% - 20px)
        margin: 20px 10px 0
    
    .subscr
      padding 20px 0
      background-color rgba(255,255,255,0.1)
      &-container
        width 60%
        margin 20px auto 0
        padding 0
        background-color transparent
        > p
          text-align center
    .statistics
      > *
        width 60%
    
    .d-data
      width 60%

    .cooperation
      > *
        width 60%
        max-width 1140px
      &__list
        width calc(60% + 1em)
        max-width calc(1140px + 1em)
        picture
          width calc(33% - 1em)
          max-width 200px
          padding-top calc((33% - 1em) * 0.5625)
        &.media
          display flex
          flex-wrap wrap
          justify-content center
    .info-fixed
      a
        span
          display inline
      button
        img
          width 20px
          height 20px

@media (min-width: 768px) and (orientation : portrait)
  .fact-check
    .landing
      justify-content center
      h1
        margin-top 0

@media (min-width: 900px)
  .fact-check
    .landing
      &__title
        top calc(10% + 50px)
        transform translateX(-50%)
        width 700px
        h1
          font-size 3rem
          span.small
            font-size 3rem
          br
            display none
        h3
          max-width 700px
          font-size 1.25rem
          br
            display inline
@media (min-width: 1024px)
  .fact-check
    h1
      font-size 3rem
    h3
      font-size 1.25rem
        
    .process
      display flex
      flex-direction column
      justify-content center
      padding 60px 0 75px
      h2
        margin-bottom 40px
      &__step
        &:last-child
          img
            transform translateX(15px)
    .statistics
      display flex
      justify-content center
      flex-wrap wrap
      padding-left 2.5%
      padding-right 2.5%
      > h2
        width 100%
      > div
        flex 1
        max-width 340px
        margin-left 10px
        margin-right 10px
      .statistics-data
        margin-top 20px
    
    .d-data
      width 95%
      max-width 1140px

    .cooperation
      &__list
        width calc((200px + 1em) * 3)
        picture
          width 200px
          padding-top calc(200px * 0.5625)
          margin: .5em .5em
    .credit
      &-container
        width calc((200px + 1em) * 3)
        margin 0 auto
        p
          display inline-block
          & + p
            margin 0 0 0 1em

</style>
