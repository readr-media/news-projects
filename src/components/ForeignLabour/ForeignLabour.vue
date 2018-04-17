<template>
  <main class="foreign-labour" :class="{ 'in-action': inAction }">
    <app-logo top="10px" left="10px" bgColor="#000"></app-logo>
    <app-share :shareUrl="shareLink" top="10px" left="60px" bgColor="#000" direction="right"></app-share>
    <header class="foreign-labour__header">
      <div class="foreign-labour__header-content">
        <img :src="`/proj-assets/foreign-labour/images/landing-title${imgSelector}.png`" alt="">
        <p>文字、攝影：鐘聖雄</p>
        <p>網頁：譚學勇<span></span>設計：許玲瑋</p>
      </div>
    </header>
    <section class="foreign-labour__sec sec-full sec-active">
      <figure class="foreign-labour__media">
        <img :src="`/proj-assets/foreign-labour/images/landing-bg${imgSelector}.jpg`" alt="">
      </figure>
    </section>
    <section class="foreign-labour__sec sec-full">
      <div class="foreign-labour__text-border">
        <div class="foreign-labour__text">
          <p>我爸爸說他要來台灣照顧我，我說他老了不要再來，爸爸我已經會工作，坐船很危險不要來，可是他說我在這邊一個人，不放心，所以要來照顧我，跟我一起工作。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-text">
      <p>2018 年 3 月 19 日凌晨，兩名越南籍偷渡客在台東縣潭年村塔瓦溪出海口溺斃，同行二十幾名同樣來自越南的偷渡客，還有兩名台灣籍人蛇集團成員也一併被逮<a href="https://www.mirrormedia.mg/story/foreign-labour-escape/" target="_blank">（延伸閱讀）</a>。溺斃的其中一名越南人名叫潘同甘，原本在越南河靜省的老家捕魚維生，2004 年時輾轉來到台灣當漁民。沒兩年，潘同甘發現薪資扣完仲介費後所剩無幾，於是逃跑四處打零工，最後落腳在山區菜園當農民。</p>
      <p>2015 年，潘文善跟上老爸腳步，花了 8,000 美金仲介費來到台灣。兩人命運相似，潘文善只在第一家紙箱工廠待了 20 個月，就因為實領所得太低而展開逃逸生活，最後索性和潘文甘一起上山種菜。去年 9 月，潘文甘在宿舍為其他同鄉的農工們煮晚餐，遭警方突襲逮補，潘文善和同鄉們連忙從後門逃跑，躲過一劫。潘文善說，爸爸回去沒多久，就一直擔心他在台灣過得太苦，逃逸生活又非常壓抑，主動提議要偷渡來台灣照顧他。未想，潘同甘再次踏上台灣土地的那一刻就沒了呼吸，再也無法照顧兒子了。</p>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-01${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>自首</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 1)"></button>
        <div>
          <p>收到爸爸死訊的那天傍晚，潘文善還在農地裡忙著種菜。第二天，潘文善忙不迭趕下山，想先去移民署投案，再去殯儀館認屍。好巧不巧，潘文善在下山的路上就被警察逮補，解釋了老半天才讓警察相信他正要去投案，最後放他自行搭車前往台東自首。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-02${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>再見</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 2)"></button>
        <div>
          <p>結束一連串投案自首的筆錄程序後，移民署官員帶著潘文善前往殯儀館認屍。一路上，潘文善看似沈穩淡定，沒想到冰櫃才當打開，他就激動得無法自己。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-03${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>傾訴</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 3)"></button>
        <div>
          <p>那天，潘文善伏臥在父親的遺體上，說了好多好多的話。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <div class="foreign-labour__text-border">
        <div class="foreign-labour__text text-fix">
          <p>爸爸，錢不重要了，我要帶你回家。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-04${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>蓋棺</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 4)"></button>
        <div>
          <p>「潘同甘，雖然你在台灣不幸過世，但我們會帶著你的靈魂返回越南。」</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-05${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>送行</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 5)"></button>
        <div>
          <p>潘同甘要火化的那天，他的許多越南同鄉都特地請假來見他最後一面。只是，勢必有更多和他一樣處於逃跑狀態的人，無法親自到場送他最後一程。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-06${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>不捨</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 6)"></button>
        <div>
          <p>潘同甘的棺木準備送進焚化爐的前一刻，潘文善再也壓抑不住自己的悲傷，想要攔住父親的棺木。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-07${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>慰</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 7)"></button>
        <div>
          <p>火化的過程中，來自台東聖母醫院的越南籍修女，以及同樣在醫院工作的服務人員，不停安撫潘文善的情緒。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-09${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>上路</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 8)"></button>
        <div>
          <p>按照越南習俗，亡者的骨灰在回到家的路上，一路上要不停丟躑錢幣作為「過路費」。那天夜裡，從台 11 線一路到國道 1 號的路面上，陸續響起了銅板落地的清脆聲響——那是潘家父子在台灣最後的足聲。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media">
        <video ref="foreignLabourVideo" preload="auto" loop muted playsinline poster="/proj-assets/foreign-labour/images/video-poster.jpg">
          <source src="/proj-assets/foreign-labour/videos/media-08.mp4" type="video/mp4">
          <source src="/proj-assets/foreign-labour/videos/media-08.mov">
        </video>
      </figure>
      <div class="foreign-labour__descr">
        <h2>背負</h2>
      </div>
    </section>
    <section class="foreign-labour__sec sec-text">
      <p>離開殯儀館後，潘文善一路背著爸爸的骨灰不願放下。一名嫁到台灣十幾年的親戚主動提供自己的車，打算載著潘文善去桃園機場搭乘隔日的班機。即便在車上將近十小時的路程中，潘文善一刻也沒有放下過父親。</p>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-10${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>歇</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 9)"></button>
        <div>
          <p>夜裏，潘文善堅持不肯到任何人家裡留宿，一行人索性直接找個安靜的角落，彼此無言地等待天明。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <figure class="foreign-labour__media" @click="$_foreignLabour_closeDescription">
        <img class="hasDescr" :src="`/proj-assets/foreign-labour/images/media-11${imgSelector}.jpg`" alt="">
      </figure>
      <div class="foreign-labour__descr" @click="$_foreignLabour_closeDescription">
        <h2>靠岸</h2>
        <button @click.stop="$_foreignLabour_toggleDescription($event, 10)"></button>
        <div>
          <p>潘文善的脖子上有個十分惹眼的船錨刺青。</p>
          <p>他說，在到台灣前，他也曾在東南亞其他國家的工廠裡打工，但多數人看到這刺青時，聯想到的，都是他在老家的漁民身份。但潘文善卻說：「但我刺這個其實不是想要再出海打漁，而是希望不要再漂泊，有一個可以靠岸的港口⋯⋯我想安定下來，有一個家可以給我回去。」</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-full">
      <div class="foreign-labour__text-border">
        <div class="foreign-labour__text">
          <p>其實我知道爸爸辛苦工作，也是想讓我可以存錢蓋房子娶老婆，因為我們在越南沒有房子，就沒辦法結婚有自己的家。現在爸爸這樣，沒有錢我覺得也沒關係了，我不想要再四處工作了，我要帶爸爸回家，以後我在越南海邊抓魚也可以生活了。</p>
        </div>
      </div>
    </section>
    <section class="foreign-labour__sec sec-related">
      <iframe src="https://www.mirrormedia.mg/project-list/dark?excluding=marathon"  width="100%" frameborder="0" scrolling="no" style="width: 1px; min-width: 100%; *width: 100%;"></iframe>
    </section>
    <section class="foreign-labour__comment">
      <div class="fb-comments" data-href="https://projects.mirrormedia.mg/project/farmhouse/" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
    </section>
  </main>
