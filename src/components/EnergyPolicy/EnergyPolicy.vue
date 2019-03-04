<template>
  <div class="energy-policy">
    <div id="fullpage" ref="fullpage">
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
        <div class="article container">
          <h2>臺灣能源為什麼要轉型？</h2>
          <ul>
            <li>提高能源自主程度，實現能源安全</li>
            <li>現有核電廠退役年限逼近，核廢料存放、核四是否重啟、之後能源哪裡來……這些議題不能再拖</li>
            <li>回應臺灣社會對空氣污染、生態環境永續的呼聲</li>
            <li>回應各國受到極端天氣衝擊，開始降低碳排放的世界潮流</li>
            <li>跟上世界發展綠能產業鏈，帶動產業及鄉鎮轉型</li>
          </ul>
          <p>但有專家質疑能源是否一定要轉型，小英上台後發生的幾次「能源危機」也在挑戰人民對能源轉型的信心</p>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMore = true">
            <template v-slot:moreText>
              <span>能源轉型有必要嗎？</span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
      <section class="section">
        <div class="article container">
          <h2>蔡政府能源轉型目標：20、50、30</h2>
          <p>為具體落實目標，蔡政府規劃出 2025 年的能源配比：再生能源發電量 20 ％、 天然氣 50 ％、燃煤 30％，並以「穩定供電」為條件。</p>
          <p>對比臺灣的 2017 年發電結構，可看出要達到 2025 年目標，再生能源需要大幅成長，燃煤發電量要降低、核能要歸零，產生的能源缺口將由燃氣來補足。燃氣的碳排放量約是燃煤的一半，可以有效降低臺灣的碳排放量。</p>
          <ReadMoreButton class="btn-readmore" type="open" @click="openReadMore = true">
            <template v-slot:moreText>
              <span>小英能源政策，專家怎麼看？</span>
            </template>
          </ReadMoreButton>
        </div>
      </section>
    </div>
    
    <div ref="readMore" class="read-more">
      <div v-html="readMoreContent"></div>
      <ReadMoreButton type="close" @click="openReadMore = false"></ReadMoreButton>
    </div>
  </div>
</template>
<script>

import EnergyPolicyQuiz from './EnergyPolicyQuiz.vue'
import ReadMoreButton from './ReadMoreButton.vue'
import { READ_MORE_CONTENT, } from './constant'

export default {
  name: 'EnergyPolicy',
  components: {
    EnergyPolicyQuiz,
    ReadMoreButton
  },
  metaInfo() {
    return {
      title: '小英能源政策體檢報告',
      description: 'xxxxxxxxxxxxxxxxxxxx',
      metaUrl: 'energy-policy',
      metaImage: 'energy-policy/og.jpg',
    };
  },
  data () {
    return {
      READ_MORE_CONTENT,
      fullpage: undefined,
      openReadMore: false,
      readMoreIndex: 1,
    }
  },
  computed: {
    readMoreContent () {
      return READ_MORE_CONTENT[this.readMoreIndex - 1].contents
    }
  },
  watch: {
    openReadMore (value) {
      if (value) {
        window.fullpage_api.setAllowScrolling(false)
        this.$refs.readMore.classList.add('active')
        this.$refs.fullpage.classList.add('hasReadMore')
      } else {
        window.fullpage_api.setAllowScrolling(true)
        this.$refs.readMore.classList.remove('active')
        this.$refs.fullpage.classList.remove('hasReadMore')
      }
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
        normalScrollElements: '.read-more',
      })
    },
    moveTo (section) {
      window.fullpage_api.moveTo(section)
    },
    openReadMoreHandler (index) {
      this.openReadMore = true
      this.readMoreIndex = index
    }
  }
}
</script>
<style lang="stylus" scoped>

  h1, h2, h3, p
    margin 0
  h1
    position absolute
    left 15px
    bottom 30px
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

  .energy-policy
    position relative
    color #fff
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    #fullpage
      &.hasReadMore
        background-color rgba(0, 0, 0, .6)
    .section
      height 100vh
      // min-height 100vh
      background-color #9b9b9b
      background-position center center
      background-size cover
      background-repeat no-repeat
      &:not(:first-child):not(:nth-child(3))
        .container
          padding 60px 0 30px
    .container
      position relative
      height 100%
      > h2, > p, > ul
        width 90%
        margin 0 auto
      > h2
        font-size 1.125rem
        font-weight normal
      > p, > ul
        margin-top 10px
        font-size 1rem
        text-align justify
        line-height 1.4
      ul
        padding-left 20px
        li
          & + li
            margin-top 10px

    .landing
      display flex
      flex-direction column
      position relative
      &__block
        flex 1
        background-repeat no-repeat
        background-size 80% auto
        background-position-y bottom
        &:nth-child(1)
          background-color #257069
          background-image url(/proj-assets/energy-policy/landing-mobile-1.png)
          background-position-x 120%
        &:nth-child(2)
          background-color #fffb08
          background-image url(/proj-assets/energy-policy/landing-mobile-2.png)
          background-position-x 0
        &:nth-child(3)
          background-color #e10583
          background-image url(/proj-assets/energy-policy/landing-mobile-3.png)
          background-position-x 200%
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
      width 80%
      // height 100vh
      padding 15px
      color #000
      background-color #fff
      visibility hidden
      transition transform .25s ease-out, visibility .1s ease-out
      &.active
        transform translateX(0)
        visibility visible
      > div
        height 100%
        overflow auto
      button
        position absolute
        right -20px
        bottom 15px

    .btn
      &-readmore
        position absolute
        left 15px
        bottom 15px

  @media (max-width: 374px) // iPhone SE
    h1
      left 10px
      bottom 10px
    p
      font-size 1rem
    button
      font-size 1.125rem

    .energy-policy
      .container
        h2
          font-size 1rem
        > p, ul
          font-size .875rem
      .read-more
        >>> h2, >>> p
          margin 0
        >>> p
          font-size .875rem
          text-align justify
          line-height 1.4
          & + p
            margin-top 1em

  @media (min-width: 768px)
    h1
      left 30px
      font-size 3.4375rem
    p
      font-size 1.5rem
    button
      font-size 1.5rem

    .energy-policy
      .container
        > h2, > p, > ul
          width 60%
        > h2
          font-size 1.625rem
        > p, > ul
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

      .article
        display flex
        flex-direction column
        justify-content center
        align-items center

      .btn-readmore
        left 20%
        bottom 50px

  @media (min-width: 769px)
    h1
      left 10%

    .energy-policy
      .landing
        &__block
          background-size contain
          &:nth-child(1)
            background-position-x 100%
          &:nth-child(2)
            background-position-x 40%
          &:nth-child(3)
            background-position-x 120%

  @media (min-width: 900px)
    h1
      bottom 10%
      br
        display none

  @media (min-width: 1200px)
    h1
      top 1.5em
      left 50%
      bottom auto
      transform translateX(-50%)

    .energy-policy
      .landing
        flex-direction row
        &__block
          background-size 150% auto
          &:nth-child(1)
            background-image url(/proj-assets/energy-policy/landing-desktop-1.png)
            background-position-x 30%
          &:nth-child(2)
            background-image url(/proj-assets/energy-policy/landing-desktop-2.png)
            background-position-x 50%
          &:nth-child(3)
            background-image url(/proj-assets/energy-policy/landing-desktop-3.png)
            background-position-x 30%
      .read-more
        width 50%
</style>
