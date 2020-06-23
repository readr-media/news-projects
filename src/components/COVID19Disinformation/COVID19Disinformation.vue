<template>
  <div class="covid19-disinformation">
    <TheArticle />
    <TheCredit />
    <SubscriptionWithLogoMsg class="covid__subscription" />
  </div>
</template>

<script>
import TheArticle from './components/TheArticle.vue'
import TheCredit from './components/TheCredit.vue'
import SubscriptionWithLogoMsg from 'src/components/SubscriptionWithLogoMsg.vue'

export default {
  name: 'COVID19Disinformation',
  components: {
    TheArticle,
    TheCredit,
    SubscriptionWithLogoMsg
  },
  metaInfo () {
    return {
      title: '武漢肺炎：如病毒一樣傳播的假訊息',
      description: '武漢肺炎在國外疫情仍在延燒，READr 探索了從一月至今在全世界傳播的假訊息。',
      metaUrl: 'covid19-disinformation',
      metaImage: 'covid19-disinformation/og.jpg'
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
  @media (min-width: 768px)
    padding 50px 0
  >>> h1, >>> h2, >>> h3, >>> p
    margin-top 0
    margin-bottom 0
  >>> h2
    font-size 21px
    font-weight 300
  >>> p
    text-align justify
  >>> a
    color #14c40d
    font-weight 500
  .covid
    &__subscription
      width 290px
      margin 0 auto
      @media (min-width: 768px)
        width: 60%;
        max-width: 800px;
      >>> .subscription__btn
        background-color #26c226
        @media (min-width: 768px)
          width 100px

</style>
