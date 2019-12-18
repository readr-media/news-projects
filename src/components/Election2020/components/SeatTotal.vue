<template>
  <p class="seat-total">
    共計
    <Counter
      class="seat-total__count"
      :count="count"
    />
    席
  </p>
</template>

<script>
import Counter from './Counter.vue'

export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  components: {
    Counter
  }
}
</script>

<style lang="stylus" scoped>
.seat-total
  font-size 16px
  color $color-black-light
  &__count
    font-family $font-family-serif
    font-size 30px
</style>