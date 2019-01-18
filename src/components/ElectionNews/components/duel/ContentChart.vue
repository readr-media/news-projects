<template>
  <div id="duel" class="chart-wrapper">
    <ContentChartProgressTracker
      v-show="showProgressTracker"
      class="chart-wrapper__tracker"
      :yTickTransforms="yTickTransforms"
    />
    <svg class="chart" :height="chartHeight">
      <g class="chart__left">
        <g class="chart__x-axis"></g>
        <g class="chart__y-axis"></g>
      </g>
      <g class="chart__right">
        <g class="chart__x-axis"></g>
        <g class="chart__y-axis"></g>
      </g>
    </svg>
  </div>
</template>

<script>
import { debounce, isEmpty } from 'lodash'
import * as d3 from 'd3'
import { duel } from '../../charts/duel.js'

import ContentChartProgressTracker from './ContentChartProgressTracker.vue'

import { chartHeight } from '../../costants'

import { mapState as mapStateRoot, createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    ContentChartProgressTracker
  },
  watch: {
    data () {
      this.visualize()
    },
    vw () {
      this.debounceResize()
    }
  },
  data () {
    return {
      chartHeight,
      yTickTransforms: [],
      showProgressTracker: false,
      chart: undefined,
    }
  },
  computed: {
    ...mapStateRoot({
      vw: state => state.viewport[0],
      isDesktop: state => state.useragent.isDesktop
    }),
    ...mapState({
      colors: state => state.colors,
      dateRange: state => state.data.date
    }),
    ...mapGetters([
      'graphDataKeywordFirstFiltered',
      'graphDataKeywordSecondFiltered',
    ]),
    isDataExist () {
      return !isEmpty(this.graphDataKeywordFirstFiltered) && !isEmpty(this.graphDataKeywordSecondFiltered)
    },
    data () {
      return [ this.graphDataKeywordFirstFiltered, this.graphDataKeywordSecondFiltered ]
    },
  },
  methods: {
    resize () {
      d3.select('.chart')
        .datum(this.data)
        .call(this.chart)
    },
    visualize () {
      if (this.isDataExist) {
        this.chart =
          duel()
          .dateRange(Object.values(this.dateRange))
          .colorState(this.colors)
          .isDesktop(this.isDesktop)

        d3.select('.chart')
          .datum(this.data)
          .call(this.chart)
      }

      this.yTickTransforms = d3.selectAll('.chart__right .chart__y-axis .tick').nodes().map(e => e.attributes.transform.value)
      this.showProgressTracker = true
    }
  },
  created () {
    this.debounceResize = debounce(this.resize, 500)
  },
  mounted () {
    this.visualize()
  }
}
</script>

<style lang="stylus" scoped>
.chart-wrapper
  position relative
  
.chart
  width 100%
  &__x-axis
    & >>> .domain
      display none
    & >>> .tick line
      stroke #eae9eb
    & >>> .tick text
      font-size 10px
      fill #999999
  &__y-axis
    & >>> .domain
      display none
    & >>> .tick line
      display none
    & >>> .tick text
      font-size 12px
      fill #999999

.chart__left
  .chart__y-axis
    display none

@media (min-width 1024px)
  .chart
    &__x-axis
      & >>> .tick text
        font-size 14px
    &__y-axis
      & >>> .tick text
        font-size 14px
</style>