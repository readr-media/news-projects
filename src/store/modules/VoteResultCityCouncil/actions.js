import axios from 'axios'
import { camelizeKeys, } from 'humps'
import { Promise } from 'es6-promise';

function fetchTaiwanJSON (filename) {
  return axios.get(`/project-api/data?url=/proj-assets/vote2018-result-city-council/${filename}.topo.json`)
}

export default {
  FETCH_TAIWAN_JSON: ({ commit }) => {
    return Promise.all([
      fetchTaiwanJSON('twCounty2010merge'),
      fetchTaiwanJSON('twCounty2010')
    ])
    .then(res => {
      commit(`SET_TAIWAN_MERGE_JSON`, camelizeKeys(res[0].data))
      commit(`SET_TAIWAN_JSON`, camelizeKeys(res[1].data))
      return Promise.resolve(res)
    })
    .catch(err => Promise.reject(err))
  },
}