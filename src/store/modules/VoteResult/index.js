import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: () => ({
    locationCodeMapping: {},
    map: {
      currentLocation: {
        level: 'tw',
        id: ''
      },
      previousLocationId: 'background'
    },
    rawData: {
      vote: {}
    }
  }),
  actions,
  mutations,
  getters,
}