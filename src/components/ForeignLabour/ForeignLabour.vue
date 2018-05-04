<template>
  <main class="foreign-labour" :class="{ 'in-action': inAction, 'vietnamese': isVietnamese }">
    <app-logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/logo_readr.png"></app-logo>
    <a :href="isVietnamese ? '/project/foreign-labour/': '/project/foreign-labour/vn/'" class="foreign-labour__i18n" @click="$_foreignLabour_langGAEvent" v-text="$t('FOREIGN_LABOUR.I18N')"></a>
    <app-share :shareUrl="shareLink" top="15px" right="15px" bgColor="#000" direction="down"></app-share>
    <header class="foreign-labour__header">
      <div class="foreign-labour__header-content">
        <!-- <img :src="`/proj-assets/foreign-labour/images/landing-title${imgSelector}.png`" alt=""> -->
        <h1>{{ $t('FOREIGN_LABOUR.TITLE_1') }}<br>{{ $t('FOREIGN_LABOUR.TITLE_2') }}</h1>
        <p v-text="$t('FOREIGN_LABOUR.HEADER_CONTENT_1')"></p>
        <p v-text="$t('FOREIGN_LABOUR.HEADER_CONTENT_2')"></p>
      </div>
    </header>
    <section class="foreign-labour__sec sec-full sec-active">
      <div class="foreign-labour__media video-full">
        <video ref="foreignLabourOPVideo" preload="auto" loop :muted="videoMuted" autoplay playsinline poster="/proj-assets/foreign-labour/images/video-opening.jpg">
          <source src="/proj-assets/foreign-labour/videos/opening.mp4" type="video/mp4">
        </video>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full sec-text-border">
      <div class="foreign-labour__text-border">
        <div class="foreign-labour__text">
          <p v-text="$t('FOREIGN_LABOUR.SECTION_2')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-text">
      <p>{{ $t('FOREIGN_LABOUR.SECTION_3_1_1') }}<a href="https://www.mirrormedia.mg/story/foreign-labour-escape/" target="_blank" v-text="$t('FOREIGN_LABOUR.SECTION_3_1_LINK')"></a>{{ $t('FOREIGN_LABOUR.SECTION_3_1_2') }}</p>
      <p v-text="$t('FOREIGN_LABOUR.SECTION_3_2')"></p>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-01${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>自首</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 1)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_4')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-02${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>再見</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 2)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_5')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-03${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>傾訴</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 3)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_6')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full sec-text-border">
      <div class="foreign-labour__text-border">
        <div class="foreign-labour__text text-fix">
          <p v-text="$t('FOREIGN_LABOUR.SECTION_7')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-04${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>蓋棺</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 4)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_8')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-05${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>送行</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 5)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_9')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-06${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>不捨</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 6)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_10')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-07${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>慰</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 7)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_11')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-09${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>背負</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 8)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_12')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media">
        <video ref="foreignLabourVideo" preload="auto" :muted="videoMuted" loop playsinline poster="/proj-assets/foreign-labour/images/video-poster.jpg">
          <source src="/proj-assets/foreign-labour/videos/media-08.mp4" type="video/mp4">
          <source src="/proj-assets/foreign-labour/videos/media-08.mov">
        </video>
      </figure>
      <div class="foreign-labour__descr">
        <!-- <h2>上路</h2> -->
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_13')"></p>
        </div>
      </div>
    </section>
    <!-- <section class="foreign-labour__sec sec-text">
      <p>按照越南習俗，亡者的骨灰在回到家的路上，一路上要不停丟擲錢幣作為「過路費」。那天夜裡，從台 11 線一路到國道 1 號的路面上，陸續響起了銅板落地的清脆聲響——那是潘家父子在台灣最後的足聲。</p>
    </section> -->
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-10${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>歇</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 9)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_14')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-11${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <!-- <h2>靠岸</h2> -->
        <button @click.stop="$_foreignLabour_toggleDescription($event, 10)"></button>
        <div>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_15_1')"></p>
          <p v-text="$t('FOREIGN_LABOUR.SECTION_15_2')"></p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full sec-text-border">
      <div class="foreign-labour__text-border">
        <div class="foreign-labour__text">
          <p v-text="$t('FOREIGN_LABOUR.SECTION_16')"></p>
        </div>
      </div>
      <p class="foreign-labour__credit">文字、攝影：鐘聖雄<span></span><br>網頁：HY Tan<span></span>設計：許玲瑋<span></span><br>翻譯：好心人</p>
    </section>
    <section class="foreign-labour__sec sec-related">
      <h2>相關文章</h2>
      <p><a href="https://www.mirrormedia.mg/story/foreign-labour-escape/" target="_blank">她渡台打工險溺死 丈夫卻用她的血汗錢養小三</a></p>
      <p><a href="https://www.youtube.com/watch?v=Tp5f7xK1nz0" target="_blank">移工阮國非之死 凸顯外勞警政體系缺失</a></p>
      <p><a href="https://www.mirrormedia.mg/story/20180125pol025/" target="_blank">異鄉安魂曲　越南移工阮國非之死</a></p>
    </section>
    <!-- <section class="foreign-labour__sec sec-related">
      <iframe src="https://www.mirrormedia.mg/project-list/dark?excluding=marathon"  width="100%" frameborder="0" scrolling="no" style="width: 1px; min-width: 100%; *width: 100%;"></iframe>
    </section> -->
    <section class="foreign-labour__comment">
      <div class="fb-comments" :data-href="commentsUrl" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </section>
  </main>
