import _ from 'lodash'
import axios from 'axios'
import { getHost, getProtocol } from '../../../../src/util/comm'

const host = getHost()
const protocal = getProtocol()

export default {
  namespaced: true,
  state() {
    return {
      articleData: {},
      isSearching: false
    }
  },
  mutations: {
    PUSH_ARTICLE_DATA(state, posts) {
      const items = _.get(state, [ 'articleData', 'hits', 'hits' ], [])
      const currentItems = _.get(posts, [ 'hits', 'hits' ], [])
      items.push(...currentItems)
    },
    SET_ARTICLE_DATA(state, posts) {
      state.articleData = posts
    },
    SET_IS_SEARCHING(state, value) {
      state.isSearching = value
    }
  },
  actions: {
    async SEARCH_ARTICLE({ commit }, { payload, push = false }) {
      commit('SET_IS_SEARCHING', true)
      const res = await axios.post(
        `${protocal}//${host}/project-api/readr-search`,
        payload
      )
      commit('SET_IS_SEARCHING', false)

      if (push) {
        commit('PUSH_ARTICLE_DATA', res.data)
      } else {
        commit('SET_ARTICLE_DATA', res.data)
      }
      return res
    }
  }
}
