<template>
  <div class="report-page-content">
    <picture class="report-page-content__picture" ref="reportPicture">
      <img :src="`/proj-assets/backtoformosa/img/${src}report-${content.name}.jpg`" alt="">
    </picture>
    <div class="report-page-content__qa" ref="reportQa">
      <div v-html="content.qa" />
      <picture :class="`${content.name}`" ref="reportSign">
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
    animation report-pictrue 0.6s $easeOutSine both paused
    & img
      width 100%
      height auto
  &__qa
    font-size 1.6rem
    line-height 1.75
    animation fade-in-top 0.6s 0.6s $easeOutSine both paused
    @media (min-width $breakpoint-md)
      display flex
      align-items flex-start
    & picture
      flex 0 0 auto
      // 0.6 + 0.6
      animation fade-in-top 0.6s 1.2s $easeOutSine both paused
    & img
      width 100%
      height auto
      vertical-align middle
    & p + p
      margin-top 28px

@keyframes report-pictrue
  0%
    opacity 0
    transform translateY(40px)
  100%
    opacity 1
    transform translateY(0px)
</style>
