<template>
  <section class="the-credit">
    <p><strong>記者／</strong>陳珮瑜</p>
    <p><strong>設計／</strong>陳怡蒨</p>
    <p><strong>工程／</strong>林昱帆</p>
    <p><strong>攝影／</strong>林煒凱</p>
    <p><strong>照片提供／</strong>陳博文（授權吳三連基金會收藏）、施明德文化基金會、總統府網站、前民進黨秘書長黃爾璇臉書</p>
  </section>
</template>

<script>
export default {
  name: 'TheCredit'
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.the-credit
  color #333
  line-height 1.88
  font-size 1.6rem
  padding-bottom 30px
  text-align center
  @media (min-width $breakpoint.sm)
    padding-bottom 65px
    text-align left
  & strong
    font-weight 500
</style>