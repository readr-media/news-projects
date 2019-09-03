<template>
  <ReadrAppHeader
    class="header"
    :url="locationUrl"
    :catalog-list="catalogList"
    :donate-tappay-config="donateTappayConfig"
    :donate-user-profile="donateUserProfile"
    :donate-show-result="donateShowResult"
    :donate-is-result-success="donateIsResultSuccess"
    @clickReadrLogo="handleClickReadrLogo"
    @clickCatalogItem="handleClickCatalogItem"
    @loadmore="handleLoadmore"
    @submitDonate="handleSubmitDonate"
    @backToDonateForm="handleBackToDonateForm"
  />
</template>

<script>
import ReadrAppHeader from '@readr-ui/app-header/src/readr-ui-app-header.vue'
import axios from 'axios'
const { TAPPAY_CONFIG } = require('../../api/config')

const apiUrlCatalog = 'https://www.readr.tw/api/public/posts'
const apiParamsCatalog = {
  max_result: 10,
  sort: 'post_order,-published_at'
}

const apiUrlDonate = 'https://www.readr.tw/api/donate'
const apiUrlDonateDev = 'http://dev.readr.tw/api/donate'
const apiParamsDonate = {
  object_type: 5
}

export default {
  components: {
    ReadrAppHeader
  },
  data() {
    return {
      locationUrl: 'https://www.readr.tw',
      catalogList: [],
      catalogCurrentPage: 1,
      catalogShouldCompleteLoadmore: false,
      catalogLoadmoreLoaded: false,
      donateTappayConfig: TAPPAY_CONFIG,
      donateUserProfile: {
        mail: '',
        nickname: ''
      },
      donateShowResult: false,
      donateIsResultSuccess: false
    }
  },
  computed: {
    locationUrlSlug() {
      const pathname = (location && location.pathname) || '/'
      const pathnames = pathname.split('/')
      const isPathValid = pathnames.includes('project') && pathnames.length >= 3
      return isPathValid ? pathnames[2] : ''
    }
  },
  beforeMount() {
    this.locationUrl = location && location.href
  },
  methods: {
    handleClickReadrLogo() {
      window.open('https://www.readr.tw')
    },
    handleClickCatalogItem(payload) {
      window.open(payload.url)
    },
    async fetchProjectId() {
      const params = {
        slug: this.locationUrlSlug,
        page: 1,
        max_result: 1
      }
      const res = await axios.get(apiUrlCatalog, { params })
      const items = res.data['_items'] || []
      return (items[0] || {})['project_id']
    },
    async fetchCatalog(page = 1) {
      const projectId = await this.fetchProjectId()
      const params = {
        ...apiParamsCatalog,
        project_id: projectId,
        page
      }
      const res = await axios.get(apiUrlCatalog, { params })
      return res.data['_items'] || []
    },
    async handleLoadmore($infiniteLoadingState) {
      try {
        const items = await this.fetchCatalog(this.catalogCurrentPage)

        if (items.length > 0) {
          this.catalogList.push(...items)
          this.catalogCurrentPage += 1
          $infiniteLoadingState.loaded()
        } else {
          $infiniteLoadingState.complete()
        }
      } catch(error) {
        $infiniteLoadingState.complete()
      }
    },
    async requestDonate(donateData) {
      const {
        points,
        token,
        member_name,
        member_phone,
        member_mail,
        invoiceItem
      } = donateData

      const projectId = await this.fetchProjectId()

      const params = {
        ...apiParamsDonate,
        currency: points,
        token,
        member_name,
        member_phone,
        member_mail,
        invoiceItem,
        object_id: projectId,
        reason: location && location.pathname
      }

      const isDev = location && (location.host.includes('dev') || location.host.includes('localhost'))
      const urlDonate = isDev ? apiUrlDonateDev : apiUrlDonate
      return await axios.post(urlDonate, params)
    },
    async handleSubmitDonate({ donateData }) {
      try {
        await this.requestDonate(donateData)
        this.donateShowResult = true
        this.donateIsResultSuccess = true
      } catch(error) {
        this.donateShowResult = true
        this.donateIsResultSuccess = false
      }
    },
    handleBackToDonateForm() {
      this.donateShowResult = false
      this.donateIsResultSuccess = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  position fixed
  top 0
  left 0
  z-index 10000000 !important
</style>
