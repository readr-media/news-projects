export default {
  data () {
    return {
      scroller: undefined,
      isInView: false,
    }
  },
  methods: {
    scrollerResizeHandler () {
      this.scroller.resize()
    },
  },
  mounted () {
    if (this.containerSelector === undefined) {
      this.containerSelector = `#${this.$el.id}`
    }
    this.scroller = window.scrollama()
    this.scroller
      .setup({
        step: this.containerSelector, // container selector pass by props
        offset: .8,
      })
      .onStepEnter(() => {
        this.isInView = true
        if (!this.isDataAvailable) {
          this.isDataLoading = true
          this.doNotVisualizeAfterLoading ? this.loadData() : this.loadDataThenVisulaize()
        } else {
          if (this.doNotVisualizeAfterLoading) {
            this.isDataLoading = false
          } else {
            if (!this.isChartReady) {
              this.isDataLoading = false
              this.init()
              this.visualize()
            }
          }
        }
      })
      .onStepExit(() => {
        this.isInView = false
      })

    window.addEventListener('resize', this.scrollerResizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.scrollerResizeHandler)
  }
}