import Vue from 'vue'
import { get } from 'lodash'
import { getSheetWithoutRedis } from '../../../api'

export default {
  namespaced: true,
  state () {
    return {
      googleSheet: {
        'netizen-1': [],
        'netizen-2': [],
        volunteer: []
      }
    }
  },
  actions: {
    FETCH_GOOGLE_SHEET: ({ commit }, { name, params }) => {
      return getSheetWithoutRedis({ params })
        .then(res => {
          commit('SET_GOOGLE_SHEET', { name, data: get(res, 'body') })
        })
        .catch(err => err)
    }
  },
  mutations: {
    SET_GOOGLE_SHEET: (state, { name, data }) => {
      Vue.set(state.googleSheet, name, data)
    }
  }
}