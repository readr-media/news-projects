import { fetchCandidates, fetchElections } from './services'
import { concat, get, uniqBy, values } from 'lodash'

export default {
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
  FETCH_ELECTIONS: ({ commit }, year) => {
    return fetchElections(year)
      .then(res => {
        commit(`SET_ELECTIONS`, get(res, 'data.data.constituencies'))
        return res.data
      })
      .catch(err => err)
  }
}