import Vue from 'vue'
import { get } from 'lodash'
import { getSheet } from 'src/api'

export default {
  namespaced: true,
  // modules: {
  // },
  state: () => ({
    spreadsheet: {
      latestNews: []
    },
    test: 'test'
  }),
  actions: {
    async FETCH_GOOGLE_SHEET ({ commit }, { stateName = 'latestNews', params }) {
      try {
        const res = await getSheet({ params })
        const data = get(res, 'body')
        const hasData = data !== 'No data found in Google Sheet.'
        hasData && commit('SET_GOOGLE_SHEET', { stateName, data })
        return data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  mutations: {
    SET_GOOGLE_SHEET: (state, { stateName, data }) => {
      Vue.set(state.googleSheet, stateName, data)
    }
  }
}
