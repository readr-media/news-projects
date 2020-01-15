<template>
  <section class="the-credit">
    <p>記者／劉子維、設計／陳怡蒨、工程／小島、資料協力／王向榮</p>
  </section>
</template>

<script>
export default {
  name: 'TheCredit',
};
</script>

<style lang="stylus">

.the-credit
  color #333
  line-height 1.88
  font-size 14px
  text-align center
  p
    margin 0
  @media (min-width 720px)
    padding-bottom 65px
    text-align left
  & strong
    font-weight 500
</style>
