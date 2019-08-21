export default {
  data() {
    return {
      hadIntersected: []
    }
  },
  mounted() {
    this.createScrollEventHandler()
  },
  methods: {
    createScrollEventHandler () {
      require('intersection-observer')

      const options = {
        root: document.querySelector('#hk-timeline-horizontal-scroll-wrapper'),
        rootMargin: '0px',
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

          const subTitle = entry.target.dataset.h2
          if (entry.isIntersecting && !this.hadIntersected.includes(subTitle)) {
            window.ga && window.ga(
              'send',
              'event',
              'projects',
              'scroll',
              subTitle,
              { nonInteraction: false }
            )
            this.hadIntersected.push(subTitle)
          }
        })
      }, options)

      const targets = document.querySelectorAll('.hk-timeline-list-item')
      targets.forEach(target => { observer.observe(target) })
    }
  }
}