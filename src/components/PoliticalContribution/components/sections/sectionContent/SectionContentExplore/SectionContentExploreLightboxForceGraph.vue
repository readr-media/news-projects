<template>
  <svg id="force-directed-graph">
    <g id="root"></g>
  </svg>
</template>

<script>
import { get, find, isEmpty, } from 'lodash'
import * as d3 from 'd3'

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
      isRepainting: false,
      scale: undefined,
      svg: undefined,
      svgWidth: undefined,
      svgHeight: undefined,
      containerWidth: undefined,
      containerHeight: undefined,
      g: undefined,
      zoom: undefined,
      simulation: undefined,
      link: undefined,
      node: undefined,
      circle: undefined,
      image: undefined,
      linkedByIndex: {},
    }
  },
  watch: {
    dataForceGraph () {
      if (this.hasDataForceGraph) {
        d3.selectAll('.links').remove()
        d3.selectAll('.nodes').remove()
        this.visualizeGraph()
      }
    }
  //   hasDataForceGraph () {
  //     if (this.hasDataForceGraph) {
  //       console.log('hasDataForceGraph')
  //       this.isRepainting = true
  //       this.visualizeGraph()
  //       this.isRepainting = false
  //     }
  //   },
  //   nameLightboxShown () {
  //     if (this.isQueryValidCandidateName || this.isQueryValidGroupOrCompanyName) {
  //       // NOTE: workaround
  //       if (!this.isRepainting) {
  //         this.isRepainting = true
  //         d3.selectAll('.links').remove()
  //         d3.selectAll('.nodes').remove()
  //         d3.timeout(() => {
  //           console.log('nameLightboxShown')
  //           this.visualizeGraph()
  //           this.isRepainting = false
  //         }, 500)
  //       }
  //     }
  //   },
  //   ordinalUrlQueryString () {
  //     if ((this.isQueryValidCandidateName || this.isQueryValidGroupOrCompanyName) && this.isQueryValidOrdinal) {
  //       // NOTE: workaround
  //       if (!this.isRepainting) {
  //         this.isRepainting = true
  //         d3.selectAll('.links').remove()
  //         d3.selectAll('.nodes').remove()
  //         d3.timeout(() => {
  //           console.log('ordinalUrlQueryString')
  //           this.visualizeGraph()
  //           this.isRepainting = false
  //         }, 500)
  //       }
  //     }
  //   }
  },
  computed: {
    ...mapGetters([
      'dataCompanyDonateCurrentOrdinalNameLightboxShownRelated',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompany',
      'dataForceDonateSum',
      'dataForceGraph',
      'hasDataForceGraph',
      'ordinalUrlQuery',
      'nameUrlQuery',
      'nameLightboxShown',
      'isQueryValidCandidateName',
      'isQueryValidGroupOrCompanyName',
      'ordinalUrlQueryString',
      'isQueryValidOrdinal',
    ]),
    isSidebarFoldedSingle () {
      // bitwise xor
      return (this.isSidebarToogledInfo ^ this.isSidebarToogledRanks) === 1
    },
    isSidebarFoldedDouble () {
      return !this.isSidebarToogledInfo && !this.isSidebarToogledRanks
    },
    // For calculating scale's domain
    maxMoney () {
      return Math.max(d3.max(this.dataForceDonateSum.candidate, d => d.value.total), d3.max(this.dataForceDonateSum.company, d => d.value.total))
    },
    minMoney () {
      return Math.min(d3.min(this.dataForceDonateSum.candidate, d => d.value.total), d3.min(this.dataForceDonateSum.company, d => d.value.total))
    },
    minMaxFlow () {
      return d3.extent(this.dataForceGraph.links, d => d.value)
    },
    // linkedByIndex () {
    //   let linkedByIndex = {}
    //   this.dataForceGraph.links.forEach(d => {
    //     linkedByIndex[d.source.index + ',' + d.target.index] = 1
    //   })
    //   return linkedByIndex
    // }
  },
  methods: {
    initScale () {
      const color = d3.scaleOrdinal()
        .domain(['中國國民黨', '民主進步黨', '時代力量', '無黨團結聯盟', '無黨籍', '親民黨', '公司', '未當選'])
        .range(['#0071bc', '#53a66f', '#fcc037', '#c7195c', '#736357', '#eb6c1f', 'transparent', '#000'])
      let r = d3.scaleLinear().range([5, 200])
      let linksStrokeWidth = d3.scaleLinear().range([1, 20])
      const strength = d3.scaleLinear().domain([0, 397]).range([-450, -100])

      this.scale = {
        color,
        r,
        linksStrokeWidth,
        strength
      }
    },
    initSelection () {
      this.svg = d3.select('#force-directed-graph')
      this.queryContainerDimensions()
      // TODO: refactoring
      // this.svgWidth = this.containerWidth - 40 * 2 - 688
      this.svgWidth = this.containerWidth - 40 * 2
      if (this.isSidebarFoldedSingle) {
        this.svgWidth = this.svgWidth - 344
      } else if (!this.isSidebarFoldedDouble && !this.isSidebarFoldedSingle) {
        this.svgWidth = this.svgWidth - 688
      }
      this.svgHeight = this.containerHeight
      this.svg.attr('width', this.svgWidth)
        .attr('height', this.svgHeight)

      this.g = this.svg.select('#root')
      // this.g = this.svg.append('g').attr('id', 'root')
    },
    initZoom () {
      this.zoom = d3.zoom().scaleExtent([1 / 5, 8])
        .on('zoom', () => {
          this.g.attr('transform', d3.event.transform)
        })
      this.svg.call(this.zoom)
    },
    initSimulation () {
      this.simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(d => {
          return 100
        }))
        .force('charge', d3.forceManyBody().strength(d => {
          return this.scale.strength(this.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated.length)
        }))
        .force('center', d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2))
        .force('collide', d3.forceCollide().radius((d) => {
          if (d.party === '公司') {
            return Math.sqrt(this.scale.r(find(this.dataForceDonateSum.company, [ 'key', d.id ]).value.total) * 20) + 0.5
          } else {
            return Math.sqrt(this.scale.r(find(this.dataForceDonateSum.candidate, [ 'key', d.id ]).value.total) * 20) + 0.5
          }
        }).iterations(2))
    },
    updateScales () {
      this.scale.linksStrokeWidth.domain(this.minMaxFlow)
      this.scale.r.domain([this.minMoney, this.maxMoney])
    },
    initNodeLink () {
      this.link = this.g.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(this.dataForceGraph.links)
        .enter().append('line')
        .attr('class', d => {
          const targetParty = d.targetParty
          return typeof targetParty !== Boolean ? `links-party-${this.$t(`POLITICAL_CONTRIBUTION.PARTY['${targetParty}']`)}` : ''
        })
        .attr('id', d => {
          return `link-${d.source}-${d.target}`
        })
        .attr('stroke-width', d => this.scale.linksStrokeWidth(d.value))
        .on('mouseover', d => {
          // Fadeout or preserve links
          d3.selectAll('line')
            .style('stroke-opacity', '0.1')
          d3.select(`#link-${d.source.id}-${d.target.id}`)
            .style('stroke-opacity', '0.7')
          // Fadeout or preserve nodes
          d3.selectAll('circle')
            .style('opacity', '0.1')
          d3.selectAll('image')
            .style('opacity', '0.1')
          d3.select(`#image-${d.source.id}`)
            .style('opacity', '1')
          d3.select(`#circle-${d.source.id}`)
            .style('opacity', '1')
          d3.select(`#image-${d.target.id}`)
            .style('opacity', '1')
          d3.select(`#circle-${d.target.id}`)
            .style('opacity', '1')

          this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE', 'link')
          this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE', d.type)
          this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID', { source: d.source.id, target: d.target.id })
        })
        .on('mouseout', d => {
          // Set all the svg elements opacity to original
          d3.selectAll('line')
            .style('stroke-opacity', '0.7')
          d3.selectAll('circle')
            .style('opacity', '1')
          d3.selectAll('image')
            .style('opacity', '1')

          this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE', '')
          this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE', '')
          this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID', '')
        })
      this.node = this.g.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.dataForceGraph.nodes)
        .enter()
      // TODO: merge circle and image in g
      this.circle = this.node
        .append('circle')
        .attr('class', d => {
          if (d.party !== '公司' && d.wonStamp) {
            const party = this.$t(`POLITICAL_CONTRIBUTION.PARTY['${d.party}']`)
            return `nodes-party-${party}`
          } else if (d.party === '公司') {
            // const targetParty = d.targetParty
            // if (!isEmpty(targetParty)) {
            //   let classList = ''
            //   targetParty.forEach(party => {
            //     classList = classList += ` nodes-party-${this.$t(`POLITICAL_CONTRIBUTION.PARTY['${party}']`)}`
            //   })
            //   return classList
            // } else {
            //   return ''
            // }
          }
        })
        .attr('id', d => {
          // if (d.type === 'company') {
          //   const groupOrCompanyName = get(find(this.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated, [ '統一編號', d.id ]), '捐贈者／支出對象', '')
          //   return groupOrCompanyName + '-circle'
          // }
          return 'circle-' + d.id
        })
        .attr('r', d => {
          if (d.type === 'candidate') {
            return Math.sqrt(this.scale.r(find(this.dataForceDonateSum.candidate, ['key', d.id]).value.total) * 20)
          } else {
            return Math.sqrt(this.scale.r(find(this.dataForceDonateSum.company, ['key', d.id]).value.total) * 20)
          }
        })
        .attr('fill', d => {
          return d.type === 'candidate' ? (d.wonStamp ? this.scale.color(d.party) : '#000') : 'transparent'
        })
        // .style('display', d => d.type === 'candidate' ? 'initial' : 'none')
        .style('stroke', d => {
          if (d.party === '公司') {
            return 'transparent'
          }
        })
        .call(d3.drag()
          .on('start', this.dragstarted)
          .on('drag', this.dragged)
          .on('end', this.dragended))
        .on('mouseover', this.mouseoverHandler())
        .on('mouseout', this.mouseoutHandler())
        .on('click', d => {
          if (d.type === 'company') {
            const companyName = get(this.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompany, [ d.id, 0, '捐贈者／支出對象' ], '')
            this.$router.replace(`explore?name=${companyName}&ordinal=${this.ordinalUrlQuery}`)
          } else {
            this.$router.replace(`explore?name=${d.id}&ordinal=${this.ordinalUrlQuery}`)
          }
          let event = new MouseEvent('mouseout', {})
          document.querySelector(`#circle-${d.id}`).dispatchEvent(event)
        })
      this.images = this.node
        .append('image')
        .attr('class', d => {
          if (d.party !== '公司' && d.wonStamp) {
            const party = this.$t(`POLITICAL_CONTRIBUTION.PARTY['${d.party}']`)
            return `nodes-party-${party}`
          } else if (d.party === '公司') {
            // const targetParty = d.targetParty
            // if (!isEmpty(targetParty)) {
            //   let classList = ''
            //   targetParty.forEach(party => {
            //     classList = classList += ` nodes-party-${this.$t(`POLITICAL_CONTRIBUTION.PARTY['${party}']`)}`
            //   })
            //   return classList
            // } else {
            //   return ''
            // }
          }
        })
        .attr('id', d => {
          // if (d.type === 'company') {
          //   const groupOrCompanyName = get(find(this.dataCompanyDonateCurrentOrdinalNameLightboxShownRelated, [ '統一編號', d.id ]), '捐贈者／支出對象', '')
          //   return groupOrCompanyName + '-image'
          // }
          return 'image-' + d.id
        })
        .attr('xlink:href', d => {
          if (d.type === 'candidate') {
            return d.wonStamp ? `/proj-assets/political-contribution/candidate-portraits/${d.id}.png` : `/proj-assets/political-contribution/explore/lost.png`
          } else if (d.type === 'group') {
            return `/proj-assets/political-contribution/explore/group.png`
          } else if (d.type === 'company') {
            return `/proj-assets/political-contribution/explore/company.png`
          }
        })
        .attr('x', this.setNodeImage('position'))
        .attr('y', this.setNodeImage('position'))
        .attr('width', this.setNodeImage('size'))
        .attr('height', this.setNodeImage('size'))
        .style('clip-path', d => {
          if (d.party !== '公司') {
            return 'circle(46% at 50% 50%)'
          }
        })
        .style('-webkit-clip-path', d => {
          if (d.party !== '公司') {
            return 'circle(46% at 50% 50%)'
          }
        })
        .call(d3.drag()
          .on('start', this.dragstarted)
          .on('drag', this.dragged)
          .on('end', this.dragended))
        .on('mouseover', this.mouseoverHandler())
        .on('mouseout', this.mouseoutHandler())
        .on('click', d => {
          if (d.type === 'company') {
            const companyName = get(this.dataCompanyDonateCurrentOrdinalNameLightboxShownGroupByGroupOrCompany, [ d.id, 0, '捐贈者／支出對象' ], '')
            this.$router.replace(`explore?name=${companyName}&ordinal=${this.ordinalUrlQuery}`)
          } else {
            this.$router.replace(`explore?name=${d.id}&ordinal=${this.ordinalUrlQuery}`)
          }
          let event = new MouseEvent('mouseout', {})
          document.querySelector(`#image-${d.id}`).dispatchEvent(event)
        })
    },
    applySimulation () {
      this.simulation
        .nodes(this.dataForceGraph.nodes)
        .on('tick', this.ticked)
      this.simulation.force('link')
        .links(this.dataForceGraph.links)
    },
    setLinkedByIndex () {
      this.linkedByIndex = {}
      this.dataForceGraph.links.forEach(d => {
        this.linkedByIndex[d.source.index + ',' + d.target.index] = 1
      })
    },
    execZoomFit (ticks = 200, transitionDuration) {
      this.simulation.force('center')
        .x(this.svgWidth / 2)
        .y(this.svgHeight / 2)
      this.simulation.restart()
      this.lapsedZoomFit(ticks, transitionDuration)
    },
    // util functions
    queryContainerDimensions () {
      // const width = document.querySelector('.section-content-explore-lightbox-force').clientWidth
      // const height = document.querySelector('.section-content-explore-lightbox-force').clientHeight - 
      //                document.querySelector('.section-content-explore-lightbox-force__header').clientHeight

      // const lightboxWidth = document.querySelector('.section-content-explore-lightbox-force').clientWidth
      // const lightboxHeight = document.querySelector('.section-content-explore-lightbox-force').clientHeight
      
      // const lightboxHeaderHeight = document.querySelector('.section-content-explore-lightbox-force__header').clientHeight
      // const lightboxFooterHeight = document.querySelector('.section-content-explore-lightbox-force__footer').clientHeight

      // const width = lightboxWidth
      // const height = lightboxHeight - lightboxHeaderHeight - lightboxFooterHeight

      const width = document.querySelector('.section-content-explore-lightbox-force__graph-container').clientWidth
      const height = document.querySelector('.section-content-explore-lightbox-force__graph-container').clientHeight

      this.containerWidth = width
      this.containerHeight = height
    },
    setNodeImage (type) {
      if (type === 'position') {
        return  (d) => {
          if (d.type === 'candidate') {
            return -(Math.sqrt(this.scale.r(find(this.dataForceDonateSum.candidate, ['key', d.id]).value.total) * 23))
          } else {
            return -(Math.sqrt(this.scale.r(find(this.dataForceDonateSum.company, ['key', d.id]).value.total) * 23))
          }
        }
      } else if (type === 'size') {
        return  (d) => {
          if (d.type === 'candidate') {
            return (Math.sqrt(this.scale.r(find(this.dataForceDonateSum.candidate, ['key', d.id]).value.total) * 23)) * 2
          } else {
            return (Math.sqrt(this.scale.r(find(this.dataForceDonateSum.company, ['key', d.id]).value.total) * 23)) * 2
          }
        }
      }
    },
    ticked () {
      this.link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
      this.circle
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
      this.images
        .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
    },
    resize () {
      this.queryContainerDimensions()
      
      let width = this.containerWidth - 40 * 2
      const height = this.containerHeight
      if (this.isSidebarFoldedSingle) {
        width = width - 344
      } else if (!this.isSidebarFoldedDouble && !this.isSidebarFoldedSingle) {
        width = width - 688
      }

      this.svg.attr('width', width)
        .attr('height', height)
      this.simulation.force('center')
        .x(width / 2)
        .y(height / 2)

      this.simulation.restart()
      this.lapsedZoomFit(5, 250)
    },
    lapsedZoomFit (ticks = 200, transitionDuration) {
      for (let i = ticks; i > 0; --i) this.simulation.tick()
      d3.timeout(() => { this.zoomFit(undefined, transitionDuration) }, 200)
    },
    zoomFit (paddingPercent = 0.9, transitionDuration = 0) {
      const bounds = this.g.node().getBBox()
      const parent = this.g.node().parentElement
      const fullWidth = parent.getBoundingClientRect().width
      const fullHeight = parent.getBoundingClientRect().height
      // console.log(parent.getBoundingClientRect())
      const width = bounds.width
      const height = bounds.height
      const midX = bounds.x + width / 2
      const midY = bounds.y + height / 2

      if (width == 0 || height == 0) return // nothing to fit
      const scale = paddingPercent / Math.max(width / fullWidth, height / fullHeight)
      const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY]

      // console.trace('zoomFit', translate, scale)
      this.g
        .transition()
        .duration(transitionDuration) // milliseconds
        .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
      this.svg
        .transition()
        .duration(transitionDuration) // milliseconds
        .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
    },
    dragstarted (d) {
      if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart() }
      d.fx = d.x
      d.fy = d.y
    },
    dragged (d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    },
    dragended (d) {
      if (!d3.event.active) { this.simulation.alphaTarget(0) }
      d.fx = null
      d.fy = null
    },
    isConnected (a, b) {
      return this.linkedByIndex[a.index + ',' + b.index] || this.linkedByIndex[b.index + ',' + a.index] || a.index === b.index
    },
    mouseoverHandler () {
      const fadeOpacity = .1
      const defaultNodeOpacity = 1
      const defaultLinkOpacity = .7
      return (d) => {
        this.circle
        .style('stroke-opacity', o => {
          let thisOpacity = this.isConnected(d, o) ? 1 : fadeOpacity
          return thisOpacity
        })
        .style('fill-opacity', o => {
          let thisOpacity = this.isConnected(d, o) ? 1 : fadeOpacity
          return thisOpacity
        })

        this.images
        .style('opacity', o => {
          let thisOpacity = this.isConnected(d, o) ? 1 : fadeOpacity
          return thisOpacity
        })

        this.link
        .style('stroke-opacity', o =>
          o.source === d || o.target === d ? 0.7 : fadeOpacity
        )

        this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE', 'node')
        this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE', d.type)
        this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID', d.id)
      }
    },
    mouseoutHandler () {
      const defaultNodeOpacity = 1
      const defaultLinkOpacity = .7
      return (d) => {
        this.circle.style('stroke-opacity', defaultNodeOpacity)
        this.circle.style('fill-opacity', defaultNodeOpacity)
        this.images.style('opacity', defaultNodeOpacity)
        this.link.style('stroke-opacity', defaultLinkOpacity)

        this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE', '')
        this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE', '')
        this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID', '')
      }
    },
    visualizeGraph () {
      console.log('visulaize!');
      this.initScale()
      this.initSelection()
      this.initZoom()
      this.initSimulation()
      this.updateScales()
      this.initNodeLink()
      this.applySimulation()
      this.setLinkedByIndex()
      this.execZoomFit(200, 250)

      this.$root.$on('toogleZoom', type => {
        if (type === 'zoomIn') {
          this.zoom.scaleBy(this.g.transition().duration(350), 1.3)
          this.zoom.scaleBy(this.svg.transition().duration(350), 1.3)
        }
        if (type === 'zoomOut') {
          this.zoom.scaleBy(this.g.transition().duration(350), 1 / 1.3)
          this.zoom.scaleBy(this.svg.transition().duration(350), 1 / 1.3)
        }
      })

      this.$watch('isSidebarFoldedSingle', () => {
        this.queryContainerDimensions()
        // TODO: refactoring
        this.svgWidth = this.containerWidth - 40 * 2
        if (this.isSidebarFoldedSingle) {
          this.svgWidth = this.svgWidth - 344
        } else if (!this.isSidebarFoldedDouble && !this.isSidebarFoldedSingle) {
          this.svgWidth = this.svgWidth - 688
        }

        this.svg.attr('width', this.svgWidth)
        this.execZoomFit(5, 250)
      })

      d3.select(window).on('resize', this.resize)
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

