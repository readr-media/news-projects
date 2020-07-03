<template>
  <div :class="[ $i18n.locale ]" class="covid19-disinformation">
    <TheOpening :locale="locale" />
    <TheGame :locale="locale" />
    <TheArticle />
    <TheCredit />
    <div class="donate">
      <p>覺得這篇報導不錯嗎？歡迎用新台幣支持 READr，讓更多深度報導浮上檯面。</p>
      <a
        href="https://www.readr.tw/donate"
        target="_blank"
        rel="noopener noreferrer"
      >
        用新台幣跟 READr 一起幹大事
      </a>
    </div>
    <SubscriptionWithLogoMsg class="covid__subscription" />
  </div>
</template>

<script>
import { throttle } from 'lodash'
import TheArticle from './components/TheArticle.vue'
import TheCredit from './components/TheCredit.vue'
import TheGame from './components/TheGame.vue'
import TheOpening from './components/TheOpening.vue'
import SubscriptionWithLogoMsg from 'src/components/SubscriptionWithLogoMsg.vue'

export default {
  name: 'COVID19Disinformation',
  components: {
    TheArticle,
    TheCredit,
    TheGame,
    TheOpening,
    SubscriptionWithLogoMsg
  },
  metaInfo () {
    let metaUrl = 'covid19-disinformation'
    let locale = 'zh_TW'
    if (this.$route.params.params === 'en') {
      this.$i18n.locale = 'en'
      metaUrl = `${metaUrl}/en`
      locale = 'en_US'
    }

    return {
      title: this.$t('COVID19_D.TITLE'),
      description: this.$t('COVID19_D.DESCRIPTION'),
      locale,
      metaUrl,
      metaImage: 'covid19-disinformation/og.jpg'
    }
  },
  data () {
    return {
      gaIndex: 0,
      gaElements: []
    }
  },
  computed: {
    locale () {
      if (this.$route.params.params === 'en') {
        return 'en'
      }
      return 'tw'
    }
  },
  mounted () {
    this.gaElements = [
      ...document.querySelectorAll('.covid-game'),
      ...document.querySelectorAll('.covid-article > h2'),
      ...document.querySelectorAll('.info-box'),
      ...document.querySelectorAll('.covid-credit')
    ]
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: throttle(function () {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      this.gaElements.forEach((ele, index) => {
        const rect = ele.getBoundingClientRect()
        if (index + 1 > this.gaIndex && rect.top < viewportHeight) {
          this.gaIndex = index + 1
          window.ga && window.ga('send', 'event', 'projects', 'scroll', `scroll to ${this.gaIndex}`)
        }
      })
    }, 300)
  }
}
</script>

<style lang="stylus" scoped>
.covid19-disinformation
  padding 40px 0 20px
  color #4a4a4a
  font-size 16px
  line-height 1.75
  word-break break-word
  overflow-wrap break-word
  @media (min-width: 769px)
    padding 50px 0
  >>> h2
    font-size 21px
    font-weight 300
  >>> a
    color #14c40d
    font-weight 500
  .covid__subscription, .donate
    width 290px
    margin 0 auto
    @media (min-width: 768px)
      width: 60%;
      max-width: 800px;
  .donate
    padding 20px 10px
    font-size 14px
    background-color rgba(216, 216, 216, 0.15)
    @media (min-width: 768px)
      padding 20px
    + *
      margin-top 50px
    p
      margin 0
      text-align center
      + *
        margin-top 13px
    a
      display block
      max-width 402px
      height 40px
      margin-left auto
      margin-right auto
      color #fff
      line-height 40px
      text-align center
      text-decoration none
      background-color #26c226
      border-radius 4px
  .covid__subscription
      >>> .subscription__btn
        background-color #26c226
        @media (min-width: 768px)
          width 100px

</style>
