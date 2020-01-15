import { get, } from 'lodash'

export default {
  data () {
    return {
      isDesktop: get(this.$store.state, 'useragent.isDesktop', false),
      isActive: false,
    }
  },
  methods: {
    toggleActive (e) {
      if (!this.isDesktop) return
      this.isActive = !this.isActive
    },
  },
}