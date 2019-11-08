export default {
  toggleReportContent (state, isShow) {
    state.isReportContent = isShow
  },
  changeClickedReportId (state, id) {
    state.clickedReportId = id
  },
  toggleInfo (state, isShow) {
    state.isInfo = isShow
  }
}