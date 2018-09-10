<template>
  <svg id="force-directed-graph">
    <g id="root">
      <g class="links"></g>
      <g class="nodes"></g>
    </g>
  </svg>
</template>

<script>
import { get, find, isEmpty, } from 'lodash'
import * as d3 from 'd3'
import {
  getContainerDimensions,
  mouseoverHandlerNode,
  mouseoutHandlerNode,
  mouseoverHandlerLink,
  mouseoutHandlerLink,
  dragstarted,
  dragged,
  dragended,
  setNodeImage,
  toogleZoom,
  lapsedZoomFit,
  zoomFit,
} from './SectionContentExploreLightboxForceGraph.js'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    isSidebarToogledInfo: {
      type: Boolean,
      required: true,
    },
    isSidebarToogledRanks: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      scale: undefined,
      svg: undefined,
      svgWidth: undefined,
      svgHeight: undefined,
      // containerWidth: undefined,
      // containerHeight: undefined,
      g: undefined,
      zoom: undefined,
      simulation: undefined,
      link: undefined,
      node: undefined,
      circle: undefined,
      image: undefined,
      // linkedByIndex: {},
    }
  },
  watch: {
    dataForceGraph () {
      if (this.hasDataForceGraph) {
        if (this.svg === undefined) {
          this.visualizeGraph()
        } else {
          this.updateScales()
          this.joinNodeLink()
          this.applySimulation()
        }
      }
    },
  },
  computed: {
    ...mapGetters([
      'dataCompanyDonateCurrentOrdinalNameLightboxShownRelated',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompany',
      'dataForceDonateSum',
      'dataForceGraph',
      'dataForceLinkedByIndex',
      'hasDataForceGraph',
      'ordinalUrlQuery',
      'nameLightboxShown',
    ]),
    isSidebarFoldedSingle () {
      // bitwise xor
      return (this.isSidebarToogledInfo ^ this.isSidebarToogledRanks) === 1
    },
    isSidebarFoldedDouble () {
      return !this.isSidebarToogledInfo && !this.isSidebarToogledRanks
    },
    forceMarginRight () {
      if (this.isSidebarFoldedSingle) {
        return 344
      } else if (!this.isSidebarFoldedDouble && !this.isSidebarFoldedSingle) {
        return 688
      } else {
        return 0
      }
    },
    // For calculating scale's domain
    maxMoney () {
      return Math.max(d3.max(Object.values(this.dataForceDonateSum.candidate)), d3.max(Object.values(this.dataForceDonateSum.company)))
    },
    minMoney () {
      return Math.min(d3.min(Object.values(this.dataForceDonateSum.candidate)), d3.min(Object.values(this.dataForceDonateSum.company)))
    },
    minMaxFlow () {
      return d3.extent(this.dataForceGraph.links, d => d.value)
    },
  },
  methods: {
    initScale () {
      const color =
        d3.scaleOrdinal()
          .domain(['中國國民黨', '民主進步黨', '時代力量', '無黨團結聯盟', '無黨籍', '親民黨', '公司', '未當選'])
          .range(['#0071bc', '#53a66f', '#fcc037', '#c7195c', '#736357', '#eb6c1f', 'transparent', '#000'])
      let r =
        d3.scaleLinear()
          .range([150, 6000])
      let linksStrokeWidth =
        d3.scaleLinear()
          .range([1, 20])
      const strength =
        d3.scaleLinear()
          .domain([0, 397])
          .range([-450, -100])

      this.scale = {
        color,
        r,
        linksStrokeWidth,
        strength
      }
    },
    initSelection () {
      this.svg = d3.select('#force-directed-graph')
      this.g = this.svg.select('#root')
    },
    calcSvgDimensions () {
      const { containerWidth , containerHeight } = getContainerDimensions()

      this.svgWidth = containerWidth - 40 * 2 - this.forceMarginRight
      this.svgHeight = containerHeight

      this.svg
        .attr('width', this.svgWidth)
        .attr('height', this.svgHeight)
    },
    initZoom () {
      this.zoom =
        d3.zoom()
          .scaleExtent([1 / 5, 8])
          .on('zoom', () => {
            this.g.attr('transform', d3.event.transform)
          })
      this.svg.call(this.zoom)
    },
    initSimulation () {
      this.simulation =
        d3.forceSimulation()
          .force('link', d3.forceLink().id(d => d.id).distance(d => {
            return 100
          }))
          .force('charge', d3.forceManyBody().strength(d => {
            return this.scale.strength(this.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated.length)
          }))
          .force('center', d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2))
          .force('collide', d3.forceCollide().radius(d => this.getNodeRadius(d)).iterations(2))
    },
    updateScales () {
      this.scale.linksStrokeWidth
        .domain(this.minMaxFlow)
      this.scale.r
        .domain([this.minMoney, this.maxMoney])
    },
    getNodeRadius (d) {
      return Math.sqrt(this.scale.r(get(this.dataForceDonateSum[d.type === 'candidate' ? 'candidate' : 'company'], d.id, 0)))
    },
    joinNodeLink () {
      this.link =
        this.g
          .select('.links')
          .selectAll('line')
          .data(this.dataForceGraph.links, d => `link-${d.source}-${d.target}`)

      this.link.exit().remove()

      this.link
        .enter()
        .append('line')
          .attr('class', d => typeof d.targetParty !== Boolean ? `links-party-${this.$t(`POLITICAL_CONTRIBUTION.PARTY['${d.targetParty}']`)}` : '')
          .attr('id', d => `link-${d.source}-${d.target}`)
          .on('mouseover', mouseoverHandlerLink(this))
          .on('mouseout', mouseoutHandlerLink(this))
        .merge(this.link)
          .attr('stroke-width', d => this.scale.linksStrokeWidth(d.value))

      this.node =
        this.g
          .select('.nodes')
          .selectAll('g')
          .data(this.dataForceGraph.nodes, d => d.id)

      this.node.exit().remove()
        
      this.node
        .selectAll('.circles')
        .attr('r', d => this.getNodeRadius(d))
      this.node
        .selectAll('.images')
        .attr('x', setNodeImage(this, 'position'))
        .attr('y', setNodeImage(this, 'position'))
        .attr('width', setNodeImage(this, 'size'))
        .attr('height', setNodeImage(this, 'size'))
        .style('clip-path', d => d.party !== '公司' ? `circle(50% at ${this.getNodeRadius(d)}px ${this.getNodeRadius(d)}px)` : '')
        .style('-webkit-clip-path', d => d.party !== '公司' ? `circle(50% at ${this.getNodeRadius(d)}px ${this.getNodeRadius(d)}px)` : '')

      this.node =
        this.node
          .enter()
          .append('g')
            .attr('id', d => `node-${d.id}`)
            .call(
              d3.drag()
                .on('start', dragstarted(this))
                .on('drag', dragged(this))
                .on('end', dragended(this))
            )
            .on('mouseover', mouseoverHandlerNode(this))
            .on('mouseout', mouseoutHandlerNode(this))
            .on('click', d => {
              if (d.type === 'company') {
                const companyName = get(this.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompany, [ d.id, 0, '捐贈者／支出對象' ], '')
                this.$router.replace(`explore?name=${companyName}&ordinal=${this.ordinalUrlQuery}`)
              } else {
                this.$router.replace(`explore?name=${d.id}&ordinal=${this.ordinalUrlQuery}`)
              }
              let event = new MouseEvent('mouseout', {})
              document.querySelector(`#node-${d.id}`).dispatchEvent(event)
            })
          
        this.node
          .append('circle')
            .attr('class', d => d.party !== '公司' && d.wonStamp ? `nodes-party-${this.$t(`POLITICAL_CONTRIBUTION.PARTY['${d.party}']`)} circles` : 'circles')
            .attr('id', d => `circle-${d.id}`)
            .attr('fill', d => d.type === 'candidate' ? (d.wonStamp ? this.scale.color(d.party) : '#000') : 'transparent')
            .attr('r', d => this.getNodeRadius(d))
            .style('stroke', d => d.party === '公司' ? 'transparent' : '')

        this.node
          .append('image')
            .attr('class', d => (d.party !== '公司' && d.wonStamp) ? `nodes-party-${this.$t(`POLITICAL_CONTRIBUTION.PARTY['${d.party}']`)} images` : 'images')
            .attr('id', d => `image-${d.id}`)
            .attr('xlink:href', d => {
              if (d.type === 'candidate') {
                return d.wonStamp ? `/proj-assets/political-contribution/candidate-portraits/${d.id}.png` : `/proj-assets/political-contribution/explore/lost.png`
              } else if (d.type === 'group') {
                return `/proj-assets/political-contribution/explore/group.png`
              } else if (d.type === 'company') {
                return `/proj-assets/political-contribution/explore/company.png`
              }
            })
            .attr('x', setNodeImage(this, 'position'))
            .attr('y', setNodeImage(this, 'position'))
            .style('clip-path', d => d.party !== '公司' ? `circle(50% at ${this.getNodeRadius(d)}px ${this.getNodeRadius(d)}px)` : '')
            .style('-webkit-clip-path', d => d.party !== '公司' ? `circle(50% at ${this.getNodeRadius(d)}px ${this.getNodeRadius(d)}px)` : '')
            .attr('width', setNodeImage(this, 'size'))
            .attr('height', setNodeImage(this, 'size'))
    },
    applySimulation () {
      this.simulation
        .nodes(this.dataForceGraph.nodes)
        .on('tick', this.ticked)
      this.simulation
        .force('link')
        .links(this.dataForceGraph.links)
      this.simulation
        .force('charge', d3.forceManyBody().strength(d => {
          return this.scale.strength(this.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated.length)
        }))
      this.simulation.alpha(1).restart()
      d3.timeout(() => { zoomFit(this, 250) }, 1500)
    },
    ticked () {
      this.g
        .select('.links')
        .selectAll('line')
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)
      this.g
        .select('.nodes')
        .selectAll('g')
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
    },
    reCalcGraphDimension () {
      this.calcSvgDimensions()

      this.simulation
        .force('center')
        .x(this.svgWidth / 2)
        .y(this.svgHeight / 2)
      this.simulation.restart()

      d3.timeout(() => { zoomFit(this, 250) }, 250)
    },
    visualizeGraph () {
      this.initScale()
      this.initSelection()
      this.calcSvgDimensions()
      this.initZoom()
      this.initSimulation()
      this.updateScales()
      this.joinNodeLink()
      this.applySimulation()
      lapsedZoomFit(this)

      this.$root.$on('toogleZoom', (type) => { toogleZoom(this, type) })
      this.$watch('isSidebarFoldedSingle', () => { this.reCalcGraphDimension() })
      d3.select(window).on('resize', () => { this.reCalcGraphDimension() })
    }
  }
}
</script>

<style lang="stylus">
#force-directed-graph
  cursor grab
  .links
    line
      cursor initial
      stroke #999
      stroke-opacity .7
  .nodes
    circle
      cursor pointer
      stroke #fff
      stroke-width 1.5px
    image
      cursor pointer
</style>

