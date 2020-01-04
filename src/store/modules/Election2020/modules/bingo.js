import Vue from 'vue'
import { cloneDeep, find, get, reduce, sampleSize, transform } from 'lodash'

export default {
  namespaced: true,
  state: () => ({
      selectorPanel: false,
      selectors: {},
      selectorQuery: "",
      currentSelectCell: -1,
      bingoFrameCells: Array.apply(null, Array(25)).map(function () { return ""; }),

      bingoProgress: "init", // "init", "matching", "bingo",
      connectedLines: 0,
      bingoTime: null,

      kolbingoframe: [],
      bingoConditions : [
        {"positions": [0,1,2,3,4], line: "bingo-h"},
        {"positions": [5,6,7,8,9], line: "bingo-h"},
        {"positions": [10,11,12,13,14], line: "bingo-h"},
        {"positions": [15,16,17,18,19], line: "bingo-h"},
        {"positions": [20,21,22,23,24], line: "bingo-h"},
        {"positions": [0,5,10,15,20], line: "bingo-v"},
        {"positions": [1,6,11,16,21], line: "bingo-v"},
        {"positions": [2,7,12,17,22], line: "bingo-v"},
        {"positions": [3,8,13,18,23], line: "bingo-v"},
        {"positions": [4,9,14,19,24], line: "bingo-v"},
        {"positions": [0,6,16,18,24], line: "bingo-bs"},
        {"positions": [4,8,12,16,20], line: "bingo-s"},
      ]
  }),
  getters: {
    getSelectorToggleStatus: (state, getters) => (districtid) => {
      if (get(state.selectors, districtid, "Nothing") === "Nothing") {
        Vue.set(state.selectors, districtid, false)
        return false
      } else {
        return get(state.selectors, districtid)
      }
    },
    selectorZones: (state, getters, rootState) => {
      const r = transform(rootState.Election2020.gcs.data.region, (result, value, index) => {
        for (let zk in value.zones) {
          const zoneKey = `${index}-${zk}`
          result[zoneKey] = cloneDeep(value.zones[zk])
        }
      })
      for (let zk in r) {
        const zone = r[zk]
        zone.freeze = Boolean(getters.joinedCells.search(zk) >= 0)
        for (let ck in r[zk].candidates) {
          const candidate = r[zk].candidates[ck]
          const query = state.selectorQuery
          candidate.show = Boolean(query == "" || candidate.name.search(query) >= 0 || candidate.name.search(query) >= 0)
        }
      }
      return r
    },
    joinedCells: (state) => {
      return state.bingoFrameCells.join()
    },
    randomFrameCells: (state, getters, rootState) => () => {
      const r = transform(rootState.Election2020.gcs.data.region, (result, value, index) => {
        for (let zk in value.zones) {
          const zoneKey = `${index}-${zk}`
          result[zoneKey] = cloneDeep(value.zones[zk])
        }
      })
      let cells = []
      let rzk = sampleSize(Object.keys(r), 25)
      for (let i in rzk) {
        const ck = sampleSize(Object.keys(r[rzk[i]].candidates), 1)[0]
        cells.push(`${rzk[i]}-${ck}`)
      }
      return cells
    },
  },
  mutations: {
    TOGGLE_SELECTOR_PANEL: (state) => {
      Vue.set(state, "selectorPanel", !state.selectorPanel)
    },
    TOGGLE_SELECTOR: (state, {districtid, status}) => {
      Vue.set(state.selectors, districtid, status)
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
    },
    UPDATE_CURRENT_CELL: (state, cellid) => {
      Vue.set(state, "currentSelectCell", cellid)
    },
    UPDATE_BINGO_CELL: (state, candidateid) => {
      state.bingoFrameCells.splice(state.currentSelectCell, 1, candidateid)
    },
    UPDATE_BINGO_CELL_ALL: (state, cells) => {
      Vue.set(state, "bingoFrameCells", cells)
    },
    CLEAR_BINGO_CELL: (state, districtid) => {
      for (let index in state.bingoFrameCells) {
        const cell = state.bingoFrameCells[index]
        if (cell && cell.search(districtid) >= 0) {
          state.bingoFrameCells.splice(index, 1, "")
        }
      }
    },
    START_BINGO_MATCHING: (state) => {
      Vue.set(state, "bingoProgress", "matching")
    },
    UPDATE_CONNECTED_LINES: (state, lines) => {
      Vue.set(state, "connectedLines", lines)
      if (lines >= 5) {
        Vue.set(state, "bingoProgress", matching)
      }
    }
  }
}
