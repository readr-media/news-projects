import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: () => ({
    candidates: {
      councilors: [],
      mayors: [],
    },
    elections: {}
  }),
  actions,
  mutations,
}