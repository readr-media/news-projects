import moment from 'moment'
import _ from 'lodash'
export const COUNTING_START_TIME = '2020-01-11T16:00:00+0800' // ISO 8601

export const timerModule = {
  namespaced: true,
  state: () => ({
    currentTime: new Date().toISOString(),
    timer: undefined
  }),
  mutations: {
    SET_CURRENT_TIME(state, time) {
      state.currentTime = time
    },
    SET_TIMER(state, timer) {
      state.timer = timer
    }
  },
  actions: {
    INIT_TIMER({ state, commit, getters }) {
      const isTimerExist = state.timer !== undefined
      if (isTimerExist || getters.isElectionBoxOpeningStart) {
        return
      }

      const timer = setInterval(() => {
        if (getters.isElectionBoxOpeningStart) {
          clearInterval(state.timer)
        }
        commit('SET_CURRENT_TIME', new Date().toISOString())
      }, 1000)
      commit('SET_TIMER', timer)
    }
  },
  getters: {
    remainingTime(state) {
      return new Date(COUNTING_START_TIME) - new Date(state.currentTime)
    },
    remainingTimeInfo(state) {
      const end = moment(COUNTING_START_TIME)
      const now = moment(state.currentTime)
      const diff = moment.duration(now.diff(end))
      return {
        days: diff.days(),
        hours: diff.hours(),
        minutes: diff.minutes(),
        seconds: diff.seconds()
      }
    },
    isElectionBoxOpeningStart(state, getters, rootState) {
      const isManualToggled = _.get(rootState, [ 'electionResultToggler', 'data', 'showCountdown' , 'value' ], false)
      return isManualToggled || getters.remainingTime < 0
    }
  }
}
