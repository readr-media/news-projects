import { READR_SITE_ASSETS_URL, READR_SITE_URL, PROJECTS_GAID_BELONGS_MM, READR_SITE_NAME, SITE_NAME } from '../constants'
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
      const siteName = PROJECTS_GAID_BELONGS_MM.includes(project) ? SITE_NAME : READR_SITE_NAME
      
      if (title) {
        this.$ssrContext.title = `${title} - ${siteName}`
      }
      if (description) { 
        this.$ssrContext.description = description 
      }
      if (locale) {
        this.$ssrContext.locale = locale
      }
      if (metaUrl) {
        this.$ssrContext.metaUrl = READR_SITE_URL + metaUrl
      }
      if (metaImage) { 
        this.$ssrContext.metaImage = READR_SITE_ASSETS_URL + metaImage 
      }
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
      const siteName = PROJECTS_GAID_BELONGS_MM.includes(project) ? SITE_NAME : READR_SITE_NAME

      if (title) {
        document.title = `${title} - ${siteName}`
        document.head.querySelector(`meta[property='og:title']`).content = `${title} - ${siteName}`
      }
      if (description) {
        document.head.querySelector(`meta[name=description]`).content = description
        document.head.querySelector(`meta[property='og:description']`).content = description
      }
      if (locale) {
        document.head.querySelector(`meta[property='og:locale']`).content = locale
      }
      if (metaUrl) {
        document.head.querySelector(`meta[property='og:url']`).content = READR_SITE_URL + metaUrl
      }
      if (metaImage) {
        document.head.querySelector(`meta[property='og:image']`).content = READR_SITE_ASSETS_URL + metaImage
      }
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMetaInfoMixin
  : clientMetaInfoMixin
