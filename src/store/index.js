import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

import VuexEasyFirestore from 'vuex-easy-firestore'
import { Firebase, initFirebase } from './config/firebase.js'
import realtimePresidents from './modules/Election2020/firebase-modules/realtimePresidents'
import realtimeRegionalLegislators from './modules/Election2020/firebase-modules/realtimeRegionalLegislators'
const easyFirestore = VuexEasyFirestore(
  [
    realtimePresidents,
    realtimeRegionalLegislators
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
