import { get as axiosGet } from 'axios'
import { findKey, get } from 'lodash'
import { getSheet } from 'src/api'

const GCS_PATH = '/proj-assets/election-2020/json'

export default {
  namespaced: true,
  state: () => ({
    // TODO: should remote when data is ready (in prod)
    data: {
      region: {
        "000": {
          "name": "台北市",
          "zones": {
            "001": {
              "name": "臺北市第八選舉區",
              "locations": "文山區、中正區",
              "candidates": {
                "1": {
                  "name": "賴土堡",
                  "party": 1
                }
              }
            }
          }
        }
      },
      president: {
        "1": {
          "name": "宋楚瑜",
          "party": 1
        }
      },
      legislator: {
        "000-001-1": {
          "name": "手中釘",
          "party": "1",
          "zone": "臺北市第一選舉區"
        }
      },
      party: {
        "1": "中國國民黨"
      },
    },
  }),
  actions: {
    FETCH_SOURCES ({ dispatch }) {
      dispatch('FETCH_REGION_DATA')
      dispatch('FETCH_PRESIDENT_DATA')
      dispatch('FETCH_LEGISLATOR_DATA')
      dispatch('FETCH_PARTY_DATA')
    },
    FETCH_REGION_DATA ({ commit }) {
      return axiosGet(`${GCS_PATH}/regionData.json`, {withCredentials: false}).then(res => {
        commit('SET', { targetPath: 'data', key: 'region', value: res.data })
      }).catch((err) => { console.error(err) })
    },
    FETCH_PRESIDENT_DATA ({ commit }) {
      return axiosGet(`${GCS_PATH}/presidentData.json`).then(res => {
        commit('SET', { targetPath: 'data', key: 'president', value: res.data })
      })
    },
    FETCH_LEGISLATOR_DATA ({ commit }) {
      return axiosGet(`${GCS_PATH}/legislatorData.json`).then(res => {
        commit('SET', { targetPath: 'data', key: 'legislator', value: res.data })
      })
    },
    FETCH_PARTY_DATA ({ commit }) {
      return axiosGet(`${GCS_PATH}/partyData.json`).then(res => {
        commit('SET', { targetPath: 'data', key: 'party', value: res.data })
      })
    },
  },
  mutations: {
    SET: (state, { targetPath, key, value }) => {
      const target = get(state, targetPath)
      Vue.set(target, key, value)
    },
  }
}
