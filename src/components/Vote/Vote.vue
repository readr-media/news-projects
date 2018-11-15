<template>
  <section class="vote">
    <img class="vote__logo-readr" src="/proj-assets/logo_readr_with_text.png" alt="">
    <img class="vote__share" src="/proj-assets/vote2018/share.png" alt="">
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
      title: 'vote2018',
      description: 'vote2018',
      metaUrl: 'vote2018',
      metaImage: 'vote2018/ogimage.jpg'
    }
  },
  components: {
    VoteArticle,
    VoteVis,
    RelatedReports,
  },
  mounted () {
    // require('autotrack')
    // ga('require', 'cleanUrlTracker')
    // ga('require', 'maxScrollTracker')
    // ga('require', 'eventTracker')
    // ga('require', 'pageVisibilityTracker')
    // ga('send', 'pageview')
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
    width 97px
    position fixed
    top 50px
    left 50px
    cursor pointer
  &__share
    width 60px
    position fixed
    top 50px
    right 50px
    cursor pointer
  &__content-wrapper
    display flex
    flex-direction column
    align-items center
  &__vis
    margin 126px 0 0 0
  &__relateds
    margin 126px 0 0 0
    background-color white
    h1
      margin 15px 0 0 0 !important
    p
      margin 15px 0 0 !important
</style>


