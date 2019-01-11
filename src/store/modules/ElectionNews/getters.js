import {
  findKey,
  isEmpty,
  map,
  flatten,
  uniq,
  sortBy,
  union,
  mapValues,
  pick,
  groupBy
} from 'lodash'
import moment from 'moment'

import { formatDate, sentimentScoreString, scaleSentimentScore } from 'src/components/ElectionNews/util'

export default {
  keywordsMappingFetchStatus (state) {
    const keywords = state.mapping.keywords
    if (isEmpty(keywords)) {
      return 'loading'
    } else {
      return 'finish'
    }
  },
  keywordIdFirst (state, getters, rootState, rootGetters) {
    const keywords = state.mapping.keywords
    return findKey(keywords, o => o === rootState.route.params.params)
  },
  keywordIdSecond (state, getters, rootState, rootGetters) {
    const keywords = state.mapping.keywords
    return findKey(keywords, o => o === rootState.route.params.subparams)
  },

  // non-filtered keyword's graph data
  graphDataKeywordFirst (state, getters) {
    const graphData = state.data.graph
    return graphData[getters.keywordIdFirst]
  },
  graphDataKeywordSecond (state, getters) {
    const graphData = state.data.graph
    return graphData[getters.keywordIdSecond]
  },
  // non-filtered keyword's graph data source ids
  graphDataKeywordFirstSourceIds (state, getters) {
    const _map = map(getters.graphDataKeywordFirst, (value, key) => Object.keys(value))
    const _flatten = flatten(_map)
    const _uniq = uniq(_flatten).filter(id => id !== 'total' && id !== '0')
    const _sorted = sortBy(_uniq, id => +id)
    return _sorted
  },
  graphDataKeywordSecondSourceIds (state, getters) {
    const _map = map(getters.graphDataKeywordSecond, (value, key) => Object.keys(value))
    const _flatten = flatten(_map)
    const _uniq = uniq(_flatten).filter(id => id !== 'total' && id !== '0')
    const _sorted = sortBy(_uniq, id => +id)
    return _sorted
  },
  graphDataKeywordSourceIds (state, getters) {
    if (getters.keywordIdSecond !== undefined && getters.keywordIdSecond !== '') {
      return union(getters.graphDataKeywordFirstSourceIds, getters.graphDataKeywordSecondSourceIds)
    }
    return getters.graphDataKeywordFirstSourceIds
  },

  graphDataKeywordFirstFiltered (state, getters) {
    const data = getters.graphDataKeywordFirst
    return mapValues(data, o => pick(o, state.filter.sources.length === 0 ? 'total' : state.filter.sources))
  },
  graphDataKeywordSecondFiltered (state, getters) {
    const data = getters.graphDataKeywordSecond
    return mapValues(data, o => pick(o, state.filter.sources.length === 0 ? 'total' : state.filter.sources))
  },

  graphDataKeywordFirstTotal (state, getters) {
    const data = getters.graphDataKeywordFirst
    return mapValues(data, o => pick(o, 'total'))
  },
  graphDataKeywordSecondTotal (state, getters) {
    const data = getters.graphDataKeywordSecond
    return mapValues(data, o => pick(o, 'total'))
  },

  dateRangeDays (state) {
    const { start, until } = state.data.date
    return moment(until, 'YYYY/MM/DD').diff(moment(start, 'YYYY/MM/DD'), 'days') + 1
  },

  graphTrackingLineDate (state) {
    const { start } = state.data.date
    const afterDays = state.graphTrackingLine.stepIndex

    return moment(start, 'YYYY/MM/DD')
      .add(afterDays, 'days')
      .format('YYYY/MM/DD')
  },

  newcontentKeyKeywordFirst (state, getters) {
    const lightboxDate = state.lightboxDate
    return `${formatDate(lightboxDate)}-${getters.keywordIdFirst}`
  },
  newscontentDataKeywordFirst (state, getters) {
    const data = state.data.newscontent
    return data[getters.newcontentKeyKeywordFirst]
  },
  newscontentDataKeywordFirstFiltered (state, getters) {
    const data = getters.newscontentDataKeywordFirst
    if (state.filter.sources.length === 0) {
      return mapValues(data, (value, sourceId) => {
        return value.map(news => ({ source: sourceId, s: news.s, t: news.t }))
      })
    }
    return mapValues(pick(data, state.filter.sources), (value, sourceId) => {
      return value.map(news => ({ source: sourceId, s: news.s, t: news.t }))
    })
  },
  newscontentDataKeywordFirstFilteredGroupBySentiment (state, getters) {
    const values = Object.values(getters.newscontentDataKeywordFirstFiltered)
    const _flatten = flatten(values)
    const _groupBy = groupBy(_flatten, d => {
      const score = scaleSentimentScore(d.s)
      const scoreString = sentimentScoreString(score)
      return scoreString
    })
    return _groupBy
  }
}