<template>
  <ReadrAppHeader
    id="readr-app-header"
    :url="locationUrl"
    :catalog-list="catalogList"
    :donate-tappay-config="donateTappayConfig"
    :donate-user-profile="donateUserProfile"
    :donate-show-result="donateShowResult"
    :donate-is-depositing="donateIsDepositing"
    :donate-is-result-success="donateIsResultSuccess"
    @clickReadrLogo="handleClickReadrLogo"
    @clickCatalogItem="handleClickCatalogItem"
    @loadmore="handleLoadmore"
    @submitDonate="handleSubmitDonate"
    @backToDonateForm="handleBackToDonateForm"
    @startDeposit="handleDonateDepositing(true)"
    @finishDeposit="handleDonateDepositing(false)"
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
      donateIsDepositing: false,
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
    getPaymentUrl(donateType) {
      const isDev = location?.host?.match(/dev|localhost/g)
      const apiUrlMapping = {
        once: 'donate',
        subscription: 'subscriptions'
      }
      const url = isDev
        ? `http://dev.readr.tw/api/${apiUrlMapping[donateType]}`
        : `https://www.readr.tw/api/${apiUrlMapping[donateType]}`
      return url
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
    async requestSubscription(submitInfo) {
      return axios.post(this.getPaymentUrl(submitInfo.type), submitInfo.payload)
    },
    async requestDonateOnce(submitInfo) {
      const {
        points,
        token,
        member_name,
        member_phone,
        member_mail,
        invoiceItem
      } = submitInfo.payload.donateData
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
      return await axios.post(this.getPaymentUrl(submitInfo.type), params)
    },
    async handleSubmitDonate(submitInfo) {
      const requestStrategy = {
        once: this.requestDonateOnce,
        subscription: this.requestSubscription
      }
      try {
        await requestStrategy[submitInfo.type](submitInfo)
        this.donateShowResult = true
        this.donateIsResultSuccess = true
        this.donateIsDepositing = false
      } catch(error) {
        this.donateShowResult = true
        this.donateIsResultSuccess = false
        this.donateIsDepositing = false
      }
    },
    handleBackToDonateForm() {
      this.donateShowResult = false
      this.donateIsResultSuccess = false
    },
    handleDonateDepositing(isDepositing) {
      this.donateIsDepositing = isDepositing
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
