<template>
  <section class="dashboard">
    <DashboardMain/>
    <DashboardSidebar
      :class="[
        'dashboard__sidebar',
        { 'dashboard__sidebar--sidebar-shown': showAsideItems },
        { 'dashboard__sidebar--sidebar-toggled': showAsideItems && showSidebar }
      ]"
      @toggleHandle="TOGGLE_SIDEBAR"
    />
    <img
      :class="[
        'dashboard__to-top',
        { 'dashboard__to-top--sidebar-shown': showAsideItems },
        { 'dashboard__to-top--sidebar-toggled': showAsideItems && showSidebar }
      ]"
      src="/proj-assets/election-news/img/to-top.svg"
      alt=""
      @click="$scrollTo('.content')"
    >
    <Lightbox v-show="showLightbox">
      <Wrapper/>
    </Lightbox>
  </section>
</template>

<script>
import { debounce } from 'lodash'

import DashboardMain from './DashboardMain.vue'
import DashboardSidebar from './DashboardSidebar.vue'
import Lightbox from './Lightbox.vue'
import Wrapper from './lightbox/Wrapper.vue'

import { mapState as mapStateRoot, createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    DashboardMain,
    DashboardSidebar,
    Lightbox,
    Wrapper
  },
  watch: {
    '$route' () {
      this.fetchDataGraph()
    },
    showAsideItems () {
      if (this.showAsideItems && !this.hasFirstShown) {
        this.hasFirstShown = true
        this.setTimer()
      }
    },
    viewport () {
      this.debounceResize()
    }
  },
  data () {
    return {
      showAsideItems: false,
      hasFirstShown: false,
      delay: 2000
    }
  },
  computed: {
    ...mapStateRoot({
      viewport: state => state.viewport
    }),
    ...mapState({
      graphData: state => state.data.graph,
      keywords: state => state.mapping.keywords,
      showSidebar: state => state.showSidebar,
      showLightbox: state => state.showLightbox
    }),
    ...mapGetters([
      'keywordIdFirst',
      'keywordIdSecond'
    ])
  },
  methods: {
    ...mapActions([
      'FETCH_MAPPING_SOURCES',
      'FETCH_MAPPING_KEYWORDS',
      'FETCH_DATA_GRAPH',
      'FETCH_DATE_RANGE'
    ]),
    ...mapMutations([
      'TOGGLE_SIDEBAR',
      'SHOW_SIDEBAR',
      'HIDE_SIDEBAR'
    ]),
    fetchDataGraph () {
      if (this.keywordIdFirst !== undefined && !(this.keywordIdFirst in this.graphData)) {
        this.FETCH_DATA_GRAPH(this.keywordIdFirst)
      }
      if (this.keywordIdSecond !== undefined && !(this.keywordIdSecond in this.graphData)) {
        this.FETCH_DATA_GRAPH(this.keywordIdSecond)
      }
    },
    createScroller () {
      require('intersection-observer')
      const scrollama = require('scrollama')
      this.scroller = scrollama()

      this.scroller
        .setup({
          step: '.dashboard',
        })
        .onStepEnter(({element, index, direction}) => {
          this.showAsideItems = true
        })
        .onStepExit(({element, index, direction}) => {
          this.showAsideItems = false
        })
    },
    scrollerResize () {
      this.scroller.resize()
    },
    setTimer () {
      this.SHOW_SIDEBAR()
      if (this._timer) {
        clearTimeout(this._timer)
      }
      this._timer = setTimeout(() => {
        this.HIDE_SIDEBAR()
      }, this.delay)
    }
  },
  beforeMount () {
    this.FETCH_DATE_RANGE()
    this.FETCH_MAPPING_SOURCES()
    this.FETCH_MAPPING_KEYWORDS()
    .then(() => {
      this.fetchDataGraph()
    })
  },
  mounted () {
    this.createScroller()
    this.debounceResize = debounce(this.scrollerResize, 500)
  }
}
</script>

<style lang="stylus" scoped>
.dashboard
  &__sidebar
    position fixed
    top 0
    right -120px
    transition right .25s ease-out
    &--sidebar-shown
      right -90px
    &--sidebar-toggled
      right 0
      & >>> .sidebar-wrapper__arrow
        transform rotate(225deg)
        left -13px
  &__to-top
    position fixed
    right -30px
    bottom 10px
    width 27px
    transition right .25s ease-out
    &--sidebar-shown
      right calc(10px + 10px)
    &--sidebar-toggled
      right calc(100px + 10px)
</style>