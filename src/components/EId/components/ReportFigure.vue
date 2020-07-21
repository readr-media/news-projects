<template>
  <figure class="report-figure">
    <picture>
      <source media="(min-width: 576px)" :srcset="`/proj-assets/eid/${src}-desk.jpg`" >
      <img :src="`/proj-assets/eid/${src}-mob.jpg`" loading="lazy" alt="" >
    </picture>
    <figcaption v-if="caption" v-html="caption" />
  </figure>
</template>

<script>
export default {
  name: 'ReportFigure',
  props: ['src', 'caption']
}
</script>

<style lang="stylus">
@import '../variables.styl'

.report-figure
  picture
    border-radius 4px
    overflow hidden
  img
    width 100%
    height auto
  figcaption
    font-size 13px
    line-height 1.5
    text-align justify
    letter-spacing 2.5px
    color rgba(#000, 0.66)
</style>
