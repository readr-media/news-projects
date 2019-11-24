<template>
  <picture class="report-picture">
    <source type="image/webp" media="(min-width: 460px)" :srcset="`${imgSrc}-desktop.webp`">
    <source type="image/png" media="(min-width: 460px)" :srcset="`${imgSrc}-desktop.png`">
    <source type="image/webp" :srcset="`${imgSrc}-mobile.webp`">
    <img :src="`${imgSrc}-mobile.png`" alt="" loading="lazy">
  </picture>
</template>

<script>
export default {
  name: 'ReportPicture',
  props: [ 'imgSrc' ]
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.report-picture
  display block
  margin 30px -20px
  @media (min-width 640px)
    margin-left 0
    margin-right 0
  @media (min-width $mobile)
    margin-top 40px
    margin-bottom 40px
  & img
    display block
</style>
