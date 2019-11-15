// import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: () => ({
    isReportContent: false,
    // clickedReportId: 1,
    currentReadReportId: 1,
    // readReports: 1,
    reportIds: [ 1, 2, 3, 4, 5 ],
    isInfo: false,
    isMounted: false
    // isScrollBar: false
  }),
  // actions,
  mutations
}