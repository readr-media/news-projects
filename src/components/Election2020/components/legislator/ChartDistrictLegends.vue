<template>
  <div class="legends">
    <div class="legends__top">
      <Legend
        class="legends__legend"
        :squareColor="'green'"
        :text="'民進黨'"
      />
      <Legend
        class="legends__legend"
        :squareColor="'blue'"
        :text="'國民黨'"
      />
      <Legend
        class="legends__legend"
        :squareColor="'purple'"
        :text="'其他政黨'"
      />
    </div>
    <div class="legends__bottom">
      <Legend
        class="legends__legend"
        :squareColor="'gray'"
        :text="'無黨籍'"
      />
      <Legend
        class="legends__legend"
        :squareColor="'white'"
        :showSquareBorder="true"
        :text="'確定當選'"
      />
    </div>
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
  flex-direction column
  padding 10px 0
  margin-left 10px
  margin-right 10px
  border-top solid 2px rgba(0, 0, 0, 0.1)
  &__top, &__bottom
    display flex
    justify-content space-between
  &__bottom
    margin 10px 0 0 0

@media (min-width 768px)
  .legends
    flex-direction row
    justify-content flex-end
    margin-left 0
    margin-right 0
    &__bottom
      margin 0 0 0 40px
    &__legend
      & + &
        margin 0 0 0 40px
</style>
