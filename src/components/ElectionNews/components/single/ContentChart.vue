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
      vw: state => state.viewport[0]
    }),
    ...mapState({
      colors: state => state.colors,
      dateRange: state => state.data.date
    }),
    ...mapGetters([
      'graphDataKeywordFirstFiltered',
    ]),
  },
  methods: {
    resize () {
      d3.select('.chart')
        .datum(this.graphDataKeywordFirstFiltered)
        .call(this.chart)
    },
    visualize () {
      if (this.graphDataKeywordFirstFiltered !== undefined) {
        this.chart =
          single()
          .dateRange(Object.values(this.dateRange))
          .colorState(this.colors)

        d3.select('.chart')
          .datum(this.graphDataKeywordFirstFiltered)
          .call(this.chart)
      }

      this.yTickTransforms = d3.selectAll('.chart__y-axis .tick').nodes().map(e => e.attributes.transform.value)
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

@media (min-width 1024px)
  .chart
    &__x-axis
      & >>> .tick text
        font-size 14px
    &__y-axis
      & >>> .tick text
        font-size 14px
</style>