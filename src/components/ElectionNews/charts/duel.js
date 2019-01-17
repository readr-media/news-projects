import * as d3 from 'd3'
import {
  graphDataToArrayDuel,
  getDateExtent,
  getNewsCountMaxDuel,
} from './util'
import {
  marginDuel,
} from '../costants'

import { duelArea } from './duelArea'

export function duel () {
  let dateRange = []
  let colorState = '#fad187'

  const xLeft = d3.scaleLinear()
  const xRight = d3.scaleLinear()
  const y = d3.scaleTime()
  const margin = marginDuel

  function chart (selection) {
    // set range of scales
    let width = selection.node().getBoundingClientRect().width
    width = width * 0.5 - 34 - margin.left - margin.right
    const height = selection.node().getBoundingClientRect().height - margin.top - margin.bottom

    xLeft.range([ width, 0 ])
    xRight.range([ 0, width ])
    y.range([ 0, height ])

    selection.each(function (data) {
      // data preprocessing
      // console.log(data);
      data = graphDataToArrayDuel(data, dateRange)
      // console.log(data);

      // set domain of scales
      xLeft.domain([ 0 , getNewsCountMaxDuel(data) ])
      xRight.domain([ 0 , getNewsCountMaxDuel(data) ])
      y.domain(getDateExtent(dateRange))

      const duelAreaLeft = 
        duelArea()
        .dateRange(dateRange)
        .colorState(colorState)
        .dimension({ width, height })
        .type('left')
        .x(xLeft)
        .y(y)

      d3.select(this)
        .select('.chart__left')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .datum(data[0])
        .call(duelAreaLeft)
        
      const duelAreaRight = 
        duelArea()
        .dateRange(dateRange)
        .colorState(colorState)
        .dimension({ width, height })
        .type('right')
        .x(xRight)
        .y(y)

      d3.select(this)
        .select('.chart__right')
        .attr('transform', `translate(${width}, ${margin.top})`)
        .datum(data[1])
        .call(duelAreaRight)
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