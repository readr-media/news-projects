import Vue from 'vue'
import { fetchCommentAmount, updateCommentAmount } from './services'

export default {
  namespaced: true,
  state: () => ({
    comments: {}
  }),
  actions: {
    FETCH_COMMENT_AMOUNT: ({ commit }, id) => {
      return fetchCommentAmount(id).then(result => {
        commit('SET_COMMENT_AMOUNT', { id: id, amount: result.data.amount })
        return Promise.resolve(result.data.amount)
      })
    },
    FETCH_COMMENTS_AMOUNT: ({ commit }, ids) => {
      Promise.all(ids.map(id => fetchCommentAmount(id))).then(results => {
        results.map((result, index) => commit('SET_COMMENT_AMOUNT', { id: ids[index], amount: result.data.amount }))
      })
    },
    UPDATE_COMMENT_AMOUNT: ({ commit }, { id, amount }) => {
      commit('SET_COMMENT_AMOUNT', { id, amount })
      console.log('UPDATE_COMMENT_AMOUNT', id, amount)
      return updateCommentAmount({ id, amount }).then(res => {
        commit('SET_COMMENT_AMOUNT', { id: id, amount: res.data.amount })
        return Promise.resolve(res.data.amount)
      })
    }
  },
  mutations: {
    SET_COMMENT_AMOUNT: (state, { id, amount }) => {
      Vue.set(state.comments, id, amount)
    }
  }
}
