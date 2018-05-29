<template>
  <main class="foreign-labour" :class="{ 'vietnamese': isVietnamese }">
    <app-logo class="no-sprite" href="https://www.readr.tw/" top="10px" left="10px" bgImage="/proj-assets/logo_readr.png"></app-logo>
    <a :href="isVietnamese ? '/project/foreign-labour-ii/': '/project/foreign-labour-ii/vn/'" class="foreign-labour__i18n" @click="$_foreignLabour_langGAEvent" v-text="$t('FOREIGN_LABOUR_II.I18N')"></a>
    <app-share :shareUrl="shareLink" top="10px" right="10px" bgColor="#000" direction="down"></app-share>
    <section class="foreign-labour__media">
      <div ref="media1" class="media media--video media--active media--video-heading">
        <video preload="auto" loop :muted="videoMuted" autoplay playsinline poster="/proj-assets/foreign-labour-ii/images/media-00.jpg">
          <source src="/proj-assets/foreign-labour-ii/videos/media-00.mp4" type="video/mp4">
        </video>
      </div>
      <figure ref="media2" class="media media--cover media--heading" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-01-1.jpg)">
        <div class="heading">
          <h1 v-text="$t('FOREIGN_LABOUR_II.TITLE')"></h1>
          <h2 v-text="$t('FOREIGN_LABOUR_II.SUB_TITLE')"></h2>
        </div>
      </figure>
      <figure ref="media3" class="media media--cover media--heading" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-01-2.jpg)">
      </figure>
      <figure ref="media6" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-02.jpg)"></figure>
      <figure ref="media7" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-03.jpg)"></figure>
      <figure ref="media8" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-04-1.jpg)"></figure>
      <figure ref="media9" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-04-2.jpg)"></figure>
      <figure ref="media10" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-04-3.jpg)"></figure>
      <figure ref="media11" class="media media--video media--contain">
        <video preload="metadata" loop :muted="videoMuted" playsinline poster="/proj-assets/foreign-labour-ii/images/media-05.jpg">
          <source src="/proj-assets/foreign-labour-ii/videos/media-05.mp4" type="video/mp4">
        </video>
      </figure>
      <figure ref="media12" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-06-1.jpg)"></figure>
      <figure ref="media13" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-06-2.jpg)"></figure>
      <figure ref="media14" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-06-3.jpg)"></figure>
      <figure ref="media15" class="media media--vert" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-07.jpg)">
        <p class="media__souce">照片由黃文團家屬提供</p>
      </figure>
      <figure ref="media16" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-08.jpg)"></figure>
      <figure ref="media18" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-09.jpg)"></figure>
      <figure ref="media19" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-10.jpg)"></figure>
      <figure ref="media23" class="media media--video media--contain">
        <video preload="metadata" loop :muted="videoMuted" playsinline poster="/proj-assets/foreign-labour-ii/images/media-11.jpg">
          <source src="/proj-assets/foreign-labour-ii/videos/media-10.mp4" type="video/mp4">
        </video>
      </figure>
      <figure ref="media24" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-12.jpg)"></figure>
      <figure ref="media25" class="media" style="background-image: url(/proj-assets/foreign-labour-ii/images/media-13.jpg)"></figure>
    </section>
    <section class="scene scene--full"></section>
    <section class="scene scene--full"></section>
    <section class="scene scene--full"></section>
    <section class="scene scene--full">
      <div class="text-border">
        <div class="text-border__text text-fix">
          <p v-text="$t('FOREIGN_LABOUR_II.SECTION_1')"></p>
        </div>
      </div>
    </section>
    <section class="scene">
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_2_1')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_2_2')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_2_3')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_2_4')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_2_5')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_2_6')"></p>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_3')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_4')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_5')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_6')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_7')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_8')"></span></p>
      </div>
    </section>
    <section class="scene scene--full"></section>
    <section class="scene scene--full"></section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_9')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text scene--photo-vert">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_10_1')"></span></p>
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_10_2')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_11')"></span></p>
      </div>
    </section>
    <section class="scene scene--full">
      <div class="text-border">
        <div class="text-border__text text-fix">
          <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_12')"></span></p>
        </div>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_13')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_14')"></span></p>
      </div>
    </section>
    <section class="scene scene--full">
      <div class="text-border">
        <div class="text-border__text text-fix">
          <p v-text="$t('FOREIGN_LABOUR_II.SECTION_15_1')"></p>
          <p class="only-desktop" v-text="$t('FOREIGN_LABOUR_II.SECTION_15_2')"></p>
        </div>
      </div>
    </section>
    <section class="scene scene--full scene--add-margin only-mobile">
      <div class="text-border">
        <div class="text-border__text text-fix">
          <p v-text="$t('FOREIGN_LABOUR_II.SECTION_15_2')"></p>
        </div>
      </div>
    </section>
    <section class="scene">
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_16_1')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_16_2')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_16_3')"></p>
    </section>
    <section class="scene scene--full"></section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_17')"></span></p>
      </div>
    </section>
    <section class="scene scene--photo-text">
      <div class="scene__descr">
        <p><span v-text="$t('FOREIGN_LABOUR_II.SECTION_18')"></span></p>
      </div>
    </section>
    <section class="scene">
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_19_1')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_19_2')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_19_3')"></p>
      <p v-text="$t('FOREIGN_LABOUR_II.SECTION_19_4')"></p>
    </section>
    <section class="credit">
      <p>文字、攝影：鐘聖雄<span></span><br>網頁：HY Tan<span></span>設計：許玲瑋<span></span><br>翻譯：好心人</p>
    </section>
    <related-reports></related-reports>
    <section class="comment">
      <div class="fb-comments" :data-href="commentsUrl" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </section>
  </main>
