import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: () => ({
    map: {
      currentLocation: {
        level: 'tw',
        id: ''
      }
    }
  }),
  actions,
  mutations,
  getters,
}