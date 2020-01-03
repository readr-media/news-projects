<template>
  <section class="the-credit">
    <p>設計：小草；工程：小島</p>
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
