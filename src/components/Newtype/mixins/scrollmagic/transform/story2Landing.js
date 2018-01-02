const sceneConfig = {
  mounted () {
    if (process.browser) {
      if (this.storyIndex === 2) {
        let { TweenMax } = require('gsap')
        let ScrollMagic = require('scrollmagic')
        require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap')
        require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    
        const isMobile = window.innerWidth <= 767

        const vidHeight = window.innerWidth <= 767 ? Math.ceil(this.$el.querySelector('#vid1').clientWidth / 9 * 16) : Math.ceil(this.$el.querySelector('#vid1').clientWidth / 16 * 9)
        const vid2containerHeight = this.$el.querySelector('#vid2-container').clientHeight

        // init controller
        var controller = new ScrollMagic.Controller()
    
        // build tween
        var tweenStory2Landing = TweenMax.fromTo(
          '#vid2-container',
          1,
          { y: 0 },
          { y: isMobile ? -vidHeight - vidHeight : -vidHeight - vidHeight }
        )

        // build scene
        var sceneStory2Landing = new ScrollMagic.Scene({ 
                                  triggerElement: '.article-landing--story2',
                                  // duration: vidHeight + vidHeight,
                                  duration: isMobile ? 2 * vidHeight : vidHeight + vidHeight,
                                  triggerHook: 'onLeave'
                                })
                                .setTween(tweenStory2Landing)
                                // .addIndicators({ name: 'moving landing story2' }) // add indicators (requires plugin)
                                .addTo(controller)

        sceneStory2Landing.on('enter', (event) => {
          // this.$el.querySelector('#vid1').play()
          // this.$el.querySelector('#vid2').play()

          this.$el.querySelector('#vid1-container').style.position = "fixed"
          this.$el.querySelector('#vid2-container').style.position = "fixed"
          this.$el.querySelector('.opening').style.position = "fixed"

          this.$el.querySelector('#vid1-container').style.left = "0px"
          this.$el.querySelector('#vid2-container').style.left = "0px"
          this.$el.querySelector('.opening').style.left = "0px"

          this.$el.querySelector('#vid1-container').style.top = "0px"
          this.$el.querySelector('#vid2-container').style.top = isMobile ? `${vidHeight + vidHeight}px` : `${vidHeight + vidHeight}px`
          this.$el.querySelector('.opening').style.top = "0px"

          if (event.scrollDirection === 'FORWARD') {
            if (!isMobile) {
              this.$el.querySelector('#vid1').play()
              this.playing.vid1 = true
              ga('send', 'event', 'projects', 'autoplay', `play_story${this.storyIndex}`, { nonInteraction: false })
            }
            this.shouldplay.vid1 = true
            this.$el.querySelector('#vid1-container').style.zIndex = '1'
            this.$el.querySelector('#vid2-container').style.zIndex = '2'
          } else if (event.scrollDirection === 'REVERSE') {
            if (!isMobile) {
              this.$el.querySelector('#vid2').play()
              this.playing.vid2 = true
              ga('send', 'event', 'projects', 'autoplay', `play_story${this.storyIndex}`, { nonInteraction: false })
            }
            this.shouldplay.vid2 = true
            this.$el.querySelector('#vid1-container').style.zIndex = '1'
            this.$el.querySelector('#vid2-container').style.zIndex = '2'
          }
        })

        sceneStory2Landing.on('progress', (event) => {
          if (event.progress >= 0.5) {
            if (!this.$el.querySelector('#vid1').paused) {
              this.$el.querySelector('#vid1').pause()
              this.playing.vid1 = false
            }
            this.shouldplay.vid1 = false
            if (this.$el.querySelector('#vid2').paused) {
              if (!isMobile) {
                this.$el.querySelector('#vid2').play()
                this.playing.vid2 = true
                ga('send', 'event', 'projects', 'autoplay', `play_story${this.storyIndex}`, { nonInteraction: false })
              }
            }
            this.shouldplay.vid2 = true
          } else if (event.progress <= 0.5) {
            if (this.$el.querySelector('#vid1').paused) {
              if (!isMobile) {
                this.$el.querySelector('#vid1').play()
                this.playing.vid1 = true
                ga('send', 'event', 'projects', 'autoplay', `play_story${this.storyIndex}`, { nonInteraction: false })
              }
            }
            this.shouldplay.vid1 = true
            if (!this.$el.querySelector('#vid2').paused) {
              this.$el.querySelector('#vid2').pause()
              this.playing.vid2 = false
            }
            this.shouldplay.vid2 = false
          }
        })

        sceneStory2Landing.on('leave', (event) => {
          this.$el.querySelector('#vid1').pause()
          this.$el.querySelector('#vid2').pause()
          this.playing.vid1 = false
          this.playing.vid2 = false
          this.shouldplay.vid1 = false
          this.shouldplay.vid2 = false

          // if (isMobile) {
          //   this.muted = true
          // }

          if (event.scrollDirection === 'FORWARD') {
            this.$el.querySelector('#vid1-container').style.position = 'absolute'
            this.$el.querySelector('#vid1-container').style.top = 'initial'
            this.$el.querySelector('#vid1-container').style.bottom = '0px'
            this.$el.querySelector('#vid1-container').style.zIndex = '1'
            
            this.$el.querySelector('#vid2-container').style.position = 'absolute'
            this.$el.querySelector('#vid2-container').style.top = 'initial'
            this.$el.querySelector('#vid2-container').style.bottom = '0px'
            this.$el.querySelector('#vid2-container').style.zIndex = '2'
            this.$el.querySelector('#vid2-container').style.transform = 'none'

            this.$el.querySelector('#vid2').style.position = 'absolute'
            this.$el.querySelector('#vid2').style.bottom = '0px'
  
            this.$el.querySelector('.opening').style.position = 'absolute'
            this.$el.querySelector('.opening').style.top = 'initial'
            this.$el.querySelector('.opening').style.bottom = '0px'
          } else if (event.scrollDirection === 'REVERSE') { 
            this.$el.querySelector('#vid1-container').style.position = 'absolute'
            this.$el.querySelector('#vid1-container').style.top = '0px'
            this.$el.querySelector('#vid1-container').style.bottom = 'initial'
            this.$el.querySelector('#vid1-container').style.zIndex = '2'

            this.$el.querySelector('#vid2-container').style.position = 'absolute'
            this.$el.querySelector('#vid2-container').style.top = '0px'
            this.$el.querySelector('#vid2-container').style.bottom = 'initial'
            this.$el.querySelector('#vid2-container').style.zIndex = '1'
  
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