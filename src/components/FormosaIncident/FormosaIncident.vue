<template>
  <div class="formosa-incident">
    <FixedSlides />
    <ScrollTimeline v-if="isMobW" />
    <FixedTimeline v-if="isDeskW" />
  </div>
</template>

<script>
import FixedSlides from './components/FixedSlides.vue'
// import FixedTimeline from './components/FixedTimeline.vue'
// import ScrollTimeline from './components/ScrollTimeline.vue'

export default {
  name: 'FormosaIncident',
  components: {
    FixedSlides,
    ScrollTimeline: () => import('./components/ScrollTimeline.vue'),
    FixedTimeline: () => import('./components/FixedTimeline.vue')
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
  data () {
    return {
      isMounted: false
    }
  },
  mounted () {
    this.isMounted = true
    // TweenLite.defaultEase = Power0.easeNone
    TweenLite.defaultEase = Power2.easeInOut
    // TweenLite.defaultOverwrite = false
  },
  computed: {
    ww () {
      return this.$store.state.viewport[ 0 ]
    },
    isMobW () {
      return this.isMounted && this.ww <= 719.98
    },
    isDeskW () {
      return this.isMounted && this.ww >= 720
    }
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'

html
  font-size 10px
.formosa-incident
  overflow hidden
picture, img
  display block
</style>
