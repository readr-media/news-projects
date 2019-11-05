<template>
  <section class="vote-result">
    <div class="vote-result__to-desktop-hint" v-show="!get($store, 'state.useragent.isDesktop') && showHint">
      <p>建議使用電腦瀏覽器進行地圖互動</p>
      <p style="margin: 30px 0 0 0;color: #9e005d" @click="showHint = false">確定</p>
    </div>
    <Logo class="no-sprite" href="https://www.readr.tw/" top="15px" left="15px" bgImage="/proj-assets/vote2018-result/readr-logo.png" />
    <Share :shareUrl="`${READR_SITE_URL}vote2018-result`" class="vote-result__share" top="15px" right="15px" direction="down" />
    <Dashboard v-show="get($store, 'state.useragent.isDesktop')"/>
    <VoteArticle />
    <RelatedReports :theme="'light'"/>
    <div class="vote-result__comment">
      <iframe src="https://www.readr.tw/comment?resource_url=https://www.readr.tw/series/2018-vote" frameborder="0"></iframe>
    </div>
  </section>
</template>

<script>
import Logo from '../Logo.vue'
import Dashboard from './components/Dashboard.vue'
import RelatedReports from 'src/components/RelatedReports.vue'
import Share from '../Share.vue'
import VoteArticle from './components/VoteArticle.vue'
import storeModule from 'src/store/modules/VoteResult'
import { READR_SITE_URL } from '../../constants'
import { get } from 'lodash'

export default {
  name: 'VoteResult',
  components: {
    Logo,
    Dashboard,
    RelatedReports,
    Share,
    VoteArticle,
  },
  metaInfo () {
    return {
      title: '我住在「同溫層里」嗎？-- 全台村里公投、候選人開票結果解析',
      description: '地方選舉結果和公投結束後，你是否對於投票結果感到驚訝？這篇報導讓你看看，你隔壁鄰居的選擇是否和你一樣？',
      metaUrl: 'vote2018-result',
      metaImage: 'vote2018-result/ogimage.jpg'
    }
  },
  data () {
    return {
      READR_SITE_URL,
      showHint: true
    }
  },
  created () {
    const shouldPreserveState = process.env.VUE_ENV === 'client'
    this.registerStoreModule(shouldPreserveState)
  },
  destroyed () {
    this.$store.unregisterModule('VoteResult')
  },
  methods: {
    get,
    registerStoreModule (shouldPreserveState = false) {
      this.$store.registerModule('VoteResult', storeModule, { preserveState: shouldPreserveState })
    },
  }
}
</script>
<style lang="stylus">
@keyframes fadeIn {
  0% {
    opacity 0
  }

  100% {
    opacity 1
  }
}

.vote-result
  padding-bottom 20px
  background-color #f4f4f2
  overflow hidden
  &__to-desktop-hint
    position fixed
    top 30px
    left 0
    background-color white
    padding 30px
    width 100vw
    z-index 100000
    text-align center
    animation fadeIn
    animation-delay 1s
    animation-duration 1s
    animation-fill-mode forwards
  &__share
    &.share
      .toggle
        background-image url(/proj-assets/vote2018-result/share.png) !important
        background-size 34px auto !important
        background-position center center !important
  &__comment
    margin-top 40px
    > iframe
      width 100%
      min-height 400px

@media (min-width: 900px)
  .vote-result
    &__comment
      width 800px
      margin 0 auto
</style>

