<template>
  <div class="legends">
    <Legend
      class="legends__legend"
      :squareColor="'gray'"
      :text="'未達 5% 之政黨'"
    />
  </div>
</template>

<script>
import Legend from '../Legend.vue'

export default {
  components: {
    Legend
  }
}
</script>

<style lang="stylus" scoped>
.legends
  display flex
  justify-content center
  align-items center
</style>