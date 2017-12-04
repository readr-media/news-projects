<template>
  <div class="marathon" :class="{ loading: isFirstLoading }">
    <logo :top="`10px`" :left="`10px`" :bgColor="`#000`" :border="`1px solid #fff`"></logo>
    <share :shareUrl="shareLink" :top="`60px`" :left="`10px`" :bgColor="`#000`" :border="`1px solid #fff`"></share>
    <div class="opening" v-show="isFirstLoading"></div>
    <marathon-game v-on:changeSelectedTime="$_marathon_changeSelectedTime" v-on:detectFirstLoaded="$_marathon_detectFirstLoaded"></marathon-game>
    <section class="intro">
      <div class="intro__content">
        <p>看完了六大馬，台灣跑者的跑步習慣又是什麼呢？因為台北馬不提供資料，我們嘗試從 Garmin 的用戶資料來看看，能夠在時限內完成台北馬（ 5 小時 30 分）的人都是什麼樣的人？跑完一個馬拉松，又需要什麼樣的訓練呢？</p>
        <p>參加 2016 年台北馬拉松的 5560 名參賽者，有 34% 的人使用 Garmin 手錶紀錄。這些成功完賽的選手們⋯⋯</p>
        <span>這些成功完賽的選手們</span>
        <div class="triangle" @click="$_marathon_scrollTo(1)"></div>
        <div class="intro__menu">
          <div @click="$_marathon_scrollTo(1)">
            <img v-lazy="`/proj-assets/marathon/images/intro-icon-01.png`">
            <p>平常有運動習慣嗎？</p>
          </div>
          <div @click="$_marathon_scrollTo(2)">
            <img v-lazy="`/proj-assets/marathon/images/intro-icon-02.png`">
            <p>練習的強度如何呢？</p>
          </div>
          <div @click="$_marathon_scrollTo(3)">
            <img v-lazy="`/proj-assets/marathon/images/intro-icon-03.png`">
            <p>我想要變更厲害！</p>
          </div>
          <div @click="$_marathon_scrollTo(5)">
            <img v-lazy="`/proj-assets/marathon/images/intro-icon-04.png`">
            <p>大家平常都在哪裡練習呢？</p>
          </div>
        </div>
        <img class="intro__decoration--mobile" src="/proj-assets/marathon/images/intro-m.png">
      </div>
      <div class="intro__decoration--desktop">
        <div class="intro__decoration--lroad"></div>
        <img class="intro__decoration--sroad" v-lazy="`/proj-assets/marathon/images/intro-d.png`">
      </div>
    </section>
    <section class="chart chart--1">
      <div class="chart__content">
        <h1>平常有運動習慣嗎？</h1>
        <h2>每週跑步次數</h2>
        <p>想要完成一個馬拉松，要花多少時間訓練呢？ Garmin 跑步學堂教練林駿豪表示，訓練週期最少是 12 週，但 16 週以上為佳。我們以 16 週（台北馬拉松在 12 月舉行，往回推 4 個月，一般跑者也會避開難以密集訓練的溽暑）為週期，分析成功完賽的跑者們的訓練情形。</p>
        <p>林駿豪提到，一週「最少」要能抽出 3 至 4 天跑步，其他時間可以做其他運動來平衡，如游泳、單車、肌力訓練等等。</p>
        <p>從數據看來，正好從每週跑步（大於、小於） 3 次將全部的人分成一半，要堅持運動習慣真不是一件容易的事啊！</p>
        <marathon-chart :chart="1" ></marathon-chart>
        <img class="left" v-lazy="`/proj-assets/marathon/images/chart-01.png`">
      </div>
    </section>
    <section class="chart chart--2">
      <div class="chart__content">
        <h1>練習的強度如何呢？</h1>
        <h2>每週跑步距離</h2>
        <p>林駿豪建議以時間來做跑量的評估，週間一次至少 1 小時，週末則可以做 1.5 小時至 2 小時的練習。若以 6 分鐘一公里的速度來看，週跑量會落在 40 至 60 公里。</p>
        <p>從數據來看，有 30% 的人達到這個標準。看來每週都至少要有一點付出，才能成功完成全馬喔！</p>
        <marathon-chart :chart="2" ></marathon-chart>
        <img class="right" v-lazy="`/proj-assets/marathon/images/chart-02.png`">
      </div>
    </section>
    <section class="chart chart--3">
      <div class="chart__content">
        <h1>我想要變更厲害！</h1>
        <h2>高手們平常是怎麼練習？</h2>
        <p>若將這些選手以完賽時間加以分組，則完全印證了「一分耕耘，一分收穫」的說法。</p>
        <p>我們將選手分成四組，分別是成功完賽在關門時間前通過終點的「5.5 小時」、以及馬拉松跑者用以評估自己實力的「SUB 5」（意即在 5 小時內完賽）、「SUB 4」、「SUB 3」。發現隨著成績提升，每週的訓練強度就要愈強。</p>
        <p>若想要微笑通過終點，平時的努力真是不能少啊！</p>
        <marathon-chart class="chart--3" :chart="3" ></marathon-chart>
        <marathon-chart :chart="4" ></marathon-chart>
        <img class="left" v-lazy="`/proj-assets/marathon/images/chart-03.png`">
      </div>
    </section>
    <section class="chart chart--5">
      <div class="chart__content">
        <h1>大家平常都在哪裡練習呢？</h1>
        <h2>我也想加入！</h2>
        <p>台北馬拉松果然是台灣最盛大的一場路跑賽事，吸引了全台灣的人來報名參加！看來台南的鄉親最熱情！</p>
        <marathon-chart :chart="5" ></marathon-chart>
        <img class="right" v-lazy="`/proj-assets/marathon/images/chart-04.png`">
      </div>
    </section>
    <section class="chart chart--6">
      <div class="chart__content">
        <h1>2017 年台北馬拉松即將開始！</h1>
        <p>你是選手嗎？歡迎完賽之後在頁首輸入你的完賽時間，我們讓你在線上與全世界的跑者較勁！如果你沒有報名， 12 月 17 日一起到會場為選手們加油吧！</p>
        <img class="left" v-lazy="`/proj-assets/marathon/images/chart-05.png`">
      </div>
    </section>
    <section class="credit">
      <div class="mobile">
        <span>文字：李又如</span>
        <span>視覺設計：許玲瑋、v_k</span>
        <span>網頁製作：HY Tan</span>
        <span>Mirrormedia 2017.12</span>
        <img v-lazy="`/proj-assets/marathon/images/credit-m.png`">
      </div>
      <div class="desktop">
        <span>文字：李又如<br>視覺設計：許玲瑋、v_k<br>網頁製作：HY Tan</span>
        <img v-lazy="`/proj-assets/marathon/images/credit-d.png`">
      </div>
    </section>
    <section class="related">
      <iframe src="https://www.mirrormedia.mg/project-list/dark?excluding=marathon"  width="100%" frameborder="0" scrolling="no" style="width: 1px; min-width: 100%; *width: 100%;"></iframe>
    </section>
    <section class="facebook">
      <div class="fb-comments" data-href="https://www.mirrormedia.mg/projects/rent-house/" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </section>
  </div>
