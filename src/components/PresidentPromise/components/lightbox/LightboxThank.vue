<template>
  <div class="thank">
    <div class="container">
      <img class="thank__icon" src="/proj-assets/president-promise/icon/icon_send.png" alt="">
      <h1 class="thank__title">謝謝</h1>
      <p class="thank__description">我們已收到您的回饋</p>
    </div>
    <p class="thank__close-hint">本頁將於 <span>{{ remainingTimeBackToForm }} 秒後</span>自動跳轉，亦可點擊右上角關閉。</p>
  </div>
</template>

<script>
export default {
  props: {
    remainingTimeBackToForm: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="stylus" scoped>
.thank
  height 100%
  min-height 551px
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  padding 80px 72px
  position absolute
  top 0
  left 0
  &__icon
    side = 140px
    width side
    height side
  &__title
    font-size 80px
    color transparent
    -webkit-text-stroke 2px white
    margin 38px 0 28px 0
  &__description
    font-size 32px
    font-weight 900
    line-height 1
    text-align center
    color #ffffff
    margin 0
  &__close-hint
    font-size 18px
    line-height 1.44
    text-align justify
    color #c9c9c9
    margin 0
    span
      color #fa8d62
.container
  display flex
  flex-direction column
  justify-content center
  align-items center

@media (max-width 425px)
  .thank
    min-height 0
    padding 5vh 20px
    &__icon
      side = 104px
      width side
      height side
    &__title
      font-size 40px
      -webkit-text-stroke 1px white
      margin 24px 0 21px 0
    &__description
      font-size 22px
      line-height 1.45
</style>


