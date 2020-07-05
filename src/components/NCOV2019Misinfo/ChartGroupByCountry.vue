<template>
  <svg
    ref="svgElement"
    :width="width"
    :height="height"
  />
</template>

<script>
  import * as d3 from 'd3'
  import _ from 'lodash'

  export default {
    data() {
      return {
        width: 1680,
        height: 1800,
        margin: { top: 30, right: 100, left: 200, bottom: 30 }
      }
    },
    computed: {
      innerWidth() {
        return this.width - this.margin.left - this.margin.right
      }
    },
    methods: {
      resizeHandler() {
        const rect = this.$refs.svgElement.getBoundingClientRect()
        this.width = rect.width
        this.height = rect.height
      }
    },
    async mounted() {
      const width = this.width
      const height = this.height
      const margin = this.margin
      const innerWidth = this.innerWidth
      const noSplitHeight = this.height

      const svgElement = this.$refs.svgElement
      const svg = d3
        .select(svgElement)
        .attr('viewBox', [0, 0, width, noSplitHeight + margin.top + margin.bottom])
      const wrapper = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      const data = await d3.csv('/proj-assets/ncov2019misinfo/data/factcheck_report_split_country.csv', (d) => {
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
      const dataGroupByCountry =
        Object.entries(_.groupBy(data, (d) => d.country))
      let dataGroupByCountryTopTen = _.take(_.sortBy(dataGroupByCountry, (value) => {
        return -value[1].length
      }), 10)
      dataGroupByCountryTopTen = dataGroupByCountryTopTen.map(values => {
        const country = values[0]
        const data = values[1]
        return [country, Object.entries(_.groupBy(data, d => d.date))]
      })

      const xDomainData = _.flatten(dataGroupByCountryTopTen.map(values => values[1].map(values => values[0])))
      const x = d3
        .scaleLinear()
        .domain(d3.extent(xDomainData, (d) => d3.timeParse('%Y-%m-%d')(d)))
        .range([0, innerWidth])
      const xAxis = g => g
        .call(
          d3.axisTop(x)
            .tickFormat(d => d3.timeFormat('%m/%d')(d))
            .ticks(10)
          //   .tickValues([
          //     d3.timeParse('%Y-%m-%d')('2020-01-30'),
          //     d3.timeParse('%Y-%m-%d')('2020-03-20'),
          //     d3.timeParse('%Y-%m-%d')('2020-05-12')
          //   ])
        )
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('line').remove())
        .call(g => g.selectAll('text').style('font-size', '16px'))
      wrapper.append('g').call(xAxis)

      const yDomainData = dataGroupByCountryTopTen.map(values => values[0])
      const y = d3.scaleBand().domain(yDomainData).range([0, noSplitHeight])
      const yAxis = g => g
        .call(
          d3.axisLeft(y)
            .tickSizeInner(20)
            // .tickPadding(100)
            // .tickFormat(d => d3.timeFormat('%m/%d')(d))
            // .ticks(10)
          //   .tickValues([
          //     d3.timeParse('%Y-%m-%d')('2020-01-30'),
          //     d3.timeParse('%Y-%m-%d')('2020-03-20'),
          //     d3.timeParse('%Y-%m-%d')('2020-05-12')
          //   ])
        )
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('line').remove())
        .call(g => g.selectAll('text').style('font-size', '16px'))
      wrapper.append('g').call(yAxis)

      const rDomainData = _.flatten(dataGroupByCountryTopTen.map(values => values[1].map(values => values[1].length)))
      const r = d3
        .scaleSqrt()
        .domain(d3.extent(rDomainData))
        .range([5, 30])

      const bubbleData = _.flatten(dataGroupByCountryTopTen.map(d => d[1].map(dd => ({
        date: dd[0],
        country: d[0],
        reportCount: dd[1].length
      }))))
      this._circles = wrapper
        .append('g')
        .attr('className', 'circles')
        .selectAll('circle')
        .data(bubbleData)
        // .join('circle')
        .enter()
        .append('circle')
        .attr('r', (d) => r(d.reportCount))
        .attr('fill', '#EC894C')
        // .style('transition', 'fill 1s ease')
        .attr('x', (d) => x(d3.timeParse('%Y-%m-%d')(d.date)))
        .attr('y', (d) => y(d.country) + y.bandwidth() / 2)

      const force = d3
        .forceSimulation(bubbleData)
        .force('charge', d3.forceManyBody().strength(0))
        .force(
          'x',
          d3.forceX().x((d) => x(d3.timeParse('%Y-%m-%d')(d.date)))
        )
        .force(
          'y',
          d3.forceY((d) => y(d.country) + y.bandwidth() / 2)
        )
        .force(
          'collision',
          d3.forceCollide().radius((d) => r(d.reportCount) + 1)
        )
      force.on('tick', () => {
        for (let i = 0; i < 5; i++) {
          force.tick();
        }
        this._circles
          .transition()
          .ease(d3.easeLinear)
          .delay(function(d,i) {return d.x})
          .duration(1)
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
      })
      // Update simulation
      // force.force('y', d3.forceY((noSplitHeight - margin.top - margin.bottom) / 2))
      // force.alpha(1).restart()

      window.addEventListener('resize', this.resizeHandler)
    },
    destroyed() {
      window.removeEventListener('resize', this.resizeHandler)
    }
  }
</script>

<style scoped>
  svg {
    width: 100%;
    height: 100%;
  }
</style>
