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
  },
  toggleBodyScrollBar (state, isShow) {
    if (isShow) {
      document.body.classList.remove('overflow-h')
    } else {
      document.body.classList.add('overflow-h')
    }
  },
  addReadReportIds (state, id) {
    state.readReportIds.push(id)
  }
  // toggleScrollBar (state, isShow) {
  //   state.isScrollBar = isShow
  // }
}
