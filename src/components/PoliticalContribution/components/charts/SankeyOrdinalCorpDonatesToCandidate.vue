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
  </div>
</template>

<script>
import { get, isEmpty, sortBy, sumBy, groupBy, uniqBy, some } from 'lodash'
import * as d3 from 'd3'
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey'

import ChartLazyVisualizing from '../../mixins/ChartLazyVisualizing'

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
    }
  },
  mixins: [ ChartLazyVisualizing ],
  data () {
    const defaultWidth = 900
    const defaultHeight = 5000
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
      
      outerWidth: undefined,
      outerHeight: undefined,
      margin: undefined,
      innerWidth: undefined,
      innerHeight: undefined,
      svg: undefined,
      sankeyData: undefined,
      // xScale: undefined,
      // yScale: undefined,

      // tooltipData: {},
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

      dataSliced.forEach(corp => {
        corp.forEach(donate => {
          const isExistCandidate = some(resultGraph.nodes, [ 'name', donate['候選人'] ])
          const isExistCorp = some(resultGraph.nodes, [ 'name', donate['集團碼'] ])

          const linkKey = `${donate['集團碼']}donatesTo${donate['候選人']}`
          const isExistLink = linkKey in resultGraph.links

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
                'target': donate['候選人'],
                'targetParty': donate['當選註記'] !== '*' || donate['推薦政黨'],
                'source': donate['集團碼'],
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

      this.margin = { top: 0, right: 0, bottom: 0, left: 0, }
      this.innerWidth = this.outerWidth - this.margin.right - this.margin.left
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom

      this.svg =
        d3.select(this.chartSelector)
          .append('svg')
            .attr('width', this.outerWidth)
            .attr('height', this.outerHeight)
          .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      const sankey =
        d3Sankey()
          .nodeId(d => d.name)
          .nodeWidth(15)
          .nodePadding(10)
          .extent([[ 1, 1 ], [ this.innerWidth - 1, this.innerHeight - 6 ]])
      sankey(this.dataProcessed)
      // // init scales
      // this.xScale =
      //   d3.scaleLinear()
      //     .domain([ 0, 1 ])
      //     .range([ 0, this.innerWidth ])
      // this.yScale =
      //   d3.scaleLinear()
      //     .domain([ 0, 60000000 ])
      //     .range([ this.innerHeight, 0 ])
    },
    visualize () {
      const nodes = 
        this.svg
          .selectAll('rect')
          .data(this.dataProcessed.nodes)
      const links =
        this.svg
          .append("g")
            .attr("class", "links")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
          .selectAll('path')
          .data(this.dataProcessed.links)

      nodes
        .enter()
        .append('rect')
          .attr("x", function(d) { return d.x0; })
          .attr("y", function(d) { return d.y0; })
          .attr("height", function(d) { return d.y1 - d.y0; })
          .attr("width", function(d) { return d.x1 - d.x0; })
          // .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
          .attr("stroke", "#000")
          .attr('title', d => d.name)
      links
        .enter()
        .append('path')
          .attr("d", sankeyLinkHorizontal())
          .attr("stroke-width", function(d) { return Math.max(1, d.width); });
    },
    calculateCurrentDimensions () {
      const containerWidth = this.$el.getBoundingClientRect().width
      this.currentWidth = containerWidth
      this.currentHeight = Math.round(containerWidth / this.defaultAspect)
    },
  },
  mounted () {
    this.calculateCurrentDimensions()
  }
}
</script>

<style lang="stylus">
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
</style>


