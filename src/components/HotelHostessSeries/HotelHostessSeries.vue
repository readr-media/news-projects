<template>
  <main class="hotel-hostess-series" :class="style">
    <app-logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/hotel-hostess/images/readr-logo.png"></app-logo>
    <aside class="menu" :class="{ open: openMenu }">
      <button class="btn" @click="openMenu = false">&#x2715;</button>
      <div>
        <a class="item"
          @touchstart="$_hotelHostess_handleTouchStart"
          @touchend="$_hotelHostess_handleTouchEnd">
          <span>問卷結果</span>
        </a>
        <a class="item"
          @touchstart="$_hotelHostess_handleTouchStart"
          @touchend="$_hotelHostess_handleTouchEnd">
          <span>工作環境</span>
        </a>
        <a class="item"
          @touchstart="$_hotelHostess_handleTouchStart"
          @touchend="$_hotelHostess_handleTouchEnd">
          <span>身心健康</span>
        </a>
        <a class="item"
          @touchstart="$_hotelHostess_handleTouchStart"
          @touchend="$_hotelHostess_handleTouchEnd">
          <span>個案分享</span>
        </a>
      </div>
    </aside>
    <section class="heading" :class="routeParams">
      <div>
        <template v-if="routeParams === 'environment'">
          <p>工作環境</p>
          <h1>金萬萬大樓的<br>前世今生</h1>
        </template>
        <template v-else-if="routeParams === 'questionnaire'">
          <p>問卷結果</p>
          <h1>酒店小姐問卷調查結果大公開</h1>
        </template>
      </div>
      <button class="btn" @click="openMenu = true">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </section>
    <template v-if="routeParams === 'environment'">
      <article class="story">
        <h1>金萬萬大樓的前世今生</h1>
        <p class="foreword">「我是民國74年來的，那時候二樓暗暗的，電扶梯不會動，只有一條走廊有開燈。」金萬萬大樓管委會主委梁素玲說。</p>
        <p>金萬萬名店城座落於台北中山北路，是兩棟住家大樓和辦公大樓的連通處，大樓於民國六十多年落成，當時店家以美日、歐洲舶來品為主。一層樓大約有60個店面，兩層樓便有上百家。二樓隨處可見招牌寫著菲律賓語（Tagalog），販賣菲律賓小吃、換匯、美髮店、雜貨、金飾，如今每逢星期天，聚集眾多菲律賓移工和華僑，成了人們印象中的「小馬尼拉」。
  民國70多年時，梁素玲記得當時地下室是舞廳，日本人來玩，也帶小姐買絲襪。當時她跑單幫批發日本商品，出入顧客都是律師娘、醫師娘或董事長夫人，楊麗花、潘越雲、白冰冰等藝人明星也常來。回憶那個台灣錢淹腳目的時代，梁素玲說：「我一出國，日幣一出去都幾百萬。」每次出國帶新貨，「就貼公告在門口，等我回國，客人早在門口等，皮箱一打開，東西馬上被客人挑走。」那時客人走進舶來品店，不在意自己到底需要什麼，看順眼就下手，賣家也捉住顧客心理，「我們知道客人要的款式、尺寸跟顏色，連客人的肩寬腰圍都知道。」</p>
      </article>
    </template>
    <template v-else-if="routeParams === 'questionnaire'">
      <article class="story">
        <h1>酒店小姐問卷調查結果大公開</h1>
        <p class="foreword">多數媒體在報導酒店小姐相關新聞時，傾向抱著獵奇、窺探心態，內容也不脫風花雪月、男歡女愛等話題；尤有甚者，許多報章媒體在報導內容中，甚至流露出訕笑、瞧不起酒店小姐的意味。</p>
        <p class="foreword">然而酒店女陪侍終究是許多人賴以維生的職業，而這個產業形成聚落，並在很長一段時間以來，在檯面下為台灣的經濟貢獻了不小的力量，也是不爭的事實。我們無意歌頌這份工作有多麼偉大，也不想貶低工作者的尊嚴，更不想落入「悲傷敘事」的俗套。我們的著眼點在於 — 既然這是一份工作，那麼這些崗位伴隨的職業風險，就應該被嚴肅地正視與討論。</p>
        <p class="foreword">為了能深入、廣泛地了解酒店小姐的工作狀態與產業環境，我們在徵詢從業人員意見後製作了一份問卷，並在 2018 年 4 月至 7 月間，發放給曾經，或此刻仍現役的酒店小姐們，最後得到 55 份有效問卷，得以初探酒店小姐們們較為概略的群象。</p>
        <p class="foreword">問卷調查發現，酒店小姐因職業所伴隨的身心負擔出乎我們意料之外。這並不如想像中輕鬆，只要陪客人喝酒唱歌，忍受一下「無傷大雅」的性騷擾，或是偶爾性交易「賺外快」，只要是女人「誰都可以做」的工作。</p>
        <p class="foreword">這份工作並不容易。</p>
        <p class="foreword indent"><strong>67% 受訪者表示入行後健康下滑、54.5% 「經常」或「大約一半機率」會在上班日喝醉，更有 23.6% 受訪者主動提及這份工作伴隨「喝醉失憶」困擾。</strong></p>
        <p class="foreword">許多受訪者在問卷中反應，長期喝酒、日夜顛倒已造成他們免疫力與代謝機能下滑、容易生病及疲倦、腸胃消化系統不良等問題。</p>
        <p class="foreword">在心理負擔方面，34.5% 受訪者主動提及酒店工作造成她們情緒或精神壓力。</p>
        <p class="foreword indent"><strong>51% 受訪者曾經求助心理醫生，21.7% 受訪者入行後曾動過輕生念頭，更有 12.7% 執行過至少一次自殺計畫。</strong></p>
        <p class="foreword">以下是我們更多的問卷分析結果。</p>
        <h2>基本背景資料</h2>
        <p class="indent">本問卷填答期間為 2018 年 4 月 18 日至 7 月 1 日，受訪者人數共 55人，平均年齡 24.9 歲，最低 18 歲，最高 44 歲，平均年資 25 個月， 工作範圍涵蓋便服、禮服、制服、日式酒店等。受訪者以禮服店工作者最大宗，佔 50.9 %，另外日式酒店也佔 20%、便禮店佔 23.6%。49% 受訪者擁有大專學歷，5.4% 擁有研究所學歷。54.5 % 受訪者目前是全職酒店工作者，其中約 76.3% 每週工作 3~4 天以上。</p>
        <div class="chart indent">
          <span>酒店工作容易面臨狀況</span>
          <div></div>
        </div>
        <p class="indent">在性向認同上，僅有 58.1% 受訪者認為自己是異性戀，並有高達 34.5% 認為自己是雙性戀、5.4% 認為自己是戀物者、疑性戀、泛性戀；選答同性戀者僅 1.8%。</p>
      </article>
    </template>
    <footer class="share">
      <a class="item" href=""><img src="/proj-assets/hotel-hostess/images/share-fb.png" alt=""></a>
      <a class="item" href=""><img src="/proj-assets/hotel-hostess/images/share-line.png" alt=""></a>
      <a class="item" href=""><img src="/proj-assets/hotel-hostess/images/share-gplus.png" alt=""></a>
    </footer>
  </main>
