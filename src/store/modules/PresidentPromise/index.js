import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  // IMPORTANT: state must be a function so the module can be
  // instantiated multiple times
  state: () => ({
    // section related store
    currentSection: '',
    currentSlideIndex: 0,
    showHeader: true,
    resultSectionBeenNavigated: false,
    // data related store
    promiseData: [],
    surveyBasis: [], // surveyBasis is equal to promiseData when init
    surveySampleSize: 10,
    surveyRoundNum: 1,
    surveyGroupByInterest: {
      'round1': {
        'very-interest': [],
        'idk': [],
        'not-interest': [],
      },
    },
    // email store
    emailKeepTracking: '',
  }),
  actions,
  mutations,
  getters,
}