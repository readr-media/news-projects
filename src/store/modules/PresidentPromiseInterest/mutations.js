import Vue from 'vue'

export default {
  SET_PROMISEDATA: (state, data) => {
    Vue.set(state, 'promiseData', data)
  },
}