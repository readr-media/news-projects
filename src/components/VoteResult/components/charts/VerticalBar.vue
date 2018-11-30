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
        '15~29 歲',
        '30~44 歲',
        '45~59 歲',
        '60~74 歲',
        '75~89 歲',
        '90 歲以上'
      ] :
      [
        '高中職以下',
        '高中',
        '專科',
        '大學',
        '碩士',
        '博士',
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
        const dropOthers = dropRight(this.data)
        const invertSort = dropOthers.reverse()
        return invertSort
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
        bottom: 30,
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
          .style('font-size', '16px')
          .text(d => d.toLocaleString())
    }
  },
  mounted () {
      const width = d3.select('#bar-age').node().getBoundingClientRect().width
      const height = d3.select('#bar-age').node().getBoundingClientRect().height

      const margin = {
        top: 30,
        right: 0,
        bottom: 30,
        left: -5
      }

      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      this._x = 
        d3.scaleBand()
          .domain([ 0, 1, 2, 3, 4, 5 ])
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

      this._svg
        .append('g')
          .attr('class', 'axis')
          .attr('transform', `translate(0, ${innerHeight})`)
          .call(axis)
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


