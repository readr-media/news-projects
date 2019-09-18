import Vue from 'vue'
import { appendSheet, getSheetWithoutRedis } from '../../../api'
import { concat, get, values } from 'lodash'
import axios from 'axios'

const SPREADSHEET_ID = '1bkpL84QQxqludEGTxSKhmJZN3eIzREZBFpEkImrRJfk'

export default {
  namespaced: true,
  state: () => ({
    spreadsheet: {
      likes: [],
      messages: []
    },
    dataTimeline: []
  }),
  actions: {
    async ADD_LIKE ({ commit }, { timestamp }) {
      commit('INCREMENT_LIKE', timestamp)
      return appendSheet({
        params: {
          spreadsheetId: SPREADSHEET_ID,
          range: '留言牆讚',
          valueInputOption: 'RAW',
          resource: {
            majorDimension: 'ROWS',
            values: [
              [ timestamp, 1 ]
            ]
          }
        }
      })
    },
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
    async FETCH_SHEET ({ commit }, { stateName, range }) {
      return getSheetWithoutRedis({
        params: {
          spreadsheetId: SPREADSHEET_ID,
          range
        }
      })
        .then(res => {
          const data = get(res, 'body')
          stateName === 'likes'
            ? commit('SET_LIKES', { data })
            : commit('SET_SHEET', { stateName, data })
          return data
        })
        .catch(err => err)
    },
    async FETCH_TIMELINE({ commit }) {
      const res = await axios.get('https://storage.googleapis.com/projects.readr.tw/json/1bkpL84QQxqludEGTxSKhmJZN3eIzREZBFpEkImrRJfk-2.json')
      const { data = [] } = res
      data.sort((a, b) => Number(a['順序']) - Number(b['順序']))
      commit('ADD_TIMELINE_DATA', data)
      return res
    },
    async LOAD_MORE_MESSAGES ({ commit, state }, { range }) {
      return getSheetWithoutRedis({
        params: {
          spreadsheetId: SPREADSHEET_ID,
          range
        }
      })
        .then(res => {
          const orig = values(state.spreadsheet.messages)
          const data = get(res, 'body')
          let concatData
          if (Array.isArray(data)) {
            concatData = concat(orig, data)
            commit('SET_SHEET', { stateName: 'messages', data: concatData })
          }
          return data
        })
        .catch(err => err)
    }
  },
  mutations: {
    ADD_TIMELINE_DATA(state, data) {
      state.dataTimeline.push(...data)
    },
    INCREMENT_LIKE: (state, timestamp) => {
      const index = state.spreadsheet.likes.findIndex(item => item.time == timestamp)
      if (index > -1) {
        state.spreadsheet.likes[index].likeAmount++
      } else {
        state.spreadsheet.likes.push({ time: timestamp, likeAmount: 1 })
      }
    },
    SET_LIKES: (state, { data }) => {
      const formatted = data
        .filter(item => item[0])
        .map(item => ({ time: item[0], likeAmount: Number(item[1]) }))
      Vue.set(state.spreadsheet, 'likes', formatted)
    },
    SET_SHEET: (state, { stateName, data }) => {
      Vue.set(state.spreadsheet, stateName, data)
    },
  }
}
