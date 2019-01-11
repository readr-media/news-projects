<template>
  <div class="election-news">
    <Landing/>
    <Dashboard v-if="showDashboard" class="election-news__dashboard"/>
    <Footer v-if="showDashboard" class="election-news__footer"/>
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
    }
  },
  computed: {
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
    this.setVueScrollOptions()
    window.addEventListener('resize', this.setVueScrollOptions)
  },
  created () {
    this.$store.registerModule('ElectionNews', module)

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