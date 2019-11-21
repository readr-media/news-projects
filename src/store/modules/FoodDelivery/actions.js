const scrollIntoView = require('scroll-into-view')

export default {
  scrollToOrder ({ state, commit }, id) {
    if (state.isAutoScrolling) return
    commit('toggleAutoScrolling', true)
    commit('changeCurrentReadReportId', id)
    const reportEl = document.getElementById(`report${state.currentReadReportId}`)
    scrollIntoView(reportEl, {
        time: 1000,
        align: {
          top: 0,
          left: 0
        },
        ease: (t) => t * t * t * t
      },
      () => {
        commit('toggleAutoScrolling', false)
      }
    )
  }
}
