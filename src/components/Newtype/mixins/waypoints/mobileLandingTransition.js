if (process.browser) {
  const Waypoint =  require('waypoints/lib/noframework.waypoints.js')
}

const setWaypoints = {
  methods: {
    setMobileLandingTransition () {
      const mainConcept = this.$el.querySelector('.newtype-landing__main-concept')
      new Waypoint({
        element: mainConcept,
        handler: (direction) => {
          if (window.innerWidth <= 767) {
            if (direction === 'down') {
              // console.log('show des, hide title')
              this.showTitle = false
              this.showDescritpion = true
            } else {
              // console.log('hide des, show title')
              this.showTitle = true
              this.showDescritpion = false
            }
          }
        },
        offset: '20%'
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