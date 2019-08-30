<template>
  <footer class="footer-credit">
    <div class="footer-credit__title">製作團隊</div>
    <div class="footer-credit__persons">
      <p><span>文字採訪：</span>劉子維</p>
      <p><span>資料整理：</span>劉子維</p>
      <p><span>影音：</span>許哲綱</p>
      <p><span>攝影：</span>陳毅偉、賴智揚、李昭妟</p>
      <p><span>設計：</span>陳怡蒨</p>
      <p><span>工程：</span>林昱帆</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.footer-credit
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 30px 15px
  background-color #4a4a4a
  color #fff
  font-size 1.4rem
  line-height 1.8
  font-weight 300
  @media (min-width $tab-breakpoint)
    font-size 2.0rem
    padding 60px 0
  &__title
    margin-bottom 20px
    @media (min-width $tab-breakpoint)
      margin-bottom 35px
  &__persons
    text-align center
  & span
    font-weight 500
</style>