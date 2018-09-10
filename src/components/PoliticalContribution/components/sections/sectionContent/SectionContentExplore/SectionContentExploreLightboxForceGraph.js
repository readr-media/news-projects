import * as d3 from 'd3'

export function getContainerDimensions (selector = '.section-content-explore-lightbox-force__graph-container') {
  return {
    containerWidth: document.querySelector(selector).clientWidth,
    containerHeight: document.querySelector(selector).clientHeight,
  }
}

const fadeOpacity = .1
const defaultNodeOpacity = 1
const defaultLinkOpacity = .7
function isConnected (a, b, linkedByIndex) {
  return linkedByIndex[a.id + ',' + b.id] || linkedByIndex[b.id + ',' + a.id] || a.id === b.id
}
export function mouseoverHandlerNode (vm, linkedByIndex) {
  return (d) => {
    d3.selectAll('.circles')
      .style('stroke-opacity', o => isConnected(d, o, linkedByIndex) ? 1 : fadeOpacity)
      .style('fill-opacity', o => isConnected(d, o, linkedByIndex) ? 1 : fadeOpacity)

    d3.selectAll('.images')
      .style('opacity', o => isConnected(d, o, linkedByIndex) ? 1 : fadeOpacity)

    d3.selectAll('.links line')
      .style('stroke-opacity', o => o.source === d || o.target === d ? 0.7 : fadeOpacity)

    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE', 'node')
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE', d.type)
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID', d.id)
  }
}
export function mouseoutHandlerNode (vm) {
  return () => {
    d3.selectAll('.circles')
      .style('stroke-opacity', defaultNodeOpacity)
    d3.selectAll('.circles')
      .style('fill-opacity', defaultNodeOpacity)
    d3.selectAll('.images')
      .style('opacity', defaultNodeOpacity)
    d3.selectAll('.links line')
      .style('stroke-opacity', defaultLinkOpacity)

    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE', '')
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE', '')
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID', '')
  }
}
export function mouseoverHandlerLink (vm) {
  return d => {
    // Fadeout or preserve links
    d3.selectAll('line')
      .style('stroke-opacity', fadeOpacity)
    d3.select(`#link-${d.source.id}-${d.target.id}`)
      .style('stroke-opacity', defaultLinkOpacity)
    // Fadeout or preserve nodes
    d3.selectAll('circle')
      .style('opacity', fadeOpacity)
    d3.selectAll('image')
      .style('opacity', fadeOpacity)
    d3.select(`#image-${d.source.id}`)
      .style('opacity', defaultNodeOpacity)
    d3.select(`#circle-${d.source.id}`)
      .style('opacity', defaultNodeOpacity)
    d3.select(`#image-${d.target.id}`)
      .style('opacity', defaultNodeOpacity)
    d3.select(`#circle-${d.target.id}`)
      .style('opacity', defaultNodeOpacity)
  
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE', 'link')
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE', d.type)
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID', { source: d.source.id, target: d.target.id })
  }
}
export function mouseoutHandlerLink (vm) {
  return () => {
    // Set all the svg elements opacity to original
    d3.selectAll('line')
      .style('stroke-opacity', defaultLinkOpacity)
    d3.selectAll('circle')
      .style('opacity', defaultNodeOpacity)
    d3.selectAll('image')
      .style('opacity', defaultNodeOpacity)
  
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_GRAPH_TYPE', '')
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_TYPE', '')
    vm.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_FORCE_MOUSEOVER_IDENTITY_ID', '')
  }
}

export function dragstarted (vm) {
  return (d) => {
    if (!d3.event.active) { vm.simulation.alphaTarget(0.3).restart() }
    d.fx = d.x
    d.fy = d.y
  }
}
export function dragged (vm) {
  return (d) => {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }
}
export function dragended (vm) {
  return (d) => {
    if (!d3.event.active) { vm.simulation.alphaTarget(0) }
    d.fx = null
    d.fy = null
  }
}

export function setNodeImage (vm, type) {
  if (type === 'position') {
    return d => -vm.getNodeRadius(d)
  } else if (type === 'size') {
    return d => vm.getNodeRadius(d) * 2
  }
}

function getZoom (container, paddingPercent = 0.9) {
  const bounds = container.node().getBBox()
  const parent = container.node().parentElement
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
  return {
    scale,
    translate
  }
}

export function toogleZoom (vm, type) {
  vm.zoom.scaleBy(vm.g.transition().duration(350), type === 'zoomIn' ? 1.3 : 1 / 1.3)
  vm.zoom.scaleBy(vm.svg.transition().duration(350), type === 'zoomIn' ? 1.3 : 1 / 1.3)
}

export function lapsedZoomFit (vm, ticks = 200, transitionDuration = 250) {
  for (let i = ticks; i > 0; --i) vm.simulation.tick()
  d3.timeout(() => { zoomFit(vm, transitionDuration) }, 200)
}
export function zoomFit (vm, transitionDuration = 0) {
  const { scale, translate } = getZoom(vm.g)
  vm.g
    .transition()
    .duration(transitionDuration) // milliseconds
    .call(vm.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
  vm.svg
    .transition()
    .duration(transitionDuration) // milliseconds
    .call(vm.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
}