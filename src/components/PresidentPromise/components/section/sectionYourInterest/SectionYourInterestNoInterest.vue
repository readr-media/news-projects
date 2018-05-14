<template>
  <div class="no-interest">
    <h1 class="no-interest__icon">!</h1>
    <p class="no-interest__hint">目前<span class="no-interest__hint--orange">沒有</span>感興趣的政策，你可以<span class="no-interest__hint--orange">再來十題</span>，或直接<span class="no-interest__hint--orange">查看總表</span>，看看大家感興趣的政策。</p>
  </div>
</template>

<style lang="stylus" scoped>
.no-interest
  display flex
  flex-direction column
  align-items center
  max-width 481px
  margin 0 0 51px 0
  &__icon
    // height 82px
    font-size 100px
    color transparent
    -webkit-text-stroke 2px white
    margin 0
  &__hint
    font-size 24px
    line-height 1.42
    text-align justify
    color #ffffff
    &--orange
      color #fa8d62

@media (max-width 425px)
  .no-interest
    flex-direction row
    align-items flex-start
    max-width 100%
    margin 0 0 46px 0
    &__icon
      font-size 50px
      margin 0 25px 0 0
    &__hint
      font-size 22px
      line-height 1.36
      margin 0
</style>

