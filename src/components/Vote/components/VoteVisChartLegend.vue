<template>
  <div class="legend">
    <div class="legend__item item">
      <div class="item__icon item__icon--blue"></div>
      <p class="item__text">議員當選次數</p>
    </div>
    <div class="legend__item item">
      <div class="item__icon item__icon--yellow"></div>
      <p class="item__text">直系親屬議員當選次數</p>
    </div>
    <div class="legend__item item">
      <div class="item__icon item__icon--orange"></div>
      <p class="item__text">旁系親屬議員當選次數</p>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.legend
  display flex
  justify-content center
  align-items center
  &__item
    & + &
      margin 0 0 0 25px

.item
  display flex
  align-items center
  &__icon
    d = 20px
    width d
    height d
    border-radius d
    &--blue
      background-color #1aa6de
    &--yellow
      background-color #fda134
    &--orange
      background-color #ef5233
  &__text
    margin 0 0 0 10px
</style>

