if (process.browser) {
  const Waypoint =  require('waypoints/lib/noframework.waypoints.js')
}

const setWaypoints = {
  methods: {
    setMobileLandingTransition () {
      const mainTitle = this.$el.querySelector('.newtype-landing__title')
      new Waypoint({
        element: mainTitle,
        handler: (direction) => {
          // if (window.innerWidth <= 767) {
          if (direction === 'down') {
            if (window.innerWidth <= 767) {
              this.showTitle = false
            }
            this.showDescritpion = true
          } else {
            this.showTitle = true
            this.showDescritpion = false
          }
          // }
        },
        offset: '0'
      })
    }
  },
  mounted () {
    if (process.browser) {
      this.setMobileLandingTransition()
    }
  }
}

export default setWaypoints