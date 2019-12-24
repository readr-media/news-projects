import moment from 'moment'
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
      const isElectionBoxOpeningStart = getters.isElectionBoxOpeningStart
      if (isTimerExist || isElectionBoxOpeningStart) {
        return
      }

      const timer = setInterval(() => {
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
      const diff = moment.duration(end.diff(now))
      return {
        days: diff.days(),
        hours: diff.hours(),
        minutes: diff.minutes(),
        seconds: diff.seconds()
      }
    },
    isElectionBoxOpeningStart(state, getters) {
      return getters.remainingTime < 0
    }
  }
}