</template>
<script>
  import { SITE_URL } from '../../constants'
  import { currentYPosition, elmYPosition, smoothScroll } from 'kc-scroll'
  import { map } from 'lodash'
  import Logo from '../Logo.vue'
  import Share from '../Share.vue'

  export default {
    name: 'ForeignLabour',
    components: {
      'app-logo': Logo,
      'app-share': Share,
    },
    metaInfo () {
      return {
        title: 'ForeignLabour',
        description: ' ',
        metaUrl: 'ForeignLabour',
        metaImage: ' '
      }
    },
    data () {
      return {
        currentSection: 0,
        gaScroll: 0,
        gaScrollIndex: [ 3, 7, 10, 13, 17 ],
        inAction: false,
        sectionsTop: [],
        shareLink: `${SITE_URL}foreign-labour`,
        viewport: []
      }
    },
    computed: {
      imgSelector () {
        return this.viewport[0] >= 900 ? '' : '-m'
      }
    },
    mounted () {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
      this.$_foreignLabour_calcImagesScrollTop()
      this.$_foreignLabour_getViewport()

      window.addEventListener('scroll', this.$_foreignLabour_imageScrollHandler)
      window.addEventListener('resize', this.$_foreignLabour_getViewport)
      window.addEventListener('resize', this.$_foreignLabour_calcImagesScrollTop)
      window.addEventListener('mouseover', () => {
        this.inAction = true
      })

      window.ga('send', 'pageview')

      setInterval(() => {
        if (this.inAction) {
          this.inAction = false
          document.querySelector('.foreign-labour').classList.remove('in-action')
        }
      }, 3000)
    },
    methods: {
      $_foreignLabour_calcImagesScrollTop () {
        this.sectionsTop = []
        const medias = document.querySelectorAll('section[class*="foreign-labour__sec"]')
        for (let i = 0; i < medias.length; i += 1) {
          this.sectionsTop.push(elmYPosition(`section[class*="foreign-labour__sec"]:nth-of-type(${i + 1})`))
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
        for (let [index, value] of this.sectionsTop.entries()) {
          if (value > currentYPosition() + (this.viewport[1] *  2 / 3)) {
            if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1})`)) {
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1})`).classList.remove('sec-active')
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index - 1})`).classList.remove('caption-active')
            }
            if (document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1})`)) {
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1})`).classList.remove('sec-active')
              document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index + 1})`).classList.remove('caption-active')
            }
            if (index == 13) {
              this.$refs.foreignLabourVideo.play()
            } else {
              this.$refs.foreignLabourVideo.pause()
            }
            if (this.gaScrollIndex.includes(index) && this.gaScroll < index) {
              this.gaScroll = index
              window.ga('send', 'event', 'projects', 'scroll', `scroll to ${index}`, { nonInteraction: false })
            }
            document.querySelector(`section[class*="foreign-labour__sec"]:nth-of-type(${index})`).classList.add('sec-active')
            return 
          }
        }
        if (currentYPosition() + (this.viewport[1] *  2 / 3) > this.sectionsTop[this.sectionsTop.length - 1]) {
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
    text-shadow 1.3px 1.5px 9.4px rgba(0, 0, 0, 0.3)
    background-color #000
    &.in-action
      .foreign-labour__sec.sec-full
        .foreign-labour__media
          &:after
            opacity 1
            transition opacity .3s
      .foreign-labour__descr
        opacity 1
        transition opacity .3s
    figure
      margin 0
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
        top 19%
        left 50%
        transform translateX(-50%)
        width 75%
        img
          width 100%
          height auto
        p
          margin 0
          color #fff
          font-size .875rem
          line-height 1.71
          span
            margin-left 15px
        p:first-of-type
          margin-top 25px
    &__sec
      display flex
      flex-direction column
      justify-content center
      align-items center
      &.sec-full
        min-height 100vh
        .foreign-labour__media
          &:after
            content ''
            display block
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            background transparent
            background linear-gradient(90deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.5) 20%, transparent 30%)
            opacity 0
            transition opacity 1s
        &:first-of-type
          .foreign-labour__media
            &:after
              content none
      &.sec-text
        position relative
        z-index 10
        padding 80px 0
        font-size 1.125rem
        font-weight 300
        line-height 1.67
        text-align justify
        p
          max-width calc(100% - 40px)
          margin 0 0 1em 0
          a
            position relative
          a:before
            content ''
            position absolute
            bottom -2px
            left 0
            right 0
            border-bottom 1px solid #d2b8d3
          a:link, a:visited, a:hover, a:active
            color #d2b8d3
            text-decoration none
      &.sec-active
        .foreign-labour__media
          opacity 1
          visibility visible
          transition opacity 1s, visibility 1s 0s
          pointer-events auto
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
      
      img
        width 100%
        height 100%
        object-fit cover
        object-position center
        transition filter .7s
        // &.hasDescr
        //   height auto
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
        font-size 1.125rem
        text-align justify
        font-weight 300
        line-height 1.67
        opacity 0
        transition opacity 0.3s
      button
        padding 2px
        color #bb93bc
        font-size .875rem
        background transparent
        border 2px solid #bb93bc
        outline none
        cursor pointer
        &:after
          content '顯示說明'
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

  @media (min-width: 768px)
    .foreign-labour
      &__header-content
        width 65%
        p
          font-size 1.5rem
      &__text
        text-align center
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
        top 25%
        left 10%
        width 45%
        transform initial
        p
          font-size 1rem
      &__sec
        &:first-of-type
          .foreign-labour__media
            img
              object-fit cover
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
</style>