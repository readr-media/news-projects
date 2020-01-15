<template>
  <picture class="full-img">
    <source media="(min-width: 992px)" :srcset="`${prefixSrc}-desktop-large.jpg`">
    <img class="lazyer" loading="lazy" :data-src="`${prefixSrc}-desktop-small.jpg`" src="" alt="">
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