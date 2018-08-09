import Vue from 'vue'
const debug = require('debug')('CLIENT:mutation:Rent')
export default {
  RESET_FILTER: (state) => {
    state.filters = {}
  },
  SET_FILTER: (state, filters) => {
    debug('filters', filters)
    const new_filters = Object.assign({}, state.filters, filters)
    new_filters.POSITION = new_filters.POSITION === '' ? 'ENTIRE' : new_filters.POSITION
    state.filters = Object.assign({}, state.filters, new_filters)
  },
  SET_SVG: (state, { city, svg }) => {
    debug({ city, svg })
    state.svgStrs[ city ] = svg
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