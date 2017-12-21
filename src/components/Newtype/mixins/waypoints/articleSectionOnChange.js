if (process.browser) {
  const Waypoint =  require('waypoints/lib/noframework.waypoints.js')
}

const setWaypoints = {
  methods: {
    setArticleSubSectionOnChange () {
      const subsections = this.$el.querySelectorAll('.subsection-container')
      subsections.forEach((subsection) => {
        new Waypoint({
          element: subsection,
          handler: (direction) => {
            direction === 'down' ? this.$set(this.currentVisible, subsection.id, true) : this.$set(this.currentVisible, subsection.id, false)

            // Handle exception for story2 last subsections
            if (subsection.id === 'story2-section4-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story2-section4-subsection1', true)
              }
            }
          },
          offset: '50%' // handle subsection's container top
        })

        new Waypoint({
          element: subsection,
          handler: (direction) => {
            direction === 'up' ? this.$set(this.currentVisible, subsection.id, true) : this.$set(this.currentVisible, subsection.id, false)

            // Handle exception for story2 last subsections
            if (subsection.id === 'story2-section4-subsection1') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story2-section4-subsection1', true)
              }
            } else if (subsection.id === 'story2-section4-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story2-section4-subsection1', false)
              } else {
                this.$set(this.currentVisible, 'story2-section4-subsection1', true)
              }
            }
          },
          offset () {
            return -this.element.clientHeight + window.innerHeight / 2 // handle subsection's container bottom
          }
        })
      })
    }
  },
  mounted () {
    if (process.browser) {
      this.setArticleSubSectionOnChange()
    }
  }
}

export default setWaypoints