<template>
  <section class="report-result">
    <UserState :state="result.state" />
    <div class="report-result__reward">
      <div>
        <p class="report-result__num">{{ result.orderCount }}</p>
        <p class="report-result__name">已配送</p>
      </div>
      <div>
        <p class="report-result__num">{{ result.money }}</p>
        <p class="report-result__name">金額</p>
      </div>
      <div>
        <p class="report-result__num">{{ result.time }}</p>
        <p class="report-result__name">時長</p>
      </div>
    </div>
    <img class="report-result__cheers" src="/proj-assets/food-delivery/img/cheers--comp.svg" alt="">
    <div class="report-result__action">
      <button type="button" class="order" v-if="result.action" >{{ result.action }}</button>
      <button type="button" class="share">分享成就（專題）</button>
      <!-- <div class="report-result__wrapper">
        <button type="button">回到目錄</button>
        <button type="button">分享成就</button>
      </div> -->
    </div>
  </section>
</template>

<script>
import UserState from './UserState.vue'

export default {
  name: 'ReportResult',
  props: [ 'result' ],
  components: {
    UserState
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.report-result
  // background-image url(/proj-assets/food-delivery/img/map.jpg)
  // background-size cover
  // background-position center
  // background-repeat no-repeat
  background-color rgba(#000, 0.3)
  height 100vh
  @media (min-width $mobile)
    height auto
    // (120 - 70) / 2
    padding-bottom 100px
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
    width 100%
    @media (min-width $mobile)
      border-radius 10px
  &__action
    margin-right auto
    margin-left auto
    padding-right 40px
    padding-left 40px
    max-width 600px
    @media (min-width 680px)
      padding-right 0
      padding-left 0
    // & > button
    //   // background-color #ffdc03
    //   width 100%
    & .order
      background-color #ffdc03
      margin-bottom 16px
    & .share
      background-color #fff
  // &__wrapper
  //   margin-top 17px
  //   display flex
  //   justify-content space-between
  //   & button
  //     background-color #fff
  //     width calc(50% - 10px)
</style>