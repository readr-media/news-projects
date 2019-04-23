export default {
  data () {
    return {
      lastScrollTop: 0,
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
      if (st > this.lastScrollTop){
        targetWindow.postMessage('scrolldown', '*')
      } else {
        targetWindow.postMessage('scrollup', '*')
      }
      this.lastScrollTop = st <= 0 ? 0 : st
    },
  }
}