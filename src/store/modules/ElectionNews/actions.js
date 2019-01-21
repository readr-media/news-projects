import { json } from 'd3-fetch'
import { findKey } from 'lodash'

const path = '/proj-assets/election-news'

export default {
  FETCH_MAPPING_SOURCES ({ commit }) {
    return json(`${path}/domains.json`).then(res => {
      commit('SET', { targetPath: 'mapping', key: 'sources', value: res })
    })
  },
  FETCH_MAPPING_KEYWORDS ({ commit }) {
    return json(`${path}/keywords.json`).then(res => {
      commit('SET', { targetPath: 'mapping', key: 'keywords', value: res })
    })
  },
  FETCH_DATA_GRAPH ({ commit }, keywordId) {
    return json(`${path}/result_graph/${keywordId}.json`).then(res => {
      commit('SET', { targetPath: 'data.graph', key: keywordId, value: res })
    })
  },
  FETCH_DATA_NEWSCONTENT ({ commit }, { date, keywordId }) {
    const filename = `${date}-${keywordId}`
    return json(`${path}/result_newscontent/${filename}.json`).then(res => {
      commit('SET', { targetPath: 'data.newscontent', key: filename, value: res })
    })
  },
  FETCH_DATE_RANGE ({ commit }) {
    return json(`${path}/date.json`).then(res => {
      const { start, until } = res
      commit('SET', { targetPath: 'data.date', key: 'start', value: start })
      commit('SET', { targetPath: 'data.date', key: 'until', value: until })
    })
  },
  FETCH_DATA_ABBR ({ commit }) {
    return json(`${path}/abbr.json`).then(res => {
      commit('SET', { targetPath: 'mapping', key: 'abbr', value: res })
    })
  },

  TOGGLE_COLOR_PICKER ({ state, commit }, sourceId) {
    const filter = state.filter.sources
    const colors = state.colors

    const oldestSource = filter[0]
    const oldestColor = findKey(colors, o => o === oldestSource)
    const exist = findKey(colors, o => o === sourceId)
    const colorAvailable = findKey(colors, o => o === null)

    commit('PUSH_TO_SOURCES_FILTER', sourceId)

    if (exist !== undefined) {
      commit('SET', { targetPath: 'colors', key: exist, value: null  })
      return
    }
    if (colorAvailable === undefined) {
      commit('SET', { targetPath: 'colors', key: oldestColor, value: sourceId  })
      return
    }
    commit('SET', { targetPath: 'colors', key: colorAvailable, value: sourceId  })
  }
}