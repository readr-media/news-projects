import _ from 'lodash'

const mapPartyNameAbbr = name => {
  const mapping = {
    中國國民黨: '國民黨',
    民主進步黨: '民進黨',
    台灣團結聯盟: '台聯黨',
    中華統一促進黨: '統促黨',
    天宙和平統一家庭黨: '家庭黨',
    國會政黨聯盟: '國會黨',
    喜樂島聯盟: '喜樂島',
    台灣民眾黨: '民眾黨'
  }

  return mapping[name] || name
}

const module = {
  firestorePath: '/realtime-partyseat',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'realtimeLegislatorsDistrictSeat',
  statePropName: 'data',
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {
    dataSeats(state, getters, rootState) {
      const partyNameMap = _.get(rootState, [ 'Election2020', 'gcs', 'data', 'party' ], {})
      const data = state.data || {}
      const dataEntries = Object.entries(data)
      const result = dataEntries.map(party => {
        const partyCode = _.get(party, 0, '0').padStart(3, '0')
        const partyData = _.get(party, 1, {})

        const name = mapPartyNameAbbr(partyNameMap[partyCode] || '未知政黨')
        const seats = _.get(partyData, 's', 0)
        return {
          partyCode,
          name,
          seats
        }
      })
      return result.sort((a, b) => b.seats - a.seats)
    },
    totalSeats(state, getters) {
      return getters.dataSeats.reduce((acc, curr) => acc + curr.seats, 0)
    }
  },
  mutations: {},
  actions: {},
}

export default module