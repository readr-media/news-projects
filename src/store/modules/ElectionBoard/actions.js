import Cookie from 'vue-cookie'
import uuidv4 from 'uuid/v4'
import { camelizeKeys, } from 'humps'
import { concat, get, uniqBy, values } from 'lodash'
import { fetchBoardForVerif, fetchBoardForVerifByID, fetchCandidates, fetchElections, fetchBoards } from './services'

export default {
  FETCH_BOARD_FOR_VERIF: ({ commit }, params) => {
    return fetchBoardForVerif(params)
      .then(res => {
        commit(`SET_BOARD_FOR_VERIF`, camelizeKeys(get(res, 'data')))
      })
  },
  FETCH_BOARD_FOR_VERIF_BY_ID: ({ commit }, { id, params }) => {
    return fetchBoardForVerifByID({ id, params})
      .then(res => {
        commit(`SET_BOARD_FOR_VERIF`, camelizeKeys(get(res, 'data')))
      })
  },
  FETCH_BOARDS: ({ state, commit }, params) => {
    return fetchBoards(params)
      .then(res => {
        if (params.page > 1) {
          const orig = values(get(state, 'boards', []))
          const concatedData = concat(orig, res.data.results)
          commit(`SET_BOARDS`, concatedData)
        } else {
          commit(`SET_BOARDS`, res.data.results)
        }
        return res.data
      })
      .catch(err => err)
  },
  FETCH_BOARDS_BY_COORDINATE: ({ state, commit }, params) => {
    return fetchBoards(params)
      .then(res => {
        if (params.page > 1) {
          const orig = values(get(state, 'boards', []))
          const concatedData = concat(orig, res.data.results)
          commit(`SET_BOARDS_BY_COORDINATE`, concatedData)
        } else {
          commit(`SET_BOARDS_BY_COORDINATE`, res.data.results)
        }
        return res.data
      })
      .catch(err => err)
  },
  FETCH_CANDIDATES: ({ state, commit, }, params) => {
    const type = params.type.toUpperCase()
    return fetchCandidates(params)
      .then(res => {
        if (params.page > 1) {
          const orig = values(get(state, [ 'candidates', params.type ], []))
          const concatedData = concat(orig, res.data.results)
          commit(`SET_CANDIDATES_${type}`, uniqBy(concatedData, 'uid'))
        } else {
          commit(`SET_CANDIDATES_${type}`, res.data.results)
        }
        return res.data
      })
      .catch(err => err)
  },
  FETCH_CANDIDATES_FOR_VERIF: ({ state, commit, }, params) => {
    return fetchCandidates(params)
      .then(res => {
        if (params.page > 1) {
          const orig = values(get(state, [ 'candidatesForVerif', params.type ], []))
          const concatedData = concat(orig, res.data.results)
          commit(`SET_CANDIDATES_FOR_VERIF`, { type: params.type, data: uniqBy(concatedData, 'uid')})
        } else {
          commit(`SET_CANDIDATES_FOR_VERIF`, { type: params.type, data: res.data.results })
        }
        return res.data
      })
      .catch(err => err)
  },
  FETCH_ELECTIONS: ({ commit }, year) => {
    return fetchElections(year)
      .then(res => {
        commit(`SET_ELECTIONS`, get(res, 'data.data.constituencies'))
        return res.data
      })
      .catch(err => err)
  },
  FETCH_USER_ID: ({ commit }) => {
    let id = Cookie.get('eb-user')
    if (id) {
      commit('SET_USER_ID', id)
    } else {
      const uuid = uuidv4()
      Cookie.set('eb-user', uuid, { expires: '6M' })
      id = Cookie.get('eb-user')
      commit('SET_USER_ID', id)
    }
  }
}