<template>
  <div class="legends">
    <div class="legends__legend">
      <div class="legends__legend-icon legends__legend-icon--driver"></div>
      <p class="legends__text">司機</p>
    </div>
    <div class="legends__legend">
      <div class="legends__legend-icon legends__legend-icon--checker"></div>
      <p class="legends__text">檢查員</p>
    </div>
    <div class="legends__legend">
      <div class="legends__legend-icon legends__legend-icon--scheduler"></div>
      <p class="legends__text">調度員</p>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.legends
  display flex
  justify-content center
  padding 10px 0
  background-color #e6e6e6
  &__legend
    display flex
    align-items center
    & + &
      margin 0 0 0 20px
  &__legend-icon
    d = 10px
    width d
    height d
    border-radius 100%
    margin 0 5px 0 0
    &--driver
      background-color #466ba0
    &--checker
      background-color #a55d5d
    &--scheduler
      background-color #89b287
</style>