</template>
<script>
  import { READR_SITE_URL, SITE_DOMAIN_DEV } from '../../constants'
  import { currEnv } from '../../util/comm'
  import { currentYPosition, elmYPosition, smoothScroll } from 'kc-scroll'
  import { get, map } from 'lodash'
  import Logo from '../Logo.vue'
  import Share from '../Share.vue'

  const PROJECT_NAME = 'foreign-labour'

  export default {
    name: 'ForeignLabour',
    components: {
      'app-logo': Logo,
      'app-share': Share,
    },
    metaInfo () {
      let metaUrl = PROJECT_NAME
      let metaImage = `${PROJECT_NAME}/images/ogimage2.jpg`
      if (this.$route.params.params === 'vn') {
        metaUrl = `${PROJECT_NAME}/vn/`
        metaImage = `${PROJECT_NAME}/images/ogimage_vi.jpg`
        this.$i18n.locale = 'vi'
      } else {
        this.$i18n.locale = 'zh-TW'
      }
      return {
        title: `${this.$t('FOREIGN_LABOUR.TITLE_1')}${this.$t('FOREIGN_LABOUR.TITLE_2')}`,
        description: `${this.$t('FOREIGN_LABOUR.HEADER_CONTENT_1')}${this.$t('FOREIGN_LABOUR.HEADER_CONTENT_2')}`,
        metaUrl: metaUrl,
        metaImage: metaImage
      }
    },
    data () {
      return {
        commentsUrl: `https://dev.${SITE_DOMAIN_DEV}/project/${PROJECT_NAME}/`,
        currentSection: 0,
        gaScroll: 0,
        gaScrollIndex: [ 3, 7, 10, 13, 17  ],
        inAction: false,
        sectionsTop: [],
        shareLink: `${READR_SITE_URL}${PROJECT_NAME}`,
        viewport: []
      }
    },
    computed: {
      imgSelector () {
        return this.viewport[0] >= 900 ? '' : '-m'
      },
      isVietnamese () {
        return this.$route.params.params === 'vn'
      },
      videoMuted () {
        return get(this.$store, [ 'state', 'useragent', 'isMobile' ], true)
      }
    },
    beforeMount () {
      if (this.$route.params.params === 'vn') {
        this.$i18n.locale = 'vi'
      } else {
        this.$i18n.locale = 'zh-TW'
      }
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
      this.$_foreignLabour_calcImagesScrollTop()
      this.$_foreignLabour_getViewport()

      window.addEventListener('scroll', this.$_foreignLabour_imageScrollHandler)
      window.addEventListener('scroll', this.$_foreignLabour_captionScrollHandler)
      window.addEventListener('resize', this.$_foreignLabour_getViewport)
      window.addEventListener('resize', this.$_foreignLabour_calcImagesScrollTop)
      window.addEventListener('mouseover', () => this.inAction = true)

      window.ga('send', 'pageview')
      // setInterval(() => {
      //   if (this.inAction) {
      //     this.inAction = false
      //     document.querySelector('.foreign-labour').classList.remove('in-action')
      //   }
      // }, 10000)
    },
    methods: {
      $_foreignLabour_calcImagesScrollTop () {
        this.sectionsTop = []
        const medias = document.querySelectorAll('section[class*="foreign-labour__sec"]')
        for (let i = 0; i < medias.length; i += 1) {
          this.sectionsTop.push(elmYPosition(`section[class*="foreign-labour__sec"]:nth-of-type(${i + 1})`))
        }
      },
      $_foreignLabour_captionScrollHandler () {
        for (let [index, value] of this.sectionsTop.entries()) {
          if (value > currentYPosition() + (this.viewport[1] * 1 / 10)) {
            if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1})`)) {
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1})`).classList.remove('caption-in')
            }
            if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1})`)) {
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1})`).classList.remove('caption-in')
            }
            if (currentYPosition() + (this.viewport[1] * 1) > value) {
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index})`).classList.remove('caption-in')
              return
            }
            document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index})`).classList.add('caption-in')
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
      $_foreignLabour_closeDescription (event) {
        event.target.parentNode.classList.remove('caption-active')
      },
      $_foreignLabour_getViewport () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        this.viewport = [ w, h ]
      },
      $_foreignLabour_imageScrollHandler () {
        this.inAction = true
        const offset = 1 / 2
        for (let [index, value] of this.sectionsTop.entries()) {
          if (value > currentYPosition() + (this.viewport[1] * offset)) {
            if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1})`)) {
              if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1}) video`)) {
                document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1}) video`).pause()
              }
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1})`).classList.remove('sec-active')
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1})`).classList.remove('caption-active')
            }
            if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1})`)) {
              if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1}) video`)) {
                document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1}) video`).pause()
              }
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1})`).classList.remove('sec-active')
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1})`).classList.remove('caption-active')
            }
            
            if (this.gaScrollIndex.includes(index) && this.gaScroll < index) {
              this.gaScroll = index
              window.ga('send', 'event', 'projects', 'scroll', `scroll to ${index}`, { nonInteraction: false })
            }
            if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index}) video`)) {
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index}) video`).play()
            }

            document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index})`).classList.add('sec-active')
            return
          }
        }
        if (currentYPosition() + (this.viewport[1] * offset) > this.sectionsTop[this.sectionsTop.length - 1]) {
          document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${this.sectionsTop.length - 1})`).classList.remove('sec-active')
          document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${this.sectionsTop.length - 1})`).classList.remove('caption-active')
          document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${this.sectionsTop.length})`).classList.add('sec-active')
        }
      },
      $_foreignLabour_toggleDescription (event, index) {
        if (!event.target.parentNode.parentNode.classList.contains("caption-active")) {
          window.ga('send', 'event', 'projects', 'click', `more${index}`, { nonInteraction: false })
        }
        event.target.parentNode.parentNode.classList.toggle('caption-active')
        smoothScroll(`.foreign-labour__sec.sec-full.caption-active`)
      }
    },
  }
