<template>
  <div class="fact-check">
    <section class="landing">
      <h1>2020<br>總統候選人之<br>事實查核計畫</h1>
      <div class="landing__image">
        <img class="quote left-top" src="/proj-assets/fact-check/landing_quote.png" alt="">
        <img class="quote left-bottom" src="/proj-assets/fact-check/landing_quote.png" alt="">
        <img class="quote right-top" src="/proj-assets/fact-check/landing_quote.png" alt="">
        <img class="quote right-bottom" src="/proj-assets/fact-check/landing_quote.png" alt="">
        <img src="/proj-assets/fact-check/landing_main.png" alt="">
        <img class="magnifier middle" src="/proj-assets/fact-check/landing_middle.jpg" alt="">
        <div class="magnifier bottom" />
      </div>
      <h3>2020 總統大選在即，總統候選人在公開的發言中，<br>有幾分真？幾分假？我們一起來看看！</h3>
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
          :linkText="typeList.length > 0 ? '我要打逐字稿' : '目前無逐字稿需謄打'"
          :progress="progress[1]"
          @click="clickTypeLinkBtn"
        />
        <StepBlock
          class="process__step hidden-effect"
          contentText="驗證逐字稿是否正確"
          imgSrc="/proj-assets/fact-check/step-02.png"
          indexText="步驟二"
          :disabled="typeList.length < 1"
          :link="getVerifyLink()"
          :linkText="verifyList.length > 0 ? '我要驗證逐字稿' : '目前無逐字稿需驗證'"
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
          additionalText="合作媒體（按筆畫排序）： iThome、READr、Right Plus 多多益善研究站、上下游News&Market、公視P# 新聞實驗室、公視新聞、未來城市＠天下、沃草、華視、環境資訊中心、鏡週刊、關鍵評論網<br>協作單位：中央社新聞學院、新興科技媒體中心"
          class="process__step hidden-effect"
          contentText="各家媒體針對需驗證的項目進行查證"
          imgSrc="/proj-assets/fact-check/step-04.png"
          indexText="步驟四"
        />
      </div>
      <p>媒體查證結果及完整資料會在 10 月正式上線，並隨計畫同步進度更新至選舉結束。
        <a
          href="https://beta.hackfoldr.org/2020electionfactcheck/"
          target="_blank">
          點我看計畫緣起
        </a>
      </p>
    </section>
    <lazy-component class="section cooperation">
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
          <img src="/proj-assets/fact-check/logo/right-plus.svg" alt="Right Plus 多多益善研究站">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/newsmarket.png" alt="上下游News&Market">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/newslab.svg" style="transform: scale(1.4);" alt="公視 P# 新聞實驗室">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/pts.png" alt="公視新聞">
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
          <img src="/proj-assets/fact-check/logo/mirrormedia.svg" alt="鏡週刊">
        </picture>
        <picture>
          <img src="/proj-assets/fact-check/logo/thenewslens-v2.png" alt="關鍵評論網">
        </picture>
      </div>
      <h3>查核協作單位</h3>
      <div class="cooperation__list media center">
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
      v-show="showFixedInfo && typeList.length > 0"
      class="info-fixed"
    >
      <a :href="getTypeLink()" target="_blank"><span>我願意盡一份力！</span>點我開始編打逐字稿</a>
      <button @click="showFixedInfo = false"><img src="/proj-assets/fact-check/close.png" alt="關閉"></button>
    </div>
  </div>
</template>
<script>
import StepBlock from './components/StepBlock.vue'
import { READR_SITE_URL } from '../../constants'
import { throttle, union, uniq } from 'lodash'

import FactCheckStoreModule from '../../store/modules/FactCheck'

const fetchTypeVerifyData = (store) => {
  return store.dispatch('FETCH_SHEET_WITHOUT_REDIS', {
    filename: 'type-verify',
    params: {
      spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
      range: '1.貼上影片與秒數!E:Q'
    }
  })
}

