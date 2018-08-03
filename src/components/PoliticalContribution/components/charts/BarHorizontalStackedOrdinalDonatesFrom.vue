<template>
  <div :style="{ height: `${currentHeight}px` }">
    <div
      class="chart bar-horizontal-stacked-ordinal-donates-from-chart"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
      <template v-if="isChartReady">
        <AppChartLegends class="bar-horizontal-stacked-ordinal-donates-from-chart__legends" :legends="legends"/>
      </template>
    </div>
  </div>
</template>

<script>
import { isNaN, isEmpty } from 'lodash'
import * as d3 from 'd3'

import AppChartLegends from './AppChartLegends.vue'

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
      type: Array,
      required: true,
    },
  },
  components: {
    AppChartLegends
  },
  data () {
    const defaultWidth = 900
    const defaultHeight = 275
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
      layers: undefined,
      xScale: undefined,
      yScale: undefined,
      colorScale: undefined,
      yAxis: undefined,
    }
  },
  computed: {
    containerSelector () {
      return `#${this.$el.id}`
    },
    chartSelector () {
      return `${this.containerSelector} .chart`
    },
    isChartReady () {
      return this.svg !== undefined
    },
    dataOrdinalFiltered () {
      return isEmpty(this.ordinal) ? this.data : this.data.filter(d => d.ordinal === this.ordinal)
    }
  },
  methods: {
    init () {
      this.outerWidth = this.defaultWidth
      this.outerHeight = this.defaultHeight

      this.margin = window.innerWidth > 1024 ? { top: 0, right: 0, bottom: 0, left: 100, } : { top: 0, right: 0, bottom: 0, left: 0, }
      this.innerWidth = this.outerWidth - this.margin.right - this.margin.left
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom

      this.svg =
        d3.select(this.chartSelector)
          .append('svg')
            .attr('width', this.outerWidth)
            .attr('height', this.outerHeight)
          .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      const stack = 
        d3.stack()
          .keys([ '營利事業', '個人', '政黨', '人民團體', '匿名', '其他' ])
          .offset(d3.stackOffsetExpand)
      this.layers = stack(this.dataOrdinalFiltered)

      this.xScale = 
        d3.scaleLinear()
          // default domain is [ 0, 1 ]
          .range([ 0,  this.innerWidth ])
      this.yScale =
        d3.scaleBand()
          .domain(this.dataOrdinalFiltered.map(ordinal => ordinal.ordinalString))
          .range([ 0, this.innerHeight ])
          .padding(window.innerWidth > 1024 ? (isEmpty(this.ordinal) ? 0.4 : 0.6) : 0.6)
      this.colorScale =
        d3.scaleOrdinal()
          .domain([ 0, 1, 2, 3, 4, 5, ])
          .range([ '#9e005d', '#000000', '#636363', '#a8a8a8', '#c3c3c3', '#e6e5e5', ])

      if (window.innerWidth > 1024) {
        this.yAxis = d3.axisLeft(this.yScale)
        this.svg
          .append('g')
          .attr('class', 'bar-horizontal-stacked-ordinal-donates-from-chart__yAxis')
          .call(this.yAxis)
      } else {
        if (this.ordinal === 'seventh' || this.ordinal === '') {
          this.svg
            .append('text')
              .attr('x', () => this.xScale(0.5))
              .attr('y', () => this.yScale('第七屆') - 40)
              .attr('text-anchor', 'middle')
              .attr('alignment-baseline', 'central')
              .style('font-size', '32px')
              .text('第七屆')
        }
        if (this.ordinal === 'eighth' || this.ordinal === '') {
          this.svg
            .append('text')
              .attr('x', () => this.xScale(0.5))
              .attr('y', () => this.yScale('第八屆') - 40)
              .attr('text-anchor', 'middle')
              .attr('alignment-baseline', 'central')
              .style('font-size', '32px')
              .text('第八屆')
        }
        if (this.ordinal === 'ninth' || this.ordinal === '') {
          this.svg
            .append('text')
              .attr('x', () => this.xScale(0.5))
              .attr('y', () => this.yScale('第九屆') - 40)
              .attr('text-anchor', 'middle')
              .attr('alignment-baseline', 'central')
              .style('font-size', '32px')
              .text('第九屆')
        }
      }
    },
    visualize () {
      // Data joins
      const layers =
        this.svg
          .selectAll('.bar-horizontal-stacked-ordinal-donates-from-chart__layer')
          .data(this.layers)

      // Update + Enter
      const layer =
        layers
          .enter()
          .append('g')
            .attr('class', 'bar-horizontal-stacked-ordinal-donates-from-chart__layer')
            .style('fill', (d, i) => this.colorScale(i))
      layer
        .selectAll('.bar-horizontal-stacked-ordinal-donates-from-chart__bar')
        .data(d => d)
        .enter()
        .append('rect')
          .attr('class', 'bar-horizontal-stacked-ordinal-donates-from-chart__bar')
          .attr('x', d => this.xScale(d[0]))
          .attr('y', d => this.yScale(d.data.ordinalString))
          .attr('height', this.yScale.bandwidth())
          .attr('width', d => !isNaN(d[1]) ? this.xScale(d[1]) - this.xScale(d[0]) : 0)

      layer
        .selectAll('.bar-horizontal-stacked-ordinal-donates-from-chart__hint')
        .data(d => d)
        .enter()
        .append('text')
          .attr('class', 'bar-horizontal-stacked-ordinal-donates-from-chart__hint')
          .attr('x', d => !isNaN(d[1]) ? this.xScale(d[0]) + (this.xScale(d[1]) - this.xScale(d[0])) / 2 : 0)
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'central')
          .attr('y', d => this.yScale(d.data.ordinalString) + this.yScale.bandwidth() / 2)
          .text(d => {
            const percentage = d[1] - d[0]
            const showPercentage = d[1] - d[0] > 0.10
            if (!isNaN(percentage) && showPercentage) {
              return `${(percentage * 100).toFixed(0)}%`
            }
          })
          .style('fill', 'white')
    },
    calculateCurrentDimensions () {
      const containerWidth = this.$el.getBoundingClientRect().width
      this.currentWidth = containerWidth
      this.currentHeight = Math.round(containerWidth / this.defaultAspect)
    },
  },
  beforeMount () {
    this.defaultHeight = window.innerWidth > 1024 ? 275 : 800
    this.defaultAspect = this.defaultWidth / this.defaultHeight
    this.currentHeight = this.defaultHeight
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

.bar-horizontal-stacked-ordinal-donates-from-chart
  &__hint
    font-size 24px
  &__yAxis
    .domain
      opacity 0
    .tick
      line
        opacity 0
      text
        font-size 30px

@media (max-width 1024px)
  .bar-horizontal-stacked-ordinal-donates-from-chart
    &__hint
      font-size 32px
</style>

