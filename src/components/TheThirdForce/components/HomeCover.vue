<template>
  <section class="home-cover">
    <picture>
      <source type="image/webp" media="(min-width: 992px)" srcset="/proj-assets/the-third-force/img/bg-desk.webp">
      <source type="image/png" media="(min-width: 992px)" srcset="/proj-assets/the-third-force/img/bg-desk.png">
      <source type="image/webp" srcset="/proj-assets/the-third-force/img/bg-mob.webp">
      <img class="home-cover__bg" src="/proj-assets/the-third-force/img/bg-mob.png" alt="">
    </picture>
    <div class="home-cover__content">
      <h1>第三勢力投票指南</h1>
      <p>明年的國會選舉是有史以來最多政黨票選擇的一次！除了兩大黨民進黨、國民黨以外，剩下的 17 個政黨分別是什麼來頭？ READr 跟關鍵評論網合作，透過數據與專訪，全方位解析第三勢力！</p>
      <div class="home-cover__author">
        <picture class="readr">
          <source type="image/webp" srcset="/proj-assets/the-third-force/img/logo-readr.webp">
          <img src="/proj-assets/the-third-force/img/logo-readr.png" alt="">
        </picture>
        <picture class="feat">
          <source type="image/webp" srcset="/proj-assets/the-third-force/img/icon-feat.webp">
          <img src="/proj-assets/the-third-force/img/icon-feat.png" alt="">
        </picture>
        <picture class="tnl">
          <source type="image/webp" srcset="/proj-assets/the-third-force/img/logo-tnl.webp">
          <img src="/proj-assets/the-third-force/img/logo-tnl.png" alt="">
        </picture>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeCover'
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.home-cover
  background-color #212121
  color #fff
  position relative
  &__content
    padding-top 45px
    padding-right 15px
    padding-left 15px
    max-width 320px
    margin-left auto
    margin-right auto
    @media (min-width 350px)
      padding-right 0
      padding-left 0
    @media (min-width $breakpoint.lg)
      position absolute
      top 18%
      right 0
      max-width none
      padding-top 0
  &__author
    display flex
    justify-content space-between
    align-items center
    padding-top 40px
    padding-bottom 35px
    @media (min-width $breakpoint.lg)
      max-width 400px
      padding-left 60px
      padding-right 60px
      margin-left auto
      box-sizing content-box
      padding-top 0
      padding-bottom 0
    & .readr
      max-width 38px
      width 13.1%
      @media (min-width $breakpoint.lg)
        width 52px
        max-width none
    & .feat
      max-width 14px
      width 4.83%
      @media (min-width $breakpoint.lg)
        width 18px
        max-width none
    & .tnl
      max-width 215px
      width 68.62%
      @media (min-width $breakpoint.lg)
        width 245px
        max-width none
    & img
      width 100%
  &__bg
    height 51.94vh
    width 100%
    object-fit cover
    object-position center center
    @media (min-width $breakpoint.lg)
      height 100vh
      object-position right top
  & img
    display block
  & h1
    font-size 4.0rem
    font-weight 700
    line-height normal
    margin-bottom 45px
    text-align center
    @media (min-width $breakpoint.lg)
      font-size 7.2rem
      background-color #212121
      padding 40px 60px
      margin-bottom 20px
  & p
    font-size 1.6rem
    line-height 2
    text-align justify
    @media (min-width $breakpoint.lg)
      font-size 2.0rem
      max-width 400px
      margin-left auto
      background-color #212121
      padding 40px 60px
      margin-bottom 40px
      box-sizing content-box
</style>
