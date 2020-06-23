<template>
  <svg
    ref='svgElement'
    :width='width'
    :height='height'
  />
</template>

<script>
  import * as d3 from 'd3'

  export default {
    data() {
      return {
        width: 1680,
        height: 1050,
        margin: { top: 30, right: 30, left: 30, bottom: 300 }
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
      const noSplitHeight = 200

      const svgElement = this.$refs.svgElement
      const svg = d3
        .select(svgElement)
        .attr('viewBox', [0, 0, width, noSplitHeight + margin.top + margin.bottom])
      const wrapper = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      const data = await d3.csv('/proj-assets/ncov2019misinfo/data/world_confirmed_case_without_china.csv', d => {
        return {
          date: d3.timeParse('%Y-%m-%d')(d.date),
          diagnoseCount: +d['diagnose_count']
        }
      })

      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.date))
        .range([0, innerWidth])
      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.diagnoseCount))
        .range([noSplitHeight, 0])

      const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.diagnoseCount))
      wrapper.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#EC894C')
        .attr('stroke-width', 5)
        .attr('d', line)
      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', () => x(d3.timeParse('%Y-%m-%d')('2020-02-21')))
        .attr('y1', 0)
        .attr('x2', () => x(d3.timeParse('%Y-%m-%d')('2020-02-21')))
        .attr('y2', 500)
      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', () => x(d3.timeParse('%Y-%m-%d')('2020-02-25')))
        .attr('y1', 0)
        .attr('x2', () => x(d3.timeParse('%Y-%m-%d')('2020-02-25')))
        .attr('y2', 500)
      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', () => x(d3.timeParse('%Y-%m-%d')('2020-02-29')))
        .attr('y1', 0)
        .attr('x2', () => x(d3.timeParse('%Y-%m-%d')('2020-02-29')))
        .attr('y2', 500)
    }
  }
</script>

<style scoped>
  svg {
    width: 100%;
    height: 100%;
  }
</style>
