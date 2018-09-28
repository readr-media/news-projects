import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: () => ({
    boardForVerif: {},
    boards: [],
    candidates: {
      councilors: [],
      mayors: [],
    },
    candidatesForVerif: {
      councilors: [],
      mayors: [],
    },
    elections: {},
    userID: undefined
  }),
  actions,
  mutations,
}