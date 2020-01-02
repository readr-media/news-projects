<template>
  <div class="donate-item">
    <p>覺得這篇報導不錯嗎？歡迎用新台幣支持 READr，讓更多深度報導浮上檯面。</p>
    <a href="https://www.readr.tw/donate" target="_blank">用新台幣跟 READr 一起幹大事</a>
  </div>
</template>

<script>
export default {
  name: 'DonateItem'
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.donate-item
  display flex
  flex-direction column
  align-items center
  width 100%
  color rgba(0, 0, 0, 0.87)
  padding 80px 15px
  font-size 1.4rem
  @media (min-width $breakpoint.md)
    padding 42px 0 60px 0
  @media (min-width $breakpoint.xl)
    padding-top 84px
    padding-bottom 120px
  & p
    text-align center
    line-height 1.57
    padding-right 15px
    padding-left 15px
  & a
    width 100%
    height 44px
    margin-top 20px
    display flex
    justify-content center
    align-items center
    line-height normal
    color rgba(0, 0, 0, 0.87)
    background-color #f0ff57
    text-decoration none
    transition background-color .25s ease-out
    max-width 414px
    &:active
      background-color #838b30
      transition none
    // &:hover
    //   background-color #fff46c
</style>