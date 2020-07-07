<template>
  <div class="wrapper">
    <p>
      覺得這篇報導不錯嗎？歡迎用新台幣支持 READr，讓更多深度報導浮上檯面。
    </p>
    <a
      href="https://www.readr.tw/donate"
      target="_blank"
    >
      用新台幣跟 READr 一起幹大事
    </a>
  </div>
</template>

<style lang="stylus" scoped>
.wrapper
  display flex
  flex-direction column
  align-items center
  background-color rgba(216, 216, 216, 0.25)
  border-left 15px solid white
  border-right 15px solid white
  padding 23px 15px
  p
    font-size 13px
    margin 0
    width 90%
    max-width 260px
    line-height 1.85
    color $color-black-lighter
  a
    font-size 15px
    margin 13px 0 0 0
    display flex
    justify-content center
    align-items center
    color white
    background-color #ff8261
    text-decoration none
    width 100%
    max-width 270px
    height 44px
    padding 12px 0
    border-radius 4px
    transition filter .25s ease-out

@media (min-width 768px)
  .wrapper
    border-left none
    border-right none
    /*height 260px*/
    justify-content center
    padding 23px 15px
    p
      font-size 16px
      width auto
      max-width none
    a
      font-size 16px
      /*margin 33px 0 0 0*/
      width 400px
      max-width none
</style>
