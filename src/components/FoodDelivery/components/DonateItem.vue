<template>
  <section class="donate-item">
    <p>覺得這篇報導不錯嗎？</p>
    <p>歡迎用新台幣支持 READr，</p>
    <p>讓更多深度報導浮上檯面。</p>
    <a href="https://www.readr.tw/donate" target="_blank" @click="sendDonateGA"><button type="button">用新台幣跟 READr 一起幹大事</button></a>
  </section>
</template>

<script>
export default {
  name: 'DonateItem',
  methods: {
    sendDonateGA () {
      window.ga('send', 'event', 'projects', 'click', '贊助按鈕-文末')
    }
  }
}
</script>

<style lang="stylus">
.donate-item
  padding-top 20px
  padding-bottom 20px
  border-top 1px solid #4a4a4a
  border-bottom 1px solid #4a4a4a
  text-align center
  & button
    margin-top 20px
    border-radius 10px
    background-color #4a4a4a
    color #fff
    font-weight 500
    font-size 1.5rem
    padding 10px 16px
    line-height normal
    width 100%
    max-width 400px
    &:active
      background-color #9b9b9b
</style>