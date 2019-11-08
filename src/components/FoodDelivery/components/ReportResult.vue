<template>
  <section class="report-result">
    <UserStatus />
    <div class="report-result__reward">
      <div>
        <p class="report-result__num">3</p>
        <p class="report-result__name">已配送</p>
      </div>
      <div>
        <p class="report-result__num">120</p>
        <p class="report-result__name">金額</p>
      </div>
      <div>
        <p class="report-result__num">08:45</p>
        <p class="report-result__name">時長</p>
      </div>
    </div>
    <img class="report-result__cheers" src="/proj-assets/food-delivery/img/cheers--comp.svg" alt="">
    <div class="report-result__action">
      <button type="button">按鈕接單（繼續閱讀）</button>
      <div class="report-result__wrapper">
        <button type="button">回到目錄</button>
        <button type="button">分享成就</button>
      </div>
    </div>
  </section>
</template>

<script>
import UserStatus from './UserStatus.vue'

export default {
  name: 'ReportResult',
  components: {
    UserStatus
  }
}
</script>

<style lang="stylus">
.report-result
  // background-image url(/proj-assets/food-delivery/img/map.jpg)
  // background-size cover
  // background-position center
  // background-repeat no-repeat
  background-color rgba(#000, 0.3)
  height 100vh
  &__cheers
    width 82px
    display block
    margin-left auto
    margin-right auto
    margin-top 20px
    margin-bottom 20px
  &__reward
    color #fff
    display flex
    text-align center
    justify-content space-between
    line-height normal
    max-width 240px
    margin-left auto
    margin-right auto
    // margin-bottom 20px
    margin-top 13px
  &__num
    color #ffdc03
    font-size 1.8rem
    line-height 1.4
  &__name
    font-size 1.4rem
    // line-height normal
  & button
    font-weight 500
    color #4a4a4a
    font-size 1.8rem
    border-radius 20px
    padding-top 8px
    padding-bottom 8px
    text-align center
    line-height normal
  &__action
    margin-right auto
    margin-left auto
    max-width 240px
    & > button
      background-color #ffdc03
      width 100%
  &__wrapper
    margin-top 17px
    display flex
    justify-content space-between
    & button
      background-color #fff
      // flex 1 1 50%
      width calc(50% - 10px)
      // &:first-child
      //   padding-right 10px
      // &:last-child
      //   padding-left 10px
</style>