</template>
<script>
  import { smoothScroll } from 'kc-scroll'
  import { SITE_URL } from '../../constants'
  import _ from 'lodash'
  import Logo from '../Logo.vue'
  import MarathonChart from './MarathonChart.vue'
  import MarathonGame from './MarathonGame.vue'
  import Share from '../Share.vue'
  import moment from 'moment'
  import titleMeta from '../../util/titleMeta'

  export default {
    name: 'MarathonProject',
    components: {
      'logo': Logo,
      'marathon-chart': MarathonChart,
      'marathon-game': MarathonGame,
      'share': Share,
    },
    mixins: [ titleMeta ],
    data () {
      return {
        currentScroll: 0,
        hasChangeSelectedTime: false,
        isFirstLoading: true,
        isLoading: true,
        shareLink: 'location.href'
      }
    },
    metaInfo () {
      let description = '台灣人瘋路跑， 2016 年全年就有 599 場大大小小的路跑，還瘋到國外去！你知道全球六大馬是哪六大嗎？你也許抽過東京馬拉松卻槓龜，沒關係，鏡傳媒帶你一次玩跑！'
      let ogImage = 'marathon/images/og.jpg'
      let metaUrl = 'marathon'

      if (this.$route.params.params) {
        const raceEN = _.split(this.$route.params.params, '-')[0]
        const time = moment.utc(_.split(this.$route.params.params, '-')[1] * 1000).format('HH:mm:ss')
        const rank = _.split(this.$route.params.params, '-')[2]
        let race
        switch(raceEN) {
          case 'chicago':
            race = '芝加哥'
            ogImage = 'marathon/images/og-chicago.jpg'
          case 'newyork':
            race = '紐約'
            ogImage = 'marathon/images/og-newyork.jpg'
          case 'berlin':
            race = '柏林'
            ogImage = 'marathon/images/og-berlin.jpg'
          case 'london':
            race = '倫敦'
            ogImage = 'marathon/images/og-london.jpg'
          case 'tokyo':
            race = '東京'
            ogImage = 'marathon/images/og-tokyo.jpg'
          default:
            race = '波士頓'
            ogImage = 'marathon/images/og-boston.jpg'
        }
        description = `我剛剛跑完${race}馬拉松獲得第${rank}名 時間${time}！你也一起來吧！台灣人瘋路跑， 2016 年全年就有 599 場大大小小的路跑，還瘋到國外去！你知道全球六大馬是哪六大嗎？你也許抽過東京馬拉松卻槓龜，沒關係，鏡傳媒帶你一次玩跑！`
        metaUrl = `marathon/${this.$route.params.params}`
      }
      return {
        title: '鍵盤玩跑六大馬',
        description: description,
        metaUrl: metaUrl,
        metaImage: ogImage
      }
    },
    beforeMount () {
    },
    mounted () {
      window.addEventListener('scroll', this.$_marathon_scrollEvent)
      window.ga('send', 'pageview')
    },
    methods: {
      $_marathon_changeSelectedTime(shareLink) {
        this.hasChangeSelectedTime = true
        this.shareLink = `${SITE_URL}marathon${shareLink}`
      },
      $_marathon_detectFirstLoaded() {
        this.isFirstLoading = false
      },
      $_marathon_scrollEvent() {
        const vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const intro = document.querySelector('.intro').offsetTop
        const chart1 = document.querySelector('.chart--1').offsetTop
        const chart2 = document.querySelector('.chart--2').offsetTop
        const chart3 = document.querySelector('.chart--3').offsetTop
        const chart5 = document.querySelector('.chart--5').offsetTop
        const chart6 = document.querySelector('.chart--6').offsetTop
        const related = document.querySelector('.related').offsetTop

        if (scrollTop > (intro - ((vh / 3) * 2)) && this.currentScroll < 1) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 2', { nonInteraction: true })
        }
        if (scrollTop > (chart1 - ((vh / 3) * 2)) && this.currentScroll < 2) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 3', { nonInteraction: true })
        }
        if (scrollTop > (chart2 - ((vh / 3) * 2)) && this.currentScroll < 3) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 4', { nonInteraction: true })
        }
        if (scrollTop > (chart3 - ((vh / 3) * 2)) && this.currentScroll < 4) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 5', { nonInteraction: true })
        }
        if (scrollTop > (chart5 - ((vh / 3) * 2)) && this.currentScroll < 5) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 6', { nonInteraction: true })
        }
        if (scrollTop > (chart6 - ((vh / 3) * 2)) && this.currentScroll < 6) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 7', { nonInteraction: true })
        }
        if (scrollTop > (related - ((vh / 3) * 2)) && this.currentScroll < 7) {
          this.currentScroll += 1
          ga('send', 'event', 'projects', 'scroll', 'scroll to 8', { nonInteraction: true })
        }
      },
      $_marathon_scrollTo(chart) {
        switch(chart) {
          case 2:
            this.smoothScroll('.chart.chart--2')
            window.ga('send', 'event', 'projects', 'click', `select avg km`, { nonInteraction: true })
            return
          case 3:
            this.smoothScroll('.chart.chart--3')
            window.ga('send', 'event', 'projects', 'click', `select how`, { nonInteraction: true })
            return
          case 5:
            this.smoothScroll('.chart.chart--5')
            window.ga('send', 'event', 'projects', 'click', `select where`, { nonInteraction: true })
            return
          default:
            this.smoothScroll('.chart.chart--1')
            window.ga('send', 'event', 'projects', 'click', `select habits`, { nonInteraction: true })
        }
      },
      smoothScroll
    },
  }
