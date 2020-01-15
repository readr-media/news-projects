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
        root: document.querySelector('#china-company'),
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
          const h2 = entry.target.querySelector('h2')
          const anchorTitle = h2.dataset.anchorTitle
          if (entry.isIntersecting && !this.articleSectionReached.includes(anchorTitle)) {
            window.ga && window.ga(
              'send',
              'event',
              'projects',
              'scroll',
              `scroll to ${anchorTitle}`,
              { nonInteraction: false }
            )
            this.articleSectionReached.push(anchorTitle)
          }
        })
      }, options)

      const targets = document.querySelectorAll('.article-subsection')
      targets.forEach(target => { observer.observe(target) })
    }
  }
}