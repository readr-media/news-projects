<template>
  <div class="credit">
    <p class="credit__author">
      <span>文字／李又如</span>
      <span>資料整理／李又如、李昭妟、簡信昌、陳彥宇、Tin Tin Chen</span>
      <span>設計／Weiwei Hsu</span>
      <span>工程／HY Tan</span>
    </p>
    <p>
      <img src="/proj-assets/fake-news/credit_mm.png" alt="Readr">
      <span>© 2019 READr</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'FakeNewsCredit'  
}
</script>
<style lang="stylus" scoped>
.credit
  margin-top .5em
  padding 0 .5em
  p
    color #616770
    font-size .875rem
    & + p
      margin-top .5em
  span
    vertical-align top
  img
    width 20px
    height 20px
  span + span, img + span
    margin-left 1em

</style>
