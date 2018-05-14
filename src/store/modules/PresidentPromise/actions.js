import { promiseDataInit, } from 'src/components/PresidentPromise/util/comm.js'
import { sendPromiseInterestRequest, sendCategoryInterestRequest, sendCategoryAllRequest, } from 'src/components/PresidentPromise/util/service.js'

export default {
  FETCH_PROMISEDATA: ({ dispatch, commit }, { params }) => {
    dispatch('FETCH_SHEET', { params }, { root: true })
    .then(({ body }) => {
      body = promiseDataInit(body)
      commit('SET_PROMISEDATA', body)
      // surveyBasis is equal to promiseData when init
      commit('SET_SURVEYBASIS', body)
    })
    .catch(err => { console.log(err) })
  },
  SURVEY_NEXT_ROUND: ({ commit, getters }) => {
    commit('INCREMENT_SURVEY_ROUND')
    commit('SET_NEXTROUND_SURVEY')
    commit('UPDATE_SURVEYBASIS', getters.surveysPerRoundPids)
  },
  UPDATE_INTEREST: ({ dispatch, commit }, { interest, promise }) => {
    commit('UPDATE_INTEREST', { interest, promise })
    // send data to redis
    sendPromiseInterestRequest(promise, interest)
    if (interest === 'very-interest') {
      sendCategoryAllRequest(promise)
      sendCategoryInterestRequest(promise)
    }
  },
  // UPDATE_SURVEYBASIS: ({ commit, getters }) => {
  //   commit('UPDATE_SURVEYBASIS', getters.surveysPerRoundPids)
  // }
}