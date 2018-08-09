import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: () => ({
    bounds: {},
    calc: {},
    count: 0,
    filters: {
      POSITION: 'ENTIRE',
    },
    assetsCheck: {},
    isLoaded: false,
    svgStrs: {},
  }),
  actions,
  mutations,
  getters,
}