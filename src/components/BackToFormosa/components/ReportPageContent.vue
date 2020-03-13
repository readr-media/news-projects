<template>
  <div class="report-page-content">
    <picture class="report-page-content__picture">
      <img :src="`/proj-assets/backtoformosa/img/${src}report-${content.name}.jpg`" alt="">
    </picture>
    <div class="report-page-content__qa">
      <div v-html="content.qa" />
      <picture :class="`${content.name}`">
        <img :src="`/proj-assets/backtoformosa/img/sign-${content.name}.png`" alt="">
      </picture>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportPage',
  props: {
    content: {
      type: Object,
      required: true
    },
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.report-page-content
  & + &
    margin-top 64px
    @media (min-width $breakpoint-md)
      margin-top 80px
  &__picture
    margin-bottom 20px
    & img
      width 100%
      height auto
  &__qa
    font-size 1.6rem
    line-height 1.75
    @media (min-width $breakpoint-md)
      display flex
      align-items flex-start
    & picture
      flex 0 0 auto
    & img
      width 100%
      height auto
      vertical-align middle
    & p + p
      margin-top 28px
</style>
