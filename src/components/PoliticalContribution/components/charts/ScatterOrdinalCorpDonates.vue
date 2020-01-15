<template>
  <div class="scatter-ordinal-corp-donates" :style="{ height: `${currentHeight}px` }">
    <div v-show="isDataLoading" class="scatter-ordinal-corp-donates__loading">
      <p class="scatter-ordinal-corp-donates__loading-text">Loading...</p>
    </div>
    <div
      :class="[ 'chart', 'scatter-ordinal-corp-donates-chart', { 'scatter-ordinal-corp-donates-chart--fadeed': isDataLoading } ]"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
      <template v-if="isChartReady">
        <ScatterOrdinalCorpDonatesXAxis class="scatter-ordinal-corp-donates-chart__x-axis"/>
        <ScatterOrdinalCorpDonatesYAxis class="scatter-ordinal-corp-donates-chart__y-axis"/>
      </template>
    </div>
    <ScatterOrdinalCorpDonatesTooltip
      class="scatter-ordinal-corp-donates__tooltip"
      :tooltipData="tooltipData"
    />
  </div>
</template>

<script>
import { get, isEmpty, sortBy, sumBy, groupBy, uniqBy, filter, } from 'lodash'
import * as d3 from 'd3'

import ChartLazyVisualizing from '../../mixins/ChartLazyVisualizing'

import ScatterOrdinalCorpDonatesXAxis from './ScatterOrdinalCorpDonatesXAxis.vue'
import ScatterOrdinalCorpDonatesYAxis from './ScatterOrdinalCorpDonatesYAxis.vue'
import ScatterOrdinalCorpDonatesTooltip from './ScatterOrdinalCorpDonatesTooltip.vue'

