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
    props: {
      chartIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        width: 414,
        height: 500,
        margin: { top: 50, right: 30, left: 30, bottom: 30 }
      }
    },
    computed: {
      innerWidth() {
        return this.width - this.margin.left - this.margin.right
      }
    },
    watch: {
      chartIndex() {
        switch (this.chartIndex) {
          case 1: {
            this._circles
              .attr('fill', '#EC894C')
            this._force.force('x', d3.forceX(this.innerWidth * 0.5))
            this._force.alpha(1).restart()
            this._yAxisHighlighted && this._yAxisHighlighted.remove()
            break
          }
          case 2: {
            this._circles
              .attr('fill', (d) => {
                if (!d.date) {
                  return
                }
                if (
                  _.find(
                    this.dataGroupByDateChina,
                    (data) => data.date.getTime() === d.date.getTime()
                  ) !== undefined
                ) {
                  return `url(#${d3.timeFormat('%Y-%m-%d')(d.date)})`
                } else {
                  return '#f2f2f2'
                }
              })
            this._force.force('x', d3.forceX(this.innerWidth * 0.5))
            this._force.alpha(1).restart()
            this._yAxisHighlighted && this._yAxisHighlighted.remove()
            break
          }
          case 3: {
            this._circles
              .attr('fill', '#f2f2f2')
            this._force.force('x', d3.forceX(this.innerWidth * 0.75))
            this._force.alpha(1).restart()
            const yAxis = g => g
              .call(
                d3.axisLeft(this._y)
                  .tickFormat(d => d3.timeFormat('%m/%d')(d))
                  // .ticks(3)
                  .tickValues([
                    d3.timeParse('%Y-%m-%d')('2020-02-21'),
                    d3.timeParse('%Y-%m-%d')('2020-02-25'),
                    d3.timeParse('%Y-%m-%d')('2020-02-29')
                  ])
              )
              .call(g => g.select('.domain').remove())
              .call(g => g.selectAll('line').remove())
              .call(g => g.selectAll('text').style('font-size', '16px').style('fill', '#ec894c'))
              .attr('transform', 'translate(40, 0)')
            this._yAxisHighlighted = this._wrapper.append('g').call(yAxis)
            break
          }
        }
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
      const noSplitHeight = 550

      const svgElement = this.$refs.svgElement
      const svg = d3
        .select(svgElement)
        .attr('viewBox', [0, 0, width, noSplitHeight + margin.top + margin.bottom])
      const wrapper = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
      this._wrapper = wrapper

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
      const dataChina = data.filter((d) => d.keywords.includes('中國'))
      const dataGroupByDate = _.map(
        _.groupBy(data, (d) => d.date),
        (value, key) => {
          return {
            date: d3.timeParse('%Y-%m-%d')(key),
            reportCount: value.length,
          }
        }
      )
      const dataGroupByDateChina = _.map(
        _.groupBy(dataChina, (d) => d.date),
        (value, key) => {
          return {
            date: d3.timeParse('%Y-%m-%d')(key),
            reportCount: value.length,
          }
        }
      )
      this.dataGroupByDateChina = dataGroupByDateChina

      const x = d3
        .scaleLinear()
        .domain(d3.extent(dataGroupByDate, (d) => d.date))
        .range([0, innerWidth])
      // const xAxis = g => g
      //   .call(
      //     d3.axisTop(x)
      //     .tickFormat(d => d3.timeFormat('%m/%d')(d))
      //     // .ticks(20)
      //   )
      //   .call(g => g.select('.domain').remove())
      //   .call(g => g.selectAll('line').remove())
      //   .call(g => g.selectAll('text').style('font-size', '16px'))
      // wrapper.append('g').call(xAxis)

      // const y = d3.scaleBand().domain(['All']).range([noSplitHeight, 0])
      const y = d3
        .scaleLinear()
        .domain(d3.extent(dataGroupByDate, (d) => d.date))
        .range([0, noSplitHeight])
      this._y = y
      const yAxis = g => g
        .call(
          d3.axisLeft(y)
            .tickFormat(d => d3.timeFormat('%m/%d')(d))
            // .ticks(3)
            .tickValues([
              d3.timeParse('%Y-%m-%d')('2020-01-30'),
              d3.timeParse('%Y-%m-%d')('2020-03-20'),
              d3.timeParse('%Y-%m-%d')('2020-05-12')
            ])
        )
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('line').remove())
        .call(g => g.selectAll('text').style('font-size', '16px'))
        .attr('transform', 'translate(40, 0)')
      wrapper.append('g').call(yAxis)

      const r = d3
        .scaleSqrt()
        .domain(d3.extent(dataGroupByDate, (d) => d.reportCount))
        .range([2, 14])

      const defs = svg.append('defs')
      const gradients = defs
        .selectAll('radialGradient')
        .data(dataGroupByDateChina)
        .enter()
        .append('radialGradient')
        .attr('id', (d) => d3.timeFormat('%Y-%m-%d')(d.date))
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%')
      gradients
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#EC894C')
        .attr('stop-opacity', '1')
      gradients
        .append('stop')
        .attr('offset', (d) => {
          const countChina = d.reportCount
          const countTotal = _.find(
            dataGroupByDate,
            (data) => data.date.getTime() === d.date.getTime()
          ).reportCount
          return `${(countChina / countTotal) * 100}%`
        })
        .attr('stop-color', '#EC894C')
        .attr('stop-opacity', '1')
      gradients
        .append('stop')
        .attr('offset', (d) => {
          const countChina = d.reportCount
          const countTotal = _.find(
            dataGroupByDate,
            (data) => data.date.getTime() === d.date.getTime()
          ).reportCount
          return `${(countChina / countTotal) * 100}%`
        })
        .attr('stop-color', '#F2F2F2')
        .attr('stop-opacity', '1')
      gradients
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#F2F2F2')
        .attr('stop-opacity', '1')

       this._circles = wrapper
        .append('g')
        .attr('className', 'circles')
        .selectAll('circle')
        .data(dataGroupByDate)
        // .join('circle')
        .enter()
        .append('circle')
        .attr('r', (d) => r(d.reportCount))
        .attr('fill', '#EC894C')
         // .style('transition', 'fill 1s ease')
        .attr('y', (d) => y(d.date))
        .attr('x', (d) => innerWidth / 2)
      // .attr('y', (d) => y(d[0]) + y.bandwidth() / 2)

      this._force = d3
        .forceSimulation(dataGroupByDate)
        .force('charge', d3.forceManyBody().strength(0))
        .force(
          'y',
          d3.forceY().y((d) => y(d.date))
        )
        .force(
          'x',
          d3.forceX((d) => innerWidth / 2)
        )
        .force(
          'collision',
          d3.forceCollide().radius((d) => r(d.reportCount) + 1)
        )
      this._force.on('tick', () => {
        this._circles
          .transition()
          .ease(d3.easeLinear)
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
      })
      // Update simulation
      // force.force('y', d3.forceY((noSplitHeight - margin.top - margin.bottom) / 2))
      // this._force.alpha(1).restart()


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
