import { get, omit } from 'lodash'

const module = {
  firestorePath: '/realtime/update',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'realtimeUpdate',
  statePropName: 'data',
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {
    dataWithoutId: state => Object.values(omit((get(state, 'data', {}) || {}), [ 'id' ]))
  },
  mutations: {},
  actions: {},
}

export default module