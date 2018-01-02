const sceneConfig = {
  methods: {
    setStory1Scene () {
      let { TweenMax } = require('gsap')
      let ScrollMagic = require('scrollmagic')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')

      var isMobile = window.innerWidth <= 767

      // init controller
      var controller = new ScrollMagic.Controller()

      // build story1 tween
      var tweenWritingHand = TweenMax.fromTo(
        `#writing-hand`,
        1,
        { x: 0, y: 0, ease: Cubic.easeOut },
        { bezier: [{x: 0, y: 0}, {x: window.innerWidth * 0.15, y: 100}, {x: window.innerWidth * 0.25, y: 20}, {x: window.innerWidth * 0.35, y: 50}, {x: window.innerWidth * 0.45, y: 0}] }
      )

      var sceneWritingHand = new ScrollMagic.Scene({ triggerElement: '.animation--story1', duration: '60%', offset: isMobile ? 0 : 0 })
                            .setTween(tweenWritingHand)
                            // .addIndicators({ name: 'moving1' }) // add indicators (requires plugin)
                            .addTo(controller)

      sceneWritingHand.on('progress', (event) => {
        event.progress >= 0.4 ? this.story1Ending = true : this.story1Ending = false
      })

      window.addEventListener('resize', () => {
        tweenWritingHand = TweenMax.fromTo(
          `#writing-hand`,
          1,
          { x: 0, y: 0, ease: Cubic.easeOut },
          { bezier: [{x: 0, y: 0}, {x: window.innerWidth * 0.15, y: 100}, {x: window.innerWidth * 0.25, y: 20}, {x: window.innerWidth * 0.35, y: 50}, {x: window.innerWidth * 0.45, y: 0}] }
        )
        sceneWritingHand.setTween(tweenWritingHand)
      })
    },
    setStory2Scene () {
      let { TweenMax } = require('gsap')
      let ScrollMagic = require('scrollmagic')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')

      // init controller
      var controller = new ScrollMagic.Controller()

      // build story2 tween
      var tweenLeftHand = TweenMax.fromTo(
        '#left-hand',
        1,
        { x: 0, y: 0, ease: Cubic.easeOut },
        { x: window.innerWidth * 0.5, y: 0, ease: Cubic.easeOut }
      )
      var tweenRightHand = TweenMax.fromTo(
        '#right-hand',
        1,
        { x: 0, y: 0, ease: Cubic.easeOut },
        { x: -window.innerWidth * 0.5, y: 0, ease: Cubic.easeOut }
      )

      // build scene
      var sceneLeftHand = new ScrollMagic.Scene({ triggerElement: '.animation--story2', duration: '50%', offset: 0 })
                          .setTween(tweenLeftHand)
                          // .addIndicators({ name: 'moving2' }) // add indicators (requires plugin)
                          .addTo(controller)
      var sceneRightHand = new ScrollMagic.Scene({ triggerElement: '.animation--story2', duration: '50%', offset: 0 })
                          .setTween(tweenRightHand)
                          // .addIndicators({ name: 'moving2' }) // add indicators (requires plugin)
                          .addTo(controller)

      sceneLeftHand.on('end', (event) => {
        event.scrollDirection === 'FORWARD' ? this.story2Ending = true : this.story2Ending = false
      })

      window.addEventListener('resize', () => {
        tweenLeftHand = TweenMax.fromTo(
          '#left-hand',
          1,
          { x: 0, y: 0, ease: Cubic.easeOut },
          { x: window.innerWidth * 0.5, y: 0, ease: Cubic.easeOut }
        )
        sceneLeftHand.setTween(tweenLeftHand)

        tweenRightHand = TweenMax.fromTo(
          '#right-hand',
          1,
          { x: 0, y: 0, ease: Cubic.easeOut },
          { x: -window.innerWidth * 0.5, y: 0, ease: Cubic.easeOut }
        )
        sceneRightHand.setTween(tweenRightHand)
      })
    },
    setStory4Scene () {
      let { TweenMax } = require('gsap')
      let ScrollMagic = require('scrollmagic')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')

      // init controller
      var controller = new ScrollMagic.Controller()

      // build story4 tween
      var tweenBird = TweenMax.fromTo(
        '#bird',
        1,
        { x: 0, y: 0, ease: Cubic.easeOut },
        { x: window.innerWidth * 0.6, y: 0, ease: Cubic.easeOut }
      )

      // build scene
      var sceneBird = new ScrollMagic.Scene({ triggerElement: '.animation--story4', duration: '50%', offset: 0 })
                          .setTween(tweenBird)
                          // .addIndicators({ name: 'moving2' }) // add indicators (requires plugin)
                          .addTo(controller)


      window.addEventListener('resize', () => {
        tweenBird = TweenMax.fromTo(
          '#bird',
          1,
          { x: 0, y: 0, ease: Cubic.easeOut },
          { x: window.innerWidth * 0.6, y: 0, ease: Cubic.easeOut }
        )
        sceneBird.setTween(tweenBird)
      })
    },
    initAnimation () {
      if (this.storyIndex === 1) {
        this.setStory1Scene()
      } else if (this.storyIndex === 2) {
        this.setStory2Scene()
      } else if (this.storyIndex === 4) {
        this.setStory4Scene()
      }
    }
  },
  mounted () {
    if (process.browser) {
      this.initAnimation()
    }
  }
}

export default sceneConfig