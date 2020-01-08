<template>
  <div class="group">
    <div class="group__title title">
      <p
        class="title__text"
        v-text="data.title"
      />
    </div>
    <div class="group__bars bars">
      <div
        class="bars__bar bar"
        v-for="(bar, i) in data.bars"
        :key="i"
        :style="{
          width: `${bar.value * 100}%`,
          backgroundColor: bar.color
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      validator(data) {
        const bars = data.bars
        const isBarsValid = bars.reduce((acc, curr) => {
          const isValueValid = 'value' in curr && (curr.value >= 0 && curr.value <= 1)
          const isColorValid = 'color' in curr && typeof curr.color === 'string'
          return acc && isValueValid && isColorValid
        }, true)
        return isBarsValid
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.group
  display flex
  padding 8px 0
  &:hover
    background-color rgba(216, 216, 216, 0.3)

.title
  min-width calc(73px + 20.22px / 2) // 19.17
  max-width calc(73px + 20.22px / 2)
  display flex
  justify-content center
  align-items center
  &__text
    margin 0
    font-size 15px
    color $color-black-light

.bars
  flex 1 1 auto
  padding-right calc(10px + 35.41px / 2) // 33.19
  &__bar
    & + &
      margin 2px 0 0 0

.bar
  height 10px

@media (min-width 768px)
  .title
    min-width calc(145px + 19.17px / 2)
    max-width calc(145px + 19.17px / 2)
    &__text
      font-size 16px

  .bars
    padding-right calc(40px + 33.19px / 2)
</style>
