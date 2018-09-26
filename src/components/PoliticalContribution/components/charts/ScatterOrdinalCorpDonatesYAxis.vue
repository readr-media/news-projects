<template>
  <div class="scatter-ordinal-corp-donates-y-axis" :style="{ height: `${defaultHeight}px` }">
    <div
      v-for="(value, i) in tickValues"
      :key="value"
      class="scatter-ordinal-corp-donates-y-axis__value"
      :style="{ top: `${i * tickHeight}px` }"
      v-text="value"
    >
    </div>
    <div class="scatter-ordinal-corp-donates-y-axis__bottom-hint">金額（萬元）</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultHeight: 800,
      tickValues: [
        '6,000',
        '5,000',
        '4,000',
        '3,000',
        '2,000',
        '1,000',
      ]
    }
  }, 
  computed: {
    tickHeight () {
      return this.defaultHeight / this.tickValues.length - 5
    }
  }, 
}
</script>

<style lang="stylus" scoped>
.scatter-ordinal-corp-donates-y-axis
  width 100px
  border-right 2px solid black
  &__value
    position absolute
    font-size 30px
    right 20px
  &__bottom-hint
    font-size 15px
    position absolute
    left 0
    bottom 0
</style>

