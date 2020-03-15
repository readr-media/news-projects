<template>
  <div class="the-credit">
    <p><strong>記者／</strong>陳珮瑜</p>
    <p><strong>設計／</strong>陳怡蒨</p>
    <p><strong>工程／</strong>林昱帆</p>
    <p><strong>照片提供／</strong>中央社、吳三連基金會</p>
    <p><strong>插畫／</strong>陳瑋柔</p>
  </div>
</template>

<script>
export default {
  name: 'TheCredit'
}
</script>

<style lang="stylus">
.the-credit
  color #333
  line-height 1.88
  font-size 1.6rem
  padding-bottom 30px
  @media (min-width 720px)
    padding-bottom 65px
  & strong
    font-weight 500
</style>