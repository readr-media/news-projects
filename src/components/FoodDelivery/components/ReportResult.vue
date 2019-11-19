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
    
    <div class="report-result__cheers">
      <svg enable-background="new 0 0 393.4 432.3" viewBox="0 0 393.4 432.3" xmlns="http://www.w3.org/2000/svg">
        <g fill="#999">
          <path
            d="m7.6 374.7 105.3 30.2c5.6 1.6 11.4-1.6 13-7.2 1.6-5.6-1.6-11.4-7.2-13l-43.1-12.4 16.9-61c41.3 5.8 81.8-20.1 93-61.3l24.5-90.3c2-7.3-2.4-15-9.7-17l-137.9-37.4c-7.3-2-15 2.4-17 9.7l-24.4 90.3c-11.4 42 11.3 85.5 51.1 100.7l-16.7 60.5-42-12c-5.6-1.6-11.4 1.6-13 7.2-1.6 5.6 1.7 11.4 7.2 13zm166.9-172.2-122.5-14.6c-1.7-.2-2.9-1.9-2.4-3.6l14.7-54.3c.5-1.7 2.2-2.7 3.9-2.2l117.3 31.8c1.7.5 2.7 2.2 2.2 3.9l-10 37c-.4 1.3-1.8 2.2-3.2 2zm-86.3 84.6-.6-.2c-33.8-9.2-53.9-44.3-44.7-78 .1-.4.4-.6.8-.5l126.8 15.1c.5.1.8.5.6.9l-4.9 18c-9.1 33.7-44.2 53.8-78 44.7z" />
          <path
            d="m393 388.7c-1.6-5.6-7.4-8.8-13-7.2l-42 12-16.7-60.5c39.8-15.2 62.5-58.8 51.2-100.7l-24.6-90.3c-2-7.3-9.6-11.7-17-9.7l-137.8 37.4c-7.3 2-11.7 9.6-9.7 17l24.6 90.3c11.2 41.3 51.7 67.1 93 61.3l16.9 61-43.1 12.4c-5.6 1.6-8.8 7.4-7.2 13 1.6 5.6 7.4 8.8 13 7.2l105.3-30.2c5.5-1.6 8.7-7.4 7.1-13zm-177.2-161.3-10-37c-.5-1.7.5-3.4 2.2-3.9l117.3-31.8c1.7-.5 3.4.5 3.9 2.2l14.8 54.3c.5 1.7-.7 3.4-2.4 3.6l-122.5 14.6c-1.6.3-2.9-.6-3.3-2zm11.4 42-4.9-18c-.1-.4.2-.9.6-.9l126.8-15.1c.4 0 .7.2.8.5 9.2 33.8-11 68.9-44.7 78l-.6.2c-33.7 9.1-68.9-11-78-44.7z" />
          <path
            d="m242.8 12.3-12.5 49.9c-1.3 5.2-6.6 8.4-11.8 7.1l-.5-.1c-5.2-1.3-8.4-6.6-7.1-11.8l12.5-49.9c1.3-5.2 6.6-8.4 11.8-7.1l.5.1c5.2 1.2 8.4 6.5 7.1 11.8z" />
          <path
            d="m146.2 16 29.6 42.1c3.1 4.4 2 10.5-2.4 13.6l-.4.3c-4.4 3.1-10.5 2-13.6-2.4l-29.6-42.1c-3.1-4.4-2-10.5 2.4-13.6l.4-.3c4.4-3.1 10.5-2 13.6 2.4z" />
          <path
            d="m315.4 71.8-46.5 22.1c-4.9 2.3-10.7.2-13-4.6l-.2-.4c-2.3-4.9-.2-10.7 4.6-13l46.5-22.1c4.9-2.3 10.7-.2 13 4.6l.2.4c2.3 4.8.2 10.7-4.6 13z" />
        </g>
      </svg>
    </div>
    <!-- <img class="report-result__cheers" src="/proj-assets/food-delivery/img/icon/cheers--comp.svg" alt=""> -->
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
    // display block
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