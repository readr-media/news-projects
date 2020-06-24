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
        width: 250,
        height: 550,
        margin: { top: 50, right: 30, left: 80, bottom: 30 }
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
      const noSplitHeight = 550

      const svgElement = this.$refs.svgElement
      const svg = d3
        .select(svgElement)
        .attr('viewBox', [0, 0, 414, noSplitHeight + margin.top + margin.bottom])
      const wrapper = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      const data = await d3.csv('/proj-assets/ncov2019misinfo/data/world_confirmed_case_without_china.csv', d => {
        return {
          date: d3.timeParse('%Y-%m-%d')(d.date),
          diagnoseCount: +d['diagnose_count']
        }
      })

      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.date))
        .range([0, noSplitHeight])
      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.diagnoseCount))
        .range([0, innerWidth])

      const line = d3.line()
        .y(d => y(d.date))
        .x(d => x(d.diagnoseCount))
      const path = wrapper.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#EC894C')
        .attr('stroke-width', 5)
        .attr('d', line)
      const totalLength = path.node().getTotalLength()
      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        // .ease("linear")
        .attr("stroke-dashoffset", 0);
      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', 0)
        .attr('y1', () => y(d3.timeParse('%Y-%m-%d')('2020-02-21')))
        .attr('x2', 314)
        .attr('y2', () => y(d3.timeParse('%Y-%m-%d')('2020-02-21')))
      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', 0)
        .attr('y1', () => y(d3.timeParse('%Y-%m-%d')('2020-02-25')))
        .attr('x2', 314)
        .attr('y2', () => y(d3.timeParse('%Y-%m-%d')('2020-02-25')))
      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', 0)
        .attr('y1', () => y(d3.timeParse('%Y-%m-%d')('2020-02-29')))
        .attr('x2', 314)
        .attr('y2', () => y(d3.timeParse('%Y-%m-%d')('2020-02-29')))
    }
  }
</script>

<style scoped>
  svg {
    width: 100%;
    height: 100%;
  }
</style>
