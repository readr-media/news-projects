const sceneConfig = {
  methods: {
    setScene () {
      const ScrollMagic = require('scrollmagic')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')

      // init controller
      const controller = new ScrollMagic.Controller()

      const vidHeight = this.storyIndex === 2 ? (window.innerWidth <= 767 ? this.$el.querySelector('#vid1').clientWidth / 9 * 16 : this.$el.querySelector('#vid1').clientWidth / 16 * 9) : null

      // const openingTransitionScene = new ScrollMagic.Scene({ triggerElement: `.article-landing--story${this.storyIndex}`, duration: window.innerHeight, offset: 0 })
      //                         .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
      //                         .addTo(controller)
      const vidControlScene = new ScrollMagic.Scene({
                                triggerElement: `.article-landing--story${this.storyIndex}`,
                                // duration: (this.storyIndex === 1 || this.storyIndex === 4) ? '50%' : vidHeight + vidHeight,
                                duration: (this.storyIndex === 1 || this.storyIndex === 4) ? '50%' : (window.innerWidth <= 767 ? vidHeight * 3 : vidHeight * 2 + vidHeight),
                                // offset: '50%'
                                triggerHook: 'onLeave'
                              })
                              // .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                              .addTo(controller)

      // openingTransitionScene.on('enter', () => {
      //   this.inViewport = true
      // })
      // openingTransitionScene.on('leave', () => {
      //   this.inViewport = false
      // })

      let playTimeout
      vidControlScene.on('enter', () => {
        this.inViewport = true
        playTimeout = setTimeout(() => {
          if ((this.storyIndex === 1 || this.storyIndex === 4) && this.videoSwiper) {
            this.$el.querySelector(`#slide-story${this.storyIndex}-vid${this.videoSwiper.realIndex + 1}`).play()
            if (window.innerWidth > 767) {
              this.playing = true
              ga('send', 'event', 'projects', 'autoplay', `play_story${this.storyIndex}`, { nonInteraction: false })
            }
          }
        }, 1500)
      })
      vidControlScene.on('leave', () => {
        this.inViewport = false
        if ((this.storyIndex === 1 || this.storyIndex === 4) && this.videoSwiper) {
          this.$el.querySelector(`#slide-story${this.storyIndex}-vid${this.videoSwiper.realIndex + 1}`).pause()
          this.playing = false
          clearTimeout(playTimeout)
        }
      })
    }
  },
  mounted () {
    if (process.browser) {
      this.setScene()
    }
  }
}

export default sceneConfig