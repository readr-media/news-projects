import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

import VuexEasyFirestore from 'vuex-easy-firestore'
import { Firebase, initFirebase } from './config/firebase.js'
import realtimeTest from './modules/firebase-modules/realtimeTest'
import realtimePresidents from './modules/firebase-modules/realtimePresidents'
import realtimeRegionalLegislators from './modules/firebase-modules/realtimeRegionalLegislators'
import realtimeLegislatorsParty from './modules/firebase-modules/realtimeLegislatorsParty'
import realtimeLegislatorsDistrictSeat from './modules/firebase-modules/realtimeLegislatorsDistrictSeat'
const easyFirestore = VuexEasyFirestore(
  [
    realtimeTest,
    realtimePresidents,
    realtimeRegionalLegislators,
    realtimeLegislatorsParty,
    realtimeLegislatorsDistrictSeat
  ],
  {
    logging: true,
    FirebaseDependency: Firebase
  }
)
initFirebase()
  .catch(error => {
    // take user to a page stating an error occurred
    // (might be a connection error, or the app is open in another tab)
  })

export function createStore () {
  return new Vuex.Store({
    plugins: [ easyFirestore ],
    state: () => ({
      reports: [],
      reportsCount: 0,
      viewport: [ 0, 0 ]
    }),
    actions,
    mutations,
    getters
  })
}
