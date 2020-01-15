<template>
  <div
    :class="[
      'legends',
      `legends--${legendsType}`
    ]"
  >
    <template v-if="legendsType === 'normal'">
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
        :squareColor="'orange'"
        :text="'親民黨'"
      />
    </template>
    <template v-else-if="legendsType === 'other'">
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
      </div>
      <div class="legends__bottom">
        <Legend
          class="legends__legend"
          :squareColor="'purple'"
          :text="'達 5% 之其他政黨'"
        />
        <Legend
          class="legends__legend"
          :squareColor="'gray'"
          :text="'未達 5% 之其他政黨'"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Legend from '../Legend.vue'

export default {
  props: {
    legendsType: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'normal',
          'other'
        ].includes(value)
      }
    }
  },
  components: {
    Legend
  }
}
</script>

<style lang="stylus" scoped>
.legends
  display flex
  padding 10px 0
  margin-left 10px
  margin-right 10px
  border-top solid 2px rgba(0, 0, 0, 0.1)
  justify-content space-between
  &__top, &__bottom
    display flex
  &__bottom
    margin 10px 0 0 0
  &--other
    flex-direction column
    .legends__legend + .legends__legend
      margin 0 0 0 20px

@media (min-width 768px)
  .legends
    flex-direction row
    justify-content flex-end
    margin-left 0
    margin-right 0
    &__bottom
      margin 0 0 0 40px
    &--other
      .legends__legend + .legends__legend
        margin 0 0 0 40px
    &__legend
      & + &
        margin 0 0 0 40px
</style>
