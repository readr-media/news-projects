import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      reports: [],
      reportsCount: 0,
      viewport: [ 0, 0 ],
      googleSheet: {}
    },
    actions,
    mutations,
    getters
  })
}
