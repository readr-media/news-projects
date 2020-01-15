export default {
  beforeMount () {
    require('intersection-observer')
    window.scrollama = require('scrollama')
  }
}