export default {
  data () {
    return {
      articleSectionReached: []
    }
  },
  mounted () {
    this.createScrollEventHandler()
  },
  methods: {
    createScrollEventHandler () {
      require('intersection-observer')

      const options = {
        rootMargin: '-40% 0px',
        threshold: 0
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // Each entry describes an intersection change for one observed
          // target element:
          //   entry.boundingClientRect
          //   entry.intersectionRatio
          //   entry.intersectionRect
          //   entry.isIntersecting
          //   entry.rootBounds
          //   entry.target
          //   entry.time
          const id = entry.target.id
          if (entry.isIntersecting && !this.articleSectionReached.includes(id)) {
            window.ga && window.ga(
              'send',
              'event',
              'projects',
              'scroll',
              `scroll to ${id}`,
              { nonInteraction: false }
            )
            this.articleSectionReached.push(id)
          }
        })
      }, options)

      const targets = document.querySelectorAll('.ga-scroll-event')
      targets.forEach(target => { observer.observe(target) })
    }
  }
}