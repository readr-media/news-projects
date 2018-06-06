<template>
  <main class="foreign-labour">
    <app-logo class="no-sprite" href="https://www.readr.tw/" top="10px" left="10px" bgImage="/proj-assets/logo_readr.png"></app-logo>
    <app-share :shareUrl="commentsUrl" top="10px" right="10px" bgColor="#000" direction="down"></app-share>
    <section class="scene scene--full" :class="{ 'scene--active': currentScene === 0 }">
      <figure class="media media--cover">
        <img :src="`/proj-assets/foreign-labour-iii/images/0.jpg`" :alt="truncate($t('FOREIGN_LABOUR_III.TITLE'))">
      </figure>
      <header>
        <h1>{{ $t('FOREIGN_LABOUR_III.TITLE_1') }}<br>{{ $t('FOREIGN_LABOUR_III.TITLE_2') }}</h1>
        <h2 v-text="$t('FOREIGN_LABOUR_III.SUB_TITLE')"></h2>
      </header>
    </section>
    <section class="scene scene--text" :class="{ 'scene--active': currentScene === 1 }">
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_2_1')"></p>
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_2_2')"></p>
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_2_3')"></p>
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_2_4')"></p>
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_2_5')"></p>
      <p><strong v-text="$t('FOREIGN_LABOUR_III.SECTION_2_6')"></strong></p>
      <p><strong v-text="$t('FOREIGN_LABOUR_III.SECTION_2_7_1')"></strong>{{ $t('FOREIGN_LABOUR_III.SECTION_2_7_2') }}</p>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 2 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_3'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_3')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 3 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_4'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_4')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 4 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_5'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_5')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 5 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_6'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_6')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 6 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_7'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_7')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 7 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_8_1'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_8_1')"></span></p>
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_8_2')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 8 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_9'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_9')"></span></p>
      </div>
    </section>
    <section class="scene scene--full" :class="{ 'scene--active': currentScene === 9 }">
      <div class="text-border">
        <div class="text-border__text">
          <p v-text="$t('FOREIGN_LABOUR_III.SECTION_10')"></p>
        </div>
        <span v-text="$t('FOREIGN_LABOUR_III.SECTION_10_credit')"></span>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 10 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_11'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_11')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 11 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_12'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_12')"></span></p>
      </div>
    </section>
    <section class="scene scene--text" :class="{ 'scene--active': currentScene === 12 }">
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_13_1')"></p>
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_13_2')"></p>
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_13_3')"></p>
      <p v-text="$t('FOREIGN_LABOUR_III.SECTION_13_4')"></p>
      <p v-html="$t('FOREIGN_LABOUR_III.SECTION_13_5')"></p>
    </section>
    <section class="scene scene--photo" :class="{ 'scene--active': currentScene === 13 }">
      <figure class="media lazy">
        <img src="" :alt="truncate($t('FOREIGN_LABOUR_III.SECTION_14'))">
      </figure>
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_III.SECTION_14')"></span></p>
      </div>
    </section>
    <section class="credit">
      <p>文字、攝影：鐘聖雄<span></span><br>網頁：HY Tan<span></span>設計：許玲瑋<span></span><br>翻譯：好心人</p>
    </section>
    <related-reports></related-reports>
    <section v-if="commentsUrl" class="comment">
      <div class="fb-comments" :data-href="commentsUrl" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </section>
  </main>
