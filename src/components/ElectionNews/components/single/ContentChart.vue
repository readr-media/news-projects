<template>
  <div id="single" class="chart-wrapper">
    <ContentChartProgressTracker
      v-show="showProgressTracker"
      class="chart-wrapper__tracker"
      :yTickTransforms="yTickTransforms"
    />
    <svg class="chart" :height="chartHeight">
      <g class="chart__lines">
        <g class="chart__x-axis"></g>
        <g class="chart__y-axis"></g>
      </g>
    </svg>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import * as d3 from 'd3'
import { single } from '../../charts/single.js'

import ContentChartProgressTracker from './ContentChartProgressTracker.vue'

import { chartHeight } from '../../costants'

import { mapState as mapStateRoot, createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    ContentChartProgressTracker
  },
  watch: {
    graphDataKeywordFirstFiltered () {
      if (this.graphDataKeywordFirstFiltered !== undefined) {
        this.chart =
          single()
          .dateRange(Object.values(this.dateRange))
          .dateRangeDays(this.dateRangeDays)
          .colorState(this.colors)

        d3.select('.chart')
          .datum(this.graphDataKeywordFirstFiltered)
          .call(this.chart)
      }

      this.yTickTransforms = d3.selectAll('.chart__y-axis .tick').nodes().map(e => e.attributes.transform.value)
      this.showProgressTracker = true
    },
    vw () {
      this.debounceResize()
    }
  },
  data () {
    return {
      chartHeight,
      yTickTransforms: [],
      scrollerCreated: false,
      showProgressTracker: false,
      chart: undefined,
    }
  },
  computed: {
    ...mapStateRoot({
      vw: state => state.viewport[0]
    }),
    ...mapState({
      graphData: state => state.data.graph,
      filter: state => state.filter.sources,
      colors: state => state.colors,
      dateRange: state => state.data.date
    }),
    ...mapGetters([
      'graphDataKeywordFirstFiltered',
      'dateRangeDays'
    ]),
  },
  methods: {
    resize () {
      d3.select('.chart')
        .datum(this.graphDataKeywordFirstFiltered)
        .call(this.chart)
    }
  },
  created () {
    this.debounceResize = debounce(this.resize, 500)
  }
}
</script>

<style lang="stylus" scoped>
.chart-wrapper
  position relative

.chart
  width 100%
  // height 2000px
  // border 1px solid black
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
</style>