<template>
  <section class="dashboard">
    <DashboardMain class="dashboard__main"/>
    <DashboardSidebar
      :class="[
        'dashboard__sidebar',
        { 'dashboard__sidebar--sidebar-shown': showAsideItems },
        { 'dashboard__sidebar--bottom': asideShouldBottom },
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
    hasFirstShown (newValue, oldValue) {
      if (!oldValue && newValue) {
        this.SET_HAS_FIRST_SHOWN_SIDEBAR(true)
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
      asideShouldBottom: false,
      delay: 2000
    }
  },
  computed: {
    ...mapStateRoot({
      viewport: state => state.viewport,
      isMobile: state => state.useragent.isMobile,
      isDesktop: state => state.useragent.isDesktop,
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
      'FETCH_DATE_RANGE',
      'FETCH_DATA_ABBR'
    ]),
    ...mapMutations([
      'TOGGLE_SIDEBAR',
      'SHOW_SIDEBAR',
      'HIDE_SIDEBAR',
      'SET_HAS_FIRST_SHOWN_SIDEBAR'
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
          offset: this.isMobile ? 0.5 : 0,
        })
        .onStepEnter(({element, index, direction}) => {
          this.showAsideItems = true
        })
        .onStepExit(({element, index, direction}) => {
          this.showAsideItems = false
        })
    },
    createScrollerDesktop () {
      require('intersection-observer')
      const scrollama = require('scrollama')
      this.scrollerDesktop = scrollama()

      this.scrollerDesktop
        .setup({
          step: '.dashboard',
          offset: 1,
        })
        .onStepEnter(({element, index, direction}) => {
          if (direction === 'up') {
            this.showAsideItems = true
          }
          this.asideShouldBottom = false
        })
        .onStepExit(({element, index, direction}) => {
          this.showAsideItems = false

          if (direction === 'down') {
            this.asideShouldBottom = true
          }
        })
    },
    scrollerResize () {
      this.scroller.resize()
      if (this.isDesktop) {
        this.scrollerDesktop.resize()
      }
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
    this.FETCH_DATA_ABBR()
  },
  mounted () {
    this.createScroller()
    if (this.isDesktop) {
      this.createScrollerDesktop()
    }
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
    cursor pointer
    &--sidebar-shown
      right calc(10px + 10px)
    &--sidebar-toggled
      right calc(100px + 10px)

@media (min-width 1024px)
  .dashboard
    position relative
    &__main
      max-width 500px
      margin 0 auto
    &__sidebar
      width 300px !important
      position absolute
      top 0
      right 0
      &--sidebar-shown
        position fixed
        top 0
        right 0
      &--bottom
        top initial
        bottom 0
    &__to-top
      display none
      transition none
      width 49px
      &--sidebar-shown
        display initial
        right 324px
</style>