</template>
<script>
  import { READR_SITE_URL, SITE_DOMAIN_DEV } from '../../constants'
  import { currEnv } from '../../util/comm'
  import { currentYPosition, elmYPosition } from 'kc-scroll'
  import { get } from 'lodash'
  import Logo from '../Logo.vue'
  import RelatedReports from '../RelatedReports.vue'
  import Share from '../Share.vue'

  const PROJECT_NAME = 'foreign-labour-ii'

  export default {
    name: 'ForeignLabourII',
    components: {
      'app-logo': Logo,
      'app-share': Share,
      'related-reports': RelatedReports
    },
    metaInfo () {
      let metaUrl = PROJECT_NAME
      let metaImage = `${PROJECT_NAME}/images/ogImage-tw.jpg`
      let ogLocale = 'zh_TW'
      if (this.$route.params.params === 'vn') {
        metaUrl = `${PROJECT_NAME}/vn/`
        metaImage = `${PROJECT_NAME}/images/ogImage-vn.jpg`
        ogLocale = 'vi'
        this.$i18n.locale = 'vi'
      } else {
        this.$i18n.locale = 'zh-TW'
      }
      return {
        title: this.$t('FOREIGN_LABOUR_II.TITLE'),
        description: this.$t('FOREIGN_LABOUR_II.OG_DESCR'),
        locale: ogLocale,
        metaUrl: metaUrl,
        metaImage: metaImage
      }
    },
    data () {
      return {
        gaScroll: 0,
        gaScrollIndex: [ 2, 3, 4, 6, 11, 15, 17, 20, 24, 26  ],
        captionsIndex: [ 7, 8, 9, 10, 11, 12, 15, 16, 17, 19, 20, 25, 26 ],
        captionsTop: [],
        commentsUrl: `https://dev.${SITE_DOMAIN_DEV}/project/${PROJECT_NAME}/`,
        sectionsTop: [],
        shareLink: `${READR_SITE_URL}${PROJECT_NAME}`,
        viewport: []
      }
    },
    computed: {
      isVietnamese () {
        return this.$route.params.params === 'vn'
      },
      videoMuted () {
        return get(this.$store, [ 'state', 'useragent', 'isMobile' ], true) || get(this.$store, [ 'state', 'useragent', 'isSafari' ], false)
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
      if (currEnv() === 'prod' && this.isVietnamese) {
        this.commentsUrl = `${READR_SITE_URL}${PROJECT_NAME}/vn/`
      } else if (currEnv() === 'prod' && !this.isVietnamese) {
        this.commentsUrl = `${READR_SITE_URL}${PROJECT_NAME}`
      } 
      window.addEventListener('scroll', this.$_foreignLabour_handleScroll)
      window.addEventListener('scroll', this.$_foreignLabour_handleScrollForCaption)
      window.addEventListener('resize', this.$_foreignLabour_calcSectionTop)
      window.addEventListener('resize', this.$_foreignLabour_getViewport)
      window.ga('send', 'pageview')
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.$_foreignLabour_handleScroll)
      window.removeEventListener('scroll', this.$_foreignLabour_handleScrollForCaption)
      window.removeEventListener('resize', this.$_foreignLabour_calcSectionTop)
      window.removeEventListener('resize', this.$_foreignLabour_getViewport)
    },
    methods: {
      $_foreignLabour_calcSectionTop () {
        this.captionsTop = []
        this.sectionsTop = []
        const medias = document.querySelectorAll('section[class*="scene"]')
        for (let i = 0; i < this.captionsIndex.length; i += 1) {
          this.captionsTop.push(elmYPosition(`section:nth-of-type(${this.captionsIndex[i]}) .scene__descr`))
        }
        for (let i = 0; i < medias.length; i += 1) {
          this.sectionsTop.push(elmYPosition(`section[class*="scene"]:nth-of-type(${i + 2})`))
        }
        this.captionsTop.push(elmYPosition(`section:nth-of-type(${this.captionsIndex[this.captionsIndex.length - 1]}) .scene__descr`) + (this.viewport[1] - document.querySelector(`section:nth-of-type(${this.captionsIndex[this.captionsIndex.length - 1]}) .scene__descr`).clientHeight))
        this.sectionsTop.push(elmYPosition(`section[class*="scene"]:nth-of-type(${medias.length + 1})`) + document.querySelector(`section[class*="scene"]:nth-of-type(${medias.length + 1})`).clientHeight)
      },
      $_foreignLabour_getViewport () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        this.viewport = [ w, h ]
      },
      $_foreignLabour_handleScroll () {
        const offset = 1 / 2
        for (let [index, value] of this.sectionsTop.entries()) {
          if (currentYPosition() < (this.viewport[1] * offset)) {
            this.$refs[`media1`].classList.add('media--active')
            if (this.$refs[`media1`].querySelector('video')) {
              this.$refs[`media1`].querySelector('video').play()
            }
            this.$refs[`media2`].classList.remove('media--active')
          } else if (value > currentYPosition() + (this.viewport[1] * offset)) {
            this.$refs[`media1`].classList.remove('media--active')
            if (this.$refs[`media${index - 1}`]) {
              if (this.$refs[`media${index - 1}`].querySelector('video')) {
                this.$refs[`media${index - 1}`].querySelector('video').pause()
              }
              this.$refs[`media${index - 1}`].classList.remove('media--active')
            }
            if (this.$refs[`media${index + 1}`]) {
              if (this.$refs[`media${index + 1}`].querySelector('video')) {
                this.$refs[`media${index + 1}`].querySelector('video').pause()
              }
              this.$refs[`media${index + 1}`].classList.remove('media--active')
            }
            if (this.gaScrollIndex.includes(index) && this.gaScroll < index) {
              this.gaScroll = index
              window.ga('send', 'event', 'projects', 'scroll', `scroll to ${index}`, { nonInteraction: false })
            }
            if (this.$refs[`media${index}`]) {
              if (this.$refs[`media${index}`].querySelector('video')) {
                this.$refs[`media${index}`].querySelector('video').play()
              }
              this.$refs[`media${index}`].classList.add('media--active')
            }
            return
          }
        }
      },
      $_foreignLabour_handleScrollForCaption () {
        const offset = 2 / 3
        for (let [index, value] of this.captionsTop.entries()) {
          if (value - (this.viewport[1] * offset) > currentYPosition()) {
            if (this.captionsIndex[index - 2] && document.querySelector(`section:nth-of-type(${this.captionsIndex[index - 2]})`)) {
              document.querySelector(`section:nth-of-type(${this.captionsIndex[index - 2]})`).classList.remove('caption-in')
            }
            // if (this.captionsIndex[index - 1] && this.$refs[`media${this.captionsIndex[index - 1] - 2}`]) {
            //   this.$refs[`media${this.captionsIndex[index - 1] - 2}`].classList.remove('caption-in')
            // }
            if (this.captionsIndex[index] && document.querySelector(`section:nth-of-type(${this.captionsIndex[index]})`)) {
              document.querySelector(`section:nth-of-type(${this.captionsIndex[index]})`).classList.remove('caption-in')
            }
            // if (this.captionsIndex[index - 1] && this.$refs[`media${this.captionsIndex[index - 1]}`]) {
            //   this.$refs[`media${this.captionsIndex[index - 1]}`].classList.remove('caption-in')
            // }
            if (this.captionsIndex[index - 1]) {
              // this.$refs[`media${this.captionsIndex[index - 1] - 1}`].classList.add('caption-in')
              document.querySelector(`section:nth-of-type(${this.captionsIndex[index - 1]})`).classList.add('caption-in')
            }
            return
          }
        }
      },
      $_foreignLabour_langGAEvent () {
        if (this.isVietnamese) {
          window.ga('send', 'event', 'projects', 'click', `change to tw`, { nonInteraction: false })
        } else {
          window.ga('send', 'event', 'projects', 'click', `change to vn`, { nonInteraction: false })
        }
      },
    }
  }

