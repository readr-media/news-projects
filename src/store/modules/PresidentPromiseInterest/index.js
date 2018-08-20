import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  // IMPORTANT: state must be a function so the module can be
  // instantiated multiple times
  state: () => ({
    promiseData: [],
  }),
  actions,
  mutations,
  getters,
}