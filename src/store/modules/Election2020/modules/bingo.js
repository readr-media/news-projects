import Vue from 'vue'
import { cloneDeep, get, transform } from 'lodash'

export default {
  namespaced: true,
  state: () => ({
      selectorPanel: false,
      selectors: {},
      selectorQuery: "",
      bingoframe: {},
      kolbingoframe: []
  }),
  getters: {
    getSelectorToggleStatus: (state) => (districtid) => {
      if (get(state.selectors, districtid, "Nothing") === "Nothing") {
        Vue.set(state.selectors, districtid, false)
        return false
      }else{
        return get(state.selectors, districtid)
      }
    },
    selectorZones: (state, getters, rootState) => {
      const r = transform(rootState.Election2020.gcs.data.region, (result, value, index) => {
        for (let zk in value.zones) {
          result[`${index}-${zk}`] = cloneDeep(value.zones[zk])
        }
      })
      for (let zk in r) {
        for (let ck in r[zk].candidates) {
          const candidate = r[zk].candidates[ck]
          const query = state.selectorQuery
          candidate.show = Boolean(query == "" || candidate.name.search(query) >= 0 || candidate.name.search(query) >= 0)
        }
      }
      return r
    }
  },
  mutations: {
    TOGGLE_SELECTOR_PANEL: (state) => {
      Vue.set(state, "selectorPanel", !state.selectorPanel)
    },
    TOGGLE_SELECTOR: (state, {districtid, status}) => {
      Vue.set(state.selectors, districtid, !status)
    },
    UPDATE_FILTER: (state, query) => {
      Vue.set(state, "selectorQuery", query)
      if (query !== "") {
        for (let dk in state.selectors) {
          Vue.set(state.selectors, dk, true)
        }
      }else{
        for (let dk in state.selectors) {
          Vue.set(state.selectors, dk, false)
        }
      }
    }
  }
}
