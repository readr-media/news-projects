<template>
  <section class="eb-landing">
    <main>
      <img src="/proj-assets/election-board/images/bg-arrow.png" alt="" class="bg-arrow">
      <picture>
        <source media="(min-width: 768px)" srcset="/proj-assets/election-board/images/title-lap-v1.png">
        <img src="/proj-assets/election-board/images/title-mob-v1.png" alt="看板追追追 2.0">
      </picture>
      <!-- <img :src="`/proj-assets/election-board/images/title-${isLapW ? 'lap' : 'mob'}.png`" alt="看板追追追"> -->
      <div class="menu">
        <div>
          <router-link to="/project/election-board/upload">
            <div class="menu__item menu__item--upload" @click="sendGA('upload')">
              <!-- <router-link to="/project/election-board/upload"> -->
                <img src="/proj-assets/election-board/images/upload.png" alt="我要上傳">
                <div>我要上傳</div>
              <!-- </router-link> -->
            </div>
          </router-link>
          <router-link to="/project/election-board/verify" >
            <div class="menu__item menu__item--verify" @click="sendGA('verified')">
              <!-- <router-link to="/project/election-board/verify" > -->
                <img src="/proj-assets/election-board/images/check.png" alt="幫忙驗證">
                <div>幫忙驗證</div>
              <!-- </router-link> -->
            </div>
          </router-link>
          <router-link to="/project/election-board/data">
            <div class="menu__item menu__item--data" @click="sendGA('seedata 2020')">
              <!-- <router-link to="/project/election-board/data"> -->
                <img src="/proj-assets/election-board/images/data.png" alt="我要看資料">
                <div>我要看資料</div>
              <!-- </router-link> -->
            </div>
          </router-link>
        </div>
        <a href="/project/election-board/data-2018" target="_blank" class="menu__2018data" @click="sendGA('seedata 2018')">2018 看板資料</a>
      </div>
      <!-- <div class="image">
        <img src="/proj-assets/election-board/images/title.png" alt="看板追追追">
      </div>
      <div class="menu">
        <div class="item item--upload" @click="sendGA('upload')">
          <router-link to="/project/election-board/upload" >
            <img src="/proj-assets/election-board/images/upload.png" alt="我要上傳">
            <span>我要上傳</span>
          </router-link>
        </div>
        <div class="item item--verify" @click="sendGA('verified')">
          <router-link to="/project/election-board/verify" >
            <img src="/proj-assets/election-board/images/check.png" alt="幫忙驗證">
            <span>幫忙驗證</span>
          </router-link>
        </div>
        <div class="item item--data" @click="sendGA('seedata')">
          <router-link to="/project/election-board/data">
            <img src="/proj-assets/election-board/images/data.png" alt="我要看資料">
            <span>我要看資料</span>
          </router-link>
        </div>
      </div> -->

    </main>
    <a href="http://www.readr.tw/post/1089" class="origin" target="_blank" @click="sendGA('memo')">看完整計畫緣起</a>
    <!-- todo ga -->
    <a href="#" target="_blank" class="news" @click="sendGA('看板政治：政治獻金資料沒有告訴你的事')">看板政治：政治獻金資料沒有告訴你的事</a>

    <a href="https://www.readr.tw/donate" target="_blank" class="news" @click="sendGA('donate')">贊助我們</a>

    <div class="credit">
      <img src="/proj-assets/election-board/images/logo-mm.png" alt="mirrormedia">
      <p>文字：李又如 設計：Weiwei Hsu </p>
      <p>工程：HY Tan、mich、Yeefun</p>
      <p>資料協力：<a href="https://councils.g0v.tw" target="_blank">投票指南</a></p>
      <p>CC BY-SA 3.0</p>
    </div>

    <div class="thanks">
      <p class="thanks__title">感謝 2020 一起追的朋友</p>
      <p class="thanks__name">{{ uploaders.join(' ') }}</p>
    </div>
    <!-- <h1>其它議題</h1> -->
    <!-- <RelatedReports /> -->
    <div v-show="showIntro" class="intro">
      <div class="intro-container">
        <div class="intro__close" @click="showIntro = false">
          <img src="/proj-assets/election-board/images/close.png" alt="關閉">
        </div>
        <h3><span class="title--data">看板</span><span class="title--verify">計畫</span><span class="title--upload">緣起</span></h3>
        <div class="content">
          <div class="content-container">
            <p>每到選舉季節，街上就會掛滿大大小小的候選人看板，這種輕鬆打知名度方式成為沒有資源的候選人難以跨越的門檻，在現行制度下又不需要登記或申報，難以留下紀錄。誰掛了最多看板？愈多看板就等於愈多選票嗎？誰的照片又是最佳輔選員？「看板追追追」計畫邀請你拍下身邊的看板，一起為選舉留下紀錄，解答這些問題！</p>
          </div>
        </div>
        <a href="http://www.readr.tw/post/1089" target="_blank" @click="closeIntro">看完整計畫緣起</a>
      </div>
    </div>
  </section>
