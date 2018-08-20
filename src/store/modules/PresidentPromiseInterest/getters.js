import { groupBy, } from 'lodash'

export default {
  promiseDataGroupByDone: (state, getters) => {
    return groupBy(state.promiseData, 'promiseDone')
  },
  promiseDataDone: (state, getters) => {
    return getters.promiseDataGroupByDone['true']
  },
}