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
  showNav (state) {
    state.isNav = true
  }
  // toggleScrollBar (state, isShow) {
  //   state.isScrollBar = isShow
  // }
}