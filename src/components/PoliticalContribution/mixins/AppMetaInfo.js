import { get, isEmpty, } from 'lodash'
import { PROJECTS_BELONGS_MM, MM_SITE_NAME, READR_SITE_NAME, MM_SITE_URL, READR_SITE_URL, MM_SITE_ASSETS_URL, READR_SITE_ASSETS_URL, } from '../../../constants'
import { DATA, SEVENTH_EIGHT_NINTH_VALID_CORP_NAMES } from '../constants'
import { structuredDataScript, } from '../constants/structuredData'

const titleHeadings = '數讀政治獻金 2.0'

const getMetaInfo = (vm) => {
  const { metaInfo } = vm.$options
  if (metaInfo) {
    return typeof metaInfo === 'function'
      ? metaInfo.call(vm)
      : metaInfo
  }
}

export default {
  computed: {
    slug () {
      return get(this.$route, [ 'params', 'params' ], '')
    },
    isUrlQueryValid () {
      return isEmpty(this.$route.query) || (('name' in this.$route.query) && ('ordinal' in this.$route.query))
    },
    showLightbox () {
      return !isEmpty(this.$route.query) && this.isUrlQueryValid
    },
    // TODO: refactor to comm logics
    queryOrdinalNum () {
      return get(this.$route.query, 'ordinal', -1)
    },
    queryOrdianlString () {
      switch (this.queryOrdinalNum) {
        case '7':
          return 'seventh'
        case '8':
          return 'eighth'
        case '9':
          return 'ninth'
        default:
          return ''
      }
    },
    isQueryOrdinalNumValid () {
      return ['7', '8', '9'].includes(this.queryOrdinalNum)
    },
    queryName () {
      return decodeURI(encodeURI(get(this.$route.query, 'name', '')))
    },
    isQueryNameValid () {
      const candidateNames = get(DATA, [ this.queryOrdianlString, 'candidateNames' ], [])
      const corpNames = SEVENTH_EIGHT_NINTH_VALID_CORP_NAMES

      return candidateNames.includes(this.queryName) || corpNames.includes(this.queryName)
    }
  },
  metaInfo () {
    switch (this.slug) {
      case 'explore':
        if (this.showLightbox && this.isQueryOrdinalNumValid && this.isQueryNameValid) {
          return {
            title: `${titleHeadings}：立委${this.queryName}第 ${this.queryOrdinalNum} 屆的金主名冊`,
            description: `立委${this.queryName}的在 2012 年至 2016 年中 3 次選舉的政治獻金公開資料中，收到哪些集團的捐贈？又集中在哪些產業？快來看看 READr 為你整理的資料。`,
            metaUrl: `political-contribution/explore?name=${this.queryName}&ordinal=${this.queryOrdinalNum}`,
            metaImage: 'political-contribution/ogimgs/ogimage-explore.jpg',
            customScript: structuredDataScript
          }
        } else {
          return {
            title: `${titleHeadings}：查找政商關係`,
            // TODO: pending
            description: '',
            metaUrl: 'political-contribution/explore',
            metaImage: 'political-contribution/ogimgs/ogimage-explore.jpg',
            customScript: structuredDataScript
          }
        }
      // TODO: pending 
      case 'dashboard':
        return {
          title: `${titleHeadings}：圖表區`,
          description: '',
          metaUrl: 'political-contribution/dashboard',
          metaImage: 'political-contribution/ogimgs/ogimage.jpg',
          customScript: structuredDataScript
        }
      case 'story1':
        return {
          title: `${titleHeadings}：選一次立委，金流超過 28 億！`,
          // TODO: pending
          description: '',
          metaUrl: 'political-contribution/story1',
          metaImage: 'political-contribution/ogimgs/ogimage-story1.jpg',
          customScript: structuredDataScript
        }
      case 'story2':
        return {
          title: `${titleHeadings}：立委篇／老鳥與新秀，募款能力差了 6.6 倍`,
          // TODO: pending
          description: '',
          metaUrl: 'political-contribution/story2',
          metaImage: 'political-contribution/ogimgs/ogimage-story2.jpg',
          customScript: structuredDataScript
        }
      case 'story3':
        return {
          title: `${titleHeadings}：企業篇／金權遊戲？翻開金主的投資名冊`,
          // TODO: pending
          description: '',
          metaUrl: 'political-contribution/story3',
          metaImage: 'political-contribution/ogimgs/ogimage-story3.jpg',
          customScript: structuredDataScript
        }
      case 'story4':
        return {
          title: `${titleHeadings}：政治獻金開放了嗎？`,
          // TODO: pending
          description: '',
          metaUrl: 'political-contribution/story4',
          metaImage: 'political-contribution/ogimgs/ogimage-story4.jpg',
          customScript: structuredDataScript
        }
      case 'story5':
        return {
          title: `${titleHeadings}：資料怎麼看？立委政治獻金的五個發現`,
          description: '誰一直是立委的大金主？原來企業對特定政黨的捐獻行為也不是鐵板一塊？我們找出 2008 年至 2016 年 3 次立委選舉中從資料發現的有趣現象。',
          metaUrl: 'political-contribution/story5',
          metaImage: 'political-contribution/ogimgs/ogimage-story5.jpg',
          customScript: structuredDataScript
        }
      case 'story6':
        return {
          title: `${titleHeadings}：政治獻金資料到底解密了什麼？`,
          description: '延續 2014 年鄉民解密未酬的壯志，我們在 2017 年將政治獻金數位化專案復活，《政治獻金法》修法也終於通過。',
          metaUrl: 'political-contribution/story6',
          metaImage: 'political-contribution/ogimgs/ogimage-story6.jpg',
          customScript: structuredDataScript
        }
      default:
        return {
          title: `${titleHeadings}：翻開立委（八年份）的金主投資名冊`,
          description: '誰一直是立委的大金主？原來企業捐獻的政治獻金也會藍綠兩邊押寶？READr 藉由鄉民的幫助擴大了立委政治獻金資料庫，來看看 2008 年至 2016 年 3 次立委選舉中候選人與企業之間的金錢流動。',
          metaUrl: 'political-contribution',
          metaImage: 'political-contribution/ogimgs/ogimage.jpg',
          customScript: structuredDataScript
        }
    }
  },

  // Dynamically change metaInfo while client-side router navigations, espically document title for a better user experience
  watch: {
    '$route.fullPath' () {
      const metaInfo = getMetaInfo(this)

      if (metaInfo) {
        const project = get(this.$route, 'params.project')

        const siteName = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_NAME : READR_SITE_NAME
        const title = metaInfo.title ? `${metaInfo.title} - ${siteName}` : `${siteName}`
        const description = metaInfo.description || ` `
        const metaUrl = metaInfo.metaUrl || ` `
        const metaImage = metaInfo.metaImage || ` `

        document.title = title
        document.head.querySelector(`meta[property='og:title']`).content = title
        document.head.querySelector(`meta[name=description]`).content = description
        document.head.querySelector(`meta[property='og:description']`).content = description
        document.head.querySelector(`meta[property='og:url']`).content = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_URL + metaUrl : READR_SITE_URL + metaUrl
        document.head.querySelector(`meta[property='og:image']`).content = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_ASSETS_URL + metaImage : READR_SITE_ASSETS_URL + metaImage
      }
    }
  }
}