</script>
<style lang="stylus" scoped>

h1, h2, h3
  margin 0

p
  font-size 18px
  font-weight 300
  text-align justify
  line-height 1.5
  &:first-of-type
    margin-top 0
  &:last-of-type
    margin-bottom 0

button
  cursor pointer
img
  width 100%
  height auto
  vertical-align middle

.btn--img
  font-size 0 !important

.btn--filter
  width 64px
  height 20px
  font-size 14px
  background-color #fff !important
  border-radius 3px
  &.selected
    border 2px solid #333
  &:nth-last-of-type(4)
    margin-right 20px
.marathon
  position relative
  width 100%
  height auto
  background-image url(/proj-assets/marathon/images/bg.png)
  background-repeat repeat
  background-size 36px 768px
  overflow hidden
  &.loading
    height 100vh
.opening
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 900
  width 100%
  height 100vh
  background-color rgba(0,0,0,.5)
  background-image url(/proj-assets/marathon/images/loading-m.png)
  background-repeat no-repeat
  background-size cover
  background-position center center
.map
  display flex
  flex-direction column
  position relative
  width 100%
  height 100vh
  max-height 736px
  color #333
  font-size 18px
  background-color #cbc6bf
  &__menu
    position relative
    padding 38px 0 0
    padding-left calc((100% - 300px) / 2)
    padding-right calc((100% - 300px) / 2)
    background-image url(/proj-assets/marathon/images/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px
    
    > div
      display flex
      flex-wrap wrap
      justify-content space-between
      margin 5px auto
      span
        margin 10px auto 0
    button
      display flex
      justify-content center
      align-items center
      position relative
      width 80px
      height 80px
      margin 5px 0
      padding 0
      color #fff
      font-size 20px
      text-align center
      background-color #333
      border none
      border-radius 5px
      &.selected
        &:after
          content ""
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          width 100%
          height 100%
          background-color #fff
          background-size 60px 60px
          background-repeat no-repeat
          background-position center center
          border-radius 5px
      &.boston
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-boston.jpg)    
      &.chicago
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-chicago.jpg)
      &.newyork
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-newyork.jpg)
      &.berlin
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-berlin.jpg)
      &.london
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-london.jpg)
      &.tokyo
        &.selected
          &:after
            background-image url(/proj-assets/marathon/images/logo-tokyo.jpg)
  &__userTime
    display flex
    align-items center
    position relative
    width 100%
    height 18px
    margin 5px 0
    input[type="range"]
      -webkit-appearance none
      appearance none
      width 100%
      margin 0 auto
      background transparent
    input[type=range]:focus
      outline none
    input[type=range]::-ms-track
      width 100%
      cursor pointer
      background transparent
      border-color transparent
      color transparent
    input[type=range]::-webkit-slider-thumb
      -webkit-appearance none
      width 8px
      height 16px
      padding 2.5px
      margin-top -5px
      background #e9edf3
      border 2px solid #333
      cursor pointer
      pointer-events auto
    input[type=range]::-moz-range-thumb
      width 8px
      height 16px
      padding 2.5px
      background #e9edf3
      border 2px solid #333
      cursor pointer
      pointer-events auto
    input[type=range]::-ms-thumb
      width 8px
      height 16px
      padding 2.5px
      background #e9edf3
      border 2px solid #333
      cursor pointer
      pointer-events auto
    input[type=range]::-webkit-slider-runnable-track
      width: 100%
      height 5px
      cursor pointer
      background: #fff
      border-radius 5px
    input[type="range"]::-moz-range-track
      width: 100%
      height 5px
      cursor pointer
      background: #fff
      border-radius 5px
    input[type=range]::-ms-track
      width: 100%
      height 5px
      cursor pointer
      background: #fff
      border-radius 5px
    // &--full
    //   position absolute
    //   top 5px
    //   left 0
    //   right 0
    //   width 100%
    //   height 5px
    //   background-color #fff
    //   border-radius 5px
    // &--current
    //   position absolute
    //   top 5px
    //   left 0
    //   right 0
    //   width 50%
    //   height 5px
    //   background-color #000
    //   border-radius 5px
    // &--btn
    //   position absolute
    //   top 0
    //   left 50%
    //   right 0
    //   width 8px
    //   height 15px
    //   background-color #e9edf3
    //   border 2px solid #333
    //   transform translateX(-50%)
  &__userTimeInfo
    display flex
    justify-content center !important
    align-items center
    img
      width 29px
      height 20px
    span
      margin 0 0 0 10px !important
  &__images
    flex-grow 1
    display flex
    align-items center
    position relative
    width 100%
    canvas
      position absolute
      top 0
      left 0
      right 0
      bottom 0
    &--compass
      position absolute
      bottom 5%
      right calc((100% - 300px) / 2)
      width 30px
      height auto
  &__control
    padding 10px 0
    padding-left calc((100% - 300px) / 2)
    padding-right calc((100% - 300px) / 2)
    button
      padding 0
      margin 0 5px
      background none
      border none
      img
        width auto
        height 18px
    button:last-of-type
      margin-right 0
  &__timeInfo
    display flex
    justify-content space-between
    &--timerMobile
      font-size 18px
    &--timerDesktop
      display none
    &--control
      display flex
    
  &__sliderBar
    display flex
    flex-direction column
    margin-top 5px
  &__sliderBarTrack
    display flex
    align-items center
    position relative
    width 100%
    height 20px
    &--fullTime
      position absolute
      top 5px
      left 0
      right 0
      width 100%
      height 5px
      background-color #000
      border-radius 5px
      cursor pointer
    &--currentTime
      position absolute
      top 5px
      left 0
      width 0
      height 5px
      background-color #ffad5e
      cursor pointer
    &--trackbutton
      position absolute
      top 2px
      left 0
      width 11px
      height 11px
      background-color #ffad5e
      border-radius 11px
  &__sliderBarControl
    display flex
    align-self flex-end
    button
      padding 0
      margin 0 5px
      font-size 14px
      background none
      border none
      &.selected
        color #ffad5e
    button:last-of-type
      margin-right 0