import { fetchSheetCompanyDonate, } from 'src/components/PoliticalContribution/dispatchers'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    ordinal: {
      type: String,
      default: '',
    },
    howManyNodes: {
      type: Number,
      default: 10,
    },
    filterCorp: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    ScatterOrdinalCorpDonatesXAxis,
    ScatterOrdinalCorpDonatesYAxis,
    ScatterOrdinalCorpDonatesTooltip,
  },
  watch: {
    shouldVisualizeOrdinal () {
      if (!this.isDataAvailable) {
        if (this.isInView) {
          this.isDataLoading = true
          this.loadDataThenVisulaize()
        }
      } else {
        this.isDataLoading = false
        this.visualize()
      }
    },
    filterCorp () {
      this.containerSelector = `#${this.$el.id}`
      if (!this.isDataAvailable) {
        if (this.isInView) {
          this.isDataLoading = true
          this.loadDataThenVisulaize()
        }
      } else {
        this.isDataLoading = false
        this.visualize()
      }
    }
  },
  mixins: [ ChartLazyVisualizing ],
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

      isDataLoading: false,
      currentDataLoading: null,
      
      outerWidth: undefined,
      outerHeight: undefined,
      margin: undefined,
      innerWidth: undefined,
      innerHeight: undefined,
      svg: undefined,
      xScale: undefined,
      yScale: undefined,
      xGridLine: undefined,
      yGridLine: undefined,

      tooltipData: {},
      containerSelector: undefined,
    }
  },
  computed: {
    // containerSelector () {
    //   return `#${this.$el.id}`
    // },
    chartSelector () {
      return `${this.containerSelector} .chart`
    },
    tooltipSelector () {
      return `${this.containerSelector} .scatter-ordinal-corp-donates__tooltip`
    },
    ...mapGetters([
      'ordinalRadioPicked',
    ]),
    shouldVisualizeOrdinal () {
      return this.ordinal === '' ? this.ordinalRadioPicked : this.ordinal
    },
    isDataAvailable () {
      return !isEmpty(this.data)
    },
    data () {
      const data = get(this.$store.state.PoliticalContribution.data, [ this.shouldVisualizeOrdinal, 'rawDataCompanyDonateGroupByGroupOrCompany' ], {})
      return filter(data, (value, key) => isEmpty(this.filterCorp) || this.filterCorp.includes(key))
    },
    dataSorted () {
      return sortBy(this.data, array => {
        return -sumBy(array, o => +(o['收入金額'].split(',').join('')))
      })
    },
    dataProcessed () {
      const dataSliced = this.dataSorted.slice(0, this.howManyNodes)
      return dataSliced.map(corp => ({
        name: !isEmpty(get(corp, [ 0, '集團碼' ], '')) ? get(corp, [ 0, '集團碼' ], '') : get(corp, [ 0, '統一編號' ], ''),
        mainCompanies: get(corp, [ 0, '旗下核心公司' ], ''),
        bosses: get(corp, [ 0, '董事長' ], ''),
        donatesSum: sumBy(corp, o => +(o['收入金額'].split(',').join(''))),
        candidates: groupBy(corp, '推薦政黨')
      }))
    },
    isChartReady () {
      return this.svg !== undefined
    },
  },
  methods: {
    loadDataThenVisulaize () {
      if (this.currentDataLoading !== this.shouldVisualizeOrdinal) {
        this.currentDataLoading = this.shouldVisualizeOrdinal
        fetchSheetCompanyDonate(this.$store, this.shouldVisualizeOrdinal)
        .then(() => {
          if (!this.isChartReady) {
            this.init()
          }
          if (this.currentDataLoading = this.shouldVisualizeOrdinal) {
            this.visualize()
          }
        })
        .then(() => {
          this.isDataLoading = false
          this.currentDataLoading = null
        })
      }
    },
    init () {
      this.outerWidth = this.defaultWidth
      this.outerHeight = this.defaultHeight

      this.margin = { top: 70, right: 105, bottom: 50, left: 50, }
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
          .domain([ 0, 1 ])
          .range([ 0, this.innerWidth ])
      this.yScale =
        d3.scaleLinear()
          .domain([ 0, 60000000 ])
          .range([ this.innerHeight, 0 ])

      // init grid line axis
      this.xGridLine = 
        d3.axisBottom(this.xScale)
          .ticks(10)
          .tickSize(-this.innerHeight)
          .tickFormat('')
      this.svg
        .append('g')
          .attr('class', 'grid grid__x')
          .attr('transform', `translate(0, ${this.innerHeight})`)
          .call(this.xGridLine)
      this.yGridLine = 
        d3.axisLeft(this.yScale)
          .tickValues(Array.apply(null, { length: 7 }).map(Number.call, Number).map(d => d * 10000000))
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
          .data(this.dataProcessed, d => d.name)
      const hints = 
        this.svg
          .selectAll('text')
          .data(this.dataProcessed, d => d.name)

      // Update
      circles
        .transition()
        .duration(1000)
        .attr('r', 20)
        .attr('cx', d => {
          const donatesToKMT = uniqBy(get(d, [ 'candidates', '中國國民黨' ], []), '候選人').length
          const donatesToDPP = uniqBy(get(d, [ 'candidates', '民主進步黨' ], []), '候選人').length
          const total = donatesToKMT + donatesToDPP
          return this.xScale(donatesToDPP / total)
        })
        .attr('cy', d => this.yScale(d.donatesSum))
      hints
        .transition()
        .duration(1000)
        .attr('x', d => {
          const donatesToKMT = uniqBy(get(d, [ 'candidates', '中國國民黨' ], []), '候選人').length
          const donatesToDPP = uniqBy(get(d, [ 'candidates', '民主進步黨' ], []), '候選人').length
          const total = donatesToKMT + donatesToDPP
          return this.xScale(donatesToDPP / total)
        })
        .attr('y', d => this.yScale(d.donatesSum) + 40)
        .text(d => d.name)

      // Enter
      circles
        .enter()
        .append('circle')
          .attr('class', 'scatter-ordinal-corp-donates-chart__circle')
          .attr('r', 20)
          .attr('cx', d => {
            const donatesToKMT = uniqBy(get(d, [ 'candidates', '中國國民黨' ], []), '候選人').length
            const donatesToDPP = uniqBy(get(d, [ 'candidates', '民主進步黨' ], []), '候選人').length
            const total = donatesToKMT + donatesToDPP
            return this.xScale(donatesToDPP / total)
          })
          .attr('cy', d => this.yScale(d.donatesSum))
          .style('fill', 'transparent')
          .style('stroke', 'transparent')
          .on('mouseover', d => this.handleTooltip(d, 'mouseover'))
          .on('mousemove', d => this.handleTooltip(d, 'mousemove'))
          .on('mouseout', d => this.handleTooltip(d, 'mouseout'))
          .transition()
          .delay(250)
          .duration(750)
          .style('fill', '#d8d8d8')
          .style('stroke', 'white')
      hints
        .enter()
        .append('text')
          .attr('class', 'scatter-ordinal-corp-donates-chart__hint')
          .attr('x', d => {
            const donatesToKMT = uniqBy(get(d, [ 'candidates', '中國國民黨' ], []), '候選人').length
            const donatesToDPP = uniqBy(get(d, [ 'candidates', '民主進步黨' ], []), '候選人').length
            const total = donatesToKMT + donatesToDPP
            return this.xScale(donatesToDPP / total)
          })
          .attr('y', d => this.yScale(d.donatesSum) + 40)
          .text(d => d.name)
          .style('fill', 'transparent')
          .on('mouseover', d => this.handleTooltip(d, 'mouseover'))
          .on('mousemove', d => this.handleTooltip(d, 'mousemove'))
          .on('mouseout', d => this.handleTooltip(d, 'mouseout'))
          .transition()
          .delay(250)
          .duration(750)
          .style('fill', 'black')

      // Exit
      circles
        .exit()
        .style('fill', '#d8d8d8')
        .style('stroke', 'white')
        .transition()
        .duration(250)
        .style('fill', 'transparent')
        .style('stroke', 'transparent')
        .remove()
      hints
        .exit()
        .style('fill', 'black')
        .transition()
        .duration(250)
        .style('fill', 'transparent')
        .remove()
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
  // beforeMount () {
  //   this.containerSelector = this.$el.id
  // },
  mounted () {
    this.calculateCurrentDimensions()
  }
}
</script>

<style lang="stylus">
.scatter-ordinal-corp-donates
  position relative
  &__loading
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    display flex
    justify-content center
    align-items center
  &__loading-text
    display flex
    justify-content center
    align-items center
    padding 10px
    background-color white
    font-size 30px
  &__tooltip
    width max-content
    height max-content
    box-sizing content-box // fix safari max-content bug
    display none
    position fixed
    background white
    box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    z-index 10000

.scatter-ordinal-corp-donates-chart
  position relative
  transform-origin 0% 0%
  &--fadeed
    opacity .5
  &__circle
    stroke-width 2px
  &__hint
    text-anchor middle
    font-size 18px
  &__x-axis
    position absolute
    top 0
    left 50px
  &__y-axis
    position absolute
    top 70px
    right 0
  .grid
    line
      stroke #d3d3d3
      stroke-opacity 0.7
      stroke-width 2px
      shape-rendering crispEdges
    path
      stroke-width 0
    &__x
      .tick
        &:nth-of-type(6)
          line
            stroke black
            stroke-opacity 1 

</style>


