<template>
  <div class="the-user">
    <div v-html="status" class="the-user__status"></div>
    <img src="https://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p1_pstatp_com/7f237fea1d960dd055c5fc9c43ee7e22.jpg" alt="">
    <!-- <div v-html="status" class="op0"></div> -->
  </div>
</template>

<script>
export default {
  name: 'TheUser',
  props: {
    order: {
      type: Number,
      default: 0
    }
  },
  computed: {
    status () {
      return `
        <p>您有 <span>${this.order}</span> 個訂單</p>
        <p>前往取餐</p>
      `
    }
  }
}
</script>

<style lang="stylus">
.the-user
  display flex
  align-items center
  justify-content center
  position relative
  padding-top 17px
  padding-bottom 17px
  max-width 276px
  margin-left auto
  margin-right auto
  &__status
    position absolute
    color #fff
    text-align right
    font-size 1.4rem
    line-height normal
    left 0
    & span
      color #ffdc03
  & img
    // position absolute
    width 50px
    border-radius 50%
</style>