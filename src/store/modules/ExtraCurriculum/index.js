import { getSheet } from '../../../api'

export default {
  namespaced: true,
  state () {
    return {
      schoolData: []
    }
  },
  actions: {
    async FETCH_SCHOOL_DATA ({ commit }, { params }) {
      const res = await getSheet({ params })
      const data = res.body || []
      const filtered = data.slice(2)
      commit('SET_SCHOOL_DATA', filtered)
    }
  },
  mutations: {
    SET_SCHOOL_DATA: (state, data) => {
      state.schoolData = data
    },
  },
  getters: {
    schoolDataFormated: state => (state.schoolData || [])
      .map(data => ({
        county: data[0],
        school: data[1],
        hasOffCampusGroup: (typeof data[6] === 'string') ? data[6].toUpperCase() : data[6],
        OffCampusGroup: data[7],
        teachingContent: data[8],
        notShow: data[9]
      }))
  }
}