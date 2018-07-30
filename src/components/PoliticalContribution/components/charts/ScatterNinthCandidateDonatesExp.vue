<template>
  <div class="scatter-ninth-candidate-donates-exp" :style="{ height: `${currentHeight}px` }" >
    <div
      class="chart scatter-ninth-candidate-donates-exp-chart"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
      <template v-if="isChartReady">
        <AppChartLegends :legends="legends"/>
        <div class="scatter-ninth-candidate-donates-exp-chart__x-title">
          立委年資
        </div>
        <div class="scatter-ninth-candidate-donates-exp-chart__y-title">
          總收入
        </div>
      </template>
    </div>
    <div class="scatter-ninth-candidate-donates-exp__tooltip">
      <p>候選人：{{ tooltipData.name }}</p>
      <p>總收入：{{ tooltipData.donatesTotal.toLocaleString() }} 元</p>
      <p>年資：{{ tooltipData.exp }} 年</p>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import AppChartLegends from './AppChartLegends.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
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
    AppChartLegends,
  },
  data () {
    const defaultWidth = 900
    const defaultHeight = 900
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
      colorScale: undefined,
      xAxis: undefined,
      yAxis: undefined,
      xGridLine: undefined,
      yGridLine: undefined,

      tooltipData: {
        name: '',
        donatesTotal: 0,
        exp: 0
      },
    }
  },
  computed: {
    containerSelector () {
      return `#${this.$el.id}`
    },
    chartSelector () {
      return `${this.containerSelector} .chart`
    },
    tooltipSelector () {
      return `${this.containerSelector} .scatter-ninth-candidate-donates-exp__tooltip`
    },
    ...mapGetters([
      'ordinalRadioPicked',
    ]),
    isChartReady () {
      return this.svg !== undefined
    },
  },
  methods: {
    init () {
      this.outerWidth = this.defaultWidth
      this.outerHeight = this.defaultHeight

      this.margin = { top: 50, right: 1, bottom: 100, left: 200, }
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
          .domain([ 0, d3.max(this.data, d => d['exp']) + 1 ])
          .range([ 0, this.innerWidth ])
      this.yScale =
        d3.scaleLinear()
          .domain([ 0, d3.max(this.data, d => d['donatesTotal']) + 5000000 ])
          .range([ this.innerHeight, 0 ])
      this.colorScale =
        d3.scaleOrdinal()
          .domain([ '中國國民黨', '民主進步黨', '時代力量', '親民黨', '無黨籍', '無黨團結聯盟', '民國黨' ])
          .range([ '#0071bc', '#53a66f', '#fcc037', '#eb6c1f', '#736357', '#c7195c', '#d8d8d8' ])

      // init axis
      this.xAxis = 
        d3.axisBottom(this.xScale)
          .ticks(5)
          .tickFormat(d => `${d} 年`)
      this.svg
        .append('g')
          .attr('class', 'scatter-ninth-candidate-donates-exp-chart__x-axis')
          .attr('transform', `translate(0, ${this.innerHeight})`)
          .call(this.xAxis)
      this.xGridLine =
        d3.axisBottom(this.xScale)
          .ticks(5)
          .tickSize(-this.innerHeight)
          .tickFormat('')
      this.svg
        .append('g')
          .attr('class', 'grid grid__x')
          .attr('transform', `translate(0, ${this.innerHeight})`)
          .call(this.xGridLine)
      this.yAxis = 
        d3.axisLeft(this.yScale)
          .ticks(5)
          .tickFormat(d => `${d / 10000} 萬元`)
      this.svg
        .append('g')
          .attr('class', 'scatter-ninth-candidate-donates-exp-chart__y-axis')
          .call(this.yAxis)
      this.yGridLine =
        d3.axisLeft(this.yScale)
          .ticks(5)
          .tickSize(-this.innerWidth)
          .tickFormat('')
      this.svg
        .append('g')
          .attr('class', 'grid grid__y')
          .call(this.yGridLine)
    },
    visualize () {
      // Data joins
      const circles =
        this.svg
          .selectAll('circle')
          .data(this.data, d => d.name)

      // Update
      circles
        .attr('cx', d => this.xScale(d['exp']))
        .attr('cy', d => this.yScale(d['donatesTotal']))

      // Enter
      circles
        .enter()
        .append('circle')
          .attr('r', 6)
          .attr('cx', d => this.xScale(d['exp']))
          .attr('cy', d => this.yScale(d['donatesTotal']))
          .on('mouseover', d => this.handleTooltip(d, 'mouseover'))
          .on('mousemove', d => this.handleTooltip(d, 'mousemove'))
          .on('mouseout', d => this.handleTooltip(d, 'mouseout'))
          .style('fill', d => this.colorScale(d['party']))

      // Exit
      circles.exit().remove()
    },
    handleTooltip (data, event) {
      const handleTooltipPosition = (type) => {
        if (type === 'top') {
          return (d) => {
            // let tooltipHeight = parseInt(d3.select(this.tooltipSelector).style('height'), 10)
            let tooltipHeight = d3.select(this.tooltipSelector).node().getBoundingClientRect().height
            if (!isCollide('bottom')) {
              return (d3.event.clientY + 20) + 'px'
            } else {
              return (d3.event.clientY - 10 - tooltipHeight) + 'px'
            }
          }
        } else if (type === 'left') {
          return (d) => {
            let tooltipWidth = parseInt(d3.select(this.tooltipSelector).style('width'), 10)
            if (!isCollide('right')) {
              return (d3.event.clientX) + 'px'
            } else {
              return (d3.event.clientX - tooltipWidth) + 'px'
            }
          }
        }
      }

      const isCollide = (tooltipBorder) => {
        // let tooltipWidth = parseInt(d3.select(this.tooltipSelector).style('width'), 10)
        // let tooltipHeight = parseInt(d3.select(this.tooltipSelector).style('height'), 10)
        let tooltipWidth = d3.select(this.tooltipSelector).node().getBoundingClientRect().width
        let tooltipHeight = d3.select(this.tooltipSelector).node().getBoundingClientRect().height
        let w = window
        let d = document
        let e = d.documentElement
        let g = d.getElementsByTagName('body')[0]
        let windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
        let windowHeight = w.innerHeight || e.clientHeight || g.clientHeight

        if (tooltipBorder === 'right') {
          if (d3.event.clientX + tooltipWidth >= windowWidth) {
            return true
          } else {
            return false
          }
        } else if (tooltipBorder === 'bottom') {
          if (d3.event.clientY + 20 + tooltipHeight >= windowHeight) {
            return true
          } else {
            return false
          }
        }
      }

      if (event === 'mouseover') {
        this.tooltipData = data
        d3.select(this.tooltipSelector)
          .style('display', 'initial')
          .style('opacity', 1)
          .style('top', handleTooltipPosition('top'))
          .style('left', handleTooltipPosition('left'))
      } else if (event === 'mousemove') {
        d3.select(this.tooltipSelector)
          .style('top', handleTooltipPosition('top'))
          .style('left', handleTooltipPosition('left'))
      } else if (event === 'mouseout') {
        d3.select(this.tooltipSelector)
          .style('display', 'none')
          .style('opacity', 0)
      }
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
.scatter-ninth-candidate-donates-exp
  position relative
  &__tooltip
    width max-content
    height max-content
    box-sizing content-box // fix safari max-content bug
    display none
    position fixed
    background white
    box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    z-index 10000
    padding 0 10px
    p
      margin 10px 0

.chart
  position relative
  transform-origin 0% 0%
    
.scatter-ninth-candidate-donates-exp-chart
  &__x-title
    position absolute
    bottom 20px
    padding 0 0 0 200px
    width 100%
    display flex
    justify-content center
    font-size 22px
  &__y-title
    position absolute
    left 20px
    height calc(100% - 150px)
    padding 50px 0 0 0
    display flex
    align-items center
    font-size 22px
  &__x-axis
    .tick
      text
        font-size 16px
  &__y-axis
    .tick
      text
        font-size 16px
  .grid
    line
      stroke #d3d3d3
      stroke-opacity 0.7
      stroke-width 2px
      shape-rendering crispEdges
</style>


