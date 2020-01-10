import Vue from 'vue'
import { cloneDeep, find, get, reduce, sampleSize, transform } from 'lodash'

function SAVE_TO_LOCALSTORAGE (state) {
  window.localStorage.setItem("election-bingo", JSON.stringify({
    bingoProgress: get(state, "bingoProgress"),
    connectedLines: get(state, "connectedLines"),
    bingoFrameCells: get(state, "bingoFrameCells")
  }))
}

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
        {"positions": [0,6,12,18,24], line: "bingo-bs"},
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
        const zoneDesc = get(rootState, ['Election2020', 'gcs', 'data', 'regionDesc', zone.name], "")
        zone.freeze = Boolean(getters.joinedCells.search(zk) >= 0)
        for (let ck in r[zk].candidates) {
          const candidate = r[zk].candidates[ck]
          const query = state.selectorQuery
          candidate.show = Boolean(query == "" || candidate.name.search(query) >= 0 || candidate.party.search(query) >= 0 || getters.mapPartyNameAbbr(candidate.party).search(query) >= 0 || zoneDesc.search(query) >= 0 || zone.name.search(query) >= 0)
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
    mapPartyNameAbbr: (state) => (partyName) => {
      const mapping = {
        中國國民黨: '國民黨',
        民主進步黨: '民進黨',
        台灣團結聯盟: '台聯黨',
        中華統一促進黨: '統促黨',
        天宙和平統一家庭黨: '家庭黨',
        國會政黨聯盟: '國會黨',
        喜樂島聯盟: '喜樂島',
        台灣民眾黨: '民眾黨',
        無: '無黨籍'
      }

      return mapping[partyName] || partyName
    }

  },
  mutations: {
    TOGGLE_SELECTOR_PANEL: (state) => {
      if (state.selectorPanel) {
        Vue.set(state, "selectorQuery", "")  
      }
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
      SAVE_TO_LOCALSTORAGE(state)
    },
    UPDATE_BINGO_CELL_ALL: (state, cells) => {
      Vue.set(state, "bingoFrameCells", cells)
      SAVE_TO_LOCALSTORAGE(state)
    },
    CLEAR_BINGO_CELL: (state, districtid) => {
      for (let index in state.bingoFrameCells) {
        const cell = state.bingoFrameCells[index]
        if (cell && cell.search(districtid) >= 0) {
          state.bingoFrameCells.splice(index, 1, "")
        }
      }
      SAVE_TO_LOCALSTORAGE(state)
    },
    START_BINGO_MATCHING: (state) => {
      Vue.set(state, "bingoProgress", "matching")
      SAVE_TO_LOCALSTORAGE(state)
    },
    UPDATE_CONNECTED_LINES: (state, lines) => {
      Vue.set(state, "connectedLines", lines)
      if (lines >= 5) {
        Vue.set(state, "bingoProgress", matching)
      }
      SAVE_TO_LOCALSTORAGE(state)
    },
    LOAD_FROM_LOCALSTORAGE: (state) => {
      if (typeof window !== 'undefined') {
        const bingoObj = JSON.parse(window.localStorage.getItem("election-bingo"))
        Vue.set(state, "bingoProgress", get(bingoObj, "bingoProgress", "init"))
        Vue.set(state, "connectedLines", get(bingoObj, "connectedLines", 0))
        Vue.set(state, "bingoFrameCells", get(bingoObj, "bingoFrameCells", Array.apply(null, Array(25)).map(function () { return ""; })))
      }
    },
  }
}
