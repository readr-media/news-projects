<template>
  <main class="hotel-hostess-series">
    <template v-if="routeParams === 'environment'">
      <aside class="menu" :class="{ open: openMenu }">
        <button class="btn" @click="openMenu = false">&#x2715;</button>
        <div>
          <a class="item" @touchstart="$_hotelHostess_handleTouchStart" @touchend="$_hotelHostess_handleTouchEnd">
            <span>問卷結果</span>
          </a>
          <a class="item" @touchstart="$_hotelHostess_handleTouchStart" @touchend="$_hotelHostess_handleTouchEnd">
            <span>工作環境</span>
          </a>
          <a class="item" @touchstart="$_hotelHostess_handleTouchStart" @touchend="$_hotelHostess_handleTouchEnd">
            <span>身心健康</span>
          </a>
          <a class="item" @touchstart="$_hotelHostess_handleTouchStart" @touchend="$_hotelHostess_handleTouchEnd">
            <span>個案分享</span>
          </a>
        </div>
      </aside>
      <section class="heading">
        <div>
          <p>工作環境</p>
          <h1>金萬萬大樓的<br>前世今生</h1>
        </div>
        <button class="btn" @click="openMenu = true">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </section>
      <article class="story">
        <h1>金萬萬大樓的前世今生</h1>
        <p class="foreword">「我是民國74年來的，那時候二樓暗暗的，電扶梯不會動，只有一條走廊有開燈。」金萬萬大樓管委會主委梁素玲說。</p>
        <p>金萬萬名店城座落於台北中山北路，是兩棟住家大樓和辦公大樓的連通處，大樓於民國六十多年落成，當時店家以美日、歐洲舶來品為主。一層樓大約有60個店面，兩層樓便有上百家。二樓隨處可見招牌寫著菲律賓語（Tagalog），販賣菲律賓小吃、換匯、美髮店、雜貨、金飾，如今每逢星期天，聚集眾多菲律賓移工和華僑，成了人們印象中的「小馬尼拉」。
  民國70多年時，梁素玲記得當時地下室是舞廳，日本人來玩，也帶小姐買絲襪。當時她跑單幫批發日本商品，出入顧客都是律師娘、醫師娘或董事長夫人，楊麗花、潘越雲、白冰冰等藝人明星也常來。回憶那個台灣錢淹腳目的時代，梁素玲說：「我一出國，日幣一出去都幾百萬。」每次出國帶新貨，「就貼公告在門口，等我回國，客人早在門口等，皮箱一打開，東西馬上被客人挑走。」那時客人走進舶來品店，不在意自己到底需要什麼，看順眼就下手，賣家也捉住顧客心理，「我們知道客人要的款式、尺寸跟顏色，連客人的肩寬腰圍都知道。」</p>
      </article>
    </template>
  </main>
</template>
<script>
  const PROJECT_NAME = 'hotel-hostess-series'
  export default {
    name: 'HotelHostessSeries',
    metaInfo () {
      let metaUrl = PROJECT_NAME
      let metaImage = `${PROJECT_NAME}/images/og.jpg`
      let ogLocale = 'zh_TW'
      
      return {
        title: '酒店小姐',
        description: '酒店小姐',
        locale: ogLocale,
        metaUrl: metaUrl,
        metaImage: metaImage
      }
    },
    data () {
      return {
        openMenu: false
      }
    },
    computed: {
      routeParams () {
        return this.$route.params.params
      }
    },
    mounted () {
      // if (document.querySelector('.heading')) {
      //   document.querySelector('.heading').classList.remove('blur')
      // }
    },
    methods: {
      $_hotelHostess_handleTouchStart (e) {
        if (e.target.classList.contains('item')) { e.target.classList.add('touch') }
        else { e.target.parentNode.classList.add('touch') }
      },
      $_hotelHostess_handleTouchEnd (e) {
        if (e.target.classList.contains('item')) { e.target.classList.remove('touch') }
        else { e.target.parentNode.classList.remove('touch') }
      },
    }
  }
</script>
<style lang="stylus" scoped>
.hotel-hostess-series
  position relative
  font-size 16px
  line-height 1.67
  font-style normal
  font-family "source-han-sans-traditional", serif
  background-color #1f1f20
  .menu
    display flex
    align-items center
    position fixed
    top 0
    right 0
    z-index 999
    transform translateX(100%)
    width 200px
    height 100vh
    color #165855
    background-color #1f1f20
    transition transform .5s
    &.open
      transform translateX(0)
    > div
      display flex
      flex-direction column
      width 100%
    > button
      position absolute
      top 20px
      right 20px
      color #165855
      font-size 2rem
      line-height 1
      border none
      cursor pointer
      outline none
    .item
      display flex
      justify-content center
      align-items center
      height 90px
      cursor pointer
      &:hover
        color #fff
        background-color rgba(228,0,127,.5)
        span
          &::before
            background-color #fff
      span
        position relative
        margin-top 20px
        &::before
          position absolute
          content ''
          top -20px
          left 0
          width 66.6%
          height 4px
          background-color #165855
      &.touch
        color #fff
        background-color rgba(228,0,127,.5)
        transition background-color .5s
        span
          &::before
            background-color #fff
  .heading
    position relative
    height 90vh
    background-color #fff
    background-image url(/proj-assets/hotel-hostess/images/bg-environment.jpg)
    background-repeat no-repeat
    background-size cover
    background-position 50% 0%
    > div
      position absolute
      left 25px
      bottom 30px
    > button
      position absolute
      top 30px
      right 20px
      border none
      cursor pointer
      outline none
    h1
      margin 30px 0 0
      color #69d2cd
      font-family "source-han-serif-tc", serif
    p
      position relative
      color #1f1f20
      font-family "source-han-serif-tc", serif
      &::before
        content ''
        position absolute
        top -20px
        left 0
        width 40px
        height 4px
        background-color #000
  .story
    position relative
    z-index 10
    padding 40px 10%
    color #fff
    text-align justify
    background-color #1f1f20
    h1
      display none
    p.foreword
      position relative
      font-family "source-han-serif-tc", serif
      &::before
        content ''
        position absolute
        top -20px
        left 0
        width 40px
        height 4px
        background-color #e4007f
  .btn
    padding 5px
    background-color transparent
    > span
      display block
      width 20px
      height 2px
      margin 0 auto
      background-color #165855
      & + span
        margin 5px auto 0px

@media (min-width: 768px)
  .hotel-hostess-series
    .heading
      > div
        left 10%
        bottom 5%
    .story
      padding 5% 20%

@media (min-width: 900px)
  .hotel-hostess-series
    .menu
      right 0
      width 20%
      transform none
    .heading
      position absolute
      top 0
      left 50%
      width 30%
      height 100vh
      transition filter 1s ease 1s
      &.blur
        transform translate(-15px, -15px)
        width calc(30% + 30px)
        height calc(100vh + 30px)
        filter blur(15px)
      > div
        display none
    .story
      width 50%
      min-height 100vh
      padding 5% 10%
      h1
        display block
        color #69d2cd
        font-size 2.25rem
        font-family "source-han-serif-tc", serif
      p:first-of-type
        margin-top 60px
    .btn
      display none
</style>