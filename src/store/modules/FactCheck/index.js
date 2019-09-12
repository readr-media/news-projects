import Vue from 'vue'
import { get } from 'lodash'
import { getSheetWithoutRedis } from '../../../api'

export default {
  namespaced: true,
  state () {
    return {
      googleSheet: {
        statistics: [],
        typeNetizen: [],
        transcript: [],
        verifyNetizen: [],
        volunteer: []
      }
    }
  },
  actions: {
    async FETCH_GOOGLE_SHEET ({ commit }, { name, params }) {
      try {
        const res = await getSheetWithoutRedis({ params })
        const data = get(res, 'body')
        commit('SET_GOOGLE_SHEET', { name, data })
        return data
      } catch (error) {
        return error
      }
    }
  },
  mutations: {
    SET_GOOGLE_SHEET: (state, { name, data }) => {
      Vue.set(state.googleSheet, name, data)
    }
  },
  getters: {
    statisticsFormated: state => state.googleSheet.statistics.map(data => ({
      candidate: data[1],
      amount: {
        wrong: data[2],
        real: data[4],
        controversial: data[6],
        verifiable: data[10],
        verified: data[8],
        unverification: data[12],
        normal: data[14],
        frequency: data[17],
        total: data[16]
      },
      percentage: {
        wrong: Number.isNaN(Number(data[3])) ? 0 : Number(data[3]),
        real: Number.isNaN(Number(data[5])) ? 0 : Number(data[5]),
        controversial: Number.isNaN(Number(data[7])) ? 0 : Number(data[7]),
      }
    })).sort((a, b) => a.amount.wrong - b.amount.wrong)
  }
}