</template>
<script>
  import { currentYPosition, elmYPosition } from 'kc-scroll'
  import { getFBCommentsUrl } from '../../util/comm'
  import { truncate } from 'lodash'
  import Logo from '../Logo.vue'
  import RelatedReports from '../RelatedReports.vue'
  import Share from '../Share.vue'

  const PROJECT_NAME = 'foreign-labour-iii'

  export default {
    name: 'ForeignLabourIII',
    components: {
      'app-logo': Logo,
      'app-share': Share,
      'related-reports': RelatedReports
    },
    metaInfo () {
      let metaUrl = PROJECT_NAME
      let metaImage = `${PROJECT_NAME}/images/og-tw.jpg`
      let ogLocale = 'zh_TW'
      
      return {
        title: this.$t('FOREIGN_LABOUR_III.TITLE'),
        description: this.$t('FOREIGN_LABOUR_III.SUB_TITLE'),
        locale: ogLocale,
        metaUrl: metaUrl,
        metaImage: metaImage
      }
    },
    data () {
      return {
        captionsTop: [],
        commentsUrl: '',
        currentScene: 0,
        gaScroll: 0,
        gaScrollIndex: [ 2, 3, 7, 10, 13, 15 ],
        sectionsTop: [],
        viewport: []
      }
    },
    beforeMount () {
      this.$_foreignLabour_getViewport()
      this.$_foreignLabour_calcSectionTop()
    },
    mounted () {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
      this.commentsUrl = getFBCommentsUrl()
      window.addEventListener('scroll', this.$_foreignLabour_handleScroll)
      window.addEventListener('scroll', this.$_foreignLabour_handleScrollForCaption)
      window.addEventListener('resize', this.$_foreignLabour_getViewport)
      window.addEventListener('resize', this.$_foreignLabour_calcSectionTop)
      ga('send', 'pageview')
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.$_foreignLabour_handleScroll)
      window.removeEventListener('scroll', this.$_foreignLabour_handleScrollForCaption)
      window.addEventListener('resize', this.$_foreignLabour_getViewport)
      window.addEventListener('resize', this.$_foreignLabour_calcSectionTop)
    },
    methods: {
      $_foreignLabour_calcSectionTop () {
        this.sectionsTop = []
        this.captionsTop = []
        const scenes = document.querySelectorAll('section[class*="scene"]')
        for (let i = 0; i < scenes.length; i += 1) {
          if (document.querySelector(`section[class*="scene"]:nth-of-type(${i + 1}) .scene__descr`)) {
            this.captionsTop.push(elmYPosition(`section[class*="scene"]:nth-of-type(${i + 1}) .scene__descr`))
          }
          this.sectionsTop.push(elmYPosition(`section[class*="scene"]:nth-of-type(${i + 1})`))
        }
        this.captionsTop.push(elmYPosition(`section:nth-of-type(${scenes.length}) .scene__descr`) + (this.viewport[1] - document.querySelector(`section:nth-of-type(${scenes.length}) .scene__descr`).clientHeight))
        this.sectionsTop.push(elmYPosition(`section[class*="credit"]`))
        this.sectionsTop.push(elmYPosition(`section[class*="credit"]`) + document.querySelector('.credit').clientHeight)
      },
      $_foreignLabour_getViewport () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        this.viewport = [ w, h ]
      },
      $_foreignLabour_handleScroll () {
        const offset = 2 / 3
        for (let [index, value] of this.sectionsTop.entries()) {
          if (value > currentYPosition() + (this.viewport[1] * offset)) {
            // img lazyload
            if (document.querySelector(`section:nth-of-type(${index - 1}) .media.lazy img`)) {
              const lazyImage = document.querySelector(`section:nth-of-type(${index - 1}) .media.lazy img`)
              lazyImage.src = `/proj-assets/foreign-labour-iii/images/${index - 2}.jpg`
              lazyImage.classList.remove('lazy')
            }
            if (document.querySelector(`section:nth-of-type(${index + 1}) .media.lazy img`)) {
              const lazyImage = document.querySelector(`section:nth-of-type(${index + 1}) .media.lazy img`)
              lazyImage.src = `/proj-assets/foreign-labour-iii/images/${index}.jpg`
              lazyImage.classList.remove('lazy')
            }
            if (this.gaScrollIndex.includes(index) && this.gaScroll < index) {
              this.gaScroll = index
              ga('send', 'event', 'projects', 'scroll', `scroll to ${index}`, { nonInteraction: false })
            }
            return this.currentScene = index - 1
          }
        }
      },
      $_foreignLabour_handleScrollForCaption () {
        const offset = 2 / 3
        const captions = document.querySelectorAll(`.scene__descr`)
        for (let [index, value] of this.captionsTop.entries()) {
          if (value - (this.viewport[1] * offset) > currentYPosition()) {
            if (captions[index - 2]) {
              captions[index - 2].classList.remove('caption-in')
            }
            if (captions[index]) {
              captions[index].classList.remove('caption-in')
            }
            if (captions[index - 1]) {
              captions[index - 1].classList.add('caption-in')
            }
            return
          }
        }
      },
      getFBCommentsUrl,
      truncate
    }
  }
