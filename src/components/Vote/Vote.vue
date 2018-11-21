<template>
  <section class="vote">
    <img class="vote__logo-readr" src="/proj-assets/logo_readr_with_text.png" alt="" @click="clickReadr">
    <img class="vote__share" src="/proj-assets/vote2018/share.png" alt="" @click="clickShare">
    <div class="vote__content-wrapper">
      <VoteArticle/>
      <VoteVis class="vote__vis"/>
      <div class="vote__relateds relateds">
        <RelatedReports class="relateds__block" :theme="'light'"/>
      </div>
    </div>
  </section>
</template>

<script>
import VoteArticle from './components/VoteArticle.vue'
import VoteVis from './components/VoteVis.vue'
import RelatedReports from 'src/components/RelatedReports.vue'

export default {
  metaInfo () {
    return {
      title: '你全家都議員——議員家族勢力全解析',
      description: '選舉要到了，你熟悉選舉公報上的人嗎？READr 蒐集了從 1940 年代以來超過 9 千位地方議員資料，並追查他們的親屬關係，看看誰家的政治香火傳承最久。',
      metaUrl: 'vote2018',
      metaImage: 'vote2018/ogimage.jpg'
    }
  },
  components: {
    VoteArticle,
    VoteVis,
    RelatedReports,
  },
  methods: {
    clickReadr () {
      window.open('https://www.readr.tw')
    },
    clickShare () {
      window.open('https://www.facebook.com/share.php?u=https://www.readr.tw/project/vote2018')
    }
  },
  mounted () {
    require('autotrack')
    ga('require', 'cleanUrlTracker')
    ga('require', 'maxScrollTracker')
    ga('require', 'eventTracker')
    ga('require', 'pageVisibilityTracker')
    ga('send', 'pageview')
  },
}
</script>

<style lang="stylus">
.vote
  h1
    margin 0
  p
    margin 0
  background-color #061c37
  color white
  padding 150px 0 0 0
  &__logo-readr
    width 77px
    position fixed
    top 40px
    left 40px
    cursor pointer
    z-index 1000
  &__share
    width 48px
    position fixed
    top 40px
    right 40px
    cursor pointer
    z-index 1000
  &__content-wrapper
    display flex
    flex-direction column
    align-items center
  &__vis
    margin 126px 0 0 0
  &__relateds
    margin 126px 0 0 0
    background-color white
    width 100vw
    h1
      margin 15px 0 0 0 !important
    p
      margin 15px 0 0 !important

@media (max-width 768px)
  .vote
    padding 118px 0 0 0
    &__logo-readr
      width 50px
      top 20px
      left 20px
    &__share
      width 40px
      top 20px
      right 20px
    &__vis
      margin 60px 0 0 0
</style>


