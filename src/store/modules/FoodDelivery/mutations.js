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
    state[ beginningContent ] = true
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
  },
  toggleAutoScrolling (state, isAutoScrolling) {
    state.isAutoScrolling = isAutoScrolling
  },
  copyLinkToClipboard (state, url) {
    const el = document.createElement('textarea')
    el.value = url
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }
  },
  setOtherReports (state, data) {
    state.otherReports = data
  }
}
