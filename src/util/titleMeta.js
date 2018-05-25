import { READR_SITE_ASSETS_URL, READR_SITE_URL } from '../constants'

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
      
      if (title) {
        this.$ssrContext.title = `${title} - 讀＋READr`
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
      if (title) {
        document.title = `${title} - 讀＋READr`
        document.head.querySelector(`meta[property='og:title']`).content = `${title} - 讀＋READr`
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