.intro
  display flex
  justify-content center
  align-items center
  position relative
  height 100vh
  max-height 736px
  padding 76px 5%
  color #fff
  text-align center
  &::before
    content ""
    position absolute
    top 0
    left 0
    right 0
    z-index 10
    width 100%
    height 38px
    background-image url(/proj-assets/marathon/images/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px
  &::after
    content ""
    position absolute
    bottom 0
    left 0
    right 0
    z-index 10
    width 100%
    height 38px
    background-image url(/proj-assets/marathon/images/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px
  span
    display block
    margin 1em 0
    font-size 22px
  .triangle
    width 0
    height 0
    margin 0 auto
    background none
    border-style solid
    border-width 15px 15px 0 15px
    border-color #fff transparent transparent transparent
    cursor pointer
  &__decoration
    &--mobile
      position absolute
      bottom 36px
      left 0
      right 0
      z-index 11
      width 80%
      margin 0 auto
    &--desktop
      display none
    &--road
      display none
  &__menu
    display none
    > div
      cursor pointer
.chart
  position relative
  padding 110px 5% 58px
  text-align center
  background-color #fff
  &::before
    content ""
    position absolute
    top -20px
    left 50%
    z-index 10
    width 100px
    height 100px
    transform translateX(-50%)
    background-repeat no-repeat
    background-size 100px 100px
  &::after
    content ""
    position absolute
    bottom 0
    left 0
    right 0
    z-index 10
    width 100%
    height 38px
    background-image url(/proj-assets/marathon/images/road-02.png)
    background-repeat repeat-x
    background-size 19px 38px
  &__content
    width 100%
  h1
    font-size 28px
    margin-bottom 16px
  h2
    margin-bottom 30px
    color #4d4d4d
    font-size 20px
  p
    font-size 16px
  img
    display none
  &.chart--1
    &::before
      background-image url(/proj-assets/marathon/images/intro-icon-01.png)
  &.chart--2
    &::before
      background-image url(/proj-assets/marathon/images/intro-icon-02.png)
  &.chart--3
    &::before
      background-image url(/proj-assets/marathon/images/intro-icon-03.png)
  &.chart--5
    &::before
      background-image url(/proj-assets/marathon/images/intro-icon-04.png)
  &.chart--6
    &::before
      background-image url(/proj-assets/marathon/images/intro-icon-05.png)
.credit
  position relative
  span
    display block
    margin .5em 0
    color #fff
    font-size 12px
    font-weight 300
  .desktop
    display none
    span
      position absolute
      top 10px
      left 50%
      transform translateX(-50%)
  .mobile
    margin 20px 0 20px
    text-align center
    img
      display block
      width 60px
      margin 10px auto

.related
  padding 0 5%
  min-height 100px
  margin-bottom 10px
  iframe
    height 343px
.facebook
  width 90%
  margin 0 auto 20px
@media (max-width: 899px)
  .desktop-only
    display none

@media (min-width: 375px)
  .map__menu
    button
      width 90px
      height 90px
@media (min-width: 600px)
  .map
    height auto
    max-height none
    &__menu
      flex-grow 0
      padding-left calc((100% - 360px) / 2)
      padding-right calc((100% - 360px) / 2)
      > div
        width 360px
        margin 5px auto
      button
        width 100px
        height 100px
        margin 5px 10px
    &__images
      margin 2% 0
      &--compass
        width 50px
        right calc((100% - 360px) / 2)
    
    &__control
      padding-top 0
      padding-bottom 0
      padding-left calc((100% - 360px) / 2)
      padding-right calc((100% - 360px) / 2)
      margin 2% 0
  .intro
    height auto
    padding 30% 20%
  .chart
    padding-left 10%
    padding-right 10%
    padding-bottom calc(48px + 5%)
    
  
  .credit
    > div
      margin 40px 0
    span
      font-size 16px
    .mobile
      width 300px
      margin 20px auto
  .related
    padding 0 10%
  .facebook
    width 80%
@media (min-width: 768px)
  .related
    iframe
      height 331px
@media (min-width: 900px)
  section:not(:first-of-type)
    // padding 20% 0 40%
    &::before
      display none
    &::after
      display none
  .mobile-only
    display none
  .map
    height auto
    &__menu
      position absolute
      top 0
      left 70px
      z-index 10
      padding 16px 12px
      background-image none
      background-color rgba(233,237,243, .6)
      > div
        span
          margin 0
          font-size 16px
      > div:nth-of-type(2)
        margin-top 10px
      button
        width 50px
        height 50px
        margin 0 5px
        font-size 14px
        border-radius 5px
        &.selected
          &:after
            background-size 40px 40px
            border-radius 5px
      button:first-of-type
        margin-left 0
      button:last-of-type
        margin-right 0
    &__images
      max-width 1500px
      margin 0 auto 70px
      &--compass
        right 10%
        bottom 10%
    &__userTime
      flex-grow 1
      display flex
      align-items center
      width auto
      margin 0 0 0 10px
    &__userTimeInfo
      margin 10px auto 0 !important
      justify-content flex-end !important
    &__control
      position absolute
      left auto
      right 10%
      bottom 5%
      z-index 10
      width auto
      padding 0
      margin 0
      button
        img
          height 14px
    &__timeInfo
      &--control
        width 100%
        button:nth-of-type(3)
          margin-left 0
      &--timerMobile
        display none
      &--timerDesktop
        display block
    &__sliderBarControl
      display flex
      justify-content space-between
      align-items center
      width 100%
      > div
        display flex
  .opening
    background-image url(/proj-assets/marathon/images/loading-d.png)
  .intro
    max-height none
    padding 0
    &__content
      width 50%
      margin-top 10vh
      margin-bottom 350px
    &__decoration
      &--mobile
        display none
      &--desktop
        display flex
        flex-direction column
        position absolute
        top 0
        left 50%
        right 0
        bottom 0
        width 800px
        height 100%
        margin 0
        transform translateX(-50%)
      &--lroad
        display block
        width 100%
        flex-grow 1
        background-image url(/proj-assets/marathon/images/road-03.png)
        background-repeat repeat-y
        background-size 35px auto
      &--sroad
        width 100%
      // &--rroad
      //   display block
      //   width 100%
      //   height 50px
      //   flex-grow 1
      //   background-image url(/public/Marathon/bg-road-03.png)
      //   background-repeat repeat-y
      //   background-size 29px auto
      //   background-position right bottom
      // &--desktop
      //   display block
      //   position absolute
      //   bottom 0
      //   left 50%
      //   width 800px
      //   height auto
      //   transform translateX(-50%)
      //   z-index 10
      // &--road
      //   display block
      //   position absolute
      //   top 0
      //   left 50%
      //   width 800px
      //   height 380px
      //   transform translateX(-50%)
      //   background-image url(/public/Marathon/bg-road-03.png)
      //   background-repeat repeat-y
      //   background-size 35px auto
    &__menu
      position absolute
      left 50%
      bottom 50px
      z-index 20
      display flex
      justify-content space-between
      width 600px
      transform translateX(-50%)
      img
        width 100px
        height 100px
      p
        width 100px
        height 110px
        margin 20px 0 0
        padding 0 23px
        writing-mode vertical-rl
      > div
        position relative
        z-index 20
    // &__decoration--desktop
    //   position absolute
    //   top 0
    //   left 10%
    //   right 10%
    //   bottom 0
    //   width 80%
    //   height 100%
    //   background-image url(/public/Marathon/bg-intro-desktop.png)
    //   background-size contain
  .chart
    position relative
    padding 0
    margin-bottom 100px
    &::before
      content none
    
    &__content
      position relative
      width 800px
      padding 70px 0 30px
      margin 0 auto
      &::after
        content ''
        display block
        position absolute
        bottom -100px
        z-index 500
        width 35px
        height 100px
        background-image url(/proj-assets/marathon/images/road-03.png)
        background-size 40px auto
        background-repeat repeat-y
        background-position right top
    p
      width 700px
      margin-left auto
      margin-right auto
      line-height 1.7
    &.chart--6
      padding-bottom 5%
      
  .chart--1, .chart--2
    .chart__content::after
      right 0
  .chart--3, .chart--4
    .chart__content::after
      left 0
  .chart--6
    margin-bottom 0
    .chart__content::after
      content none
  .credit
    position relative
    margin-bottom 100px
    
    .desktop
      display block
      width 800px
      margin 0 auto
      img
        width 100%
      span
        text-align center
        line-height 1.5
      &::after
        content ""
        position absolute
        bottom 2px
        right 0
        z-index 10
        width calc((100% - 800px) / 2)
        height 33px
        background-image url(/proj-assets/marathon/images/road-02.png)
        background-repeat repeat-x
        background-size auto 33px
    .mobile
      display none
  .related
    width 755px
    padding 0
    margin-left auto
    margin-right auto
  .facebook
    width 60%

@media (min-width: 1100px)
  .intro
    &__decoration
      &--desktop
        width 900px !important
      &--lroad
        background-size 39px auto
  .chart
    img
      display inline
      position absolute
      top 0
      z-index 510
      width 230px
      &.left
        left 20px
        transform translate(-50%, -25%)
      &.right
        right 30px
        transform translate(50%, -25%)
    &__content
      width 900px
  .credit
    .desktop
      width 900px
      &::after
        bottom 3px
        height 36px
        width calc((100% - 900px) / 2)
        background-size auto 36px

@media (min-width: 1300px)
  .intro
    &__content
      width 50%
    &__menu
      bottom 60px

@media (min-width: 1500px)
  .intro__decoration--desktop
    width 1100px !important
  .intro__decoration--lroad
    background-size 48px auto
  .intro
    span
      margin-top 5em
    &__content
      width 45%
      margin-bottom 400px
    &__menu
      bottom 120px
      width 700px
      img
        width 110px
        height 110px
      p
        width 110px
        padding 0 28px
  .map
    &__control
      right 20%
    &__images
      margin-bottom 0
      &--compass
        bottom 15%
  .chart
    img
      &.left
        left 70px
      &.right
        right 70px
    &__content
      width 1100px
      &::after
        width 47px
        background-size 47px auto
  .credit
    .desktop
      width 1100px
      &::after
        bottom 3px
        height 45px
        width calc((100% - 1100px) / 2)
        background-size auto 45px

</style>