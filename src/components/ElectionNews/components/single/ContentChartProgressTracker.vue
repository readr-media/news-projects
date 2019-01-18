<template>
  <div
    class="tracker-wrapper"
    :style="{ top: `${offset}px`, height: `calc(100% - ${offset}px)` }"
  >
    <div class="scroll-steps">
      <div
        v-for="(date, i) in dateRangeDays"
        :key="date"
        class="scroll-steps__step"
        :style="{ transform: `translate(${get(transforms, [ i, 0 ], 0)}px, ${get(transforms, [ i, 1 ], 0)}px)` }"
        v-text="date"
      >
      </div>
    </div>
    <div
      v-show="showTracker"
      class="tracker"
    >
      <div
        class="tracker__line line"
        :style="{ top: `calc(50vh - ${trackerLineOffset}px)` }"
      >
        <div class="line__triangle"></div>
        <div class="line__line"></div>
        <img
          :class="[ 'line__hamburger', { 'line__hamburger--sidebar-toggled': showSidebar } ]"
          src="/proj-assets/election-news/img/hamburger.svg"
          alt=""
          @click="TOGGLE_LIGHTBOX"
        >
      </div>
      <Tooltip
        :class="[ 'tracker__tooltip', { 'tracker__tooltip--show': showTooltip } ]"
        :style="{ top: `calc(50vh - ${tooltipOffset}px)` }"
      />
    </div>
  </div>
</template>

<script>
import { get, debounce } from 'lodash'
import * as d3 from 'd3'
import moment from 'moment'

import Tooltip from './Tooltip.vue'

import { mapState as mapStateRoot, createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

import { chartHeight, marginSingle, translateOffsetSingle } from '../../costants'

export default {
  props: {
    yTickTransforms: {
      type: Array,
      required: true
    }
  },
  components: {
    Tooltip
  },
  watch: {
    viewport () {
      this.debounceResize()
    }
  },
  data () {
    return {
      offset: 14 + 16.66 / 2,
      showTracker: false,
      showTooltip: false,
      trackerLineOffset: 0,
      tooltipOffset: 0,
    }
  },
  computed: {
    ...mapStateRoot({
      viewport: state => state.viewport,
      isDesktop: state => state.useragent.isDesktop
    }),
    ...mapState({
      showSidebar: state => state.showSidebar,
      dateRange: state => state.data.date,
    }),
    ...mapGetters([
      'dateRangeDays',
    ]),
    transforms () {
      return this.yTickTransforms.map(translate => {
        const split = translate.split(',')
        const x = split[0].replace('translate(', '')
        const y = split[1].replace(')', '')
        return [x, y]
      })
    }
  },
  methods: {
    ...mapMutations([
      'TOGGLE_LIGHTBOX',
      'SET_STEP_INDEX'
    ]),
    get,
    createScrollerAxis () {
      require('intersection-observer')
      const scrollama = require('scrollama')
      this.scrollerAxis = scrollama()

      this.scrollerAxis
        .setup({
          step: '.tracker-wrapper',
          // debug: true
        })
        .onStepEnter(({element, index, direction}) => {
          this.showTracker = true
        })
        .onStepExit(({element, index, direction}) => {
          this.showTracker = false
        })
    },
    createScrollerSteps () {
      require('intersection-observer')
      const scrollama = require('scrollama')
      this.scrollerSteps = scrollama()

      this.scrollerSteps
        .setup({
          step: '.scroll-steps__step',
          // debug: true
        })
        .onStepEnter(({element, index, direction}) => {
          this.SET_STEP_INDEX(index)
          this.setTooltipTimer()
        })
        .onStepExit(({element, index, direction}) => {

        })
    },
    scrollerResize () {
      // Maybe we should enable this at desktop
      if (this.isDesktop) {
        this.scrollerAxis.resize()
        this.scrollerSteps.resize()
      }
    },

    setTooltipTimer () {
      this.showTooltip = true
      if (this._timer) {
        clearTimeout(this._timer)
      }
      this._timer = setTimeout(() => {
        this.showTooltip = false
      }, 3000)
    },
  },
  mounted () {
    this.createScrollerAxis()
    this.createScrollerSteps()
    this.debounceResize = debounce(this.scrollerResize, 500)

    this.trackerLineOffset = this.isDesktop ? 18 : 46
    this.tooltipOffset = this.trackerLineOffset - 30
  }
}
</script>

<style lang="stylus" scoped>
.tracker-wrapper
  position absolute
  // top 0
  left 0
  width 50px
  height 100%
  // border 1px solid red

.scroll-steps
  position relative
  &__step
    font-size 12px
    position absolute
    top 0
    left 0
    opacity 0
    // opacity 1
    pointer-events none

.tracker
  &__tooltip
    position fixed
    // top calc(50vh - 26px)
    left calc((100vw - 150px + 50px) / 2)
    opacity 0
    transition opacity .25s ease-out
    &--show
      opacity 1
    
.line
  position fixed
  // top calc(50vh - 46px)
  left 60px
  width calc(100vw - 60px)
  height 20px
  &__triangle
    position absolute
    top calc((20px - 10px) / 2)
    left 0
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 8.7px;
    border-color: transparent transparent transparent #4a90e2;
  &__line
    position absolute
    left 10px
    top 50%
    width 100%
    height 1px
    background-color #eae9eb
  &__hamburger
    position absolute
    right calc(10px + 10px)
    height 100%
    cursor pointer
    transition right .25s ease-out
    &--sidebar-toggled
      right calc(100px + 10px)

@media (min-width 1024px)
  .tracker
    &__tooltip
      position fixed
      left calc((100vw - 150px) / 2)

  .line
    left calc((100vw - 500px) / 2 + 43px)
    width 450px
    height 40px
    &__triangle
      top calc((40px - 20px) / 2)
      border-width: 10px 0 10px 17.3px;
    &__line
      left 18px
    &__hamburger
      right -20px
</style>