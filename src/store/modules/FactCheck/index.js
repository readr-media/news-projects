import Vue from 'vue'

export default {
  namespaced: true,
  state () {
    return {
      // googleSheet: {}
    }
  },
  actions: {
    // FETCH_SHEET: ({ dispatch, commit }, { params }) => {
    //   return dispatch('FETCH_SHEET_WITHOUT_REDIS', { params }, { root: true })
    //     .then(res => {
    //       commit('SET_SHEET', res)
    //     })
    //     .catch(err => err)
    // }
  },
  mutations: {
    // SET_SHEET: (state, data) => {
    //   Vue.set(state, 'googleSheet', data)
    // }
  }
}