</script>
<style lang="stylus" scoped>
  .foreign-labour
    color #fff
    font-size 16px
    font-style normal
    font-family "source-han-sans-traditional", sans-serif
    text-shadow 1.3px 1.5px 9.4px rgba(0, 0, 0, .3)
    background-color #000
    &.in-action
      .foreign-labour__sec.sec-full
        .foreign-labour__media
          &:after
            opacity 1
            transition opacity .3s
      .caption-in
        .foreign-labour__descr
          opacity 1
          transition opacity .3s
          p
            opacity 1
    figure
      margin 0
    &__i18n
      display flex
      justify-content center
      align-items center
      position fixed
      top 15px
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
        background-color #bb93bc

    &__header
      position absolute
      top 0
      z-index 500
      width 100%
      min-height 100vh
      text-align center
      overflow hidden
      &-content
        position absolute
        top 20%
        left 50%
        transform translateX(-50%)
        width 75%
        // img
        //   width 100%
        //   height auto
        h1
          max-width 90%
          margin 0 auto
          font-size 16vw
          font-family "source-han-serif-tc", serif
          br
            display none
        p
          margin 0
          color #fff
          font-size .875rem
          line-height 1.71
          text-align justify
          span
            margin-left 15px
        p:first-of-type
          margin-top 17vh
    &__sec
      display flex
      flex-direction column
      justify-content center
      align-items center
      position relative
      &.sec-full
        min-height 150vh
        // padding 50vh 0 0
        // margin 0 0 25vh
        // .foreign-labour__media
        //   &:after
        //     content ''
        //     display block
        //     position absolute
        //     top 0
        //     left 0
        //     width 100%
        //     height 100%
        //     background transparent
        //     background linear-gradient(90deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.5) 10%, rgba(10,10,10,0.3) 20%, transparent 30%)
        //     opacity 0
        //     transition opacity 1s
        &:first-of-type
          margin 0
          .foreign-labour__media
            &:after
              content none
      &.sec-text
        position relative
        z-index 10
        padding 80px 0 150px
        font-size 1.125rem
        font-weight 300
        line-height 1.67
        text-align justify
        p
          max-width calc(100% - 40px)
          margin 0 0 1em 0
          a
            border-bottom 1px solid #d2b8d3
          a:link, a:visited, a:hover, a:active
            color #d2b8d3
            text-decoration none
      &.sec-text-border
        padding 50vh 0
      &.sec-active
        .foreign-labour__media
          opacity 1
          visibility visible
          transition opacity 1s, visibility 1s 0s
          pointer-events auto
      &.sec-related
        h2
          margin 0
          font-size 1.5rem
          font-weight 300
        p
          width 75%
          line-height 1.67
          text-align justify
          &:first-of-type
            margin-top 50px
        a:link, a:visited, a:hover, a:active
            color #d2b8d3
            text-decoration none
      iframe
        min-height 355px
        margin-top 50px
    &__media
      display flex
      justify-content center
      align-items center
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      opacity 0
      visibility hidden
      transition opacity 1s, visibility 1s 1s
      pointer-events none
      &.video-full
        overflow hidden
        video
          height 100vh
          object-fit cover
          object-position 80% 50%
      
      img
        width 100%
        height 100%
        object-fit cover
        object-position center
        transition filter .7s
        &.hasDescr
          height auto
      video
        max-width 100%
        min-width 100%
      figcaption
        position absolute
        top 0
        left 0
        
    &__text-border
      position relative
      width 75%
      color #bb93bc
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
        border-top 2px solid #bb93bc
        border-left 2px solid #bb93bc
      &:after
        content ''
        position absolute
        top 0
        right 0
        width 20px
        height 20px
        border-top 2px solid #bb93bc
        border-right 2px solid #bb93bc
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
        border-left 2px solid #bb93bc
        border-bottom 2px solid #bb93bc
      &:after
        content ''
        position absolute
        bottom 0
        right 0
        width 20px
        height 20px
        border-right 2px solid #bb93bc
        border-bottom 2px solid #bb93bc
      p
        position relative
        margin 0
    
    &__descr
      position relative
      z-index 10
      width calc(100% - 40px)
      opacity 0
      transition opacity 1s
      h2
        margin 0 0 10px
        font-size 1.625rem
        font-family "source-han-serif-tc", serif
      p
        margin 20px 0 0
        color #fee3ff
        font-size 1.125rem
        text-align justify
        font-weight 300
        line-height 1.67
        text-shadow 1.3px 1.5px 9.4px rgba(0, 0, 0, .5)
        opacity 0
        transition opacity 0.3s
      button
        display none
        padding 2px
        color #bb93bc
        font-size .875rem
        background transparent
        border 2px solid #bb93bc
        outline none
        cursor pointer
        &:after
          content '顯示說明'
      // > div
      //   display none
    &__credit
      position absolute
      left 50%
      bottom 80px
      transform translateX(-50%)
      width 195px
      margin 0
      font-size .875rem
      line-height 1.7
      text-align center
      span
        margin-right 10px
    &__comment
      padding 0 10px
      
    .caption-active
      .foreign-labour__media
        img.hasDescr
          filter brightness(.2)
          
      .foreign-labour__descr
        opacity 1
        p
          opacity 1
        button
          &:after
            content '隱藏說明'
        > div
          display block

  .foreign-labour.vietnamese
    .foreign-labour__header-content
      h1
        position relative
        left -5%
        max-width 110%
        width 110%
        font-size 2rem
        line-height 1.3
        br
          display inline

  @media (min-width: 768px)
    .foreign-labour
      &__header-content
        width 65%
        h1
          font-size 14vw
        p
          font-size 1.5rem
      &__text
        display flex
        justify-content center
        align-items center
        text-align center
        min-height 160px
        p
          text-align justify
      &__text-border
        max-width 50%
        min-width 550px
        line-height 1.67
      &__sec
        &.sec-text
          p
            max-width 50%
            min-width 550px
        &.sec-related
          padding 0 20%
        &.sec-related
          p
            width calc(100%- 60px)
          p:last-of-type
            margin-bottom 50px
        iframe
          min-height 380px
          margin-top 0
      &__descr
        width 80%
      &__comment
        padding 0 20%

  @media (min-width: 900px)
    .foreign-labour
      &__header-content
        top 32%
        left 10%
        width 45%
        transform initial
        h1
          max-width none
          margin 0
          font-size 5.125rem
          text-align left
        p
          font-size 1.125rem
          &:first-of-type
            margin-top 15vh
      &__sec
        &:first-of-type
          .foreign-labour__media
            img
              object-fit cover
        &.sec-related
          p
            text-align center
      &__descr
        position relative
        width 130vh
        max-width calc(100% - 40px)
        > div
          position absolute
          top 0
          right 0
          width 60%
          p
            margin 0 0 1em
            
            &:last-of-type
              margin-bottom 0
      &__media
        img
          object-fit contain
          &.hasDescr
            height 100%
      &__credit
        bottom 25vh
        width auto
        font-size 1rem
        br
          display none
    .foreign-labour.vietnamese
      .foreign-labour__header-content
        width 58%
        h1
          left 0
          max-width none
          width auto
          font-size 4.125rem
</style>