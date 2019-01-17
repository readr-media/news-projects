import moment from 'moment'
import { scaleLinear } from 'd3-scale'

import { colorsSource, sentimentRange } from 'src/components/ElectionNews/costants'

export function initColorCandidates () {
  const obj = {}
  colorsSource.forEach(color => {
    obj[color] = null
  })
  return obj
}

export function formatDate (date) {
  return moment(date, 'YYYY/MM/DD').format('YYYYMMDD')
}

export function scaleSentimentScore (score) {
  const scale =
    scaleLinear()
    .domain([ -1, 1 ])
    .range([0, 10])

  return scale(score)
}

export function sentimentScoreString (scaledScore) {
  if (scaledScore >= sentimentRange.bad.begin && scaledScore <= sentimentRange.bad.end) {
    return 'bad'
  } else if (scaledScore >= sentimentRange.normal.begin && scaledScore <= sentimentRange.normal.end) {
    return 'normal'
  } else if (scaledScore >= sentimentRange.good.begin && scaledScore <= sentimentRange.good.end) {
    return 'good'
  }
}

export function calcDateRangeDays (start, until) {
  return moment(until, 'YYYY/MM/DD').diff(moment(start, 'YYYY/MM/DD'), 'days') + 1
}