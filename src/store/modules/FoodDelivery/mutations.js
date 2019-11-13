export default {
  toggleReportContent (state, isShow) {
    state.isReportContent = isShow
  },
  changeClickedReportId (state, id) {
    state.clickedReportId = id
  },
  toggleInfo (state, isShow) {
    state.isInfo = isShow
  },
  setIsMounted (state) {
    state.isMounted = true
  }
  // toggleScrollBar (state, isShow) {
  //   state.isScrollBar = isShow
  // }
}