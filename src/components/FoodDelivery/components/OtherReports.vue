<template>
  <section class="other-reports">
    <div class="other-reports__title">更多精彩專題</div>
    <a href="http://" target="_blank">通往悲劇之路：南方澳跨港大橋如何坍塌</a>
    <a href="http://" target="_blank">海海人生：回流青年的告白</a>
    <a href="http://" target="_blank">Twitter 大戰中國網軍 - 解密被刪帳號資料集</a>
  </section>
</template>

<script>
export default {
  name: 'OtherReports'
}
</script>

<style lang="stylus">
.other-reports
  text-align center
  &__title
    margin-bottom 20px
  & a
    text-decoration underline
    color #000
    font-weight 500
    display block
    & + a
      margin-top 20px
</style>