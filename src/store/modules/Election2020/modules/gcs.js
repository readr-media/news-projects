import Vue from 'vue'
import { get as axiosGet } from 'axios'
import { findKey, get } from 'lodash'
import { getSheet } from 'src/api'

const GCS_PATH = '/proj-assets/election-2020/json'

export default {
  namespaced: true,
  state: () => ({
    data: {
      region: {},
      president: {},
      legislator: {},
      party: {},
    },
  }),
  actions: {
    FETCH_SOURCES ({ dispatch }) {
      dispatch('FETCH_REGION_DATA')
      dispatch('FETCH_PRESIDENT_DATA')
      dispatch('FETCH_LEGISLATOR_DATA')
      dispatch('FETCH_PARTY_DATA')
      dispatch('FETCH_RESULT_DATA_PRESIDENT')
      dispatch('FETCH_RESULT_DATA_LEGISLATOR_PARTY')
    },
    FETCH_REGION_DATA ({ commit }) {
      return axiosGet(`${GCS_PATH}/regionData.json`, {withCredentials: false}).then(res => {
        commit('SET', { targetPath: 'data', key: 'region', value: res.data })
      }).catch((err) => { console.error(err) })
    },
    FETCH_PRESIDENT_DATA ({ commit }) {
      return axiosGet(`${GCS_PATH}/presidentData.json`).then(res => {
        commit('SET', { targetPath: 'data', key: 'president', value: res.data })
      }).catch((err) => { console.error(err) })
    },
    FETCH_LEGISLATOR_DATA ({ commit }) {
      return axiosGet(`${GCS_PATH}/legislatorData.json`).then(res => {
        commit('SET', { targetPath: 'data', key: 'legislator', value: res.data })
      }).catch((err) => { console.error(err) })
    },
    FETCH_PARTY_DATA ({ commit }) {
      return axiosGet(`${GCS_PATH}/partyData.json`).then(res => {
        commit('SET', { targetPath: 'data', key: 'party', value: res.data })
      }).catch((err) => { console.error(err) })
    },
    FETCH_RESULT_DATA_PRESIDENT ({ commit }) {
      return axiosGet(`${GCS_PATH}/presidentResultBycounty.json`).then(res => {
        commit('SET', { targetPath: 'data', key: 'presidentResultByCounty', value: res.data })
      }).catch((err) => { console.error(err) })
    },
    FETCH_RESULT_DATA_LEGISLATOR_PARTY ({ commit }) {
      return axiosGet(`${GCS_PATH}/legislatorResultBycounty.json`).then(res => {
        commit('SET', { targetPath: 'data', key: 'legislatorPartyResultByCounty', value: res.data })
      }).catch((err) => { console.error(err) })
    },
  },
  mutations: {
    SET: (state, { targetPath, key, value }) => {
      Vue.set(state[targetPath], key, value)
    },
  }
}
