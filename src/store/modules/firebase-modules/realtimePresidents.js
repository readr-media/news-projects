import { get, omit } from 'lodash'

const module = {
  firestorePath: '/realtime/president',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'realtimePresidents',
  statePropName: 'data',
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {
    startCounting: state => Object.values(state.data).reduce((a, c) => {
      return c.tks ? a + c.tks : a
    }, 0),
    dataWithoutId: state => {
      const allowed = [ '1', '2', '3' ]
      const raw = get(state, 'data')
      return Object.keys(raw)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = raw[key];
          return obj;
        }, {})
    }
  },
  mutations: {},
  actions: {},
}

export default module