// import Vue from 'vue'

export default {
  SET_REPORTS: (state, { reports }) => {
    state.reports = reports
  },

  SET_REPORTS_COUNT: (state, { count }) => {
    state.reportsCount = count
  },

  SET_VIEWPORT: (state, viewport) => {
    state.viewport = viewport
  },

  SET_SHEET: (state, data) => {
    state.googleSheet = data
  }

}
