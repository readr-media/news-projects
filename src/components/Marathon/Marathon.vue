<template>
  <div class="marathon">
    <marathon-game></marathon-game>
    <section class="intro">
      <div class="intro__content">
        <p>看完了六大馬，台灣跑者的跑步習慣又是什麼呢？因為台北馬不願意提供資料，我們嘗試從 Garmin 的用戶資料來看看，跑台北馬的人都是什麼樣的人，如果你想要完成一個馬拉松，並在時限內完賽（台北馬限時 5 小時 30 分）又需要什麼樣的訓練呢？</p>
        <p>參加 2016 年台北馬拉松的 5560 名參賽者，有 34% 的人使用 Garmin 手錶紀錄。這些成功完賽的選手們⋯⋯</p>
        <span>這些成功完賽的選手們</span>
        <div class="triangle" @click="smoothScroll('.chart--01')"></div>
        <div class="intro__menu">
          <div @click="smoothScroll('.chart--1')">
            <img src="/proj-assets/marathon/images/intro-icon-01.png">
            <p>平常有運動習慣嗎？</p>
          </div>
          <div @click="smoothScroll('.chart--2')">
            <img src="/proj-assets/marathon/images/intro-icon-02.png">
            <p>平均每週跑多少公里？</p>
          </div>
          <div @click="smoothScroll('.chart--3')">
            <img src="/proj-assets/marathon/images/intro-icon-03.png">
            <p>臨時抱佛腳指數？</p>
          </div>
          <div @click="smoothScroll('.chart--5')">
            <img src="/proj-assets/marathon/images/intro-icon-04.png">
            <p>大家平常都在哪裡練習？</p>
          </div>
          <div @click="smoothScroll('.chart--6')">
            <img src="/proj-assets/marathon/images/intro-icon-05.png">
            <p>高手們都怎麼練習？</p>
          </div>
        </div>
        <img class="intro__decoration--mobile" src="/proj-assets/marathon/images/intro-m.png">
      </div>
      <div class="intro__decoration--desktop">
        <div class="intro__decoration--lroad"></div>
        <img class="intro__decoration--sroad" src="/proj-assets/marathon/images/intro-d.png">
      </div>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="1"
        :chartPosition="`right`"
        :chartPeopleImage="`01`"
        :chartSubtitle="`每週跑步次數`"
        :chartTitle="`平常有運動習慣嗎？`">
      </marathon-chart>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="2"
        :chartDescr="`小於10K的是零！看來每週都至少要有一點付出，才能成功完成全馬喔！`"
        :chartPeopleImage="`02`"
        :chartTitle="`平均每週跑多少公里？`">
      </marathon-chart>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="3"
        :chartPosition="`right`"
        :chartPeopleImage="`03`"
        :chartSubtitle="`每月跑量`"
        :chartTitle="`臨時抱佛腳指數？`">
      </marathon-chart>
      <marathon-chart
        :chart="4"
        :chartDescr="`愈靠近比賽，跑步的次數跟里程數果然愈高！`"
        :chartPosition="`right`">
      </marathon-chart>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="5"
        :chartPeopleImage="`04`"
        :chartSubtitle="`我也想加入！`"
        :chartTitle="`這些人平常都在哪裡練習呢？`">
      </marathon-chart>
    </section>
    <section class="chart">
      <marathon-chart
        :chart="6"
        :chartPosition="`right`"
        :chartSubtitle="`我想要變更厲害！`"
        :chartTitle="`高手們平常是怎麼練習？`">
      </marathon-chart>
      <marathon-chart
        :chart="7"
        :chartPeopleImage="`05`"
        :chartPosition="`right`">
      </marathon-chart>
    </section>
    <section class="credit">
      <div class="mobile">
        <span>文字：李又如 視覺設計：許玲瑋、v_k 網頁製作： HY Tan</span>
        <img src="/proj-assets/marathon/images/credit-m.png">
      </div>
      <div class="desktop">
        <span>文字：李又如<br>視覺設計：許玲瑋、v_k<br>網頁製作：HY Tan</span>
        <img src="/proj-assets/marathon/images/credit-d.png">
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
  import MarathonChart from './MarathonChart.vue'
  import MarathonGame from './MarathonGame.vue'

  export default {
    name: 'MarathonProject',
    components: {
      'marathon-chart': MarathonChart,
      'marathon-game': MarathonGame
    },
    data () {
      return {
      }
    },
    beforeMount () {
    },
    mounted () {
      // window.addEventListener('resize', this.$_marathon_resize)
    },
    methods: {
      $_marathon_resize() {
        // canvasW = document.querySelector('.map__images').offsetWidth
        // canvasH = document.querySelector('.map__images').offsetHeight
        // const ratio = Math.min(canvasW / app.renderer.width, canvasH / app.renderer.height)
        // app.stage.scale.x = ratio
        // app.stage.scale.y = ratio
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
  width 100%
  background-image url(/proj-assets/marathon/images/bg.png)
  background-repeat repeat
  background-size 36px 768px
  overflow hidden
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
  padding 5% 5% 48px
  background-color #fff
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

.credit
  position relative
  span
    display block
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
    margin 20px 0 40px
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
      width 100px
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
    padding-top 0
    padding-bottom 0
  
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
  
  .credit
    .desktop
      width 1100px
      &::after
        bottom 3px
        height 45px
        width calc((100% - 1100px) / 2)
        background-size auto 45px

</style>