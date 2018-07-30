<template>
  <section class="section-landing">
    <SectionLandingTitles/>
  </section>
</template>

<script>
import SectionLandingTitles from './sectionLanding/SectionLandingTitles.vue'

export default {
  components: {
    SectionLandingTitles,
  },
}
</script>

<style lang="stylus" scoped>
.section-landing
  width 100vw
  height 100vh
  position relative
</style>

