import Vue from 'vue'
import { appendSheet, getSheetWithoutRedis } from '../../../api'
import { get } from 'lodash'
import axios from 'axios'

const SPREADSHEET_ID = '1bkpL84QQxqludEGTxSKhmJZN3eIzREZBFpEkImrRJfk'

export default {
  namespaced: true,
  state: () => ({
    spreadsheet: {
      messages: []
    },
    dataTimeline: []
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
    },
    async FETCH_TIMELINE({ commit }) {
      const res = await axios.get('https://storage.googleapis.com/projects.readr.tw/json/1bkpL84QQxqludEGTxSKhmJZN3eIzREZBFpEkImrRJfk-2.json')
      const { data = [] } = res
      commit('ADD_TIMELINE_DATA', data)
      return res
    }
  },
  mutations: {
    SET_MESSAGES: (state, { stateName, data }) => {
      Vue.set(state.spreadsheet, stateName, data)
    },
    ADD_TIMELINE_DATA(state, data) {
      state.dataTimeline.push(...data)
    }
  }
}
