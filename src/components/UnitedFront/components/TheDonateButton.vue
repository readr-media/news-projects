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
  color #7d7d7d
  padding 20px 0
  font-size 14px
  p
    margin 0
  a
    margin 10px 0 0 0
    display flex
    justify-content center
    align-items center
    color black
    background-color yellow
    text-decoration none
    padding 12px 100px
    border-radius 4px
    transition filter .25s ease-out
    &:hover
      filter brightness(110%)
</style>