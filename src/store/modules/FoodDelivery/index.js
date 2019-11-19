// import actions from './actions'
// import getters from './getters'
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
    isMounted: false,
    contents: [
      {
        id: 1,
        title: '如何成為外送員',
        time: '05:02'
      },
      {
        id: 2,
        title: '美食外送平台解決了什麼問題',
        time: '03:10'
      },
      {
        id: 3,
        title: '司機管理仰賴檢舉和評價',
        time: '07:28'
      },
      {
        id: 4,
        title: '外送員最害怕的事：車禍',
        time: '05:30'
      },
      {
        id: 5,
        title: '平台經濟帶來的好與壞',
        time: '01:40'
      }
    ],
    userState: '前往目的地的路上',
    isTOC: false,
    isBaseReport: true
    // isBodyScroll: true
    // beginningContent: 'toc'
    // isScrollBar: false
  }),
  // actions,
  // getters,
  mutations
}