<template>
  <figure :class="['article-chart', `${chart.id.includes('story') ? 'article-chart__story' : ''}`]" >
    <img :src="`/proj-assets/img/chart/${chart.id}.png`" alt="">
    <figcaption v-html="chart.caption"></figcaption>
  </figure>
</template>

<script>
export default {
  name: 'BaseChart',
  props: ['chart']
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.article-chart
  margin 25px -15px
  color #fff
  font-size 1.2rem
  line-height 1.8
  font-weight 300
  &__story
    margin-left -25px
    margin-right -25px
  @media (min-width $tab-breakpoint)
    margin 40px 0
    font-size 1.8rem
  & img
    display block
    width 100%
    height auto
  & figcaption
    background-color #4d4d4d
    // padding 10px 25px 25px
    padding 15px 25px
    @media (min-width $tab-breakpoint)
      padding 25px 35px
  & a
    color #fcee21
</style>