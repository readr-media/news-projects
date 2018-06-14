import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_REPORTS: (state, { reports }) => {
    state.reports = reports
  },

  SET_REPORTS_COUNT: (state, { count }) => {
    state.reportsCount = count
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  },

  SET_VIEWPORT: (state, viewport) => {
    state.viewport = viewport
  }
}