</script>
<style lang="stylus" scoped>
  theme-color = hsl(37.2,41.8%,62.9%)

  .foreign-labour
    color #fff
    font-size 16px
    font-style normal
    font-family "source-han-sans-traditional", sans-serif
    background-color #000
    figure
      margin 0
    header
      position absolute
      left 50%
      bottom 8%
      transform translateX(-50%)
      width 85%
    strong
      color theme-color
    h1, h2
      margin 0 auto
      font-family "source-han-serif-tc", serif
      text-shadow 1.4px 1.4px 9.4px rgba(0, 0, 0, 0.3)
    h1
      font-size 3.375rem
      line-height 1.3
    h2
      margin-top 20px
      font-size .875rem
      text-align justify
    p
      margin 0
  .scene
    position relative
    padding 80px 0
    font-size 1.125rem
    font-weight 300
    line-height 1.67
    > p
      position relative
      z-index 10
      width calc(100% - 40px)
      margin 0 auto
      text-align justify
      & + p
        margin-top 1em
    &.scene--active
      .media
        opacity 1
        visibility visible
        transition opacity 2.5s, visibility 1s 0s
    &.scene--text
      padding-top 50vh
    &__descr
      position relative
      z-index 10
      width calc(100% - 40px)
      margin 0 auto
      text-align justify
      opacity 0
      visibility hidden
      transition opacity 1s, visibility 1s 1s
      &.caption-in
        opacity 1
        visibility visible
        transition opacity 1s, visibility 1s 0s
      p + p
        margin-top 1em
      span
        background-color rgba(0, 0, 0, .8)
        border-radius 5px
        box-shadow 5px 0 0 rgba(0,0,0,.8), -5px 0 0 rgba(0,0,0,.8)
    &--full
      min-height 100vh
      max-height 100vh
    &--photo
      padding 100vh 0 50vh
  .media
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    opacity 0
    visibility hidden
    transition opacity 2.5s, visibility 1s 2.5s
    &.media--cover
      img
        object-fit cover
        object-position 28% 50%
    img
      width 100%
      height 100%
      object-fit contain
      object-position center
  .text-border
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 75%
    color theme-color
    font-size 1.375rem
    line-height 1.45
    text-align justify
    &:before
      content ''
      position absolute
      top 0
      left 0
      width 20px
      height 20px
      border-top 2px solid theme-color
      border-left 2px solid theme-color
    &:after
      content ''
      position absolute
      top 0
      right 0
      width 20px
      height 20px
      border-top 2px solid theme-color
      border-right 2px solid theme-color
    span
      position absolute
      right 0
      bottom calc(-1em - 25px)
      color #898989
      font-size .875rem

    &__text
      position relative
      padding 20px
      &:before
        content ''
        position absolute
        bottom 0
        left 0
        width 20px
        height 20px
        border-left 2px solid theme-color
        border-bottom 2px solid theme-color
      &:after
        content ''
        position absolute
        bottom 0
        right 0
        width 20px
        height 20px
        border-right 2px solid theme-color
        border-bottom 2px solid theme-color
      p
        position relative
        max-width 100%
        margin 0
      p + p
        margin-top 1em

  .credit
    padding 25vh 0
    text-align center
    p
      margin 0
      font-size .875rem
      line-height 1.7
    span
      margin-right 10px
  
  .comment
    padding 5vh 10px

  @media (min-width: 768px)
    .foreign-labour
      header
        top 15%
        left auto
        right 5%
        bottom auto
        width 40%
        transform none
        
    .scene
      > p
        max-width 50%
        min-width 550px
      &__descr
        max-width 50%
        min-width 550px
    .text-border
      max-width 50%
      line-height 1.67
    .media
      &.media--cover
        img
          object-position 70% 50%

  @media (min-width: 900px)
    .foreign-labour
      header
        right 2%
        h1
          font-size 5.125rem
        h2
          width 90%
          margin 40px 0 0
          font-size 1.125rem
    .scene
      &__descr
        max-width 40%
        transform translateX(30%)
    .text-border
      span
        font-size 1.125rem
    .media
      &.media--cover
        img
          position relative
          left -14%
          width 114%
          height 114%
          object-position 50% 0%
    .credit
      font-size 1rem
      br
        display none
    .comment
      padding 5vh 20%
</style>