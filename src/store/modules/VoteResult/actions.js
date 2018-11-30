import { fetchData } from 'src/components/VoteResult/util/services'
import { json } from 'd3-fetch'

export default {
  FETCH_DATA_VOTE ({ commit, state }, filename) {
    const key = filename.replace('.json', '')

    if (!(key in state.rawData.vote)) {
      fetchData(filename)
      .then(data => {
        commit('SET_RAWDATA', { type: 'vote', key, data })
      })
    }
  },
  FETCH_LOCATION_CODE_MAPPING ({ commit }) {
    json('/proj-assets/vote2018-result/village_code_mapping.json')
    .then(json => {
      commit('SET_LOCATION_CODE_MAPPING', json)
    })
  }
}