<template>
  <section class="credits">
    <p>工程：凱文、學勇、Yen</p>
    <p>設計：Weiwei Hsu</p>
    <p>文字：李又如、劉子維、陳珮瑜</p>
  </section>
</template>

<style lang="stylus" scoped>
.credits
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 70px 15px
  background-color white
  p
    font-size 15px
    color $color-black-lighter
    margin 0
  p + p
    margin 10px 0 0 0

@media (min-width 768px)
  .credits
    height 258px
    padding 0
    flex-direction row
    p + p
      margin 0 0 0 10px
</style>