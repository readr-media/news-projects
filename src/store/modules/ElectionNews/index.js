import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import { initColorCandidates } from 'src/components/ElectionNews/util'

export default {
  namespaced: true,
  state: () => ({
    showSidebar: false,
    showLightbox: false,
    mapping: {
      sources: {},
      keywords: {}
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
    lightboxSwitcher: 'left'
  }),
  actions,
  mutations,
  getters,
}