import { MM_FB_APP_ID, MM_FB_PAGE_ID, MM_SITE_NAME, PROJECTS_GAID_BELONGS_MM, READR_FB_APP_ID, READR_FB_PAGE_ID, READR_SITE_ASSETS_URL, READR_SITE_NAME, READR_SITE_URL, } from '../constants'
import _ from 'lodash'

function getMetaInfo (vm) {
  const { metaInfo } = vm.$options
  if (metaInfo) {
    return typeof metaInfo === 'function'
      ? metaInfo.call(vm)
      : metaInfo
  }
}

const serverMetaInfoMixin = {
  created () {
    const metaInfo = getMetaInfo(this)
    if (metaInfo) {
      const title = metaInfo.title
      const description = metaInfo.description
      const locale = metaInfo.locale || 'zh_TW'
      const metaUrl = metaInfo.metaUrl
      const metaImage = metaInfo.metaImage
      const project = _.get(this.$route, [ 'params', 'project' ])
      const siteName = PROJECTS_GAID_BELONGS_MM.includes(project) ? MM_SITE_NAME : READR_SITE_NAME
      const favicon = metaInfo.favicon
      const fbAppId = PROJECTS_GAID_BELONGS_MM.includes(project) ? MM_FB_APP_ID : READR_FB_APP_ID
      const fbPageId = PROJECTS_GAID_BELONGS_MM.includes(project) ? MM_FB_PAGE_ID : READR_FB_PAGE_ID
      
      this.$ssrContext.siteName = siteName
      
      if (title) {
        this.$ssrContext.title = `${title} - ${siteName}`
      }
      if (description) {
        this.$ssrContext.description = description
      }
      if (metaUrl) {
        this.$ssrContext.metaUrl = READR_SITE_URL + metaUrl
      }
      if (metaImage) {
        this.$ssrContext.metaImage = READR_SITE_ASSETS_URL + metaImage
      }
      if (favicon) {
        this.$ssrContext.favicon = favicon
      }
      this.$ssrContext.locale = locale
      this.$ssrContext.fbAppId = fbAppId
      this.$ssrContext.fbPageId = fbPageId
    }
  }
}

const clientMetaInfoMixin = {
  mounted () {
    const metaInfo = getMetaInfo(this)
    if (metaInfo) {
      const title = metaInfo.title
      const description = metaInfo.description
      const locale = metaInfo.locale || 'zh_TW'
      const metaUrl = metaInfo.metaUrl
      const metaImage = metaInfo.metaImage
      const project = _.get(this.$route, [ 'params', 'project' ])
      const siteName = PROJECTS_GAID_BELONGS_MM.includes(project) ? MM_SITE_NAME : READR_SITE_NAME
      const favicon = metaInfo.favicon
      const fbAppId = PROJECTS_GAID_BELONGS_MM.includes(project) ? MM_FB_APP_ID : READR_FB_APP_ID
      const fbPageId = PROJECTS_GAID_BELONGS_MM.includes(project) ? MM_FB_PAGE_ID : READR_FB_PAGE_ID

      document.head.querySelector(`meta[property='og:site_name']`).content = siteName

      if (title) {
        document.title = `${title} - ${siteName}`
        document.head.querySelector(`meta[property='og:title']`).content = `${title} - ${siteName}`
      }
      if (description) {
        document.head.querySelector(`meta[name=description]`).content = description
        document.head.querySelector(`meta[property='og:description']`).content = description
      }
      if (metaUrl) {
        document.head.querySelector(`meta[property='og:url']`).content = READR_SITE_URL + metaUrl
      }
      if (metaImage) {
        document.head.querySelector(`meta[property='og:image']`).content = READR_SITE_ASSETS_URL + metaImage
      }
      if (favicon) {
        document.head.querySelector(`link[rel='apple-touch-icon']`).href = favicon
        document.head.querySelector(`link[rel='shortcut icon']`).href = favicon
      }
      document.head.querySelector(`meta[property='og:locale']`).content = locale
      document.head.querySelector(`meta[property='fb:app_id']`).content = fbAppId
      document.head.querySelector(`meta[property='fb:pages']`).content = fbPageId
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMetaInfoMixin
  : clientMetaInfoMixin
