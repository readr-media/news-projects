<template>
  <div class="scatter-ordinal-corp-donates-x-axis">
    <div class="scatter-ordinal-corp-donates-x-axis__party scatter-ordinal-corp-donates-x-axis__party--kmt">
      中國國民黨
    </div>
    <div class="scatter-ordinal-corp-donates-x-axis__axis-line axis-line">
      <div class="axis-line__arrow axis-line__arrow--left"></div>
      <div class="axis-line__title">政黨意向</div>
      <div class="axis-line__arrow axis-line__arrow--right"></div>
    </div>
    <div class="scatter-ordinal-corp-donates-x-axis__party scatter-ordinal-corp-donates-x-axis__party--dpp">
      民主進步黨
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.scatter-ordinal-corp-donates-x-axis
  width calc(100% - 150px)
  display flex
  justify-content space-between
  align-items center
  &__party
    width 200px
    height 50px
    padding 20px 25px
    display flex
    justify-content center
    align-items center
    color white
    font-size 30px
    border-radius 50px
    &--kmt
      background-color #0071bc
    &--dpp
      background-color #53a66f
  &__axis-line
    flex 1 1 auto
    height 50px
    margin 0 20px

.axis-line
  display flex
  justify-content center
  align-items center
  &__title
    font-size 30px
    margin 0 10px
  &__arrow
    flex 1 1 auto
    height 50px
    background-color #d3d3d3
    clip-path polygon(15% 38%, 15% 47%, 100% 47%, 100% 52%, 15% 52%, 15% 60%, 0 50%)
    &--right
      transform rotate(180deg)
</style>

