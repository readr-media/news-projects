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

            // Handle exception for story1, story2, story4 last subsections
            if (subsection.id === 'story1-section4-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story1-section4-subsection1', true)
              }
            }
            if (subsection.id === 'story2-section4-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story2-section4-subsection1', true)
              }
            }
            if (subsection.id === 'story4-section2-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story4-section2-subsection1', true)
              }
            }
            if (subsection.id === 'story4-section5-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story4-section5-subsection1', true)
              }
            }
          },
          offset: '30%' // handle subsection's container top
        })

        new Waypoint({
          element: subsection,
          handler: (direction) => {
            direction === 'up' ? this.$set(this.currentVisible, subsection.id, true) : this.$set(this.currentVisible, subsection.id, false)

            // Handle exception for story1, story2, story4 last subsections
            if (subsection.id === 'story1-section4-subsection1') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story1-section4-subsection1', true)
              }
            } else if (subsection.id === 'story1-section4-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story1-section4-subsection1', false)
              } else {
                this.$set(this.currentVisible, 'story1-section4-subsection1', true)
              }
            }
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
            if (subsection.id === 'story4-section2-subsection1') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story4-section2-subsection1', true)
              }
            } else if (subsection.id === 'story4-section2-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story4-section2-subsection1', false)
              } else {
                this.$set(this.currentVisible, 'story4-section2-subsection1', true)
              }
            }
            if (subsection.id === 'story4-section5-subsection1') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story4-section5-subsection1', true)
              }
            } else if (subsection.id === 'story4-section5-subsection2') {
              if (direction === 'down') {
                this.$set(this.currentVisible, 'story4-section5-subsection1', false)
              } else {
                this.$set(this.currentVisible, 'story4-section5-subsection1', true)
              }
            }
          },
          offset () {
            return -this.element.clientHeight + window.innerHeight * 0.3 // handle subsection's container bottom
          }
        })
      })
    },
    refreshWaypoints () {
      Waypoint.refreshAll()
    }
  },
  mounted () {
    if (process.browser) {
      this.setArticleSubSectionOnChange()
    }
  }
}

export default setWaypoints