import Vue from 'vue'
import { appendSheet, getSheetWithoutRedis } from '../../../api'
import { get } from 'lodash'

const SPREADSHEET_ID = '1bkpL84QQxqludEGTxSKhmJZN3eIzREZBFpEkImrRJfk'

export default {
  namespaced: true,
  state: () => ({
    spreadsheet: {
      messages: []
    }
  }),
  actions: {
    async ADD_MESSAGE ({}, { resource }) {
      return appendSheet({
        params: {
          spreadsheetId: SPREADSHEET_ID,
          range: '連儂牆留言板',
          valueInputOption: 'RAW',
          resource: resource,
        }
      })
    },
    async FETCH_MESSAGES ({ commit }, { stateName, range }) {
      return getSheetWithoutRedis({
        params: {
          spreadsheetId: SPREADSHEET_ID,
          range
        }
      })
        .then(res => {
          commit('SET_MESSAGES', { stateName, data: get(res, 'body') })
        })
        .catch(err => err)
    }
  },
  mutations: {
    SET_MESSAGES: (state, { stateName, data }) => {
      Vue.set(state.spreadsheet, stateName, data)
    }
  }
}
