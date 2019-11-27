<template>
  <nav class="nav">
    <div class="nav__prev-wrapper" />
    <p class="nav__title">
      索引坐在這裡索引坐在這裡索引坐在這裡索引坐在這裡索引坐在這裡索引坐在這裡
    </p>
    <div class="nav__next-wrapper" />
  </nav>
</template>

<style lang="stylus" scoped>
.nav
  height 40px
  display flex
  justify-content space-between
  align-items center
  background-color #d8d8d8
  padding 0 16px
  &__prev-wrapper
    min-width 20px
    display flex
    justify-content center
    align-items center
    &:after
      display inline-block
      content ''
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 12px 10px 0;
      border-color: transparent #d02525 transparent transparent;
  &__title
    margin 0 10px
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  &__next-wrapper
    min-width 20px
    display flex
    justify-content center
    align-items center
    &:after
      display inline-block
      content ''
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 12px;
      border-color: transparent transparent transparent #d02525;

</style>
