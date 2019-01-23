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

import Landing from './components/Landing.vue'
import Dashboard from './components/Dashboard.vue'
import Footer from './components/Footer.vue'

import module from 'src/store/modules/ElectionNews'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

const debug = require('debug')('ELECTION-NEWS:CLIENT:ElectionNews.vue')

export default {
  metaInfo () {
    return {
      title: 'ElectionNews',
      description: 'ElectionNews',
      metaUrl: 'election-news',
      metaImage: 'election-news/ogimage.jpg'
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
    }
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