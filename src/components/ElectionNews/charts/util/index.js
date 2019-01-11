import * as d3 from 'd3'
import moment from 'moment'
import { map, sortBy, groupBy, flatten, findKey, isEmpty, uniq, xor } from 'lodash'

const timeParse = d3.timeParse('%Y/%m/%d')

function getSourcesId (data) {
  const _map = map(data, value => Object.keys(value))
  const _flatten = flatten(_map)
  const _uniq = uniq(_flatten)
  return _uniq
}

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = moment(startDate, 'YYYY/MM/DD')
  stopDate = moment(stopDate, 'YYYY/MM/DD')
  while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate, 'YYYY/MM/DD').format('YYYY/MM/DD'))
      currentDate = moment(currentDate, 'YYYY/MM/DD').add(1, 'days')
  }
  return dateArray
}

export function graphDataToArray (data, dateRange) {
  const sourcesId = getSourcesId(data)

  // add "date: {}"" key value pair if data is missing that date
  const dates = getDates(dateRange[0], dateRange[1])
  dates.forEach(date => {
    if (!(date in data)) {
      data[date] = {}
    }
  })

  const _map = map(data, (value, date) => {
    // basically is a fill newsCount 0 to the object of na date
    const missingSourcesId = xor(sourcesId, Object.keys(value))
    if (!isEmpty(missingSourcesId) && date !== 'related_keywords') {
      missingSourcesId.forEach(id => {
        value[id] = {
          newsCount: 0,
          newsSentimentScore: null
        }
      })
    }

    return map(value, (value, key) => ({
      date,
      source: key,
      newsCount: value.newsCount,
      newsSentimentScore: value.newsSentimentScore
    }))
  })
  const _flatten = sortBy(flatten(_map), d => timeParse(d.date))
  const _grouyBySource = groupBy(_flatten, d => d.source)

  return map(_grouyBySource, (values, source) => ({ source, values }))
}

// export function getDateExtent (data) {
//   return d3.extent(flatten(map(data, d => d.values)), d => timeParse(d.date))
// }
export function getDateExtent (dateRange) {
  return dateRange.map(date => timeParse(date))
}

export function getNewsCountMax (data) {
  return d3.max(flatten(map(data, d => d.values)), d => d.newsCount)
}

export function getColor (color, id) {
  return findKey(color, d => d === id)
}