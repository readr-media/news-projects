<template>
  <div id="line-chart-4g">
    <p class="y-legend">比例</p>
    <div class="x-legend">
      <div class="x-legend__item">
        <div class="x-legend__icon x-legend-icon x-legend-icon--orange">
          <div class="x-legend-icon__circle"></div>
          <div class="x-legend-icon__line"></div>
        </div>
        <p class="x-legend__hint">4G普及率</p>
      </div>
      <div class="x-legend__item">
        <div class="x-legend__icon x-legend-icon x-legend-icon--green">
          <div class="x-legend-icon__circle"></div>
          <div class="x-legend-icon__line"></div>
        </div>
        <p class="x-legend__hint">光纖普及率</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    const margin = { top: 10, right: 30, bottom: 70, left: 60, }
    const padding = { top: 0, right: 0, bottom: 0, left: 0, }
    const outerWidth = 704
    const outerHeight = 455
    // const aspect = outerHeight / outerWidth
    const innerWidth = outerWidth - margin.left - margin.right
    const innerHeight = outerHeight - margin.top - margin.bottom
    const width = innerWidth - padding.left - padding.right
    const height = innerHeight - padding.top - padding.bottom

    return {
      margin,
      padding,
      outerWidth,
      outerHeight,
      // aspect,
      innerWidth,
      innerHeight,
      width,
      height,
      data: [
        {
          date: '2016-01',
          percentage4G: 0.52,
          percentageFTTX: 0.3985,
        },
        {
          date: '2016-02',
          percentage4G: 0.55,
          percentageFTTX: 0.3995,
        },
        {
          date: '2016-03',
          percentage4G: 0.57,
          percentageFTTX: 0.4019,
        },
        {
          date: '2016-04',
          percentage4G: 0.60,
          percentageFTTX: 0.4026,
        },
        {
          date: '2016-05',
          percentage4G: 0.62,
          percentageFTTX: 0.4041,
        },
        {
          date: '2016-06',
          percentage4G: 0.65,
          percentageFTTX: 0.4056,
        },
        {
          date: '2016-07',
          percentage4G: 0.67,
          percentageFTTX: 0.4086,
        },
        {
          date: '2016-08',
          percentage4G: 0.69,
          percentageFTTX: 0.4103,
        },
        {
          date: '2016-09',
          percentage4G: 0.71,
          percentageFTTX: 0.4110,
        },
        {
          date: '2016-10',
          percentage4G: 0.73,
          percentageFTTX: 0.4119,
        },
        {
          date: '2016-11',
          percentage4G: 0.75,
          percentageFTTX: 0.4117,
        },
        {
          date: '2016-12',
          percentage4G: 0.77,
          percentageFTTX: 0.4117,
        },
        {
          date: '2017-01',
          percentage4G: 0.78,
          percentageFTTX: 0.4131,
        },
        {
          date: '2017-02',
          percentage4G: 0.80,
          percentageFTTX: 0.4139,
        },
        {
          date: '2017-03',
          percentage4G: 0.81,
          percentageFTTX: 0.4147,
        },
        {
          date: '2017-04',
          percentage4G: 0.83,
          percentageFTTX: 0.4154,
        },
        {
          date: '2017-05',
          percentage4G: 0.85,
          percentageFTTX: 0.4157,
        },
        {
          date: '2017-06',
          percentage4G: 0.87,
          percentageFTTX: 0.4164,
        },
        {
          date: '2017-07',
          percentage4G: 0.89,
          percentageFTTX: 0.4171,
        },
        {
          date: '2017-08',
          percentage4G: 0.91,
          percentageFTTX: 0.4181,
        },
        {
          date: '2017-09',
          percentage4G: 0.92,
          percentageFTTX: 0.4187,
        },
        {
          date: '2017-10',
          percentage4G: 0.93,
          percentageFTTX: 0.4190,
        },
        {
          date: '2017-11',
          percentage4G: 0.94,
          percentageFTTX: 0.4188,
        },
        {
          date: '2017-12',
          percentage4G: 0.96,
          percentageFTTX: 0.4186,
        },
        {
          date: '2018-01',
          percentage4G: 0.97,
          percentageFTTX: 0.4186,
        },
        {
          date: '2018-02',
          percentage4G: 0.95,
          percentageFTTX: 0.4196,
        },
        {
          date: '2018-03',
          percentage4G: 0.96,
          percentageFTTX: 0.4193,
        },
        {
          date: '2018-04',
          percentage4G: 0.98,
          percentageFTTX: 0.4197,
        },
        {
          date: '2018-05',
          percentage4G: 1.01,
          percentageFTTX: 0.4190,
        },
      ]
    }
  },
  mounted () {
    if (window.innerWidth <= 768) {
      this.margin = { top: 10, right: 35, bottom: 70, left: 45, }
      this.outerWidth = window.innerWidth - 20 - 20
      this.outerHeight = this.outerWidth
      this.innerWidth = this.outerWidth - this.margin.left - this.margin.right
      this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom
      this.width = this.innerWidth - this.padding.left - this.padding.right
      this.height = this.innerHeight - this.padding.top - this.padding.bottom
    }

    const svg =
      d3.select('#line-chart-4g')
        .append('svg')
          .attr('width', this.outerWidth)
          .attr('height', this.outerHeight)
        .append('g')
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .append('g')
          .attr('transform', `translate(${this.padding.left}, ${this.padding.top})`)
    
    const parseTime = d3.timeParse('%Y-%m')
    const formatTime = d3.timeFormat('%Y/%m')
    this.data.forEach(d => d.date = parseTime(d.date))

    const xScale =
      d3.scaleTime()
        .domain(d3.extent(this.data, d => d.date))
        .range([ 0, this.width ])
    const yScale =
      d3.scaleLinear()
        .domain([ 0, 1.2 ])
        .range([ this.height, 0 ])
    
    const xAxis =
      d3.axisBottom(xScale)
        .ticks(window.innerWidth <= 768 ? 4 : 10)
        .tickSize(10)
        .tickPadding(10)
        .tickFormat(d => formatTime(d))
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis)
    const yAxis =
      d3.axisLeft(yScale)
        .ticks(4)
        .tickSize(this.width)
        .tickPadding(20)
        .tickFormat(d => `${d * 100}%`)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .attr('transform', `translate(${this.width}, 0)`)
      .call(yAxis)

    const line4G =
      d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.percentage4G))
    const lineFTTX =
      d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.percentageFTTX))

    svg
      .append('path')
      .data([ this.data ])
        .attr('class', 'line-4g')
        .attr('d', line4G)
    if (window.innerWidth > 425) {
      svg
        .selectAll('.circle-4g')
        .data(this.data)
        .enter()
        .append('circle')
          .attr('class', 'circle-4g')
          .attr('cx', d => xScale(d.date))
          .attr('cy', d => yScale(d.percentage4G))
          .attr('r', 5)
          .style('fill', '#fa8d62')
    }

    svg
      .append('path')
      .data([ this.data ])
        .attr('class', 'line-fttx')
        .attr('d', lineFTTX)
    if (window.innerWidth > 425) {
      svg
        .selectAll('.circle-fttx')
        .data(this.data)
        .enter()
        .append('circle')
          .attr('class', 'circle-fttx')
          .attr('cx', d => xScale(d.date))
          .attr('cy', d => yScale(d.percentageFTTX))
          .attr('r', 5)
          .style('fill', '#b2dbd5')
    }

    svg
      .selectAll('.hint-latest-4g')
      .data(this.data)
      .enter()
      .append('text')
        .attr('class', 'hint-latest hint-latest-4g')
        .attr('x', d => xScale(d.date) - 20)
        .attr('y', d => yScale(d.percentage4G) - 15)
        .text((d, i) => i === this.data.length - 1 ? `${d.percentage4G * 100}%` : '')
    svg
      .selectAll('.hint-latest-fttx')
      .data(this.data)
      .enter()
      .append('text')
        .attr('class', 'hint-latest hint-latest-fttx')
        .attr('x', d => xScale(d.date) - 20)
        .attr('y', d => yScale(d.percentageFTTX) - 15)
        .text((d, i) => i === this.data.length - 1 ? `${d.percentageFTTX * 100}%` : '')

  }
}
</script>

