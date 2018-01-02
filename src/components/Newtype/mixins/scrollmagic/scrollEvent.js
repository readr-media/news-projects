const sceneConfig = {
  data () {
    return {
      currentScroll: 0
    }
  },
  methods: {
    setScrollEvent () {
      const ScrollMagic = require('scrollmagic')
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')

      // init controller
      const controller = new ScrollMagic.Controller()

      // dimensions
      // Story1
      const story1Video = new ScrollMagic.Scene({ triggerElement: `.article-landing--story1`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story1Video.on('enter', () => {
        if (this.currentScroll < 1) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 2', { nonInteraction: false })
        }
      })
      const story1Animation = new ScrollMagic.Scene({ triggerElement: `.animation--story1`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story1Animation.on('enter', () => {
        if (this.currentScroll < 2) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 3', { nonInteraction: false })
        }
      })
      const story1ReadNext = new ScrollMagic.Scene({ triggerElement: `.read-next--story1`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story1ReadNext.on('enter', () => {
        if (this.currentScroll < 3) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 4', { nonInteraction: false })
        }
      })
      // Story2
      const story2Video = new ScrollMagic.Scene({ triggerElement: `.article-landing--story2`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story2Video.on('enter', () => {
        if (this.currentScroll < 4) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 5', { nonInteraction: false })
        }
      })
      const story2Animation = new ScrollMagic.Scene({ triggerElement: `.animation--story2`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story2Animation.on('enter', () => {
        if (this.currentScroll < 5) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 6', { nonInteraction: false })
        }
      })
      const story2ReadNext = new ScrollMagic.Scene({ triggerElement: `.read-next--story2`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story2ReadNext.on('enter', () => {
        if (this.currentScroll < 6) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 7', { nonInteraction: false })
        }
      })
      // Story3
      const story3Title1 = new ScrollMagic.Scene({ triggerElement: `#story3-section3`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story3Title1.on('enter', () => {
        if (this.currentScroll < 7) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 8', { nonInteraction: false })
        }
      })
      const story3Title2 = new ScrollMagic.Scene({ triggerElement: `#story3-section4`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story3Title2.on('enter', () => {
        if (this.currentScroll < 8) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 9', { nonInteraction: false })
        }
      })
      const story3ReadNext = new ScrollMagic.Scene({ triggerElement: `.read-next--story3`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story3ReadNext.on('enter', () => {
        if (this.currentScroll < 9) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 10', { nonInteraction: false })
        }
      })
      // Story4
      const story4Video = new ScrollMagic.Scene({ triggerElement: `.article-landing--story4`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story4Video.on('enter', () => {
        if (this.currentScroll < 10) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 11', { nonInteraction: false })
        }
      })
      const story4Animation = new ScrollMagic.Scene({ triggerElement: `.animation--story4`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story4Animation.on('enter', () => {
        if (this.currentScroll < 11) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 12', { nonInteraction: false })
        }
      })
      const story4Chart = new ScrollMagic.Scene({ triggerElement: `#story4-section3`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story4Chart.on('enter', () => {
        if (this.currentScroll < 12) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 13', { nonInteraction: false })
        }
      })
      const story4ReadNext = new ScrollMagic.Scene({ triggerElement: `.read-next--story4`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      story4ReadNext.on('enter', () => {
        if (this.currentScroll < 13) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 14', { nonInteraction: false })
        }
      })
      // Story5
      const stroy5Title1 = new ScrollMagic.Scene({ triggerElement: `#story5-section3`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      stroy5Title1.on('enter', () => {
        if (this.currentScroll < 14) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 15', { nonInteraction: false })
        }
      })
      const moreProjects = new ScrollMagic.Scene({ triggerElement: `.projects`, duration: 0, offset: 0 })
                          .addIndicators({ name: 'moving' }) // add indicators (requires plugin)
                          .addTo(controller)
      moreProjects.on('enter', () => {
        if (this.currentScroll < 15) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 16', { nonInteraction: false })
        }
      })
    }
  },
  mounted () { 
    if (process.browser) {
      if (this.$store.state.route.query.single !== 'true') {
        this.setScrollEvent()
      }
    }
  }
}

export default sceneConfig