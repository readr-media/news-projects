<template>
  <div class="credit">
    <img class="credit__mm" src="/proj-assets/logo_mm_white.png" alt="" @click="toMM">
    <p>資料整理：陳彥宇、李又如、李昭妟</p>
    <p>文字：李又如</p>
    <p>網頁：熊凱文</p>
    <p>設計：陳怡蒨</p>
    <p>2019/01/30</p>
  </div>
</template>

<script>
export default {
  methods: {
    toMM () {
      window.open('https://www.mirrormedia.mg')
    }
  }
}
</script>

<style lang="stylus" scoped>
.credit
  display flex
  flex-direction column
  align-items center
  &__mm
    width 30px
    height 30px
    margin 0 0 10px 0
    cursor pointer
  p
    margin 3px 0
    color white
    font-size 14px

@media (min-width 1024px)
  .credit
    &__mm
      width 40px
      height 40px
      margin 0 0 20px 0
    p
      font-size 16px
</style>