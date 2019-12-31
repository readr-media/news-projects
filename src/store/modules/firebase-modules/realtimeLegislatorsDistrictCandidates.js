const module = {
  firestorePath: '/realtime-zone',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'realtimeLegislatorsDistrictCandidates',
  statePropName: 'data',
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {},
}

export default module