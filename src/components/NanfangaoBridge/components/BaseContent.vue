<template>
  <section class="base-content">
    <slot></slot>
  </section>
</template>

<script>

export default {
  name: 'BaseContent'
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.base-content
  color #333
  font-size 1.6rem
  line-height 1.88
  // padding-top 10px
  padding-right 15px
  padding-left 15px
  max-width 650px
  margin-right auto
  margin-left auto
  @media (min-width 680px)
    padding-left 0
    padding-right 0
  &__date
    font-weight 700
    line-height 1.5
    font-family $font-serif
    @media (min-width $desktop-breakpoint)
      margin-bottom 60px
  & h2
    font-size 2.6rem
    font-weight 700
    font-family $font-serif
    line-height normal
    margin-top 60px
    margin-bottom 30px
  & p + p
    margin-top 30px
</style>