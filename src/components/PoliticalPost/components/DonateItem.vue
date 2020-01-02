<template>
  <div class="donate-item">
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

<script>
export default {
  name: 'DonateItem'
  // methods: {
  //   sendGa () {
  //     window.ga('send', 'event', 'projects', 'click', '贊助按鈕-文末')
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.donate-item
  display flex
  flex-direction column
  align-items center
  width 100%
  max-width 800px
  color #4a4a4a
  padding 38px 0
  font-size 14px
  p
    margin 0
    color #4a4a4a
  a
    margin 13px 0 0 0
    display flex
    justify-content center
    align-items center
    color white
    background-color #30477d
    text-decoration none
    width 400px
    height 40px
    padding 12px 0
    border-radius 4px
    transition background-color .25s ease-out
    &:hover
      background-color #000135

@media (max-width 719.98px)
  .donate-item
    width 280px
    p
      text-align center
      line-height 1.71
    a
      margin 8px
      // width 270px
      width 280px
      height 44px
</style>