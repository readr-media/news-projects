import { isEmpty, } from 'lodash'
import * as d3 from 'd3'
import { convertBody, dropWontCalculateRow, } from './util'

export default {
  FETCH_DATA_ASSETS: ({ dispatch, commit }, { params }) => {
    return d3.csv(params.filePath)
  },
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