<template>
  <figure class="full-img">
    <img loading="lazy" :src="src" alt="">
  </figure>
</template>

<script>
export default {
  name: 'FullImg',
  props: [ 'src' ]
}
</script>

<style lang="stylus">
.full-img
  margin 30px auto
  max-width 1440px
  & img
    width 100%
    vertical-align middle
</style>