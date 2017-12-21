const sceneConfig = {
  methods: {
    setScene () {
      const ScrollMagic = require('scrollmagic')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')

      // init controller
      const controller = new ScrollMagic.Controller()

      // const openingTransitionScene = new ScrollMagic.Scene({ triggerElement: `.article-landing--story${this.storyIndex}`, duration: window.innerHeight, offset: 0 })
      //                         .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
      //                         .addTo(controller)
      const vidControlScene = new ScrollMagic.Scene({
                                triggerElement: `.article-landing--story${this.storyIndex}`,
                                duration: this.storyIndex === 1 ? '50%' : '100%',
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
          if (this.storyIndex === 1 && this.videoSwiper) {
            document.querySelector(`#slide-vid${this.videoSwiper.realIndex + 1}`).play()
          }
          this.playing = true
        }, 1500)
      })
      vidControlScene.on('leave', () => {
        this.inViewport = false
        if (this.storyIndex === 1 && this.videoSwiper) {
          document.querySelector(`#slide-vid${this.videoSwiper.realIndex + 1}`).pause()
        }
        this.playing = false
        clearTimeout(playTimeout)
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