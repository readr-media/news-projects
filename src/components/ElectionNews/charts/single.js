import * as d3 from 'd3'
import {
  graphDataToArray,
  getDateExtent,
  getNewsCountMax,
  getColor
} from './util'
import {
  marginSingle,
  translateOffsetSingle
} from '../costants'
import {
  calcDateRangeDays
} from '../util'

export function single () {
  let dateRange = []
  let colorState = '#fad187'

  const colorDefault = '#fad187'
  const timeParse = d3.timeParse('%Y/%m/%d')
  const timeFormat = d3.timeFormat('%m/%d')
  const x = d3.scaleLinear()
  const y = d3.scaleTime()
  const xAxis =
    d3.axisTop(x)
      .ticks(3)
  const yAxis =
    d3.axisLeft(y)
      .tickSize(20)
      .tickFormat(timeFormat)
  const line =
    d3.line()
      .x(d => x(d.newsCount))
      .y(d => y(timeParse(d.date)))
      .curve(d3.curveMonotoneY)
  const margin = marginSingle
  const paddingTop = translateOffsetSingle.y
  const xAxisTickSizeOffset = paddingTop + 10

  function chart (selection) {
    // set range of scales
    const width = selection.node().getBoundingClientRect().width - margin.left - margin.right
    const height = selection.node().getBoundingClientRect().height - margin.top - margin.bottom
    x.range([ 0, width ])
    y.range([ 0, height ])

    selection.each(function (data) {
      // data preprocessing
      // console.log(data);
      data = graphDataToArray(data, dateRange)
      // console.log(data);

      // set domain of scales
      x.domain([ 0 , getNewsCountMax(data) ])
      y.domain(getDateExtent(dateRange))

      xAxis
        .tickSize(height + xAxisTickSizeOffset)
      yAxis
        .ticks(calcDateRangeDays(dateRange[0], dateRange[1]))

      const svg =
        d3.select(this)
          .select('.chart__lines')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)

      svg
        .select('.chart__x-axis')
        .attr('transform', `translate(0, ${height + xAxisTickSizeOffset})`)
        .call(xAxis)
      svg
        .select('.chart__y-axis')
        .attr('transform', `translate(0, ${paddingTop})`)
        .call(yAxis)

      const paths = 
        svg
          .selectAll('.line')
          .data(data, d => d.source)
        
      paths
        .enter()
        .append('path')
        .merge(paths)
          .attr('class', 'line')
          .attr('fill', 'none')
          .attr('stroke', d => getColor(colorState, d.source) || colorDefault)
          .attr('stroke-width', 3.0)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('transform', `translate(0, ${paddingTop})`)
          .attr('d', d => line(d.values))

      paths
        .exit()
        .remove()
    })
  }

  chart.dateRange = function (_) {
    if (!arguments.length) return dateRange
    dateRange = _
    return chart
  }

  chart.colorState = function (_) {
    if (!arguments.length) return colorState
    colorState = _
    return chart
  }

  return chart
}