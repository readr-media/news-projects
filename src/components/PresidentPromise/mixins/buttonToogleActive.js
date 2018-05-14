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
      const isMouse = e.type === 'mouseover' || e.type === 'mouseout'
      if (isMouse) {
        if (!this.isDesktop) return
      }
      this.isActive = !this.isActive
    },
  },
}