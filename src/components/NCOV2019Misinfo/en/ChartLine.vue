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
        margin: { top: 30, right: 100, left: 210, bottom: 300 }
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
        .domain([
          d3.timeParse('%Y-%m-%d')('2020-01-29'),
          d3.timeParse('%Y-%m-%d')('2020-05-12')
        ])
        .range([0, innerWidth])
      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.diagnoseCount))
        .range([noSplitHeight, 0])

      const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.diagnoseCount))
        .curve(d3.curveNatural)

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

      const axisDates = [
        '2020-02-06',
        '2020-02-18',
        '2020-03-01',
        '2020-03-12',
        '2020-03-24',
        '2020-04-04',
        '2020-04-16',
        '2020-04-27',
        '2020-05-09',
      ]
      wrapper.selectAll('line')
      .data(axisDates)
      .enter()
      .append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', (d) => x(d3.timeParse('%Y-%m-%d')(d)))
        .attr('y1', 0)
        .attr('x2', (d) => x(d3.timeParse('%Y-%m-%d')(d)))
        .attr('y2', 500)

      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', () => x(d3.timeParse('%Y-%m-%d')('2020-02-21')))
        .attr('y1', 0)
        .attr('x2', () => x(d3.timeParse('%Y-%m-%d')('2020-02-21')))
        .attr('y2', 500)
      const textWrapper1 = wrapper.append('g')
        .attr('transform', `translate(${x(d3.timeParse('%Y-%m-%d')('2020-02-21')) - 30}, 100)`)
      textWrapper1.append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('x1', 5)
        .attr('y1', -5)
        .attr('x2', 30)
        .attr('y2', -5)
      const text1 = textWrapper1.append('text')
        .attr('text-anchor', 'end')
      text1.append('tspan')
        .attr('fill', '#ec894c')
        .text('2/21')
      text1.append('tspan')
        .attr('x', 0)
        .attr('dy', 25)
        .text('Iran became a point of mass infection')
      // text1.append('tspan')
      //   .attr('x', 0)
      //   .attr('dy', 25)
      //   .text('傳染節點')

      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', () => x(d3.timeParse('%Y-%m-%d')('2020-02-25')))
        .attr('y1', 0)
        .attr('x2', () => x(d3.timeParse('%Y-%m-%d')('2020-02-25')))
        .attr('y2', 500)
      const textWrapper2 = wrapper.append('g')
        .attr('transform', `translate(${x(d3.timeParse('%Y-%m-%d')('2020-02-21')) - 30}, 200)`)
      textWrapper2.append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('x1', 5)
        .attr('y1', -5)
        .attr('x2', 30 + 62 - 9)
        .attr('y2', -5)
      const text2 = textWrapper2.append('text')
        .attr('text-anchor', 'end')
      text2.append('tspan')
        .attr('fill', '#ec894c')
        .text('2/25')
      text2.append('tspan')
        .attr('x', 0)
        .attr('dy', 25)
        .text('Italy became a point of mass infection')
      // text2.append('tspan')
      //   .attr('x', 0)
      //   .attr('dy', 25)
      //   .text('傳染節點')

      wrapper.append('line')
        .attr('stroke', '#d8d8d8')
        .attr('stroke-width', 1)
        .attr('x1', () => x(d3.timeParse('%Y-%m-%d')('2020-02-29')))
        .attr('y1', 0)
        .attr('x2', () => x(d3.timeParse('%Y-%m-%d')('2020-02-29')))
        .attr('y2', 500)
      const textWrapper3 = wrapper.append('g')
        .attr('transform', `translate(${x(d3.timeParse('%Y-%m-%d')('2020-02-21')) - 30}, 300)`)
      textWrapper3.append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('x1', 5)
        .attr('y1', -5)
        .attr('x2', 30 + 62 * 2 - 19)
        .attr('y2', -5)
      const text3 = textWrapper3.append('text')
        .attr('text-anchor', 'end')
      text3.append('tspan')
        .attr('fill', '#ec894c')
        .text('2/29')
      text3.append('tspan')
        .attr('x', 0)
        .attr('dy', 25)
        .text('The first death case in the United States')
      // text3.append('tspan')
      //   .attr('x', 0)
      //   .attr('dy', 25)
      //   .text('第一起死亡案例')
    }
  }
</script>

<style scoped>
  svg {
    width: 100%;
    height: 100%;
  }
</style>
