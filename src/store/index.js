import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

import VuexEasyFirestore from 'vuex-easy-firestore'
import { Firebase, initFirebase } from './config/firebase.js'
import realtimeBingoCandidateStats from './modules/firebase-modules/realtimeBingoCandidateStats'
import realtimeTest from './modules/firebase-modules/realtimeTest'
import realtimePresidents from './modules/firebase-modules/realtimePresidents'
import realtimeLegislatorsDistricts from './modules/firebase-modules/realtimeLegislatorsDistricts'
import realtimeLegislatorsDistrictCandidates from './modules/firebase-modules/realtimeLegislatorsDistrictCandidates'
import realtimeLegislatorsDistrictCandidatesAboriginal from './modules/firebase-modules/realtimeLegislatorsDistrictCandidatesAboriginal'
import realtimeLegislatorsDistrictSeat from './modules/firebase-modules/realtimeLegislatorsDistrictSeat'
import realtimeLegislatorsParty from './modules/firebase-modules/realtimeLegislatorsParty'
const easyFirestore = VuexEasyFirestore(
  [
    realtimeBingoCandidateStats,
    realtimeTest,
    realtimePresidents,
    realtimeLegislatorsDistricts,
    realtimeLegislatorsDistrictCandidates,
    realtimeLegislatorsDistrictCandidatesAboriginal,
    realtimeLegislatorsDistrictSeat,
    realtimeLegislatorsParty,
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
