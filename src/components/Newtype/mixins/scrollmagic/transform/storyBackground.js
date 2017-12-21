const sceneConfig = {
  methods: {
    setScene () {
      const { TweenMax, TimelineMax } = require('gsap')
      const ScrollMagic = require('scrollmagic')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
      
      const isMobile = window.innerWidth <= 767

      // init controller
      const controller = new ScrollMagic.Controller()

      // build tween
      const tweenFatPolygonBGParallax = TweenMax.to(
        // targets
        // durations
        // from
        // to
        `.fat-polygon-bg--story${this.index}`,
        1,
        { y: 2000, ease: Linear.easeNone }
      )
      // const tweenLongPolygonBGParallax = TweenMax.to(
      //   // targets
      //   // durations
      //   // from
      //   // to
      //   `.long-polygon-bg--story${this.index}`,
      //   1,
      //   { y: 1000, ease: Linear.easeNone }
      // )
      const timeline = new TimelineMax().add([tweenFatPolygonBGParallax])

      // build scene
      new ScrollMagic.Scene({ triggerElement: `.article--story${this.index}`, duration: this.$el.clientHeight, offset: 0 })
      .setTween(timeline)
      // .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
      .addTo(controller)
    }
  },
  mounted () {
    if (process.browser) {
      this.setScene()
    }
  }
}

export default sceneConfig