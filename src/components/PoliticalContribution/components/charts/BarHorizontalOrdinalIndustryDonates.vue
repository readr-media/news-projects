<template>
  <div :style="{ height: `${currentHeight}px` }">
    <div
      class="chart bar-horizontal-ordinal-industry-chart"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    ordinal: {
      type: String,
      default: '',
    },
    legends: {
      type: Array,
      default () {
        return []
      },
    },
    data: {
      type: Object,
      required: true,
    },
    isNewData: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    shouldVisualizeOrdinal () {
      if (this.isChartReady) {
        this.updateScales()
        this.visualize()
      }
    }
  },
  data () {
    const defaultWidth = 900
    const defaultHeight = 500
    const defaultAspect = defaultWidth / defaultHeight

    return {
      defaultWidth,
      defaultHeight,
      defaultAspect,
      currentWidth: defaultWidth,
      currentHeight: defaultHeight,

      //
      outerWidth: undefined,
      outerHeight: undefined,
      margin: undefined,
      innerWidth: undefined,
      innerHeight: undefined,
      svg: undefined,
      xScale: undefined,
      yScale: undefined,
      yScaleAxisTick: undefined,
      xAxis: undefined,
      yAxis: undefined,
      yAxisTick: undefined,
      topWrappingLineAxis: undefined
    }
  },
  computed: {
    containerSelector () {
      return `#${this.$el.id}`
    },
    chartSelector () {
      return `${this.containerSelector} .chart`
    },
    ...mapGetters([
      'ordinalRadioPicked',
    ]),
    shouldVisualizeOrdinal () {
      return this.ordinal === '' ? this.ordinalRadioPicked : this.ordinal
    },
    dataCurrentOrdinal () {
      return this.data[this.shouldVisualizeOrdinal]
    },
    isChartReady () {
      return this.svg !== undefined
    },
  },
  methods: {
    init () {
      this.outerWidth = this.defaultWidth
      this.outerHeight = this.defaultHeight

      this.margin = this.isNewData ? { top: 0, right: 100, bottom: 30, left: 250, } : { top: 0, right: 90, bottom: 30, left: 80, }
      this.innerWidth = this.outerWidth - this.margin.right - this.margin.left
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom

      this.svg =
        d3.select(this.chartSelector)
          .append('svg')
            .attr('width', this.outerWidth)
            .attr('height', this.outerHeight)
          .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      // init scales
      this.xScale = 
        d3.scaleLinear()
          .domain([ 0, d3.max(this.dataCurrentOrdinal, d => d.money) ])
          .range([ 0,  this.innerWidth ])
      this.yScale = 
        d3.scaleBand()
          .domain(this.dataCurrentOrdinal.map(industry => industry.name))
          .range([ 0, this.innerHeight ])
          .paddingInner(0.5)
          .paddingOuter(0.25)
      this.yScaleAxisTick =
        d3.scaleBand()
          .domain([...Array(this.dataCurrentOrdinal.length - 1).keys()])
          .range([ this.innerHeight, 0 ])
          .paddingInner(1)
          .paddingOuter(1)

      // init Axis
      this.xAxis = 
        d3.axisBottom(this.xScale)
          .ticks(5)
          .tickFormat((d, i) => i === this.xScale.ticks(5).length - 1 ? `${(d / 10000).toLocaleString()}萬元` : (d / 10000).toLocaleString())
          .tickSize([ -this.innerHeight ])
          .tickPadding(20)
      this.svg
        .append('g')
          .attr('class', 'bar-horizontal-ordinal-industry-chart__axis bar-horizontal-ordinal-industry-chart__x-axis')
          .attr('transform', `translate(0, ${this.innerHeight})`)
          .call(this.xAxis)
      this.yAxis =
        d3.axisLeft(this.yScale)
          .tickSizeInner(0)
          .tickPadding(10)
      this.svg
        .append('g')
          .attr('class', 'bar-horizontal-ordinal-industry-chart__axis bar-horizontal-ordinal-industry-chart__y-axis')
          .call(this.yAxis)
      this.yAxisTick =
        d3.axisLeft(this.yScaleAxisTick)
          .tickSize(10)
          .tickFormat('')
      this.svg
        .append('g')
          .attr('class', 'bar-horizontal-ordinal-industry-chart__axis bar-horizontal-ordinal-industry-chart__y-axis-tick')
          .call(this.yAxisTick)
      this.topWrappingLineAxis =
        d3.axisRight(this.yScaleAxisTick)
          .tickSizeOuter(this.innerWidth)
          .tickSizeInner(0)
          .tickFormat('')
      this.svg
        .append('g')
          .attr('class', 'bar-horizontal-ordinal-industry-chart__axis bar-horizontal-ordinal-industry-chart__horizontal-line-axis')
          .call(this.topWrappingLineAxis)
    },
    updateScales () {
      this.xScale
        .domain([ 0, d3.max(this.dataCurrentOrdinal, d => d.money) ])
        .range([ 0,  this.innerWidth ])
      this.yScale
        .domain(this.dataCurrentOrdinal.map(industry => industry.name))
        .range([ 0, this.innerHeight ])

      this.xAxis.scale(this.xScale)
      this.yAxis.scale(this.yScale)
    },
    visualize () {
      // Data joins
      const bars =
        this.svg
          .selectAll('.bar-horizontal-ordinal-industry-chart__bar')
          .data(this.dataCurrentOrdinal)
      const hints =
        this.svg
          .selectAll('.bar-horizontal-ordinal-industry-chart__hint')
          .data(this.dataCurrentOrdinal)

      // Update + Enter
      bars
        .enter()
        .append('rect')
          .attr('class', 'bar-horizontal-ordinal-industry-chart__bar')
        .merge(bars)
          .attr('width', d => this.xScale(d.money))
          .attr('height', this.yScale.bandwidth())
          .attr('y', d => this.yScale(d.name))
          .attr('fill', (d, i) => i % 2 !== 0 ? '#666' : '#9e005d')
      hints
        .enter()
        .append('text')
          .attr('class', 'bar-horizontal-ordinal-industry-chart__hint')
        .merge(hints)
          .attr('x', d => this.xScale(d.money) + 10)
          .attr('y', d => this.yScale(d.name) + this.yScale.bandwidth() / 2 + 5)
          .text(d => d.money >= 100000000 ? `${(d.money / 100000000).toFixed(2)} 億元` : `${Number((d.money / 10000).toFixed(0)).toLocaleString()} 萬元`)

      // Exit
      bars.exit().remove()
      hints.exit().remove()

      this.svg
        .select('.bar-horizontal-ordinal-industry-chart__x-axis')
        .call(this.xAxis)
      this.svg
        .select('.bar-horizontal-ordinal-industry-chart__y-axis')
        .call(this.yAxis)
    },
    calculateCurrentDimensions () {
      const containerWidth = this.$el.getBoundingClientRect().width
      this.currentWidth = containerWidth
      this.currentHeight = Math.round(containerWidth / this.defaultAspect)
    },
  },
  mounted () {
    this.init()
    this.visualize()
    this.calculateCurrentDimensions()
  }
}
</script>

<style lang="stylus">
.chart
  transform-origin 0% 0%

.bar-horizontal-ordinal-industry-chart
  &__hint
    font-weight 400
    fill black
  &__axis
    path, line
      stroke lightgray
      shape-rendering crispEdges
  &__y-axis
    .tick
      text
        font-size 14px
</style>
