import * as d3 from 'd3'

import {
  translateOffsetDuel
} from '../costants'
import {
  calcDateRangeDays
} from '../util'

export function duelArea () {
  let dateRange = []
  let colorState = '#fad187'
  let dimension = { width: 0, height: 0 }
  let type = 'left'
  let x = null // required props
  let y = null // required props

  const timeParse = d3.timeParse('%Y/%m/%d')
  const timeFormat = d3.timeFormat('%m/%d')
  const paddingTop = translateOffsetDuel.y

  function chart (selection) {
    const area =
      d3.area()
        .x0(type === 'left' ? dimension.width : 0)
        .x1(d => x(d.values))
        .y(d => y(timeParse(d.date)))
        .curve(d3.curveMonotoneY)
    const xAxis =
      d3.axisTop(x)
        .ticks(3)
        .tickSize(dimension.height + paddingTop)
    const yAxis =
      d3.axisLeft(y)
        .tickSize(0)
        .tickFormat(timeFormat)
        .ticks(calcDateRangeDays(dateRange[0], dateRange[1]))

    selection.each(function (data) {
      const svg =
        d3.select(this)

      svg
        .select('.chart__x-axis')
        .attr('transform', `translate(${type === 'left' ? 0 : 34 * 2}, ${dimension.height + paddingTop})`)
        .call(xAxis)

      svg
        .select('.chart__y-axis')
        .attr('transform', `translate(${34 + 37.41 * 0.5}, ${paddingTop})`)
        .call(yAxis)

      const paths =
        svg
          .selectAll('.area')
          .data([data])

      paths
        .enter()
        .append('path')
        .merge(paths)
          .attr('class', 'area')
          .attr('transform', `translate(${type === 'left' ? 0 : 34 * 2}, ${paddingTop})`)
          .attr('fill', type === 'left' ? 'rgba(243, 125, 133, 0.7)' : 'rgba(115, 207, 234, 0.7)')
          .attr('d', area)

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

  chart.dimension = function (_) {
    if (!arguments.length) return dimension
    dimension = _
    return chart
  }

  chart.type = function (_) {
    if (!arguments.length) return type
    type = _
    return chart
  }

  chart.x = function (_) {
    if (!arguments.length) return x
    x = _
    return chart
  }

  chart.y = function (_) {
    if (!arguments.length) return y
    y = _
    return chart
  }

  return chart
}