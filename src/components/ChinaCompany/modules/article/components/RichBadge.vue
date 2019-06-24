<template>
  <div class="rich-badge">
    <img
      class="rich-badge__star rich-badge__star--left"
      v-lazy="'/proj-assets/china-company/star.svg'"
      alt=""
    >
    <img
      class="rich-badge__rich"
      v-lazy="'/proj-assets/china-company/rich.svg'"
      alt=""
    >
    <img
      class="rich-badge__star rich-badge__star--right"
      v-lazy="'/proj-assets/china-company/star.svg'"
      alt=""
    >
  </div>
</template>

<style lang="stylus" scoped>
.rich-badge
  height 85px
  background-color #000537
  display flex
  justify-content center
  align-items center
  color white
  &__star
    height 50px
    &--left
      transform scaleX(-1)
      margin 0 85px 0 0
    &--right
      margin 0 0 0 85px
  &__rich
    height 50px

@media (max-width 1400px)
  .rich-badge
    height auto
    padding 10px 0
    &__star
      height 33px
      &--left
        transform scaleX(-1)
        margin 0 10px 0 0
      &--right
        margin 0 0 0 10px
    &__rich
      height 43px
</style>
