import Vue from 'vue'
import { filter, } from 'lodash'
import sanitizeHtml from 'sanitize-html'

const debug = require('debug')('CLIENT:mutation:Rent')
export default {
  RESET_FILTER: (state) => {
    state.filters = {}
  },
  SET_FILTER: (state, filters) => {
    debug('filters', filters)
    const new_filters = Object.assign({}, state.filters, filters)
    const isAnyFilter = filter(new_filters, (f, k) => k !== 'POSITION' && ((f && f.length !== 0) || f === 0)).length > 0
    debug('isAnyFilter', isAnyFilter)
    // new_filters.POSITION = isAnyFilter || (new_filters.POSITION !== '' && new_filters.POSITION !== 'ENTIRE') ? new_filters.POSITION : 'EMPTY'
    if (new_filters.POSITION === '' || new_filters.POSITION === 'ENTIRE') {
      if (isAnyFilter) {
        new_filters.POSITION = 'ENTIRE'
      } else {
        new_filters.POSITION = 'EMPTY'
      }
    }
    debug('NEWIEST POSITION:', new_filters.POSITION)
    state.filters = Object.assign({}, state.filters, new_filters)
  },
  SET_SVG: (state, { city, svg }) => {
    debug({ city, svg })
    state.svgStrs[ city ] = sanitizeHtml(svg, {
      allowedTags: [ 'svg', 'text', 'circle', 'path', 'g', 'line' ]
    })
  },
  SET_ASSETS_LOADED: (state) => {
    state.isLoaded = true
  },
  SET_BOUNDS: (state, bounds) => {
    state.bounds = bounds
  },
  SET_COUNT: (state, { count, }) => {
    state.count = count
  },
  SET_INFOGRAPHIC_CALC: (state, calc) => {
    state.calc = calc
  }
}