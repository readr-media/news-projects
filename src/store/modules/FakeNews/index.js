import Vue from 'vue'
import {
  fetchCommentAmount,
  fetchVoteAmount,
  updateCommentAmount,
  updateVoteAmount
} from './services'

export default {
  namespaced: true,
  state: () => ({
    comments: {},
    votes: {}
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
    FETCH_VOTES_AMOUNT: ({ commit }, ids) => {
      Promise.all(ids.map(id => fetchVoteAmount(id))).then(results => {
        results.map((result, index) => commit('SET_VOTE_AMOUNT', { id: ids[index], amount: result.data.amount }))
      })
    },
    UPDATE_COMMENT_AMOUNT: ({ commit }, { id, amount }) => {
      commit('SET_COMMENT_AMOUNT', { id, amount })
      console.log('UPDATE_COMMENT_AMOUNT', id, amount)
      return updateCommentAmount({ id, amount }).then(res => {
        commit('SET_COMMENT_AMOUNT', { id: id, amount: res.data.amount })
        return Promise.resolve(res.data.amount)
      })
    },
    UPDATE_VOTE_AMOUNT: ({ state, commit }, { id }) => {
      const amount = state.votes[id] += 1
      commit('SET_VOTE_AMOUNT', { id, amount })
      // fetchVoteAmount(id).then(result => {
      //   const amount = result.data.amount + 1
      //   updateVoteAmount({ id, amount })
      // })
      updateVoteAmount({ id, amount })
    }
  },
  mutations: {
    SET_COMMENT_AMOUNT: (state, { id, amount }) => {
      Vue.set(state.comments, id, amount)
    },
    SET_VOTE_AMOUNT: (state, { id, amount }) => {
      Vue.set(state.votes, id, amount)
    }
  }
}
