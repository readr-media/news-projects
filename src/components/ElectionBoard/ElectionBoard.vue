<template>
  <div class="election-board">
    <Logo v-show="currentComponent === 'ElectionBoardLanding'" class="no-sprite" href="https://www.readr.tw/" top="15px" left="15px" bgImage="/proj-assets/election-board/images/readr-logo.png" />
    <Share v-show="currentComponent === 'ElectionBoardLanding'" :shareUrl="shareLink" class="election-board__share" top="10px" left="70px" direction="right" />
    <section :is="currentComponent" v-if="isRouterAlive" :reload="reload"></section>

    <LoadingMask v-show="$store.state.ElectionBoard.loadingStatus" />
  </div>
</template>

<script>
import Logo from '../Logo.vue'
import Share from '../Share.vue'
import ElectionBoardUpload from './ElectionBoardUpload.vue'
import LoadingMask from './LoadingMask.vue'

import { READR_SITE_URL } from '../../constants'

import ElectionBoardStoreModule from '../../store/modules/ElectionBoard'

const DEFAULT_PAGE = 1

const fetchCandidates = (store, {
  page = DEFAULT_PAGE,
  type = 'presidents'
} = {}) => {
  store.dispatch('ElectionBoard/FETCH_CANDIDATES_FOR_VERIF', {
    electionYear: 2020,
    page,
    type,
    maxResults: 100
  }).then((res) => {
    if (res.next) {
      fetchCandidates(store, { type, page: page + 1 })
    }
    return res
  }).catch((err) => err)
}

const fetchUserID = (store) => {
  return store.dispatch('ElectionBoard/FETCH_USER_ID')
}

export default {
  name: 'ElectionBoard',
  components: {
    ElectionBoardData: () => import('./ElectionBoardData.vue'),
    ElectionBoardLanding: () => import('./ElectionBoardLanding.vue'),
    // ElectionBoardUpload: () => import('./ElectionBoardUpload.vue'),
    ElectionBoardUpload,
    ElectionBoardVerify: () => import('./ElectionBoardVerify.vue'),
    LoadingMask,
    Logo,
    Share
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  metaInfo () {
    const metaUrl = this.$route.fullPath.split('/project/')[1]
    const ogLocale = 'zh_TW'

    let title = '看板追追追——2020選舉看板紀錄'
    let metaImage = 'election-board/images/og-2020.jpg'
    let description = '每到選舉季節，街上就會掛滿大大小小的候選人看板，在現行制度下又不需要登記或申報，難以留下紀錄。我們邀請你替選舉看板「打卡」，簡單三步驟：拍下照片、確認地點、標示候選人，一起為這次的選舉留下紀錄！'

    switch (this.$route.params.params) {
      case 'upload':
        metaImage = 'election-board/images/og-upload-2020.jpg'
        break
      case 'verify':
        title = '看板追追追——鍵盤辨識徵求中！'
        metaImage = 'election-board/images/og-verify-2020.jpg'
        description = '看板追追追計畫募集了一堆選舉看板照片，進到下一步資料分析前，需要你協助確認資料的正確性。一起為這次的選舉留下紀錄吧！'
        break
      case 'data':
        metaImage = 'election-board/images/og-data-2020.jpg'
        description = '誰掛了最多看板？每到選舉季節，街上就會掛滿大大小小的候選人看板，在現行制度下又不需要登記或申報，難以留下紀錄。我們邀請你替選舉看板「打卡」，簡單三步驟：拍下照片、確認地點、標示候選人，一起為這次的選舉留下紀錄！'
        if (this.$route.query.candidate) {
          title = `看板追追追——${this.$route.query.candidate}選舉看板紀錄`
          description = `目前參選人${this.$route.query.candidate}掛了多少看板？你還有在哪裡看到${this.$route.query.candidate}的看板嗎？一起為這次的選舉留下紀錄吧！`
        }
        break
      case 'data-2018':
        title = '看板追追追——2018選舉看板紀錄'
        metaImage = 'election-board/images/og-data-2020.jpg'
        description = '2018 年，READr 啟動「看板追追追」實驗，透過讀者幫街上的選舉看板「打卡」，試圖暸解實際狀況與申報資料中的黑數。我們發現，2018 年至少有 60 位候選人的看板經費不是由政治獻金專戶支付，是現行制度下無法追蹤的金流。'
        if (this.$route.query.candidate) {
          title = `看板追追追——${this.$route.query.candidate}選舉看板紀錄`
          description = `候選人${this.$route.query.candidate}掛了多少看板？${this.$route.query.candidate}的看板是由政治獻金支付的嗎？一起來看看！`
        }
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
    currentComponent () {
      const params = this.$route.params.params
      if (params) {
        const part = params.charAt(0).toUpperCase() + params.slice(1)
        return `ElectionBoard${part.includes('Data') ? 'Data' : part}` 
      }
      return 'ElectionBoardLanding'
    },
    shareLink () {
      return `${READR_SITE_URL}election-board`
    }
  },
  watch: {
    '$route' (to, from) {
      let title = '看板追追追——2020選舉看板紀錄'
      switch (to.params.params) {
        case 'verify':
          title = '看板追追追——鍵盤辨識徵求中！'
          break
        case 'data':
          if (to.query.candidate) {
            title = `看板追追追——${to.query.candidate}選舉看板紀錄`
          }
          break
        case 'data-2018':
          title = '看板追追追——2018選舉看板紀錄'
          if (to.query.candidate) {
            title = `看板追追追——${to.query.candidate}選舉看板紀錄`
          }
          break
      }
      window.ga('send', 'pageview', { title: `${title} - 讀＋READr`, location: to.fullPath })
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => { this.isRouterAlive = true })
    }
  },
  beforeCreate () {
    const route = this.$route.params.params || '';
    const regex = /^(upload|verify|data|data-2018)$/
    if (!route.match(regex)) {
      this.$router.replace({ path: '/project/election-board' }).catch((err) => {})
    }
  },
  created () {
    this.$store.registerModule('ElectionBoard', ElectionBoardStoreModule)
  },
  beforeMount () {
    fetchUserID(this.$store)
    fetchCandidates(this.$store),
    fetchCandidates(this.$store, { type: 'legislators' })
  },
  destroyed () {
    this.$store.unregisterModule('ElectionBoard')
  }
}
</script>
<style lang="stylus">
.election-board
  color #000
  font-size 16px
  font-style normal
  font-family "source-han-sans-traditional", sans-serif
  line-height 1.2
  background-color #000
  & h3, & p
    margin 0
  &__share.share .toggle
    background-image url(/proj-assets/election-board/images/share.png) !important
    background-size 34px auto !important
    background-position center center !important
select
  cursor pointer
</style>

