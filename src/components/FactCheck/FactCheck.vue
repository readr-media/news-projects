<template>
  <div class="fact-check">
    <section class="landing">
      <h1>總統候選人之<br>事實查核計畫</h1>
      <h3>2020 總統大選在即，總統候選人在公開的發言中，<br>到底誰說的是真，誰說的是假，讓 READr 告訴你！</h3>
    </section>
    <section class="process">
      <h2>本專案透過四個步驟進行</h2>
      <div class="process__steps">
        <StepBlock
          class="process__step"
          contentText="將候選人的發言影片轉換成逐字稿"
          imgSrc="/proj-assets/fact-check/step-01.png"
          indexText="步驟一"
          link=""
          linkText="我要打逐字稿"
        />
        <StepBlock
          class="process__step"
          contentText="驗證逐字稿是否正確"
          imgSrc="/proj-assets/fact-check/step-02.png"
          indexText="步驟二"
          link=""
          linkText="我要驗證逐字稿"
        />
        <StepBlock
          class="process__step"
          contentText="針對逐字稿內容進行標籤其屬性"
          imgSrc="/proj-assets/fact-check/step-03.png"
          indexText="步驟三"
        />
        <StepBlock
          additionalText="媒體名單：鏡週刊、公視新聞、公視P#新聞實驗室、華視、沃草、未來城市＠天下、ITHome、關鍵評論網、上下游News&Market、環境資訊中心"
          class="process__step"
          contentText="各家媒體針對需驗證的項目進行驗證"
          imgSrc="/proj-assets/fact-check/step-04.png"
          indexText="步驟四"
        />
      </div>
      <div
        v-show="showFixedInfo"
        class="info-fixed"
      >
        <a href="" target="_blank"><span>我願意盡一份力！</span>點我開始編打逐字稿</a>
        <button><img src="/proj-assets/fact-check/close.png" alt="關閉"></button>
      </div>
    </section>
  </div>
</template>
<script>
import StepBlock from './components/StepBlock.vue'
import { throttle } from 'lodash'

export default {
  name: 'FactCheck',
  components: {
    StepBlock
  },
  metaInfo() {
    return {
      title: '總統候選人之事實查核計畫',
      description: '',
      metaUrl: 'fact-check',
      metaImage: 'fact-check/og.jpg',
    }
  },
  data () {
    return {
      current: 0,
      showFixedInfo: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    current (value) {
      if (value > 0 && !this.showFixedInfo) {
        this.showFixedInfo = true
      }
    }
  },
  methods: {
    detectCurrent () {
      const sections = [ ...document.querySelectorAll('section') ]
      sections.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        if (rect.top <= viewportHeight && rect.bottom >= viewportHeight) {
          return this.current = index
        }
      })
    },
    handleScroll: throttle(function () {
      this.detectCurrent()
    }, 300)
  }
}
</script>
<style lang="stylus">
.fact-check
  color #fff
  background-color #07172e
  h1, h2, h3, h4, p
    margin 0
  h1
    font-size 2.625rem
    font-weight 600
    text-align center
  h2
    font-size 1.625rem
    font-weight 500
    text-align center
  h3
    font-size 1.25rem
    font-weight normal
  p
    font-size 1rem
    &.small
      font-size .875rem
  a
    color #fff
    text-decoration none
  button
    background-color transparent
    border none
  .landing
    display flex
    flex-direction column
    justify-content center
    height 100vh
    text-align center
    h1
      color #e56300
      line-height 1.3
    h3
      max-width 90%
      margin 35px auto 0
      line-height 1.7
      text-align justify
  .process
    padding 20px 0 75px
    &__step
      width 95%
      margin 20px auto 0

  .info-fixed
    display flex
    justify-content center
    align-content center
    position fixed
    left 0
    bottom 0
    width 100%
    height 55px
    background-color #e56300
    a
      display flex
      align-items center
      padding 0 1em
      font-size 1.25rem
      span
        display none
    button
      position absolute
      top 50%
      right 10px
      transform translateY(-50%)
      padding 10px
      font-size 0
      img
        width 15px
        height 15px

@media (max-width: 767px)
  .fact-check
    .landing
      h3
        br
          display none

@media (min-width: 768px)
  .fact-check
    .process
      h2
        margin-bottom 80px
      &__steps
        display flex
        flex-wrap wrap
        align-items flex-start
        width 95%
        max-width 1140px
        margin 0 auto
      &__step
        width calc(50% - 20px)
        margin: 20px 10px 0
    .info-fixed
      a
        span
          display inline
      button
        img
          width 20px
          height 20px

@media (min-width: 1024px)
  .fact-check
    h1
      font-size 4.75rem
    h3
      font-size 1.25rem
    .process
      display flex
      flex-direction column
      justify-content center
      height 100vh
      padding 0
</style>