const fetchVolunteerList = (store) => {
  return Promise.all([
    store.dispatch('FactCheck/FETCH_GOOGLE_SHEET', {
      name: 'netizen-1',
      params: {
        spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
        range: '顯示在網站的志工名單!A:A'
      }
    }),
    store.dispatch('FactCheck/FETCH_GOOGLE_SHEET', {
      name: 'netizen-2',
      params: {
        spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
        range: '顯示在網站的志工名單!B:B'
      }
    }),
    store.dispatch('FactCheck/FETCH_GOOGLE_SHEET', {
      name: 'volunteer',
      params: {
        spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
        range: '顯示在網站的志工名單!C:C'
      }
    })
  ])
}

const fetchProgress = (store) => {
  return store.dispatch('FactCheck/FETCH_GOOGLE_SHEET', {
    name: 'progress',
    params: {
      spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
      range: 'Dashboard!E:E'
    }
  })
}

export default {
  name: 'FactCheck',
  components: {
    StepBlock
  },
  metaInfo() {
    return {
      title: '2020 總統候選人之事實查核計畫',
      description: '2020 總統大選在即，總統候選人在公開的發言中，有幾分真？幾分假？我們一起來看看！',
      metaUrl: 'fact-check-2020',
      metaImage: 'fact-check/og-v2.jpg',
    }
  },
  data () {
    return {
      READR_SITE_URL,
      current: 0,
      showFixedInfo: false,
      typeLinkClicked: '',
      verifyLinkClicked: '',
      verifyLinkClickedIndex: undefined
    }
  },
  computed: {
    netizenList () {
      const netizen1 = uniq((this.$store.state.FactCheck.googleSheet['netizen-1'] || [])
        .map(item => item[0]).slice(2).filter(item => typeof item === 'string'))
      const netizen2 = uniq((this.$store.state.FactCheck.googleSheet['netizen-2'] || [])
        .map(item => item[0]).slice(2).filter(item => typeof item === 'string'))
      return union(netizen1, netizen2).sort()
    },
    progress ( ) {
      const data = this.$store.state.FactCheck.googleSheet['progress'] || []
      return data.map(item => item[0]).filter(item => typeof item === 'string')
    },
    sheet () {
      return this.$store.state.googleSheet['type-verify'] || []
    },
    typeList () {
      return this.sheet
        .filter(item => item[0] && item[1] && item[8] !== this.typeLinkClicked && item[9] < 1)
        .sort((a, b) => a[9] - b[9])
        .map(item => item[8])
    },
    verifyList () {
      return this.sheet
        .filter(item => Array.isArray(item) && typeof item[12] === 'string')
        .filter(item => item[12].match(/docs.google.com/) && item[12] !== this.verifyLinkClicked)
        .map(item => item[12])
    },
    volunteerList () {
      return uniq((this.$store.state.FactCheck.googleSheet['volunteer'] || [])
        .map(item => item[0]).slice(2).filter(item => typeof item === 'string'))
    }
  },
  serverPrefetch () {
    return fetchTypeVerifyData(this.$store)
  },
  created() {
    this.$store.registerModule('FactCheck', FactCheckStoreModule)

    const params = this.$route.params.params
    const isTypeUrl = process.env.VUE_ENV === 'client' && params === 'transcript-type'
    const isVerifyUrl = process.env.VUE_ENV === 'client' && params === 'transcript-verify'
    const canGoToTypePage = this.typeList.length > 0
    const canGoToVerifyPage = this.verifyList.length > 0
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
  beforeMount () {
    fetchVolunteerList(this.$store)
    fetchProgress(this.$store)
  },
  mounted () {
    // this.detectCurrent()
    this.detectHiddenEle()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScrollForHiddenEffect)
    ga('send', 'pageview')
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScrollForHiddenEffect)
    this.$store.unregisterModule('FactCheck')
  },
  watch: {
    current (value) {
      if (value > 0 && !this.showFixedInfo) {
        this.showFixedInfo = true
      }
    }
  },
  methods: {
    clickTypeLinkBtn (e) {
      this.typeLinkClicked = e.target.href
      fetchTypeVerifyData(this.$store)
      ga('send', 'event', 'projects', 'click', `click type link`, { nonInteraction: false })
    },
    clickVerifyLinkBtn (e) {
      this.verifyLinkClicked = this.verifyList[this.verifyLinkClickedIndex]
      fetchTypeVerifyData(this.$store)
      ga('send', 'event', 'projects', 'click', `click verify link`, { nonInteraction: false })
    },
    detectCurrent () {
      const sections = [ ...document.querySelectorAll('section') ]
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
    getTypeLink () {
      const random = Math.floor(Math.random() * this.typeList.length)
      return this.typeList[random]
    },
    getVerifyLink () {
      const random = Math.floor(Math.random() * this.verifyList.length)
      this.verifyLinkClickedIndex = random
      return this.verifyList[random]
    },
    handleScroll: throttle(function () {
      this.detectCurrent()
    }, 300),
    handleScrollForHiddenEffect: throttle(function () {
      this.detectHiddenEle()
    }, 300)
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
    display flex
    flex-direction column
    min-height 100vh
    text-align center
    overflow hidden
    h1
      margin-top 60px
      color #e56300
      line-height 1.3
    h3
      max-width 90%
      margin 10px auto 0
      line-height 1.7
      text-align justify
    &__image
      position relative
      width 60%
      margin 10px auto 0
      img
        width 100%
      .quote
        position absolute
        z-index 10
        &.left-top
          top 30%
          left 0
          width 100px
          transform translate(-80%, -50%)
        &.left-bottom
          display none
        &.right-top
          top 10%
          right 0
          width 100px
          transform scaleX(-1) translate(-70%, -50%)
        &.right-bottom
          display none

      .magnifier
        position absolute
        &.middle
          top 50%
          right 0
          width 30px
          transform translate(100%, -50%)
        &.bottom
          top 50%
          right 0
          width 50%
          height 40px
          transform translate(calc(100% + 29px), -50%)
          background-image url(/proj-assets/fact-check/landing_bottom.jpg)
          background-repeat repeat-x
  .section
    padding 20px 0 75px
  .process
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
  .cooperation
    > *
      width 90%
      margin 0 auto
    h3
      margin-top 2em
      text-align center
    &__list
      margin-top 1em
      width calc(90% + 1em)
      p
        display inline-block
        margin .2em .5em
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
      h3
        margin-top 30px
        text-align center
      &__image
        margin-top 30px
        max-width 350px
        .quote
          &.left-top
            width 150px
          &.left-bottom
            display block
            top 50%
            left 0
            width 100px
            transform translate(-80%, 0)
          &.right-top
            width 150px
            top 15%
            transform scaleX(-1) translate(-80%, -50%)
          &.right-bottom
            display block
            top 60%
            right 0
            width 100px
            transform scaleX(-1) translate(-60%, -20%)
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

@media (min-width: 1024px)
  .fact-check
    h1
      font-size 3rem
    h3
      font-size 1.25rem
    .landing
      &__image
        margin-top 3%
        .quote.left-top
          width 200px
          transform translate(-120%, -50%)
        .quote.left-bottom
          width 120px
          transform translate(-120%, 40%)
        .quote.right-top
          width 200px
          transform scaleX(-1) translate(-110%, -50%)
        .quote.right-bottom
          width 120px
          transform scaleX(-1) translate(-60%, 30%)
        .magnifier.middle
          width 60px
        .magnifier.bottom
          width 100%
          height 90px
          transform translate(calc(100% + 59px), -50%)
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
@media (min-width: 1024px) and (min-height: 900px)
  .fact-check
    .landing__image
      max-width 550px
</style>
