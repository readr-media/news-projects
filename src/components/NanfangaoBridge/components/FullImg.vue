<template>
  <!-- <figure class="full-img">
    <img loading="lazy" :src="src" alt="">
  </figure> -->
  <picture class="full-img">
    <!-- <source media="(min-width: 460px) and (max-width: 719.98px)" :srcset="`${src}-tablet-small.jpg`">
    <source media="(min-width: 720px) and (max-width: 999.98px)" :srcset="`${src}-tablet-large.jpg`">
    <source media="(min-width: 1000px) and (max-width: 1599.98px)" :srcset="`${src}-desktop-small.jpg`"> -->
    <source media="(min-width: 992px)" :srcset="`${prefixSrc}-desktop-large.jpg`">
    <img loading="lazy" :src="`${prefixSrc}-desktop-small.jpg`" alt="">
  </picture>
</template>

<script>
export default {
  name: 'FullImg',
  props: [ 'prefixSrc' ]
}
</script>

<style lang="stylus">
.full-img
  display block
  margin 30px auto
  max-width 1440px
  & img
    width 100%
    vertical-align middle
</style>