<template>
  <div class="formosa-incident">
    <FixedSlides />
    <!-- <div class="test" id="test"></div> -->
    <!-- <FixedTimeline /> -->
  </div>
</template>

<script>
import FixedSlides from './components/FixedSlides.vue'
import FixedTimeline from './components/FixedTimeline.vue'

export default {
  name: 'FormosaIncident',
  components: {
    FixedSlides,
    FixedTimeline
  },
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'formosaincident',
      metaImage: '',
      // todo remove min
      customScript: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenLite.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineLite.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/CSSPlugin.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/easing/EasePack.min.js"><\/script><script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.js"><\/script>'
      // customScript: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"><\/script><script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.js"><\/script>'
    }
  },
  mounted () {
    // TweenLite.defaultEase = Power0.easeNone
    TweenLite.defaultEase = Power2.easeInOut
    // TweenLite.defaultOverwrite = false
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'

html
  font-size 10px
// body
//   background-color #000
//   // background-image radial-gradient(circle at 50% 50%, #7a6a56, #000000 271%)
picture, img
  display block
// .test
//   width 100%
//   height 100vh
//   background-color green
</style>
