<template>
  <div class="election-news">
    <Landing class="election-news__landing"/>
    <Dashboard v-show="showDashboard" class="election-news__dashboard"/>
    <Footer v-show="showDashboard" class="election-news__footer"/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import { get } from 'lodash'

import Landing from './components/Landing.vue'
import Dashboard from './components/Dashboard.vue'
import Footer from './components/Footer.vue'

import module from 'src/store/modules/ElectionNews'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

const debug = require('debug')('ELECTION-NEWS:CLIENT:ElectionNews.vue')

import { PROJECTS_BELONGS_MM, MM_SITE_NAME, READR_SITE_NAME, MM_SITE_URL, READR_SITE_URL, MM_SITE_ASSETS_URL, READR_SITE_ASSETS_URL, } from 'src/constants'

const getMetaInfo = (vm) => {
  const { metaInfo } = vm.$options
  if (metaInfo) {
    return typeof metaInfo === 'function'
      ? metaInfo.call(vm)
      : metaInfo
  }
}

export default {
  metaInfo () {
    switch (this.mainViewStatus) {
      case 'single':
        return {
          title: '選舉新聞風向球 - 看關鍵字風向',
          description: '媒體在報導不同的政治人物時會有情緒差異嗎？針對同一位候選人，媒體報導的情緒在選舉前後會不會有所轉變？我們借助 Google 人工智慧來嘗試解答這些問題，並將持續追蹤至 2020 年。',
          metaUrl: 'election-news',
          metaImage: 'election-news/img/og-single.jpg'
        }
      case 'duel':
        return {
          title: '選舉新聞風向球 - 多關鍵字 PK',
          description: '媒體在報導不同的政治人物時會有情緒差異嗎？針對同一位候選人，媒體報導的情緒在選舉前後會不會有所轉變？我們借助 Google 人工智慧來嘗試解答這些問題，並將持續追蹤至 2020 年。',
          metaUrl: 'election-news',
          metaImage: 'election-news/img/og-duel.jpg'
        }
      default:
        return {
          title: '選舉新聞風向球',
          description: '媒體在報導不同的政治人物時會有情緒差異嗎？針對同一位候選人，媒體報導的情緒在選舉前後會不會有所轉變？我們借助 Google 人工智慧來嘗試解答這些問題，並將持續追蹤至 2020 年。',
          metaUrl: 'election-news',
          metaImage: 'election-news/img/og.jpg'
        }
    }
  },
  components: {
    Landing,
    Dashboard,
    Footer
  },
  watch: {
    '$route' (newValue, oldValue) {
      debug('route changed, fullPath:', this.$route.fullPath)

      const { params } = oldValue.params
      if (params) {
        this.$scrollTo('.content')
      }

      this.CLEAR_SOURCES_FILTER()

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
    },
    isDataFetched () {
      if (this.isDataFetched) {
        this.$scrollTo('.content')
      }
    }
  },
  data () {
    return {
      isStoreModuleLoaded: false
    }
  },
  computed: {
    ...mapState({
      data: state => state.data.graph
    }),
    ...mapGetters([
      'keywordIdFirst',
      'keywordIdSecond'
    ]),
    isDataFetched () {
      if (!this.isStoreModuleLoaded) { return false }

      const isDuel = this.$route.params.subparams !== undefined
      if (isDuel) {
        return (this.keywordIdFirst && this.keywordIdFirst in this.data) && (this.keywordIdSecond && this.keywordIdSecond in this.data)
      } else {
        return (this.keywordIdFirst && this.keywordIdFirst in this.data)
      }
    },
    showDashboard () {
      const { params } = this.$route.params
      return params !== undefined
    },
    mainViewStatus () {
      const { params, subparams } = this.$route.params
      if (subparams !== undefined) {
        return 'duel'
      }
      if (params !== undefined) {
        return 'single'
      }
      return null
    },
  },
  methods: {
    ...mapMutations([
      'CLEAR_SOURCES_FILTER'
    ]),
    setVueScrollOptions () {
      // init the scroll option for scrolling to chart
      Vue.use(VueScrollTo, {
        duration: 0,
        offset: -this.$store.state.viewport[1] / 2
      })
    }
  },
  mounted () {
    require('autotrack')
    ga('require', 'cleanUrlTracker')
    // ga('require', 'maxScrollTracker')
    ga('require', 'eventTracker', {
      fieldsObj: {
        nonInteraction: false
      }
    })
    ga('require', 'pageVisibilityTracker')
    ga('require', 'urlChangeTracker')
    ga('send', 'pageview')

    this.setVueScrollOptions()
    window.addEventListener('resize', this.setVueScrollOptions)
  },
  created () {
    this.$store.registerModule('ElectionNews', module)
    this.isStoreModuleLoaded = true
    
    // init custom navigate function
    this.$router.navigate = function ({ param = '', subparam = '' }) {
      debug('Navigation performed')
      this.push(`/project/election-news/${param}/${subparam}`)
    }
  },
  destroyed () {
    this.$store.unregisterModule('ElectionNews')

    window.removeEventListener('resize', this.setVueScrollOptions)
  }
}
</script>

<style lang="stylus" scoped>
.election-news
  &__footer
    margin 30px 0 0 0
</style>