import Vue from 'vue'
import { filter, } from 'lodash'
import sanitizeHtml from 'sanitize-html'

const debug = require('debug')('CLIENT:mutation:Rent')
export default {
  SET_APP_DETAIL: (state, { targ_ref, data }) => {
    state.applicationDetail[ targ_ref ] = data
  },
  SET_TARGETS: (state, { key, value }) => {
    state.targets[ key ] = value
  },
}