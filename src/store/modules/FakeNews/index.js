import Vue from 'vue'
import {
  fetchCommentAmount,
  fetchQuizAmount,
  fetchQuizTotalAmount,
  updateCommentAmount,
  updateQuizAmount,
  updateQuizTotalAmount
} from './services'

export default {
  namespaced: true,
  state: () => ({
    comments: {},
    quiz: {
      'quiz-1': {},
      'quiz-2': {},
      'quiz-3': {},
      'quiz-4': {},
      'quiz-5': {},
      'quiz-6': {},
    }
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
    FETCH_QUIZ_AMOUNT: ({ commit }, id) => {
      return fetchQuizAmount(id).then(result => {
        commit('SET_QUIZ_AMOUNT', { id: id, amount: result.data.amount })
        return Promise.resolve(result.data.amount)
      })
    },
    FETCH_QUIZ_TOTAL_AMOUNT: ({ commit }, id) => {
      return fetchQuizTotalAmount(id).then(result => {
        commit('SET_QUIZ_TOTAL_AMOUNT', { id: id, amount: result.data.amount })
        return Promise.resolve(result.data.amount)
      })
    },
    UPDATE_COMMENT_AMOUNT: ({ commit }, { id, amount }) => {
      commit('SET_COMMENT_AMOUNT', { id, amount })
      return updateCommentAmount({ id, amount })
    },
    UPDATE_QUIZ_AMOUNT: ({ commit }, { id, amount }) => {
      commit('SET_QUIZ_AMOUNT', { id, amount })
      return updateQuizAmount({ id, amount })
    },
    UPDATE_QUIZ_TOTAL_AMOUNT: ({ commit }, { id, amount }) => {
      commit('SET_QUIZ_TOTAL_AMOUNT', { id, amount })
      return updateQuizTotalAmount({ id, amount })
    },
  },
  mutations: {
    SET_COMMENT_AMOUNT: (state, { id, amount }) => {
      Vue.set(state.comments, id, amount)
    },
    SET_QUIZ_AMOUNT: (state, { id, amount }) => {
      Vue.set(state.quiz[id], 'isTrue', amount)
    },
    SET_QUIZ_TOTAL_AMOUNT: (state, { id, amount }) => {
      Vue.set(state.quiz[id], 'total', amount)
    },
  }
}
