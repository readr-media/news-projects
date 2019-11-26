<template>
  <div class="read-more-wrapper">
    <p>往下滑繼續閱讀</p>
    <div class="read-more-wrapper__arrow-down-icon arrow-down-icon" />
  </div>
</template>

<style lang="stylus" scoped>
.read-more-wrapper
  width 100%
  display flex
  flex-direction column
  align-items center
  cursor pointer
  p
    margin 0
    font-size 16px
    color white
  &__arrow-down-icon
    margin 10px 0 0 0

.arrow-down-icon
  d = 30px
  width d
  height d
  border 1px solid white
  border-radius 100%
  display flex
  justify-content center
  align-items center
  &:after
    content ''
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 9px 0 9px;
    border-color: white transparent transparent transparent;
    position relative
    top 1px
</style>