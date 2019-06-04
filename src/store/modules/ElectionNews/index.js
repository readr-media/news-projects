import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import keywordsEN from './keywordsEN'
import mediaSourcesEN from './mediaSourcesEN'

import { initColorCandidates } from 'src/components/ElectionNews/util'

export default {
  namespaced: true,
  state: () => ({
    showSidebar: false,
    hasFirstShownSidebar: false,
    showLightbox: false,
    mapping: {
      sources: {},
      keywords: {},
      abbr: {}
    },
    filter: {
      sources: []
    },
    data: {
      date: {
        start: '2018/10/19',
        until: '2018/12/25'
      },
      graph: {},
      newscontent: {}
    },
    colors: initColorCandidates(),
    graphTrackingLine: {
      stepIndex: 0
    },
    lightboxDate: null,
    lightboxSwitcher: 'left',
    keywordsEN,
    mediaSourcesEN
  }),
  actions,
  mutations,
  getters,
}