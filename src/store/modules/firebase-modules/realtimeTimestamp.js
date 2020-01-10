import _ from 'lodash'
import moment from 'moment'

const defaultTimestamp = '00:00:00'
const timestampFormat = 'kk:mm:ss'

const module = {
  firestorePath: '/realtime/timestamp',
  firestoreRefType: 'doc', // or 'doc'
  moduleName: 'realtimeTimestamp',
  statePropName: 'data',
  namespaced: true, // automatically added
  sync: {
    preventInitialDocInsertion: true
  },

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {
    updateTimePresident(state) {
      const timestamp = _.get(state, [ 'data', 'president' ], defaultTimestamp)
      return moment(timestamp, timestampFormat).toDate()
    },
    updateTimeLegislator(state) {
      const timestampParty = _.get(state, [ 'data', 'party' ], defaultTimestamp)
      const timestampPartySeat = _.get(state, [ 'data', 'partyseat' ], defaultTimestamp)
      const timestampZone = _.get(state, [ 'data', 'zone' ], defaultTimestamp)
      const maxTimestamp = moment.max(
        moment(timestampParty, timestampFormat),
        moment(timestampPartySeat, timestampFormat),
        moment(timestampZone, timestampFormat)
      )
      return maxTimestamp.toDate()
    }
  },
  mutations: {},
  actions: {},
}

export default module