<template>
  <div class="fact-check">
    <Logo
      class="eastern-district__logo no-sprite"
      href="https://www.readr.tw/"
      top="10px"
      left="10px"
      bgImage="/proj-assets/logo_readr.png"
    />
    <Share
      :shareUrl="`${READR_SITE_URL}fact-check-2020`"
      class="eastern-district__share"
      top="10px"
      right="10px"
      direction="down"
    />
    <section class="landing">
      <h1>2020<br>總統候選人之<br>事實查核計畫</h1>
      <h3>2020 總統大選在即，總統候選人在公開的發言中，<br>有幾分真？幾分假？我們一起來看看！</h3>
    </section>
    <section class="process">
      <h2>本專案透過四個步驟進行</h2>
      <div class="process__steps">
        <StepBlock
          class="process__step hidden-effect"
          contentText="將候選人的發言影片轉換成逐字稿"
          imgSrc="/proj-assets/fact-check/step-01.png"
          indexText="步驟一"
          :link="typeLink"
          :linkText="typeList.length > 0 ? '我要打逐字稿' : '目前已撰寫完畢'"
          @click="clickTypeLinkBtn"
        />
        <StepBlock
          class="process__step hidden-effect"
          contentText="驗證逐字稿是否正確"
          imgSrc="/proj-assets/fact-check/step-02.png"
          indexText="步驟二"
          :disabled="typeList.length < 1"
          :link="verifyLink"
          :linkText="verifyList.length > 0 ? '我要驗證逐字稿' : '目前已驗證完畢'"
          @click="clickVerifyLinkBtn"
        />
        <StepBlock
          class="process__step hidden-effect"
          contentText="針對逐字稿內容進行標籤其屬性"
          imgSrc="/proj-assets/fact-check/step-03.png"
          indexText="步驟三"
        />
        <StepBlock
          additionalText="合作媒體：鏡週刊、公視新聞、公視P#新聞實驗室、華視、沃草、未來城市＠天下、ITHome、關鍵評論網、上下游News&Market、環境資訊中心"
          class="process__step hidden-effect"
          contentText="各家媒體針對需驗證的項目進行查證"
          imgSrc="/proj-assets/fact-check/step-04.png"
          indexText="步驟四"
        />
      </div>
      <p>媒體查證結果及完整資料會在 10 月正式上線，並隨計畫同步進度更新至選舉結束。</p>
    </section>
    <div
      v-show="showFixedInfo && typeLink"
      class="info-fixed"
    >
      <a :href="typeLink" target="_blank"><span>我願意盡一份力！</span>點我開始編打逐字稿</a>
      <button @click="showFixedInfo = false"><img src="/proj-assets/fact-check/close.png" alt="關閉"></button>
    </div>
  </div>
</template>
<script>
import Logo from '../Logo.vue'
import Share from '../Share.vue'
import StepBlock from './components/StepBlock.vue'
import { READR_SITE_URL } from '../../constants'
import { throttle } from 'lodash'

export default {
  name: 'FactCheck',
  components: {
    Logo,
    Share,
    StepBlock
  },
  metaInfo() {
    return {
      title: '2020 總統候選人之事實查核計畫',
      description: '2020 總統大選在即，總統候選人在公開的發言中，有幾分真？幾分假？我們一起來看看！',
      metaUrl: 'fact-check-2020',
      metaImage: 'fact-check/og.jpg',
    }
  },
  data () {
    return {
      READR_SITE_URL,
      current: 0,
      showFixedInfo: false,
      typeLinkIndex: 0,
      verifyLinkIndex: 0
    }
  },
  computed: {
    sheet () {
      return this.$store.state.googleSheet.body || []
    },
    typeLink () {
      return this.typeList[this.typeLinkIndex]
    },
    typeList () {
      return this.sheet
        .filter(item => item[1].match(/www.youtube.com/) && item[4] && item[5] && item[13] < 2)
        .sort((a, b) => a[13] - b[13])
        .map(item => item[12])
    },
    verifyLink () {
      return this.verifyList[this.verifyLinkIndex]
    },
    verifyList () {
      return this.sheet
        .filter(item => item[16].match(/docs.google.com/))
        .map(item => item[16])
    }
  },
  serverPrefetch () {
    return this.$store.dispatch('FETCH_SHEET_WITHOUT_REDIS', {
      params: {
        spreadsheetId: '18a90l_vmTxfbcwjSbEuovjDXvVsv-G4_zMsFcIkBDtE',
        range: '1.貼上影片與秒數'
      }
    })
  },
  created() {
    const params = this.$route.params.params
    if (process.env.VUE_ENV === 'client' && params === 'transcript-type' && this.typeList[0]) {
      window.location.replace(this.typeList[0])
    } else if (process.env.VUE_ENV === 'client' && params === 'transcript-verify' && this.verifyList[0]) {
      window.location.replace(this.verifyList[0])
    }
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
  },
  watch: {
    current (value) {
      if (value > 0 && !this.showFixedInfo) {
        this.showFixedInfo = true
      }
    }
  },
  methods: {
    clickTypeLinkBtn () {
      if (this.typeLinkIndex + 1 > this.typeList.length - 1) {
        this.typeLinkIndex = 0
      } else {
        this.typeLinkIndex += 1
      }
      ga('send', 'event', 'projects', 'click', `click type link`, { nonInteraction: false })
    },
    clickVerifyLinkBtn () {
      if (this.verifyLinkIndex + 1 > this.verifyList.length - 1) {
        this.verifyLinkIndex = 0
      } else {
        this.verifyLinkIndex += 1
      }
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
        if (rect.top <= viewportHeight * 2/3) {
          item.classList.add('active')
        }
      })
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
    justify-content center
    height 100vh
    text-align center
    h1
      color #e56300
      line-height 1.3
    h3
      max-width 90%
      margin 35px auto 0
      line-height 1.7
      text-align justify
  .process
    padding 20px 0 75px
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
        text-align center
    .process
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
    .info-fixed
      a
        span
          display inline
      button
        img
          width 20px
          height 20px

@media (min-width: 1024px)
  .fact-check
    h1
      font-size 4.75rem
    h3
      font-size 1.25rem
    .process
      display flex
      flex-direction column
      justify-content center
      padding 20px 0 75px
      h2
        margin-bottom 40px
      &__step
        &:last-child
          img
            transform translateX(15px)
</style>
