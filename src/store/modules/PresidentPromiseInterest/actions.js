import { PROMISES_SHEET_ID, DEFAULT_SHEET_RANGE } from '../../../components/PresidentPromise/constants'
import { promiseDataInit, } from './util'

export default {
  FETCH_PROMISEDATA: ({ dispatch, commit }, { params = { spreadsheetId: PROMISES_SHEET_ID, range: DEFAULT_SHEET_RANGE, } } = {}) => {
    return dispatch('FETCH_SHEET', { params }, { root: true })
    .then(({ body }) => {
      body = promiseDataInit(body)
      commit('SET_PROMISEDATA', body)
    })
    .catch(err => { console.log(err) })
  },
}