<template>
  <div :id="`bar-${dataType}`"></div>
</template>

<script>
import * as d3 from 'd3'
import { chunk, mapKeys, sum, dropRight } from 'lodash'

export default {
  props: {
    dataType: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    dataChunked () {
      if (this.dataChunked.length > 0) {
        this.vis()
      }
    }
  },
  data () {
    return {
      bands: 
      this.dataType === 'age' ?
      [
        '15~29',
        '30~44',
        '45~59',
        '60~74',
        '75~89',
        '90以上'
      ] :
      [
        '國小畢 以下',
        '國中畢',
        '高中畢',
        '專畢',
        '大畢',
        '碩畢',
        '博畢'
      ]
    }
  },
  computed: {
    dataChunked () {
      if (this.dataType === 'age') {
        const chunked = chunk(this.data, 3)
        const chunkedSum = chunked.map(category => sum(category))
  
        // return mapKeys(chunkedSum, (v, k) => this.bands[k])
        return chunkedSum
      } else {
        // const dropOthers = dropRight(this.data)
        // const invertSort = dropOthers.reverse()
        return this.data
      }
    }
  },
  methods: {
    vis () {
      const width = d3.select('#bar-age').node().getBoundingClientRect().width
      const height = d3.select('#bar-age').node().getBoundingClientRect().height

      const margin = {
        top: 30,
        right: 0,
        bottom: this.dataType === 'age' ? 30 : 40,
        left: -5
      }

      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      const y =
        d3.scaleLinear()
          .domain([ 0, d3.max(this.dataChunked) ])
          .range([ innerHeight, 0 ])

      const bars = 
        this._svg
          .selectAll('.bar')
          .data(this.dataChunked)

      bars
        .attr('class', 'bar')
        .attr('x', (d, i) => this._x(i))
        .attr('width', this._x.bandwidth())
        .attr('y', d => y(d))
        .attr('height', d => innerHeight - y(d))
        
      bars
        .enter()
        .append('rect')
          .attr('class', 'bar')
          .attr('x', (d, i) => this._x(i))
          .attr('width', this._x.bandwidth())
          .attr('y', d => y(d))
          .attr('height', d => innerHeight - y(d))

      const texts = 
        this._svg
          .selectAll('.text')
          .data(this.dataChunked)

      texts
        .attr('class', 'text')
        .attr('x', (d, i) => this._x(i) + this._x.bandwidth() / 2)
        .attr('y', d => y(d) - 10)
        .text(d => d.toLocaleString())
        
      texts
        .enter()
        .append('text')
          .attr('class', 'text')
          .attr('x', (d, i) => this._x(i) + this._x.bandwidth() / 2)
          .attr('y', d => y(d) - 10)
          .style('text-anchor', 'middle')
          .style('font-size', '12px')
          .text(d => d.toLocaleString())
    }
  },
  mounted () {
      const width = d3.select('#bar-age').node().getBoundingClientRect().width
      const height = d3.select('#bar-age').node().getBoundingClientRect().height

      const margin = {
        top: 30,
        right: 0,
        bottom: this.dataType === 'age' ? 30 : 40,
        left: -5
      }

      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      this._x = 
        d3.scaleBand()
          .domain(this.dataType === 'age' ? [ 0, 1, 2, 3, 4, 5 ] : [ 0, 1, 2, 3, 4, 5, 6])
          .range([ 0, innerWidth ])
          .padding(0.4)
          .paddingOuter(.5)

      this._svg =
        d3.select(`#bar-${this.dataType}`)
          .append('svg')
            .attr('width', width)
            .attr('height', height)
          .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

      const axis =
        d3.axisBottom(this._x)
          .tickFormat(tick => this.bands[tick])

      const axisElement =
        this._svg
          .append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(axis)

      axisElement
        .selectAll(`#bar-${this.dataType} .tick text`)
          .call(wrap, this._x.bandwidth() + 10)
          
      if (this.dataType === 'age') {
        axisElement
          .append('text')
            .attr('x', this._x(5) + 50)
            .attr('y', 18)
            .text('(歲)')
            .style('fill', 'black')
            .style('font-size', '12px')
      }

      function wrap(text, width) {
        text.each(function() {
          const text = d3.select(this)
          const words = text.text().split(/\s+/).reverse()
          let word
          let line = []
          let lineNumber = 0
          const lineHeight = 1.3 // ems
          const y = text.attr("y")
          const dy = parseFloat(text.attr("dy"))
          let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")

          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(""));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }
  }
}
</script>

<style lang="stylus" scoped>
#bar-age, #bar-education
  height calc(150px - 22px)
  & >>> .bar
    fill #d3d3d3
  & >>> .domain
    // display none
    stroke #979797
  & >>> .tick line
    display none
  & >>> .tick text
    font-size 12px
</style>


