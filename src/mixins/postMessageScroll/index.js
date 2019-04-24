import { getScrollDirection, isScrollBarReachBottom } from './util'

export default {
  data () {
    return {
      lastScrollTop: 0,
      lastScrollBarReachBottom: false,
    }
  },
  mounted () {
    window.addEventListener('scroll', this.$_postMessageScroll_handler)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.$_postMessageScroll_handler)
  },
  methods: {
    $_postMessageScroll_handler () {
      const targetWindow = window.parent
      const st = window.pageYOffset || document.documentElement.scrollTop
      const messageDirection = getScrollDirection(this.lastScrollTop, st)
      targetWindow.postMessage(messageDirection, '*')
      this.lastScrollTop = st <= 0 ? 0 : st

      if (isScrollBarReachBottom() !== this.lastScrollBarReachBottom) {
        this.lastScrollBarReachBottom = isScrollBarReachBottom()
        const messageReachBottom = this.lastScrollBarReachBottom ? 'scrollReachBottom' : 'scrollLeaveBottom'
        targetWindow.postMessage(messageReachBottom, '*')
      }
    },
  }
}