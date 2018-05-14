import Vue from 'vue'

export default {
  SET_PROMISEDATA: (state, data) => {
    Vue.set(state, 'promiseData', data)
  },
  SET_SURVEYBASIS: (state, data) => {
    Vue.set(state, 'surveyBasis', data)
  },
  SET_CURRENT_SECTION: (state, anchor) => {
    Vue.set(state, 'currentSection', anchor)
  },
  SET_CURRENT_SLIDE_INDEX: (state, index) => {
    Vue.set(state, 'currentSlideIndex', index)
  },
  // Mutations while navigating to the next round survey
  INCREMENT_SURVEY_ROUND: (state) => {
    state.surveyRoundNum += 1
  },
  SET_NEXTROUND_SURVEY: (state) => {
    Vue.set(state.surveyGroupByInterest, `round${state.surveyRoundNum}`, {})
    Vue.set(state.surveyGroupByInterest[`round${state.surveyRoundNum}`], 'very-interest', [])
    Vue.set(state.surveyGroupByInterest[`round${state.surveyRoundNum}`], 'idk', [])
    Vue.set(state.surveyGroupByInterest[`round${state.surveyRoundNum}`], 'not-interest', [])
  },
  UPDATE_SURVEYBASIS: (state, shouldFilterPids) => {
    state.surveyBasis = state.surveyBasis.filter(promise => !shouldFilterPids.includes(promise.pid))
  },
  // End of mutations while navigating to the next round survey
  UPDATE_INTEREST: (state, { interest, promise }) => {
    state.surveyGroupByInterest[`round${state.surveyRoundNum}`][interest].push(promise)
  },
  RESULT_SECTION_NAVIGATED: (state) => {
    state.resultSectionBeenNavigated = true
  },
  UPDATE_EMAIL_KEEPTRACKING: (state, email) => {
    state.emailKeepTracking = email
  },
  UPDATE_SHOWHEADER: (state, bool) => {
    state.showHeader = bool
  }
}