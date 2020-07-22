<template>
  <div class="donate-block">
    <div class="donate-block__intro">這篇報導讓你長知識了嗎？喜歡的話可以給我們更多鼓勵</div>
    <div class="donate-block__by">by 記者劉子維</div>
    <a
      class="normal"
      href="https://www.readr.tw/donate"
      target="_blank"
      @click="$emit('sendGa')"
    >
      按下贊助鈕，當更多優質報導的金主
    </a>
  </div>
</template>

<script>
export default {
  name: 'DonateBlock'
}
</script>

<style lang="stylus">
@import '../variables.styl'

.donate-block
  background-color rgba(234, 231, 224, 0.5)
  border-radius 4px
  padding 32px 20px
  letter-spacing 2.5px
  position relative
  z-index 1
  @media (min-width $breakpoint-md)
    padding-left 60px
    padding-right 60px
  &__intro
    color #5f6c11
    font-size 18px
    line-height 1.8
    margin-bottom 14px
    font-weight 700
    text-align center
    @media (min-width $breakpoint-md)
      font-size 22px
      margin-bottom 18px
      letter-spacing 0.15em
  &__by
    font-size 15px
    line-height 2
    color rgba(#000, 0.87)
    margin-bottom 14px
    text-align right
    @media (min-width $breakpoint-md)
      text-align center
      font-size 18px
      margin-bottom 18px
  .normal
    margin-left auto
    margin-right auto
    @media (min-width $breakpoint-md)
      max-width 60%
</style>
