<template>
  <section class="covid-credit">
    <p><span>記者：李又如</span></p>
    <p><span>設計：陳怡蒨</span><span>工程：HY Tan</span></p>
    <p><span>資料：李又如、簡信昌、吳冠賢、<br>政治大學鄭宇君團隊</span></p>
  </section>
</template>

<script>
export default {
  name: 'TheCredit'
}
</script>

<style lang="stylus" scoped>
.covid-credit
  width 290px
  margin 0 auto
  padding 20px 0
  color #9f9f9f
  font-size 15px
  line-height normal
  p
    margin 0
    text-align center
  span
    + span
      margin-left 1em
</style>
