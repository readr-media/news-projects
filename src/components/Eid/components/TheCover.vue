<template>
  <section class="the-cover">
    <ReadrLogo class="the-cover__readr-logo" />
    <div class="img-wrapper">
      <img src="/proj-assets/eid/illus/65-front-4-m.png" alt="">
      <img src="/proj-assets/eid/illus/36-front-1.png" alt="">
      <img src="/proj-assets/eid/illus/54-front-3-f.png" alt="">
      <img src="/proj-assets/eid/illus/43-front-2.png" alt="">
      <img src="/proj-assets/eid/illus/75-front-5-m.png" alt="">
    </div>

    <h1>智慧政府還是全面監控？數位身分證一篇就懂！</h1>
    <div class="text-wrapper">
      <div class="intro">
        <p>在爭議聲中，換發搭載晶片的數位身分證 （New eID）工作仍持續推行。臺灣人的身分證已經歷經 6 次轉變，政府的規劃都是你想要的嗎？來自製一張你心目中的身分證，看看它最符合哪個年代的版本？這張獨特的身分證將在報導中帶給你更多體驗！</p>
        <p>可選擇的欄位是政府自民國 36 年（1947 年）普發身分證以來，曾登載過的欄位。隨著時代變遷與隱私權意識提高，卡面登錄個資逐漸減少，也不再依性別分成兩色。現在就來看看你的選擇與哪一代的身分證最接近，也歡迎分享你獨特的身分證！</p>
      </div>
      <div class="btn-wrapper">
        <button
          type="button"
          class="normal normal--two"
          @click="$emit('changePage', 'interactive')"
        >
          開始製作
        </button>
        <button
          type="button"
          class="normal normal--two"
          @click="$emit('changePage', 'report')"
        >
          跳過遊戲看報導
        </button>
      </div>

      <div class="info info--date">
        <span>發佈日期：</span>2020-07-23
      </div>

      <div class="info info--credit">
        <p>記者：劉子維</p>
        <p>設計：許玲瑋</p>
        <p>工程：林昱帆</p>
        <p>歷代身分證照片提供：臺中市南屯區戶政事務所</p>
      </div>
    </div>
  </section>
</template>

<script>
import ReadrLogo from './ReadrLogo.vue'

export default {
  name: 'TheCover',
  components: {
    ReadrLogo
  }
}
</script>

<style lang="stylus">
@import '../variables.styl'

.the-cover
  background-color #5f6c11
  position absolute
  top 0
  left 0
  z-index 99
  overflow hidden
  @media (min-width $breakpoint-md)
    &__readr-logo
      margin-bottom 32px
  .img-wrapper
    display flex
    justify-content center
    align-items flex-start
    margin-bottom 30px
    @media (min-width $breakpoint-md)
      margin-bottom 22px
    img
      width 45.19%
      height auto
      max-width 376px
      + img
        margin-left 9px
        @media (min-width $breakpoint-md)
          margin-left 23px
  h1
    color #fbc11a
    margin-left 0.075em
    @media (min-width $breakpoint-md)
      margin-bottom 34px
  .text-wrapper
    padding-bottom 30px
    padding-left 30px
    padding-right 30px
    max-width 720px
    margin-left auto
    margin-right auto
    @media (min-width 780px)
      padding-bottom 18px
      padding-left 0
      padding-right 0
  .intro
    color rgba(#fff, 0.9)
    margin-bottom 30px
    @media (min-width $breakpoint-md)
      margin-bottom 44px
      text-align center
  .btn-wrapper
    margin-bottom 34px
    @media (min-width $breakpoint-md)
      margin-bottom 46px
      display flex
      justify-content center
      align-items flex-start
  .info
    color #fff
    text-align center
    letter-spacing 2.5px
    font-size 13px
    line-height 1.54
    &--date
      margin-bottom 30px
      @media (min-width $breakpoint-md)
        margin-bottom 5px
        span
          display none
    @media (min-width $breakpoint-md)
      &--credit
        display flex
        justify-content space-between
        padding-left 24px
        padding-right 24px
</style>
