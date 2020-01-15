const module = {
  firestorePath: '/realtime/aboriginal',
  firestoreRefType: 'doc', // or 'doc'
  moduleName: 'realtimeLegislatorsDistrictCandidatesAboriginal',
  statePropName: 'data',
  namespaced: true, // automatically added
  sync: {
    preventInitialDocInsertion: true
  },

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {},
}

export default module