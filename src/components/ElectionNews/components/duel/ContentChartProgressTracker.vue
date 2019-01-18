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
        <div class="line__triangle line__triangle--left"></div>
        <div class="line__line line__line--left"></div>
        <div class="line__triangle line__triangle--right"></div>
        <div class="line__line line__line--right"></div>
        <!-- <img
          :class="[ 'line__hamburger', { 'line__hamburger--sidebar-toggled': showSidebar } ]"
          src="/proj-assets/election-news/img/hamburger.svg"
          alt=""
          @click="TOGGLE_LIGHTBOX"
        > -->
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
      // offset: 14 + 16.66 / 2,
      offset: 10 + 16.66 / 2,
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
      // 'TOGGLE_LIGHTBOX',
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

    this.trackerLineOffset = this.isDesktop ? 8 : 46
    this.tooltipOffset = this.trackerLineOffset - 20
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
    left calc((100vw - 200px) / 2)
    opacity 0
    transition opacity .25s ease-out
    &--show
      opacity 1
    
.line
  position fixed
  // top calc(50vh - 46px)
  left 0
  width calc(100vw - 10px)
  height 20px
  &__triangle
    position absolute
    top calc((20px - 10px) / 2)
    &--left
      left calc(50vw - 34px - 5px)
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 8.7px 5px 0;
      border-color: transparent #4a90e2 transparent transparent;
    &--right
      left calc(50vw - 34px + 34px + 37.41px * 0.5)
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 0 5px 8.7px;
      border-color: transparent transparent transparent #4a90e2;
  &__line
    position absolute
    top 50%
    height 1px
    background-color #eae9eb
    width calc(50vw - 34px - 6px)
    &--left
      left 0
    &--right
      right 0
  &__hamburger
    position absolute
    right calc(10px + 10px)
    height 100%
    cursor pointer
    transition right .25s ease-out
    &--sidebar-toggled
      right calc(100px + 10px)

@media (min-width 1024px)
  .line
    &__triangle
      &--left
        left calc(50vw - 34px)
      &--right
        left calc(50vw - 34px + 34px + 25px)
    &__line
      width calc(500px / 2 - 30px)
      &--left
        left calc((100vw - 500px) / 2 - 3px)
      &--right
        right calc((100vw - 500px) / 2 - 13px)
</style>