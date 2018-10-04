<template>
  <div class="election-board">
    <Logo v-show="currentComponent === 'ElectionBoardLanding'" class="no-sprite" href="https://www.readr.tw/" top="15px" left="15px" bgImage="/proj-assets/election-board/images/readr-logo.png" />
    <Share v-show="currentComponent === 'ElectionBoardLanding'" :shareUrl="shareLink" class="election-board__share" top="10px" left="70px" bgColor="#000" direction="right" />
    <section :is="currentComponent"></section>
  </div>
</template>
<script>

import ElectionBoardData from './ElectionBoardData.vue'
import ElectionBoardLanding from './ElectionBoardLanding.vue'
import ElectionBoardUpload from './ElectionBoardUpload.vue'
import ElectionBoardVerify from './ElectionBoardVerify.vue'
import Logo from '../Logo.vue'
import Share from '../Share.vue'

import ElectionBoardStoreModule from '../../store/modules/ElectionBoard'

const DEFAULT_PAGE = 1

const fetchCandidates = (store, {
  page = DEFAULT_PAGE,
  type = 'mayors'
} = {}) => {
  store.dispatch('ElectionBoard/FETCH_CANDIDATES_FOR_VERIF', {
    electionYear: 2018,
    page: page,
    type: type,
    maxResults: 100
  }).then(res => {
    if (res.next) {
      fetchCandidates(store, { type, page: page + 1 })
    }
    return res
  }).catch(err => err)
}

const fetchElections = (store, year = 2018) => {
  return store.dispatch('ElectionBoard/FETCH_ELECTIONS', year)
}

const fetchUserID = (store) => {
  return store.dispatch('ElectionBoard/FETCH_USER_ID')
}

export default {
  name: 'ElectionBoard',
  components: {
    ElectionBoardData,
    ElectionBoardLanding,
    ElectionBoardUpload,
    ElectionBoardVerify,
    Logo,
    Share,
  },
  metaInfo() {
    const metaUrl = this.$route.fullPath.split('/project/')[1];
    const ogLocale = 'zh_TW';

    let title = `看板追追追——2018選舉看板紀錄`
    let metaImage = `election-board/images/og.jpg`;
    let description = '每到選舉季節，街上就會掛滿大大小小的候選人看板，如果候選人不申報，就會在選舉之後隨著卸下的看板消失無蹤。我們邀請你拍下身邊的看板，一起為這次的選舉留下紀錄！'

    switch (this.$route.params.params) {
      case 'upload':
        metaImage = `election-board/images/og-upload.jpg`
        break
      case 'verify':
        title = '看板追追追——鍵盤辨識徵求中！'
        metaImage = `election-board/images/og-verify.jpg`
        description = '看板追追追計畫進到下一步資料分析前，需要你協助確認資料的正確性。這裡有一堆選舉看板照片需要鍵盤協力，一起為這次的選舉留下紀錄吧！'
        break
    }

    return {
      title: title,
      description: description,
      locale: ogLocale,
      metaUrl,
      metaImage,
      customScript: `
        <script src="//www.readr.tw/proj-assets/election-board/scripts/exif.js" async><\/script>
      `,
    };
  },
  computed: {
    currentComponent() {
      if (this.$route.params.params) {
        const part = this.$route.params.params.charAt(0).toUpperCase() + this.$route.params.params.slice(1)
        return `ElectionBoard${part}` 
      }
      return 'ElectionBoardLanding'
    },
    shareLink () {
      return this.$route.fullPath
    }
  },
  watch: {
    '$route' (to, from) {
      let title = `看板追追追——2018選舉看板紀錄`
      switch (to.params.params) {
        case 'verify':
          title = '看板追追追——鍵盤辨識徵求中！'
          break
      }
      window.ga('send', 'pageview', { title: `${title} - 讀＋READr`, location: to.fullPath })
    }
  },
  beforeCreate () {
    const route = this.$route.params.params || '';
    const regex = /^(upload|verify)$/
    // const regex = /^(upload|verify|data)$/
    if (!route.match(regex)) {
      this.$router.replace({ path: '/project/election-board' });
    }
  },
  created () {
    this.$store.registerModule('ElectionBoard', ElectionBoardStoreModule)
  },
  beforeMount () {
    fetchElections(this.$store)
    fetchUserID(this.$store)
    fetchCandidates(this.$store),
    fetchCandidates(this.$store, { type: 'councilors' })
  },
  mounted () {
    window.ga('send', 'pageview')
  },
  destroyed () {
    this.$store.unregisterModule('ElectionBoard')
  },
}
</script>
<style lang="stylus">
.election-board
  color #000
  font-size 16px
  font-style normal
  font-family "source-han-sans-traditional", sans-serif
  line-height 1.67
  h3, p
    margin 0
  a
    color #000
    text-decoration none
    cursor pointer
  &__share
    &.share
      .toggle
        background-image url(/proj-assets/election-board/images/share.png) !important
        background-size 34px auto !important
        background-position center center !important
</style>

