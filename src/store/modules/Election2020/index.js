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
      Vue.set(state.spreadsheet, stateName, data)
    }
  },
  getters: {
    latestNewsFormated: state => (get(state, 'spreadsheet.latestNews') || [])
      .filter(data => data[6] && data[6] !== '#N/A')
      .map(data => ({
        number: data[0],
        content: data[1],
        link: data[3],
        title: data[4]
      }))
      .sort((a, b) => b.number - a.number)
  }
}
