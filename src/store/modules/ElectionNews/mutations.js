import Vue from 'vue'
import { get } from 'lodash'

import { initColorCandidates } from 'src/components/ElectionNews/util'

export default {
  PUSH_TO_SOURCES_FILTER (state, sourceId) {
    const filter = state.filter.sources

    // remove existing element
    if (filter.includes(sourceId)) {
      const where = filter.indexOf(sourceId)
      filter.splice(where, 1)
      return
    }

    // remove oldest element
    if (filter.length === 5) {
      filter.shift()
    }
    
    filter.push(sourceId)
    // filter.sort((a, b) => {
    //   const sources = Object.keys(state.mapping.sources)
    //   return sources.indexOf(a) - sources.indexOf(b)
    // })
  },
  CLEAR_SOURCES_FILTER (state) {
    Vue.set(state.filter, 'sources', [])
  },

  SET (state, { targetPath, key, value }) {
    const target = get(state, targetPath)
    Vue.set(target, key, value)
  },

  TOGGLE_SIDEBAR (state) {
    state.showSidebar = !state.showSidebar
  },
  SHOW_SIDEBAR (state) {
    state.showSidebar = true
  },
  HIDE_SIDEBAR (state) {
    state.showSidebar = false
  },
  TOGGLE_LIGHTBOX (state) {
    state.showLightbox = !state.showLightbox
  },
  SHOW_LIGHTBOX (state) {
    state.showLightbox = true
  },
  HIDE_LIGHTBOX (state) {
    state.showLightbox = false
  },
  
  RESET_COLOR_CANDIDATES (state) {
    Vue.set(state, 'colors', initColorCandidates())
  },

  SET_STEP_INDEX (state, index) {
    state.graphTrackingLine.stepIndex = index
  },

  SET_LIGHTBOX_DATE (state, date) {
    state.lightboxDate = date
  },

  SET_LIGHTBOX_SWITCHER (state, position) {
    state.lightboxSwitcher = position
  },

  SET_HAS_FIRST_SHOWN_SIDEBAR (state, value) {
    state.hasFirstShownSidebar = value
  }
}