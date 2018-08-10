import { fetchBounds, fetchCount, fetchInfographic, fetchInfographicCalc, } from 'src/store/modules/Rent/common'
const debug = require('debug')('CLIENT:Rent:actions')
export default {
  RESET_FILTER: ({ dispatch, commit, }, { filters, }) => {
    commit('RESET_FILTER', {})
  },
  SETUP_FILTER: ({ dispatch, commit, }, { filters, }) => {
    commit('SET_FILTER', filters)
  },
  SETUP_LOADED_FLAG: ({ dispatch, commit, }) => {
    commit('SET_ASSETS_LOADED')
  },
  SETUP_SVG: ({ dispatch, commit, }, { city, svg }) => {
    debug('city', city)
    return commit('SET_SVG', { city, svg })
  },
  FETCH_INFOGRAPHIC: ({ dispatch, commit, }, { position, size, }) => {
    return fetchInfographic(position, size)
  },
  FETCH_INFOGRAPHIC_CALC: ({ dispatch, commit, }, { params }) => {
    debug('params', params)
    params.POSITION === 'EMPTY' && (params.POSITION = 'ENTIRE')
    return fetchInfographicCalc(params).then(calc => commit('SET_INFOGRAPHIC_CALC', calc))
  },
  FETCH_BOUNDS: ({ dispatch, commit, }, {}) => {
    return fetchBounds().then((bounds) => {
      commit('SET_BOUNDS', bounds)
    })
  },
  FETCH_COUNT: ({ dispatch, commit, }, {}) => {
    return fetchCount().then((count) => {
      commit('SET_COUNT', count)
    })
  },
}