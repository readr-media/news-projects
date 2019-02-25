<template>
  <div id="fullpage" class="energy-policy">
    <!-- <div id="fullpage"> -->
      <section class="section">
        <div class="landing container">
          <div class="landing__block"></div>
          <div class="landing__block"></div>
          <div class="landing__block"></div>
          <h1>小英<br>能源政策<br>體檢報告</h1>
        </div>
      </section>
      <section class="section">
        <div class="foreword container">
          <div>
            <p>「電價又漲了？」「空氣品質好差，政府為什麼不處理？！」「不要讓臺灣成為下一個福島！」能源政策其實和民眾的生活息息相關，你是否有埋怨過政府的能源政策？這次 READr 讓你當總統，選出你心目中最適合的能源政策，看看你的能源政策傾向與哪一任總統最接近！</p>
            <div class="foreword__choices">
              <button @click="moveTo(3)">做測驗</button>
              <button @click="moveTo(4)">看文章</button>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <EnergyPolicyQuiz class="container"/>
      </section>
      <section class="section">
        <div class="container">
          <h2>區塊標</h2>
          <p>區塊內文區塊內文區塊內文區塊內文區塊內文區塊內文區塊內文區塊內文區塊內文區塊內文區塊內文區塊內文區塊內文</p>
          <button class="btn-readmore" @click="openReadMore = true">OP</button>
          <!-- <div :class="{ active: openReadMore }" class="read-more">
            <button @click="openReadMore = false">CL</button>
          </div> -->
        </div>
        
      </section>
    <!-- </div> -->
  </div>
</template>
<script>

import EnergyPolicyQuiz from './EnergyPolicyQuiz.vue'

export default {
  name: 'EnergyPolicy',
  components: {
    EnergyPolicyQuiz
  },
  metaInfo() {
    return {
      title: '小英能源政策體檢報告',
      description: 'xxxxxxxxxxxxxxxxxxxx',
      metaUrl: 'energy-policy',
      metaImage: 'energy-policy/ogimage.jpg',
    };
  },
  data () {
    return {
      fullpage: undefined,
      openReadMore: false
    }
  },
  watch: {
    openReadMore (value) {
      value ? window.fullpage_api.setAllowScrolling(false) : window.fullpage_api.setAllowScrolling(true)
    }
  },
  beforeMount () {
    import('fullpage.js').then(fullpageModule => {
      window.fullpage = fullpageModule.default
      this.initFullPage()
    })
  },
  mounted () {
    
  },
  methods: {
    initFullPage () {
      this.fullpage = new window.fullpage('#fullpage', {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        autoScrolling: true,
        // fixedElements: '.read-more',
        normalScrollElements: '.read-more'
      })
    },
    moveTo (section) {
      window.fullpage_api.moveTo(section)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .energy-policy
    h1, h2, h3, p
      margin 0
    h1
      position absolute
      left 15px
      bottom 30px
      color #fff
      font-size 2.1875rem
      font-weight 400
      line-height 1.3
      letter-spacing 2px
      text-shadow 0 1px 20px rgba(0, 0, 0, 0.5)
    p
      font-size 1.125rem
    button
      font-size 1.25rem
      background-color transparent
      border none
      cursor pointer
      // user-select none
    .section
      height 100vh
      // min-height 100vh
      background-position center center
      background-size cover
      background-repeat no-repeat
      &:not(:first-child):not(:nth-child(3))
        .container
          padding 60px 0 30px
      &:nth-child(2), &:nth-child(3)
        background-color #9b9b9b
    .container
      position relative
      height 100%
    .landing
      display flex
      flex-direction column
      position relative
      &__block
        flex 1
        &:nth-child(1)
          background-color #257069
        &:nth-child(2)
          background-color #fffb08
        &:nth-child(3)
          background-color #e10583
    .foreword
      p
        color #fff
        line-height 2
        text-align justify
        font-weight 300
      > div
        position relative
        width 90%
        height 100%
        margin 0 auto
      &__choices
        display flex
        position absolute
        left 0
        bottom 0
        width 100%
        button
          flex 1
          padding .5em
          color #000
          background-color #fff
          & + button
            margin-left 30px

    .read-more
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      transform translateX(-100%)
      z-index 10
      background-color #fff
      visibility hidden
      &.active
        transform translateX(-20%)
        visibility visible
      button
        position absolute
        right -20px
        bottom 15px
        width 40px
        height 40px
        padding 0
        color #fff
        background-color #000
        border-radius 50%

    .btn
      &-readmore
        position absolute
        left 15px
        bottom 15px
        width 40px
        height 40px
        padding 0
        color #fff
        background-color #000
        border-radius 50%

  @media (max-width: 374px) // iPhone SE
    .energy-policy
      h1
        left 10px
        bottom 10px
      p
        font-size 1rem
      button
        font-size 1.125rem

  @media (min-width: 768px)
    .energy-policy
      h1
        left 30px
        font-size 3.4375rem
      p
        font-size 1.5rem
      button
        font-size 1.5rem
      .foreword
        display flex
        align-items center
        > div
          width 60%
          max-width 600px
          height auto
        &__choices
          position static
          margin-top 70px

  @media (min-width: 1200px)
    .energy-policy
      h1
        top 1.5em
        left 50%
        bottom auto
        transform translateX(-50%)
        br
          display none
      .landing
        flex-direction row
</style>
