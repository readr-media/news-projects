export default {
  namespaced: true,
  state () {
    return {
      legislator: null
    }
  },
  mutations: {
    SET_UPDATE_TIME(state, { key, time }) {
      state[key] = time
    }
  }
}