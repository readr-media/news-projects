<template>
  <div class="covid19-disinformation">
    <TheOpening />
    <TheGame />
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
    return {
      title: this.$t('COVID19_D.title'),
      description: this.$t('COVID19_D.DESCRIPTION'),
      metaUrl: 'covid19-disinformation',
      metaImage: 'covid19-disinformation/og.jpg'
    }
  },
  created () {
    if (this.$route.params.params === 'en') {
      this.$i18n.locale = 'en'
    }
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