</script>
<style lang="stylus" scoped>
  // theme-color = hsl(298.5,23.4%,65.7%)
  theme-color = hsl(123.6,24.8%,73.9%)
  .foreign-labour
    position relative
    color #fff
    font-size 16px
    font-style normal
    font-family "source-han-sans-traditional", sans-serif
    text-shadow 1.3px 1.5px 9.4px rgba(0, 0, 0, .3)
    background-color #000
    &__i18n
      display flex
      justify-content center
      align-items center
      position fixed
      top 10px
      right 70px
      width 44px
      height 44px
      z-index 999
      color #fff
      text-decoration none
      background-color #000
      border-radius 50%
      cursor pointer
      transition background-color .5s
      &:hover
        background-color theme-color
    &__media
      position fixed
      top 0
      left 0
      right 0
      width 100%
      min-height 100vh
      height 100vh
  .scene
    position relative
    padding 80px 0
    font-size 1.125rem
    font-weight 300
    line-height 1.67
    text-align justify
    > p
      max-width calc(100% - 40px)
      margin 0 auto 1em
    &__descr
      max-width calc(100% - 40px)
      opacity 0
      visibility hidden
      transition opacity 1s, visibility 1s 1s
      p
        margin 0
        line-height 1.67
        span
          background-color rgba(0, 0, 0, .5)
          border-radius 5px
          box-shadow 5px 0 0 rgba(0,0,0,0.5), -5px 0 0 rgba(0,0,0,0.5)
      p + p
        margin-top 1em
    &--full
      min-height 100vh
      height 100vh
    &--photo-text
      display flex
      justify-content center
      align-items center
      height 200vh
      padding 50vh 0 0
      &.caption-in
        .scene__descr
          opacity 1
          visibility visible
          transition opacity 1s, visibility 1s 0s
    &--add-margin
      margin-top 50vh
  .media
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    height 100%
    margin 0
    background-position center center
    background-size contain
    background-repeat no-repeat
    opacity 0
    visibility hidden
    transition opacity 2.5s, visibility 1s 2.5s
    &.media--cover
      background-size cover
    
    &.media--heading
      background-position 63% 50%
    &.media--active
      opacity 1
      visibility visible
      transition opacity 2.5s, visibility 1s 0s
    // &.caption-in
    //   filter brightness(.5)
    //   transition filter 1s, opacity 2s, visibility 1s 0s
    &__souce
      position absolute
      right 1em
      bottom 1em
      margin 0
      font-size .75rem

    &--video
      overflow hidden
      video
        width 100%
        height 100vh
        object-fit cover
        object-position 80% 50%
      &-heading
        video
          object-position 0% 50%
  .heading
    position absolute
    top 10%
    left 50%
    transform translateX(-50%)
    width 75%
    h1
      max-width 90%
      margin 0 auto
      font-size 16vw
      text-align center
      font-family "source-han-serif-tc", serif
    h2
      margin 20px 0 0
      text-align center
      font-size 1rem
      font-family "source-han-serif-tc", serif
      font-weight 300
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

  .foreign-labour.vietnamese
    .heading
      top 15%
    .text-border__text
      p
        text-align left
    .scene
      > p
        text-align left
      &__descr
        p
          text-align left
  .only-desktop
    display none
  @media (max-width: 767px)
    &.media--contain
      video
        width 100%
        object-fit contain
  @media (min-width: 768px)
    .scene
      > p
        max-width 50%
        min-width 550px
      &__descr
        width 80%
    .heading
      h1
        font-size 14vw
      h2
        font-size 1.5rem
    .text-border
      max-width 50%
      line-height 1.67
    
  @media (min-width: 900px)
    .scene
      &__descr
        width 40%
        transform translateX(-30%)
      &--photo-text
        justify-content flex-end
      &--photo-vert
        .scene__descr
          width 30%
    .heading
      top 20%
      left 10%
      transform none
      width auto
      h1
        display inline
        max-width 0
        margin 0
        text-align left
        font-size 5.125rem
      h2
        margin 2em 0 0
        text-align center
        font-size 1.5rem
    .media
      &--vert
        background-position 33% 50%
    .credit
      font-size 1rem
      br
        display none
    .comment
      padding 5vh 20%
    .only-desktop
      display block
    .only-mobile
      min-height 0 !important
      height auto !important
      > div
        display none
</style>