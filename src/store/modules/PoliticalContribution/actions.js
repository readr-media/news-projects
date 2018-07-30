import { isEmpty, } from 'lodash'
import { convertBody, dropWontCalculateRow, } from './util'

export default {
  FETCH_DATA: ({ dispatch, commit }, { params }) => {
    return dispatch('FETCH_SHEET', { params }, { root: true })
    .then(({ body }) => {
      if (!isEmpty(body)) {
        if (params.dataKey !== 'corpNameTaxIdMapping') {
          commit('SET_DATA', { ordinal: params.ordinal, body: dropWontCalculateRow(convertBody(body)), field: params.dataKey })
        } else {
          commit('SET_DATA_CORP_NAME_TAXID_MAPPING', { body: convertBody(body), field: params.dataKey })
        }
      } else {
        console.log('Response body of FETCH_SHEET is empty, nothing committing to store')
      }
    })
    .catch(err => { console.log(err) })
  },
}