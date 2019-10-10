<template>
  <section class="credit">
    <p><strong>監製：</strong>簡信昌</p>
    <p><strong>製作人：</strong>李又如、陳姿廷</p>
    <p><strong>文字報導：</strong>胡慕情</p>
    <p><strong>攝影：</strong>賴智揚</p>
    <p><strong>設計：</strong>許玲瑋</p>
    <p><strong>建模：</strong>洪詩宸（台大新聞所謝吉隆科技部 VR 計畫）</p>
    <p><strong>工程：</strong>林昱帆</p>
  </section>
</template>

<script>
export default {
  name: 'TheCredit'
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.credit
  color #333
  line-height 1.88
  font-size 1.6rem
  font-family $font-serif
  & strong
    font-weight 500
</style>