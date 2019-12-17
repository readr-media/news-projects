<template>
  <div class="formosa-incident">
    <FixedSlides />
  </div>
</template>

<script>
import FixedSlides from './components/FixedSlides.vue'

export default {
  name: 'FormosaIncident',
  components: {
    FixedSlides
  },
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'formosaincident',
      metaImage: '',
      customScript: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenLite.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/CSSPlugin.min.js"><\/script><script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js"><\/script>'
    }
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'

html
  font-size 10px
picture, img
  display block
</style>
