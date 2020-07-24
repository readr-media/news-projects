<template>
  <div class="parallel-ordinal-party-donates-from" :style="{ height: `${currentHeight}px` }" >
    <div
      class="chart parallel-ordinal-party-donates-from-chart"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
      <template v-if="isChartReady">
        <AppChartLegends class="chart__components" :legends="legends[shouldVisualizeOrdinal]"/>
      </template>
    </div>
    <div class="parallel-ordinal-party-donates-from__tooltip">
      <p>{{ shouldVisualizeOrdinalString }} {{ tooltipData.party }}</p>
      <p>政治獻金收入組成</p>
      <p>{{ tooltipData.category }}：{{ tooltipData.percentage }} %</p>
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
    ordinal: {
      type: String,
      default: '',
    },
    legends: {
      type: Object,
      default () {
        return {}
      },
    },
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    AppChartLegends,
  },
  watch: {
    shouldVisualizeOrdinal () {
      if (this.isChartReady) {
        this.visualize()
      }
    }
  },
  data () {
    const defaultWidth = 900
    const defaultHeight = 600
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
      line: undefined,
      xScale: undefined,
      yScale: undefined,
      colorScale: undefined,
      xAxis: undefined,
      yAxis: undefined,
      xGridLine: undefined,
      // yGridLine: undefined,

      tooltipData: {
        category: '',
        party: '',
        percentage: 0,
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
      return `${this.containerSelector} .parallel-ordinal-party-donates-from__tooltip`
    },
    ...mapGetters([
      'ordinalRadioPicked',
    ]),
    shouldVisualizeOrdinal () {
      return this.ordinal === '' ? this.ordinalRadioPicked : this.ordinal
    },
    shouldVisualizeOrdinalString () {
      switch (this.shouldVisualizeOrdinal) {
        case 'seventh':
          return '第七屆'
        case 'eighth':
          return '第八屆'
        case 'ninth':
          return '第九屆'
        case 'tenth':
          return '第十屆'
        default:
          return ''
      }
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

      this.margin = { top: 30, right: 50, bottom: 50, left: 130, }
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
        d3.scalePoint()
          .domain([ '個人', '營利事業', '政黨', '人民團體', '匿名', '其他收入', ])
          .range([ 0, this.innerWidth ])
      this.yScale =
        d3.scaleLinear()
          .domain([ 0, 85 ])
          .range([ this.innerHeight, 0 ])
      this.colorScale =
        d3.scaleOrdinal()
          .domain([ '中國國民黨', '民主進步黨', '時代力量', '親民黨', '無黨籍', '無黨團結聯盟', '民國黨', '台灣基進' ])
          .range([ '#0071bc', '#53a66f', '#fcc037', '#eb6c1f', '#736357', '#c7195c', '#d8d8d8', '#A63F24' ])

      // init line generator
      this.line =
        d3.line()
          .x(d => this.xScale(d.category))
          .y(d => this.yScale(d.percentage))

      // init axis
      this.xAxis =
        d3.axisBottom(this.xScale)
          .ticks(6)
          .tickSize(-this.innerHeight)
          .tickPadding(30)
      this.svg
        .append('g')
          .attr('class', 'parallel-ordinal-party-donates-from-chart__x-axis')
          .attr('transform', `translate(0, ${this.innerHeight})`)
          .call(this.xAxis)
      this.yAxis = 
        d3.axisLeft(this.yScale)
          .ticks(4)
          .tickSize(-20)
          .tickFormat(d => `${d} %`)
          .tickPadding(5)
      this.svg
        .append('g')
          .attr('class', 'parallel-ordinal-party-donates-from-chart__y-axis')
          .attr('transform', 'translate(-80, 0)')
          .call(this.yAxis)
    },
    visualize () {
      // Data joins
      const circlesKMT =
        this.svg
          .selectAll('circle.circle-kmt')
          .data(this.dataCurrentOrdinal.kmt)
      const lineKMT = 
        this.svg
          .selectAll('path.line-kmt')
          .data([this.dataCurrentOrdinal.kmt])
      const circlesDPP =
        this.svg
          .selectAll('circle.circle-dpp')
          .data(this.dataCurrentOrdinal.dpp)
      const lineDPP = 
        this.svg
          .selectAll('path.line-dpp')
          .data([this.dataCurrentOrdinal.dpp])
      const circlesNPP =
        this.svg
          .selectAll('circle.circle-npp')
          .data(this.dataCurrentOrdinal.npp || [])
      const lineNPP = 
        this.svg
          .selectAll('path.line-npp')
          .data([this.dataCurrentOrdinal.npp || null])
      const circlesTSP =
        this.svg
          .selectAll('circle.circle-tsp')
          .data(this.dataCurrentOrdinal.tsp || [])
      const lineTSP = 
        this.svg
          .selectAll('path.line-tsp')
          .data([this.dataCurrentOrdinal.tsp || null])

      // Update
      circlesKMT
        .transition()
        .ease(d3.easeCubicOut)
        .duration(500)
        .attr('cx', d => this.xScale(d['category']))
        .attr('cy', d => this.yScale(d['percentage']))
      lineKMT
        .transition()
        .ease(d3.easeCubicOut)
        .duration(500)
        .attr('d', this.line)
      circlesDPP
        .transition()
        .ease(d3.easeCubicOut)
        .duration(500)
        .attr('cx', d => this.xScale(d['category']))
        .attr('cy', d => this.yScale(d['percentage']))
      lineDPP
        .transition()
        .ease(d3.easeCubicOut)
        .duration(500)
        .attr('d', this.line)

      // Enter
      circlesKMT
        .enter()
        .append('circle')
          .attr('class', 'circle-kmt')
          .attr('r', 10)
          .attr('cx', d => this.xScale(d['category']))
          .attr('cy', d => this.yScale(d['percentage']))
          .on('mouseover', d => this.handleTooltip(d, 'mouseover'))
          .on('mousemove', d => this.handleTooltip(d, 'mousemove'))
          .on('mouseout', d => this.handleTooltip(d, 'mouseout'))
          .style('fill', d => this.colorScale(d['party']))
      lineKMT
        .enter()
        .append('path')
        .lower()
          .attr('class', 'line-kmt')
          .attr('d', this.line)
          .style('stroke', d => this.colorScale(d[0]['party']))
          .style('stroke-width', '5px')
          .style('fill', 'none')
      circlesDPP
        .enter()
        .append('circle')
          .attr('class', 'circle-dpp')
          .attr('r', 10)
          .attr('cx', d => this.xScale(d['category']))
          .attr('cy', d => this.yScale(d['percentage']))
          .on('mouseover', d => this.handleTooltip(d, 'mouseover'))
          .on('mousemove', d => this.handleTooltip(d, 'mousemove'))
          .on('mouseout', d => this.handleTooltip(d, 'mouseout'))
          .style('fill', d => this.colorScale(d['party']))
      lineDPP
        .enter()
        .append('path')
        .lower()
          .attr('class', 'line-dpp')
          .attr('d', this.line)
          .style('stroke', d => this.colorScale(d[0]['party']))
          .style('stroke-width', '5px')
          .style('fill', 'none')

      if (['ninth', 'tenth'].includes(this.shouldVisualizeOrdinal)) {
        circlesNPP
          .enter()
          .append('circle')
            .attr('class', 'circle-npp')
            .attr('r', 10)
            .attr('cx', d => this.xScale(d['category']))
            .attr('cy', d => this.yScale(d['percentage']))
            .on('mouseover', d => this.handleTooltip(d, 'mouseover'))
            .on('mousemove', d => this.handleTooltip(d, 'mousemove'))
            .on('mouseout', d => this.handleTooltip(d, 'mouseout'))
            .style('fill', 'white')
            .transition()
            .ease(d3.easeCubicOut)
            .duration(500)
            .style('fill', d => this.colorScale(d['party']))
        lineNPP
          .enter()
          .append('path')
          .lower()
            .attr('class', 'line-npp')
            .attr('d', this.line)
            .transition()
            .ease(d3.easeCubicOut)
            .duration(500)
            .style('stroke', d => this.colorScale(d[0]['party']))
            .style('stroke-width', '5px')
            .style('fill', 'none')
      }
      if (['tenth'].includes(this.shouldVisualizeOrdinal)) {
        circlesTSP
          .enter()
          .append('circle')
            .attr('class', 'circle-tsp')
            .attr('r', 10)
            .attr('cx', d => this.xScale(d['category']))
            .attr('cy', d => this.yScale(d['percentage']))
            .on('mouseover', d => this.handleTooltip(d, 'mouseover'))
            .on('mousemove', d => this.handleTooltip(d, 'mousemove'))
            .on('mouseout', d => this.handleTooltip(d, 'mouseout'))
            .style('fill', 'white')
            .transition()
            .ease(d3.easeCubicOut)
            .duration(500)
            .style('fill', d => this.colorScale(d['party']))
        lineTSP
          .enter()
          .append('path')
          .lower()
            .attr('class', 'line-tsp')
            .attr('d', this.line)
            .transition()
            .ease(d3.easeCubicOut)
            .duration(500)
            .style('stroke', d => this.colorScale(d[0]['party']))
            .style('stroke-width', '5px')
            .style('fill', 'none')
      }

      // Exit
      circlesKMT
        .exit()
        .remove()
      lineKMT
        .exit()
        .remove()
      circlesDPP
        .exit()
        .remove()
      lineDPP
        .exit()
        .remove()
      circlesNPP
        .exit()
        .transition()
        .ease(d3.easeCubicOut)
        .duration(500)
        .style('fill', 'transparent')
        .remove()
      lineTSP
        .exit()
        .remove()
      circlesTSP
        .exit()
        .transition()
        .ease(d3.easeCubicOut)
        .duration(500)
        .style('fill', 'transparent')
        .remove()
      if (!['tenth'].includes(this.shouldVisualizeOrdinal)) {
        d3.select(`${this.containerSelector} path.line-tsp`)
          .transition()
          .ease(d3.easeCubicOut)
          .duration(500)
          .style('stroke', 'transparent')
          .remove()
      }
      if (!['ninth', 'tenth'].includes(this.shouldVisualizeOrdinal)) {
        d3.select(`${this.containerSelector} path.line-npp`)
          .transition()
          .ease(d3.easeCubicOut)
          .duration(500)
          .style('stroke', 'transparent')
          .remove()
      }
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
.chart
  position relative
  transform-origin 0% 0%
  &__components
    position absolute

.parallel-ordinal-party-donates-from
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

.parallel-ordinal-party-donates-from-chart
  &__x-axis
    .domain
      opacity 0
    .tick
      line
        stroke #d3d3d3
        stroke-opacity 0.7
        stroke-width 3px
        shape-rendering crispEdges
      text
        font-size 16px
  &__y-axis
    .tick
      text
        font-size 16px
</style>


