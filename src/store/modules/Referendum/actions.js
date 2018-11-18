import { fetchAppDetail, } from 'src/store/modules/Referendum/common'
const debug = require('debug')('CLIENT:Rent:actions')
export default {
  FETCH_APP_DETAIL: ({ dispatch, commit, }, { targ_ref, }) => {
    return fetchAppDetail({ targ_ref }).then(data => {
      commit('SET_APP_DETAIL', { targ_ref, data })
    })
  },
  SET_TARGETS: ({ dispatch, commit, }, { key, value }) => {
    return commit('SET_TARGETS', { key, value })
  },
}