<template>
  <div class="bar-horizontal-stacked-ordinal-donates-from-legend">
    <div
      v-for="legend in legends"
      :key="legend.text"
      class="bar-horizontal-stacked-ordinal-donates-from-legend__category"
    >
      <img
        v-if="legend.type === 'image'"
        class="bar-horizontal-stacked-ordinal-donates-from-legend__icon"
        :src="legend.imgsrc"
        alt=""
      >
      <div
        v-else-if="legend.type === 'crony'"
        class="bar-horizontal-stacked-ordinal-donates-from-legend__icon bar-horizontal-stacked-ordinal-donates-from-legend__icon--crony"
      >
        <div class="crony-checked"></div>
      </div>
      <div
        v-else
        :class="`bar-horizontal-stacked-ordinal-donates-from-legend__icon bar-horizontal-stacked-ordinal-donates-from-legend__icon--${legend.type}`"
        :style="{ backgroundColor: legend.color }"
      >
      </div>
      <p class="bar-horizontal-stacked-ordinal-donates-from-legend__text" v-text="legend.text"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    legends: {
      type: Array,
      default () {
        return []
      },
    }
  }
}
</script>

<style lang="stylus" scoped>
.bar-horizontal-stacked-ordinal-donates-from-legend
  display flex
  justify-content center
  align-items center
  width 100%
  &__category
    display flex
    align-items center
    & + &
      margin 0 0 0 20px
  &__icon
    width 20px
    height 20px
    // position relative
    // bottom 1px
    margin 0 0 1px 0
    &--round-icon
      border-radius 20px
    &--crony
      border-radius 20px
      border 1px solid #9e005d
  &__text
    font-size 18px
    margin 0 0 0 3px

.crony-checked
  width 10px
  height 10px
  background-color #9e005d
  transform rotate(45deg)
  clip-path polygon(85% 0, 100% 0, 100% 100%, 43% 100%, 43% 85%, 85% 85%)
  // position relative
  // top 1px
  // right 1px
  margin 1px 1px 0 0
</style>