</template>
<script>
import Cookie from 'vue-cookie'
import { get as axiosGet } from 'axios'
// import RelatedReports from '../RelatedReports.vue'

export default {
  name: 'ElectionBoardLanding',
  props: [ 'reload' ],
  // components: {
  //   RelatedReports
  // },
  data () {
    return {
      showIntro: false,
      // wEl: null,
      // ww: 0,
      // isMounted: false,
      uploaders: []
    }
  },
  beforeMount () {
    // this.wEl = window
    // this.ww = this.wEl.innerWidth
    this.getIntroCookie()
    this.fetchUploaders()
  },
  // mounted () {
  //   this.isMounted = true
  //   this.wEl.addEventListener('resize', this.alterWindowWidth)
  //   this.wEl.addEventListener('orientationChange', this.alterWindowWidth)
  // },
  // computed: {
  //   isLapW () {
  //     return this.isMounted && this.ww >= 768
  //   }
  // },
  methods: {
    // alterWindowWidth () {
    //   this.ww = this.wEl.innerWidth
    // },
    getIntroCookie () {
      const hasCookie = Cookie.get('eb-intro')
      if (!hasCookie) {
        this.showIntro = true
        Cookie.set('eb-intro', true, { expires: '6M' })
      }
    },
    fetchUploaders () {
      axiosGet('/project-api/election-board/boards/gongdebook')
        .then((res) => {
          this.uploaders = res.data.results
        })
    },
    sendGA (value) {
      window.ga('send', 'event', 'projects', 'click', value)
    },
    closeIntro () {
      this.showIntro = false
      this.sendGA('memo')
    }
  },
  // beforeDestroy () {
  //   this.wEl.removeEventListener('resize', this.alterWindowWidth)
  //   this.wEl.removeEventListener('orientationChange', this.alterWindowWidth)
  // },
}
</script>
<style lang="stylus" scoped>
color-upload = #fa6e59
color-verify = #ffdb5c
color-data = #4897db

