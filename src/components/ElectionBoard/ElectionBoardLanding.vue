<template>
  <section class="eb-landing">
    <main>
      <div class="image">
        <img src="/proj-assets/election-board/images/title.png" alt="看板追追追">
      </div>
      <div class="menu">
        <div class="item item--upload">
          <router-link to="/project/election-board/upload">
            <img src="/proj-assets/election-board/images/upload.png" alt="我要上傳">
            <span>我要上傳</span>
          </router-link>
        </div>
        <div class="item item--verify">
          <router-link to="/project/election-board/verify" >
            <img src="/proj-assets/election-board/images/check.png" alt="幫忙驗證">
            <span>幫忙驗證</span>
          </router-link>
        </div>
        <div class="item item--data item--hidden">
          <!-- <router-link to="/project/election-board/data"> -->
          <router-link to="/project/election-board/">
            <img src="/proj-assets/election-board/images/data.png" alt="我要看資料">
            <span>我要看資料</span>
          </router-link>
        </div>
      </div>
    </main>
    <div class="credit">
      <img src="/proj-assets/election-board/images/logo-mm.png" alt="mirrormedia">
      <p>文字：李又如 設計：Weiwei Hsu </p>
      <p>工程：HY Tan、mich</p>
      <p>資料協力：<a href="https://councils.g0v.tw" target="_blank">投票指南</a></p>
    </div>
    <h1>其他議題</h1>
    <RelatedReports />
    <div v-show="showIntro" class="intro">
      <div class="intro-container">
        <div class="intro__close" @click="showIntro = false">
          <img src="/proj-assets/election-board/images/close.png" alt="關閉">
        </div>
        <h3><span class="title--data">看板</span><span class="title--verify">計畫</span><span class="title--upload">緣起</span></h3>
        <div class="content">
          <div class="content-container">
            <p>每到選舉季節，街上就會掛滿大大小小的候選人看板，這些資訊只能從政治獻金申報資料找到線索，如果候選人不申報，就會在選舉之後隨著卸下的看板消失無蹤。而這種輕鬆打知名度的方式也成為沒有資源的候選人難以跨越的門檻。誰掛了最多看板？愈多看板就等於愈多選票嗎？誰的照片又是最佳輔選員？「看板追追追」計畫邀請你拍下身邊的看板，一起為這次的選舉留下紀錄，解答這些問題！</p>
            <p>我們也會在近期解鎖公開資料頁面，顯示每位候選人即時的看板資料。</p>
          </div>
        </div>
        <a href="http://www.readr.tw/post/1089" target="_blank">看完整計畫緣起</a>
      </div>
    </div>
  </section>
</template>
<script>
import RelatedReports from '../RelatedReports.vue'

export default {
  name: 'ElectionBoardLanding',
  components: {
    RelatedReports
  },
  data () {
    return {
      showIntro: true
    }
  }
}
</script>
<style lang="stylus" scoped>
color-upload = #fa6e59
color-verify = #ffdb5c
color-verify-hidden = #6d5810
color-data = #4897db
color-data-hidden = #184b78

.eb-landing
  position relative
  display flex
  flex-direction column
  justify-content center
  align-items center
  min-height 100vh
  padding 80px 0 20px
  background-color rgba(0,0,0,1)
  h1
    margin .5em 0 0
    color #fff
    font-weight 300
  main
    display flex
    justify-content center
    width 90%
    max-height 700px
    > *
      flex 1
      max-width 200px
  .image
    position relative
    > img
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      object-fit contain
      object-position center center
  .menu
    display flex
    flex-direction column
    justify-content space-between
    margin-left 25px
    
    .item
      position relative
      display block
      padding-top 78%
      border-radius 2px
      & + .item
        margin-top 20px
      &--upload
        background-color color-upload
      &--verify
        background-color color-verify
        &.item--hidden
          background-color color-verify-hidden
      &--data
        background-color color-data
        &.item--hidden
          background-color color-data-hidden
      &--hidden
        > a
          cursor default
      > a
        display flex
        flex-direction column
        justify-content center
        align-items center
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
        img
          width 35%
        span
          margin-top 15px
          font-size 1.25rem
          font-weight 500
          line-height 1
          letter-spacing 1px
          &.feature-hide
            margin-top 0
            font-size .875rem
  .credit
    width 80%
    margin-top 45px
    color #a0a0a0
    font-size .875rem
    text-align center
    > img
      width 28px
    a
      color #a0a0a0
  .intro
    display flex
    align-items center
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 1000
    width 100%
    padding 20px 15px
    background-color rgba(0,0,0,.5)
    &__close
      position absolute
      top 0
      right 0
      width 70px
      height 70px
      background-color #fff
      border-radius 0 0 0 70px
      > img
        position absolute
        top calc(50% - 6px)
        left calc(50% + 6px)
        transform translate(-50%, -50%)
        width 24px
    .intro-container
      position relative
      display flex
      flex-direction column
      width 100%
      max-height 100%
      height auto
      padding 45px 20px 30px
      background-color #000
      border 2px solid #fff
      h3
        color #fff
        font-size 1.25rem
        font-weight 500
        .title
          &--upload
            color color-upload
          &--verify
            color color-verify
          &--data
            color color-data
      a
        margin-top 20px
        padding .2em .2em
        color #000
        font-size 1.25rem
        font-weight 500
        text-align center
        background-color #a0a0a0
        border-radius 2px
      .content
        flex 1
        position relative
        margin-top 25px
        overflow-y auto
        &-container
          width 100%
          color #fff
          text-align justify
          font-weight 300
          p
            & + p
              margin-top 1em
@media (min-width: 768px)
  .eb-landing
    padding 60px 10%
    main
      display block
      max-width 700px
      width 100%
      > *
        max-width none
    .image
      width 100%
      text-align center
      > img
        position static
        width 100px
        height auto
    .menu
      flex-direction row
      margin 55px 0 0 0
      .item
        width calc(33% - 20px)
        padding-top calc((33% - 20px) * .5)
        & + .item
          margin-top 0
        > a
          img
            width 48px
    .intro
      .intro-container
        max-width 500px
        margin 0 auto
    .credit
      width 100%
</style>
