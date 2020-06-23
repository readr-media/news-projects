<template>
  <section class="covid-credit">
    <p><span>記者：XXX</span><span>設計：XXX</span><span>工程：XXX</span></p>
    <p><span>資料：XXX、XXX、XXX</span></p>
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
    text-align center
  span
    + span
      margin-left 1em
</style>
