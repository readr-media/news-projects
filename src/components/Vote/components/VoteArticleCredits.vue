<template>
  <div class="credits-wrapper">
    <img class="credits-wrapper__mm-logo" src="/proj-assets/logo_mm_white.png" alt="" @click="clickMM">
    <div class="credits-wrapper__credits credits">
      <div class="credits__row">
        <p class="credits__item">文字：李又如</p>
        <p class="credits__item">網頁：熊凱文</p>
      </div>
      <div class="credits__row credits__row--mobile-should-break">
        <p class="credits__item">設計：陳怡蒨</p>
        <p class="credits__item">資料整理：READr 團隊</p>
      </div>
      <div class="credits__row">
        <p class="credits__item">2018/11/22</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickMM () {
      window.open('https://mirrormedia.mg')
    }
  }
}
</script>


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

@media (max-width 768px)
  .credits-wrapper
    &__mm-logo
      d = 30px
      width d
      height d

  .credits
    &__row
      margin 3px 0
      &--mobile-should-break
        display flex
        flex-direction column
        line-height 1.7
        & > .credits__item:nth-child(2)
          margin 0 !important
    &__item
      font-size 14px    
</style>