</template>
<script>
  import Logo from '../Logo.vue'

  const PROJECT_NAME = 'hotel-hostess-series'

  export default {
    name: 'HotelHostessSeries',
    components: {
      'app-logo': Logo,
    },
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
      style () {
        if (this.$route.params.params === 'environment') {
          return 'image'
        }
        return 'text' 
      },
      routeParams () {
        return this.$route.params.params
      }
    },
    beforeCreate () {
      const route = this.$route.params.params
      if (route !== 'environment' && route !== 'questionnaire') {
        this.$router.replace({ path: '/project/hotel-hostess' })
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
  p
    font-weight 300
  &.image
    .heading
      height 90vh
  &.text
    .heading
      height 60vh
      p
        color #fff
        &::before
          background-color #fff
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
    background-repeat no-repeat
    background-size cover
    background-position 50% 0%
    &.environment
      background-image url(/proj-assets/hotel-hostess/images/bg-environment.jpg)
    > div
      position absolute
      left 10%
      right 10%
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
    padding 80px 10% 40px
    color #fff
    text-align justify
    background-color #1f1f20
    h1
      display none
    h2
      margin 4em 0 2em
      color #69d2cd
      font-size 1.625rem
      font-weight 300
    p
      margin 0
      line-height 2
      strong
        color #e4007f
        font-size 1.3125rem
        font-weight 300
    p + p
      margin-top 3em
    p.foreword
      font-weight 600
      font-family "source-han-serif-tc", serif
      &:first-of-type
        position relative
        &::before
          content ''
          position absolute
          top -20px
          left 0
          width 40px
          height 4px
          background-color #e4007f
    .chart
      margin-top 40px
      span
        padding .2em .5em
        color #1f1f20
        font-size .875rem
        line-height 1
        background-color #c9c9c9
      > div
        position relative
        left -12.5%
        width 125%
        margin-top 20px
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
  .share
    display flex
    justify-content center
    padding 50px 0
    .item
      margin 0
      font-size 0
      & + .item
        margin-left 15px
      img
        width 36px

@media (min-width: 768px)
  .hotel-hostess-series
    &.text
      .heading
        height 30vh
    .heading
      > div
        left 20%
        right 20%
        bottom 5%
    .story
      padding 10% 20% 5%

@media (min-width: 900px)
  .hotel-hostess-series
    &.image
      .story
        width 50%
      .heading
        height 100vh
    &.text
      .story
        width 80%
    .menu
      right 0
      width 20%
      transform none
    .heading
      position fixed
      top 0
      left 50%
      width 30%
      transition filter 1s ease 1s
      &.blur
        transform translate(-15px, -15px)
        width calc(30% + 30px)
        height calc(100vh + 30px)
        filter blur(15px)
      > div
        display none
    .story
      min-height 100vh
      padding 5% 10%
      h1
        display block
        color #69d2cd
        font-size 2.25rem
        font-family "source-han-serif-tc", serif
      h2
        margin 3em 0 1.5em
      p + p
        margin-top 2em
      p:first-of-type
        margin-top 60px
      .indent
        padding-left 5%
    .btn
      display none
    .share
      justify-content flex-start
      padding 50px 0 50px 10%
</style>