export default {
  namespaced: true,
  state: () => ({
    currentArticleName: ''
  }),
  mutations: {
    SET_NAV(state, name) {
      state.currentArticleName = name
    }
  }
}
