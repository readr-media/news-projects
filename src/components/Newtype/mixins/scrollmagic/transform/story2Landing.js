const sceneConfig = {
  mounted () {
    if (process.browser) {
      if (this.storyIndex === 2) {
        let { TweenMax } = require('gsap')
        let ScrollMagic = require('scrollmagic')
        require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap')
        require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    
        const isMobile = window.innerWidth <= 767

        // init controller
        var controller = new ScrollMagic.Controller()
    
        // build tween
        var tweenStory2Landing = TweenMax.to(
          '#vid2',
          1,
          { opacity: 1 }
        )

        // build scene
        var sceneStory2Landing = new ScrollMagic.Scene({ 
                                  triggerElement: '.article-landing--story2',
                                  duration: '100%',
                                  // duration: window.innerHeight,
                                  // offset: '50%',
                                  // offset: 0,
                                  triggerHook: 'onLeave'
                                })
                                .setTween(tweenStory2Landing)
                                // .addIndicators({ name: 'moving landing story2' }) // add indicators (requires plugin)
                                .addTo(controller)

        sceneStory2Landing.on('enter', (event) => {
          this.$el.querySelector('#vid1').play()
          this.$el.querySelector('#vid2').play()

          this.$el.querySelector('#vid1').style.position = "fixed"
          this.$el.querySelector('#vid2').style.position = "fixed"
          this.$el.querySelector('.opening').style.position = "fixed"

          this.$el.querySelector('#vid1').style.top = "0px"
          this.$el.querySelector('#vid2').style.left = "0px"
          this.$el.querySelector('.opening').style.left = "0px"

          this.$el.querySelector('#vid1').style.top = "0px"
          this.$el.querySelector('#vid2').style.left = "0px"
          this.$el.querySelector('.opening').style.left = "0px"
        })

        sceneStory2Landing.on('progress', (event) => {
          this.$el.querySelector('#vid1').volume = 1 - event.progress
          this.$el.querySelector('#vid2').volume = event.progress
        })

        sceneStory2Landing.on('leave', (event) => {
          this.$el.querySelector('#vid1').pause()
          this.$el.querySelector('#vid2').pause()

          if (isMobile) {
            this.muted = true
          }

          if (event.scrollDirection === 'FORWARD') {
            this.$el.querySelector('#vid2').style.position = 'absolute'
            this.$el.querySelector('#vid2').style.top = 'initial'
            this.$el.querySelector('#vid2').style.bottom = '0px'
  
            this.$el.querySelector('#vid1').style.position = 'absolute'
            this.$el.querySelector('#vid1').style.top = 'initial'
            this.$el.querySelector('#vid1').style.bottom = '0px'
  
            this.$el.querySelector('.opening').style.position = 'absolute'
            this.$el.querySelector('.opening').style.top = 'initial'
            this.$el.querySelector('.opening').style.bottom = '0px'
          } else if (event.scrollDirection === 'REVERSE') { 
            this.$el.querySelector('#vid2').style.position = 'absolute'
            this.$el.querySelector('#vid2').style.top = '0px'
            this.$el.querySelector('#vid2').style.bottom = 'initial'
  
            this.$el.querySelector('#vid1').style.position = 'absolute'
            this.$el.querySelector('#vid1').style.top = '0px'
            this.$el.querySelector('#vid1').style.bottom = 'initial'
  
            this.$el.querySelector('.opening').style.position = 'absolute'
            this.$el.querySelector('.opening').style.top = '0px'
            this.$el.querySelector('.opening').style.bottom = 'initial'
          }
        })
      }
    }
  }
}

export default sceneConfig