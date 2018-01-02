const sceneConfig = {
  methods: {
    setScene () {
      const { TweenMax, TimelineMax } = require('gsap')
      const ScrollMagic = require('scrollmagic')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')

      let imageHeight = this.$el.querySelector(`.parallax__image--story${this.storyIndex}`).clientHeight

      // init controller
      const controller = new ScrollMagic.Controller()

      // build tween
      const tweenBGParallax = TweenMax.to(
        // targets
        // durations
        // from
        // to
        `.parallax__image--story${this.storyIndex}`,
        1,
        { y: imageHeight - 600, ease: Linear.easeNone }
      )
      const timeline = new TimelineMax().add([tweenBGParallax])

      // build scene
      return new ScrollMagic.Scene({ triggerElement: `.parallax--story${this.storyIndex}`, duration: this.$el.clientHeight + window.innerHeight, offset: -window.innerHeight / 2 })
      .setTween(timeline)
      // .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
      .addTo(controller)
    }
  },
  mounted () {
    if (process.browser) {
      if (window.innerWidth > 767) {
        let scene
        setTimeout(() => { scene = this.setScene() }, 500)
        // window.onresize = () => { scene.refresh() }
      }
    }
  }
}

export default sceneConfig