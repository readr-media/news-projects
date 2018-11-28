export default {
  SET_MAP_CURRENT_LOCATION (state, { level = '', id = '' }) {
    state.map.currentLocation.level = level
    state.map.currentLocation.id = id
  }
}