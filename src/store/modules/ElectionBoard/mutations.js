export default {
  SET_CANDIDATES_COUNCILORS: (state, data) => {
    state.candidates.councilors = data
  },
  SET_CANDIDATES_MAYORS: (state, data) => {
    state.candidates.mayors = data
  },
  SET_ELECTIONS: (state, data) => {
    state.elections = data
  }
}