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
        district: data[1],
        school: data[2],
        hasGroup: (typeof data[3] === 'string') ? data[3].toUpperCase() : data[3],
        group: data[4],
        teachingContent: data[5],
        remarks: data[6],
        notShow: data[7]
      }))
  }
}