<template>
  <section class="vote-result">
    <Logo class="no-sprite" href="https://www.readr.tw/" top="15px" left="15px" bgImage="/proj-assets/vote2018-result/readr-logo.png" />
    <Share :shareUrl="url" class="vote-result__share" top="15px" right="15px" direction="down" />
    <Map/>
    <VoteArticle />
    <RelatedReports :theme="'light'"/>
    <section class="vote-result__comment">
      <div class="fb-comments" data-href="https://dev.readr.tw/project/vote2018-result" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </section>
  </section>
</template>

<script>
import Logo from '../Logo.vue'
import Map from './components/Map.vue'
import RelatedReports from 'src/components/RelatedReports.vue'
import Share from '../Share.vue'
import VoteArticle from './components/VoteArticle.vue'
import module from 'src/store/modules/VoteResult'

export default {
  name: 'VoteResult',
  components: {
    Logo,
    Map,
    RelatedReports,
    Share,
    VoteArticle,
  },
  metaInfo () {
    return {
      title: '你全家都議員——議員家族勢力全解析',
      description: '選舉要到了，你熟悉選舉公報上的人嗎？READr 蒐集了從 1940 年代以來超過 9 千位地方議員資料，並追查他們的親屬關係，看看誰家的政治香火傳承最久。',
      metaUrl: 'vote2018-result',
      metaImage: 'vote2018-result/ogimage.jpg'
    }
  },
  computed: {
    url () {
      return this.$route.fullPath
    }
  },
  created () {
    this.$store.registerModule('VoteResult', module)
  },
  mounted () {
    ga('send', 'pageview')
  },
  destroyed () {
    this.$store.unregisterModule('VoteResult')
  },
}
</script>
<style lang="stylus">
.vote-result
  padding-bottom 20px
  background-color #f4f4f2
  overflow hidden
  &__share
    &.share
      .toggle
        background-image url(/proj-assets/vote2018-result/share.png) !important
        background-size 34px auto !important
        background-position center center !important
  &__comment
    width 90%
    margin 20px auto 0

@media (min-width: 768px)
  .vote-result
    &__comment
      width 80%

@media (min-width: 1000px)
  .vote-result
    &__comment
      width 900px
</style>

