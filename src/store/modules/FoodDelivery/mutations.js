export default {
  toggleReportContent (state, isShow) {
    state.isReportContent = isShow
  },
  // changeClickedReportId (state, id) {
  //   state.clickedReportId = id
  // },
  changeCurrentReadReportId (state, id) {
    state.currentReadReportId = id
  },
  toggleInfo (state, isShow) {
    state.isInfo = isShow
  },
  setIsMounted (state) {
    state.isMounted = true
  },
  changeUserState (state, userState) {
    state.userState = userState
  },
  showBeginningContent (state) {
    const beginningContent = (state.isTOC ? 'isBaseReport' : 'isTOC')
    state[beginningContent] = true
  },
  changeBeginningContent (state) {
    state.isTOC = !state.isTOC
    state.isBaseReport = !state.isBaseReport
  }
  // toggleScrollBar (state, isShow) {
  //   state.isScrollBar = isShow
  // }
}
