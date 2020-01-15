import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['viewport']),
    vw() {
      return this.viewport[0]
    },
    vh() {
      return this.viewport[1]
    }
  }
}
