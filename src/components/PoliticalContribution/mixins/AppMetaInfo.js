import { get, isEmpty, } from 'lodash'
import { PROJECTS_BELONGS_MM, MM_SITE_NAME, READR_SITE_NAME, MM_SITE_URL, READR_SITE_URL, MM_SITE_ASSETS_URL, READR_SITE_ASSETS_URL, } from '../../../constants'
import { DATA, SEVENTH_EIGHT_NINTH_VALID_CORP_NAMES } from '../constants'

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
      return decodeURI(get(this.$route.query, 'name', ''))
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
            title: `查找政商關係 - ${this.queryName} - 第 ${this.queryOrdinalNum} 屆`,
            description: `查找政商關係 - ${this.queryName} - 第 ${this.queryOrdinalNum} 屆`,
            metaUrl: `political-contribution/explore?name=${this.queryName}&ordinal=${this.queryOrdinalNum}`,
            metaImage: 'political-contribution/explore/ogimage-showLightbox.jpg'
          }
        } else {
          return {
            title: '查找政商關係',
            description: '查找政商關係',
            metaUrl: 'political-contribution/explore',
            metaImage: 'political-contribution/explore/ogimage.jpg'
          }
        }
      case 'story1':
        return {
          title: '選一次立委，金流超過 28 億！',
          description: '選一次立委，金流超過 28 億！',
          metaUrl: 'political-contribution/story1',
          metaImage: 'political-contribution/story1/ogimage.jpg'
        }
      case 'story2':
        return {
          title: '立委篇／老鳥與新秀，募款能力差了 6.6 倍',
          description: '立委篇／老鳥與新秀，募款能力差了 6.6 倍',
          metaUrl: 'political-contribution/story2',
          metaImage: 'political-contribution/story2/ogimage.jpg'
        }
      case 'story3':
        return {
          title: '企業篇／金權遊戲？翻開金主的投資名冊',
          description: '企業篇／金權遊戲？翻開金主的投資名冊',
          metaUrl: 'political-contribution/story3',
          metaImage: 'political-contribution/story3/ogimage.jpg'
        }
      case 'story4':
        return {
          title: '政治獻金開放了嗎？',
          description: '政治獻金開放了嗎？',
          metaUrl: 'political-contribution/story4',
          metaImage: 'political-contribution/story4/ogimage.jpg'
        }
      case 'story5':
        return {
          title: 'story5',
          description: 'story5',
          metaUrl: 'political-contribution/story5',
          metaImage: 'political-contribution/story5/ogimage.jpg'
        }
      case 'story6':
        return {
          title: 'story6',
          description: 'story6',
          metaUrl: 'political-contribution/story6',
          metaImage: 'political-contribution/story6/ogimage.jpg'
        }
      default:
        return {
          title: '政治獻金 2.0',
          description: '政治獻金 2.0',
          metaUrl: 'political-contribution',
          metaImage: 'political-contribution/ogimage.jpg'
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