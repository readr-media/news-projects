<template>
  <div class="credits-wrapper">
    <img class="credits-wrapper__mm-logo" src="/proj-assets/logo_mm_white.png" alt="">
    <div class="credits-wrapper__credits credits">
      <div class="credits__row">
        <p class="credits__item">文字：李又如</p>
        <p class="credits__item">網頁：熊凱文</p>
      </div>
      <div class="credits__row">
        <p class="credits__item">設計：陳怡蒨</p>
        <p class="credits__item">資料整理：鏡傳媒程式設計中心</p>
      </div>
      <div class="credits__row">
        <p class="credits__item">2018/11/21</p>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.credits-wrapper
  display flex
  flex-direction column
  align-items center
  &__mm-logo
    d = 48px
    width d
    height d
    cursor pointer
  &__credits
    margin 10px 0 0 0

.credits
  text-align center
  &__row
    margin 5px 0
  &__item
    display inline-block
    font-size 18px
    & + &
      margin 0 0 0 10px
</style>