<style lang="stylus" scoped>
#line-chart-4g
  display flex
  justify-content center
  position relative
  & >>> .line-4g
    fill none
    stroke #fa8d62
    stroke-width 4px
  & >>> .line-fttx
    fill none
    stroke #b2dbd5
    stroke-width 4px
  & >>> .x-axis
    path
      stroke white
    line
      stroke white
    text
      fill white
      font-size 14px
  & >>> .y-axis
    .domain
      display none
    path
      stroke white
    line
      stroke #c9c9c9
    text
      fill white
      font-size 14px
  & >>> .hint-latest
    fill white
    font-size 14px

.x-legend
  position absolute
  bottom 0
  width 100%
  height 20px
  display flex
  justify-content center
  &__item
    display flex
    justify-content center
    & + &
      margin 0 0 0 40px
  &__hint
    color white
    margin 0
.x-legend-icon
  display flex
  align-items center
  &--orange
    color #fa8d62
  &--green
    color #b2dbd5
  &__circle
    r = 8px
    width r
    height r
    border-radius r
    background-color currentColor
    position relative
    left 4px
  &__line
    width 20px
    height 2px
    background-color currentColor
    position relative
    right 10px

.y-legend
  display flex
  align-items center
  color white
  position relative
  bottom 20px

@media (max-width 768px)
  #line-chart-4g
    & >>> .x-axis
      text
        font-size 9px
    & >>> .y-axis
      text
        font-size 9px
    & >>> .hint-latest
      font-size 12px

  .x-legend
    &__hint
      font-size 9px
      line-height 2.15

  .y-legend
    font-size 9px
</style>