.eb-landing
  // position relative
  display flex
  flex-direction column
  justify-content center
  align-items center
  min-height 100vh
  // padding 80px 0 20px
  padding 80px 25px 40px 25px
  // background-color rgba(0,0,0,1)
  max-width 425px
  margin-right auto
  margin-left auto
  // overflow hidden
  @media (min-width 768px)
    padding 88px 0
    justify-content flex-start
    max-width 698px
  // background-color rgba(0,0,0,1)
  // z-index -2
  & a
    color #000
    text-decoration none
    cursor pointer
  // & h1
  //   margin .5em 0 0
  //   color #fff
  //   font-weight 300
  & main
    display flex
    position relative
    // max-width 270px
    // max-width 425px
    width 100%
    justify-content space-between
    margin-bottom 68px
    @media (min-width 768px)
      flex-direction column
      align-items center
      // max-width 698px
      margin-bottom 30px
    & picture
      // max-width 100px
      width 37.04%
      position relative
      @media (min-width 768px)
        width 26.65%
        margin-bottom 56px
      & > img
        width 100%
      // margin-right 15px
    & .bg-arrow
      position absolute
      // width 91.875%
      width 125.93%
      right 0
      top 400px
      @media (min-width 768px)
        width 73.64%
        top 228px
        left 50%
        transform translateX(-50%)
      // top 83.86vh
      // z-index -1
    & .menu
      // margin-left 15px
      position relative
      width 51.85%
      text-align center
      line-height 1
      @media (min-width 768px)
        width 100%
      & > div
        @media (min-width 768px)
          display flex
          justify-content space-between
      // max-width 140px
      & a
        display block
        @media (min-width 768px)
          width 30.66%
        &:not(:last-child)
          margin-bottom 20px
          @media (min-width 768px)
            margin-bottom 0
      &__item
        border-radius 2px
        font-weight 700
        padding-top 20px
        padding-bottom 15px
        @media (min-width 768px)
          // width 30.66%
          border-radius 6px
          font-size 1.25rem
        // &:not(:last-child)
        //   margin-bottom 20px
        //   @media (min-width 768px)
        //     margin-bottom 0
        & img
          width 48px
          vertical-align middle
          margin-bottom 15px
        &--upload
          background-color color-upload
        &--verify
          background-color color-verify
        &--data
          background-color color-data
      &__2018data
        display block
        color #4897db
        text-decoration underline
        margin-top 15px
        font-weight 600
        @media (min-width 768px)
          margin-top 10px
          width 30.66%
          margin-left auto
  // main
  //   display flex
  //   justify-content center
  //   width 90%
  //   max-height 700px
  //   > *
  //     flex 1
  //     max-width 200px
  & > a
    // max-width 425px
    // width 90%
    width 100%
    // height 48px
    // margin-top 25px
    // margin-top 68px
    font-size 1.25rem
    font-weight 700
    // line-height 48px
    // letter-spacing 1px
    text-align center
    background-color #a0a0a0
    border-radius 2px
    cursor pointer
    position relative
    @media (min-width 768px)
      // max-width 698px
      border-radius 6px
    &.origin
      height 48px
      line-height 48px
    &.news
      line-height 1.5
      padding 9px 6px
    & + a
      margin-top 15px
  // .image
  //   position relative
  //   > img
  //     position absolute
  //     top 0
  //     left 0
  //     right 0
  //     bottom 0
  //     width 100%
  //     height 100%
  //     object-fit contain
  //     object-position center center
  // .menu
  //   display flex
  //   flex-direction column
  //   justify-content space-between
  //   margin-left 25px
    
  //   .item
  //     position relative
  //     display block
  //     padding-top 78%
  //     border-radius 2px
  //     & + .item
  //       margin-top 20px
  //     &--upload
  //       background-color color-upload
  //     &--verify
  //       background-color color-verify
  //     &--data
  //       background-color color-data
  //     > a
  //       display flex
  //       flex-direction column
  //       justify-content center
  //       align-items center
  //       position absolute
  //       top 0
  //       left 0
  //       right 0
  //       bottom 0
  //       width 100%
  //       cursor pointer
  //       img
  //         width 35%
  //       span
  //         margin-top 15px
  //         font-size 1.25rem
  //         font-weight 500
  //         line-height 1
  //         letter-spacing 1px
  //         &.feature-hide
  //           margin-top 0
  //           font-size .875rem
  & .credit
    // width 80%
    margin-top 25px
    margin-bottom 35px
    color #a0a0a0
    font-size .875rem
    text-align center
    line-height 1.8
    // @media (min-width 768px)
    //   margin-top 25px
    > img
      width 28px
      vertical-align middle
      margin-bottom 10px
      // @media (min-width 768px)
      //   margin-bottom 14px
    a
      color #a0a0a0
      text-decoration underline
  & .thanks
    color #a0a0a0
    text-align center
    &__title
      font-size 1.25rem
      font-weight 600
      margin-bottom 15px
    &__name
      font-size 0.875rem
      line-height 1.6
  & .intro
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
      cursor pointer
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
      // padding 45px 20px 30px
      padding 40px 20px 25px 20px
      background-color #000
      border 2px solid #fff
      @media (min-width 768px)
        padding 45px 25px 30px 25px
        // padding-right 25px
        // padding-left 25px
      h3
        color #fff
        font-size 1.25rem
        font-weight 700
        .title
          &--upload
            color color-upload
          &--verify
            color color-verify
          &--data
            color color-data
      a
        // margin-top 20px
        margin-top 20px
        // padding 0
        color #000
        font-size 1.25rem
        font-weight 700
        text-align center
        background-color #a0a0a0
        border-radius 2px
        height 48px
        line-height 48px
        @media (min-width 768px)
          border-radius 6px
          margin-top 25px
      .content
        flex 1
        position relative
        margin-top 20px
        overflow-y auto
        @media (min-width 768px)
          margin-top 25px
        &-container
          width 100%
          color #fff
          line-height 1.8
          // text-align justify
          // font-weight 300
          p
            & + p
              margin-top 1em
@media (min-width 768px)
  // .eb-landing
    // padding 60px 10%
    // padding 88px 0
    // main
    //   display block
    //   max-width 700px
    //   width 100%
    //   > *
    //     max-width none
    // > a
    //   max-width 700px
    //   width 100%
    // .image
    //   width 100%
    //   text-align center
    //   > img
    //     position static
    //     width 100px
    //     height auto
    // .menu
    //   flex-direction row
    //   margin 55px 0 0 0
    //   .item
    //     width calc(33% - 20px)
    //     padding-top calc((33% - 20px) * .5)
    //     & + .item
    //       margin-top 0
    //     > a
    //       img
    //         width 48px
    .intro
      .intro-container
        max-width 500px
        margin 0 auto
    .credit
      width 100%
</style>
