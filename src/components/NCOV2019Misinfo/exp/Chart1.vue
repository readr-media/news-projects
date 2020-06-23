<template>
  <div style="width: 100vw; height: 100vh">
    <svg
      ref="svgElement"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

export default {
  data() {
    return {
      width: 1680,
      height: 1050,
      margin: { top: 30, right: 30, left: 120, bottom: 30 }
    }
  },
  computed: {
    innerWidth() {
      return this.width - this.margin.left - this.margin.right
    }
  },
  async mounted() {
    const width = this.width
    const height = this.height
    const margin = this.margin
    const innerWidth = this.innerWidth
    const noSplitHeight = 500

    const svgElement = this.$refs.svgElement
    const svg = d3
      .select(svgElement)
      .attr('viewBox', [0, 0, width, noSplitHeight + margin.top + margin.bottom])
    const wrapper = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const data = await d3.csv('/proj-assets/ncov2019misinfo/data/factcheck_report.csv', (d) => {
      return {
        // date: d3.timeParse('%Y-%m-%d')(d.date),
        date: d.date,
        country: d.country,
        title: d.title,
        platform: d.platform,
        topics: d.topics.split(','),
        keywords: d.keywords.split(','),
      }
    })

    const dataGroupByDate = _.map(
      _.groupBy(data, (d) => d.date),
      (value, key) => {
        return {
          date: d3.timeParse('%Y-%m-%d')(key),
          reportCount: value.length,
        }
      }
    )
    const x = d3
      .scaleLinear()
      .domain(d3.extent(dataGroupByDate, (d) => d.date))
      .range([0, innerWidth])

    const y = d3.scaleBand().domain(['All']).range([noSplitHeight, 0])
    const r = d3
      .scaleSqrt()
      .domain(d3.extent(dataGroupByDate, (d) => d.reportCount))
      .range([5, 30])

    const circles = wrapper
      .append('g')
      .attr('className', 'circles')
      .selectAll('circle')
      .data(dataGroupByDate)
      // .join('circle')
      .enter()
      .append('circle')
      .attr('r', (d) => r(d.reportCount))
      .attr('fill', '#EC894C')
      .attr('x', (d) => x(d.date))
      .attr('y', (d) => 10)
    // .attr('y', (d) => y(d[0]) + y.bandwidth() / 2)

    const force = d3
      .forceSimulation(dataGroupByDate)
      .force('charge', d3.forceManyBody().strength(0))
      .force(
        'x',
        d3.forceX().x((d) => x(d.date))
      )
      .force(
        'y',
        d3.forceY((d) => 10)
      )
      .force(
        'collision',
        d3.forceCollide().radius((d) => r(d.reportCount) + 1)
      )
    force.on('tick', () => {
      circles
        .transition()
        .ease(d3.easeLinear)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
    })
    // // Update simulation
    force.force('y', d3.forceY((noSplitHeight - margin.top - margin.bottom) / 2))
    force.alpha(1).restart()

    window.addEventListener('resize', () => {
      const rect = this.$refs.svgElement.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
    })
  }
}
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
