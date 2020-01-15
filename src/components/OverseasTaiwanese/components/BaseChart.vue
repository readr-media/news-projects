<template>
  <figure :class="['article-chart', `${chart.id.includes('story') ? 'article-chart--story' : ''}`]" >
    <div :class="[chart.isLazy ? 'lazyer' : '', 'article-chart__wrapper']"
         :style="{ paddingTop: `${chart.aspectRatio * 100}%` }"
    >
      <img :src="chart.isLazy ? '' : path" alt=""
           :data-src="chart.isLazy ? path : ''"
      >
    </div>
    <figcaption v-html="chart.caption"></figcaption>
  </figure>
</template>

<script>
export default {
  name: 'BaseChart',
  props: ['chart'],
  computed: {
    path () {
      return `/proj-assets/overseastaiwanese/img/chart/${this.chart.id}.png`
    }
  },
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
  &--story
    margin-left -25px
    margin-right -25px
  &__wrapper
    position relative
    height 0
    background-color #4d4d4d
    &.lazyer
      animation glint 1.2s ease-out infinite alternate
      @keyframes glint
        0%
          opacity 1
        100%
          opacity 0.8
  @media (min-width $tab-breakpoint)
    margin 40px 0
    font-size 1.8rem
  & img
    position absolute
    top 0
    left 0
    max-width 100%
  & figcaption
    padding 15px 25px
    background-color #4d4d4d
    @media (min-width $tab-breakpoint)
      padding 25px 35px
  & a
    color #fcee21
</style>