if (process.browser) {
  const Waypoint =  require('waypoints/lib/noframework.waypoints.js')
}

const setWaypoints = {
  methods: {
    setStoryOnChange () {
      const story = this.$el
      new Waypoint({
        element: story,
        handler: (direction) => {
          if (direction === 'down') {
            history.replaceState(null, null, `/project/newtype/story${this.index}`)
            this.$emit('urlChange', `/project/newtype/story${this.index}`)
          } else {
            if (this.index !== 1) {
              history.replaceState(null, null, `/project/newtype/story${this.index - 1}`)
              this.$emit('urlChange', `/project/newtype/story${this.index - 1}`)
            } else {
              history.replaceState(null, null, `/project/newtype`)
              this.$emit('urlChange', `/project/newtype`)
            }
          }
        },
        offset: '0'
      })
    }
  },
  mounted () {
    if (process.browser) {
      this.setStoryOnChange()
    }
  }
}

export default setWaypoints