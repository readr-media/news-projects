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
  width 800px
  background-color rgba(216, 216, 216, 0.15)
  color #4a4a4a
  padding 20px 0
  font-size 14px
  p
    margin 0
    color #7d7d7d
  a
    margin 13px 0 0 0
    display flex
    justify-content center
    align-items center
    color black
    background-color #ddcf21
    text-decoration none
    width 400px
    height 40px
    padding 12px 0
    border-radius 4px
    transition background-color .25s ease-out
    &:hover
      background-color #fff46c

@media (max-width 768px)
  .wrapper
    width 100%
    padding 21px 15px 23px 15px
    p
      text-align center
      line-height 1.71
    a
      margin 8px
      width 270px
      height 44px
</style>