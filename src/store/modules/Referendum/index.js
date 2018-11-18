import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: () => ({
    applicationDetail: {},
    targets: {
      base: 'no7',
      comparison: 'no7',
      item: 'participant',
    },
  }),
  actions,
  mutations,
  getters,
}