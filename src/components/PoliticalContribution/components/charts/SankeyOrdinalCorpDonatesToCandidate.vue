<template>
  <div class="sankey-ordinal-corp-donates-to-candidate" :style="{ height: `${currentHeight}px` }">
    <div v-show="isDataLoading" class="sankey-ordinal-corp-donates-to-candidate__loading">
      <p class="sankey-ordinal-corp-donates-to-candidate__loading-text">Loading...</p>
    </div>
    <div
      class="chart"
      :style="{
        width: `${defaultWidth}px`,
        height: `${defaultHeight}px`,
        transform: `scale(${currentWidth / defaultWidth})`
      }"
    >
    </div>
    <SankeyOrdinalCorpDonatesToCandidateTooltip class="scatter-ordinal-corp-donates__tooltip" :tooltipData="tooltipData"/>
  </div>
</template>

<script>
import { get, isEmpty, sortBy, sumBy, groupBy, uniqBy, some } from 'lodash'
import * as d3 from 'd3'
import { sankey as d3Sankey, sankeyLinkHorizontal } from './d3-sankey'

import ChartLazyVisualizing from '../../mixins/ChartLazyVisualizing'
import SankeyOrdinalCorpDonatesToCandidateTooltip from './SankeyOrdinalCorpDonatesToCandidateTooltip.vue'

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
    } 
  },
  components: {
    SankeyOrdinalCorpDonatesToCandidateTooltip,
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
        this.processSankeyData()
        this.visualize()
      }
    }
  },
  mixins: [ ChartLazyVisualizing ],
  data () {
    const defaultWidth = 900
    const defaultHeight = 3000
    const defaultAspect = defaultWidth / defaultHeight

    return {
      defaultWidth,
      defaultHeight,
      defaultAspect,
      currentWidth: defaultWidth,
      currentHeight: defaultHeight,

      shouldLazyLoadData: true,
      isDataLoading: false,
      currentDataLoading: null,
      
      colorScale: undefined,
      outerWidth: undefined,
      outerHeight: undefined,
      margin: undefined,
      innerWidth: undefined,
      innerHeight: undefined,
      svg: undefined,
      sankeyData: undefined,
      // xScale: undefined,
      // yScale: undefined,

      tooltipData: {},
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
      return `${this.containerSelector} .scatter-ordinal-corp-donates__tooltip`
    },
    ...mapGetters([
      'ordinalRadioPicked',
      'ordinalRadioPickedNum'
    ]),
    shouldVisualizeOrdinal () {
      return this.ordinal === '' ? this.ordinalRadioPicked : this.ordinal
    },
    isDataAvailable () {
      return !isEmpty(this.data)
    },
    data () {
      return get(this.$store.state.PoliticalContribution.data, [ this.shouldVisualizeOrdinal, 'rawDataCompanyDonateGroupByCandidate' ], {})
    },
    dataSorted () {
      return sortBy(this.data, array => {
        return -sumBy(array, o => +(o['收入金額'].split(',').join('')))
      })
    },
    dataProcessed () {
      const dataSliced = this.dataSorted.slice(0, this.howManyNodes)
      let resultGraph = { 'nodes': [], 'links': [] }
      let linkIndexHash = {}

      dataSliced.forEach(candidate => {
        candidate.forEach(donate => {
          const isExistCandidate = some(resultGraph.nodes, [ 'name', donate['候選人'] ])
          const isExistCorp = some(resultGraph.nodes, [ 'name', donate['集團碼'] ])

          const linkKey = `${donate['集團碼']}donatesTo${donate['候選人']}`
          // const isExistLink = linkKey in resultGraph.links
          const isExistLink = linkKey in linkIndexHash

          // Processing nodes
          if (!isExistCandidate) {
            resultGraph.nodes.push({
              'type': 'candidate',
              'name': donate['候選人'],
              'party': donate['推薦政黨'],
              'wonStamp': donate['當選註記'] === '*'
            })
          }
          if (!isExistCorp && !isEmpty(donate['集團碼'])) {
            resultGraph.nodes.push({
              'type': 'group',
              'name': donate['集團碼'],
              'party': '公司',
              // 'targetParty': [ row['推薦政黨'] ],
            })
          }
          // Processing links
          if (isExistLink) {
            const existLinkIndex = get(linkIndexHash, linkKey, -1)
            if (existLinkIndex !== -1) {
              const existLink = get(resultGraph.links, existLinkIndex)
              existLink.value += +(donate['收入金額'].split(',').join(''))
            }
          } else {
            if (!isEmpty(donate['集團碼'])) {
              resultGraph.links.push({
                'target': donate['集團碼'],
                'targetParty': donate['當選註記'] !== '*' || donate['推薦政黨'],
                'source': donate['候選人'],
                'type': 'group',
                'value': +(donate['收入金額'].split(',').join(''))
              })
              linkIndexHash[linkKey] = resultGraph.links.length - 1
            }
          }
        })
      })

      return resultGraph
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
            this.processSankeyData()
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

      this.margin = { top: 0, right: 150, bottom: 0, left: 100, }
      this.innerWidth = this.outerWidth - this.margin.right - this.margin.left
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom

      this.colorScale =
        d3.scaleOrdinal()
          .domain(['中國國民黨', '民主進步黨', '時代力量', '無黨團結聯盟', '無黨籍', '親民黨', '公司', '未當選'])
          .range(['#0071bc', '#53a66f', '#fcc037', '#c7195c', '#736357', '#eb6c1f', 'transparent', '#000'])

      this.svg =
        d3.select(this.chartSelector)
          .append('svg')
            .attr('width', this.outerWidth)
            .attr('height', this.outerHeight)
          .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      this.processSankeyData()
    },
    processSankeyData () {
      const sankey =
        d3Sankey()
          .nodeId(d => d.name)
          .nodeWidth(15)
          .nodePadding(20)
          .extent([[ 1, 1 ], [ this.innerWidth - 1, this.innerHeight - 6 ]])
      sankey(this.dataProcessed)
    },
    visualize () {
      const nodes = 
        this.svg
          .selectAll('rect')
          .data(this.dataProcessed.nodes)
      const texts = 
        this.svg
          .selectAll('text')
          .data(this.dataProcessed.nodes)
      const links =
        this.svg
          // .append('g')
          //   .attr('class', 'links')
          //   .attr('fill', 'none')
          //   .attr('stroke', '#000')
          //   .attr('stroke-opacity', 0.2)
          .selectAll('path')
          .data(this.dataProcessed.links)

      nodes
        .enter()
        .append('rect')
        .merge(nodes)
          .attr('x', function(d) { return d.x0 })
          .attr('y', function(d) { return d.y0 })
          .attr('height', function(d) { return d.y1 - d.y0 })
          .attr('width', function(d) { return d.x1 - d.x0 })
          // .attr('fill', function(d) { return color(d.name.replace(/ .*/, '')) })
          .attr('fill', d => {
            if (d.type === 'group') {
              return '#9e005d'
            } else {
              return this.colorScale(d.party)
            }
          })
          // .on('click', d => {
          //   this.$router.push(`explore?name=${d.name}&ordinal=${this.ordinalRadioPickedNum}`)
          // })
      texts
        .enter()
        .append('text')
        .merge(texts)
          .attr('x', d => d.x0 + 20 * (d.type === 'group' ? 1 : -1))
          // .attr('x', d => d.x0)
          .attr('y', d => d.y0 + ((d.y1 - d.y0) / 2))
          // .attr('dy', '.35em')
          .attr('text-anchor', d => d.type === 'group' ? 'start' : 'end')
          .attr('transform', null)
          .text(d => d.name)
          .style('fill', 'black')
      links
        .enter()
        .append('path')
        .merge(links)
          .attr('d', sankeyLinkHorizontal())
          .attr('stroke-width', d => Math.max(1, d.width))
          // .attr('stroke-width', d => this.logScale(Math.max(1, d.width)))
          .attr('class', 'links')
          .attr('fill', 'none')
          .attr('stroke', '#000')
          .attr('stroke-opacity', 0.2)
          .on('mouseover', d => {
            d3.selectAll('.links')
              .attr('stroke-opacity', 0.1)

            this.handleTooltip(d, 'mouseover')
          })
          .on('mousemove', d => this.handleTooltip(d, 'mousemove'))
          .on('mouseout', d => {
            d3.selectAll('.links')
              .attr('stroke-opacity', 0.2)

            this.handleTooltip(d, 'mouseout')
          })

      nodes.exit().remove()
      texts.exit().remove()
      links.exit().remove()
    },
    calculateCurrentDimensions () {
      const containerWidth = this.$el.getBoundingClientRect().width
      this.currentWidth = containerWidth
      this.currentHeight = Math.round(containerWidth / this.defaultAspect)
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
  },
  mounted () {
    this.calculateCurrentDimensions()
  }
}
</script>

<style lang="stylus" scoped>
.sankey-ordinal-corp-donates-to-candidate
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
  & >>> .links
    &:hover
      stroke-opacity 0.5
</style>


