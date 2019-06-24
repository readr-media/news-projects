<template>
  <div class="chart">
    <h1 v-text="title" />
    <div class="chart__chart-wrapper">
      <slot />
    </div>
    <div
      v-if="subtitle !== ''"
      class="hint-wrapper"
    >
      <p v-text="subtitle" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.chart
  background-color white
  padding 16px
  h1
    margin 0
    font-size 28px
    text-align center
    line-height 1.5
  &__chart-wrapper
    margin 16px 0 0 0

.hint-wrapper
  margin 16px 0 0 0
  display flex
  justify-content flex-end
  p
    font-size 16px
    margin 0
    max-width 60%
    // text-align right
    line-height 1.5

@media (max-width 1400px)
  .chart
    padding 16px 5px
    width 100vw
    position relative
    left calc((100vw - 100%) / 2 * -1)
    h1
      font-size 18px

  .hint-wrapper
    p
      font-size 12px
</style>
