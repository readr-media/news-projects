import Vue from 'Vue'

export default {
  SET_MAP_CURRENT_LOCATION (state, { level = '', id = '' }) {
    state.map.currentLocation.level = level
    state.map.currentLocation.id = id
  },
  SET_MAP_PREVIOUS_LOCATION_ID (state, id = 'background') {
    state.map.previousLocationId = id
  },
  SET_RAWDATA (state, { type, key, data }) {
    if (type in state.rawData) {
      Vue.set(state.rawData[type], key, data)
    }
  },
  SET_LOCATION_CODE_MAPPING (state, json) {
    Vue.set(state, 'locationCodeMapping', json)
  }
}