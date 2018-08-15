<template>
  <main ref="foreignLabour" class="foreign-labour">
    <app-logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/logo_readr_black.png"></app-logo>
    <app-share :shareUrl="url" top="15px" right="15px" bgColor="#000" direction="down"></app-share>
    <img src="/proj-assets/foreign-labour-landing/images/landing.jpg" :style="{ height: bgImgHeight }">
    <div class="foreign-labour__title" :style="{ bottom: titleStyleBottom }">
      <img src="/proj-assets/foreign-labour-landing/images/title.png" alt="">
      <h2>在台失聯移工追蹤報導</h2>
    </div>
    <section ref="list" class="list" @mouseover="$_foreignLabour_handleMouseover" @mouseout="$_foreignLabour_handleMouseout">
      <img ref="title" src="/proj-assets/foreign-labour-landing/images/title.png" alt="" :style="{ top: titleStyleTop, bottom: titleStyleBottom }">
      <div class="list__subTitle">在台失聯移工追蹤報導</div>
      <div class="list__items">
        <a href="/project/foreign-labour" class="item" target="_blank" @click="$_foreignLabour_ga('i')" @touchstart="$_foreignLabour_handleTouchStart" @touchend="$_foreignLabour_handleTouchEnd">
          <h3>窮得只剩一條命</h3>
          <p>在台灣逃了十幾年，潘同甘在去年被抓後，選擇再次偷渡來台。沒想到，這次上岸時，他已沒了呼吸⋯⋯</p>
        </a>
        <a href="/project/foreign-labour-ii" class="item" target="_blank" @click="$_foreignLabour_ga('ii')" @touchstart="$_foreignLabour_handleTouchStart" @touchend="$_foreignLabour_handleTouchEnd">
          <h3>沒有路的地方</h3>
          <p>黃文團的遺體在阿里山上一處極隱密的樹林中被哥哥發現時，頭部已經腐爛，雙手卻仍銬著警用手銬⋯⋯</p>
        </a>
        <a href="/project/foreign-labour-iii" class="item" target="_blank" @click="$_foreignLabour_ga('iii')" @touchstart="$_foreignLabour_handleTouchStart" @touchend="$_foreignLabour_handleTouchEnd">
          <h3>農地上的 Andy Lau</h3>
          <p>當他們合法工作時，往往只能得到非法的對待。無奈之下，他們只好非法進入農業，耕種餵飽台灣人⋯⋯⋯</p>
        </a>
        <!-- <a href="/project/foreign-labour-iv" class="item" target="_blank" @click="$_foreignLabour_ga('iv')" @touchstart="$_foreignLabour_handleTouchStart" @touchend="$_foreignLabour_handleTouchEnd">
          <h3>流離尋岸</h3>
          <p></p>
        </a> -->
      </div>
    </section>
  </main>
</template>
<script>
  import { get } from 'lodash'
  import { getFBCommentsUrl } from '../../util/comm'
  import Logo from '../Logo.vue'
  import Share from '../Share.vue'

  const PROJECT_NAME = 'foreign-labour-landing'

  export default {
    name: 'ForeignLabourLanding',
    components: {
      'app-logo': Logo,
      'app-share': Share,
    },
    metaInfo () {
      let metaUrl = PROJECT_NAME
      let metaImage = `${PROJECT_NAME}/images/og.jpg`
      
      return {
        title: '《異鄉人 - 在台失聯移工追蹤報導》',
        description: '目前台灣共有超過 5.1 萬名失聯移工，過著朝不保夕又毫無保障的生活，也為台灣社會帶來全新的挑戰。本專題將鏡頭對準他們，帶領讀者共同探究他們為何「逃」，「逃跑」後又如何生活。',
        metaUrl: metaUrl,
        metaImage: metaImage
      }
    },
    data () {
      return {
        inAction: false,
        pos: undefined,
        url: '',
        viewport: [],
        listHeight: 0,
        titleHeight: 0
      }
    },
    computed: {
      bgImgHeight () {
        if (this.viewport[0] >= 900) {
          return '100vh'
        } else if (this.viewport[0] >= 768) {
          return `calc(100vh - ${this.listHeight}px)`
        } else {
          return '67vh'
        }
      },
      titleStyleBottom () {
        if (this.viewport[0] >= 768) {
          return `${this.listHeight + 20}px`
        }
        return 'auto'
      },
      titleStyleTop () {
        if (this.viewport[0] >= 768) {
          return 'auto'
        }
        return `calc(67vh - ${this.titleHeight + 20}px)`
      },
    },
    watch: {
      viewport () {
        this.listHeight = get(this.$refs, 'list.offsetHeight', 0)
        this.titleHeight = get(this.$refs, 'title.offsetHeight', 0)
      }
    },
    beforeMount () {
      this.$_foreignLabour_getViewport()
    },
    mounted () {
      this.url = getFBCommentsUrl()
      this.listHeight = get(this.$refs, 'list.offsetHeight', 0)
      this.titleHeight = get(this.$refs, 'title.offsetHeight', 0)
      window.addEventListener('scroll', this.$_foreignLabour_handleScroll)
      window.addEventListener('resize', this.$_foreignLabour_getViewport)
      ga('send', 'pageview')
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.$_foreignLabour_handleScroll)
      window.addEventListener('resize', this.$_foreignLabour_getViewport)
    },
    methods: {
      $_foreignLabour_ga (index) {
        ga('send', 'event', 'projects', 'click', `go to ${index}`, { nonInteraction: false })
      },
      $_foreignLabour_getViewport () {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        this.viewport = [ w, h ]
      },
      $_foreignLabour_handleMouseout () {
        this.$refs.foreignLabour.classList.remove('in-action')
      },
      $_foreignLabour_handleMouseover () {
        this.$refs.foreignLabour.classList.add('in-action')
      },
      $_foreignLabour_handleScroll (e) {
        if (this.pos == undefined) {
          this.pos = window.pageYOffset
        }
        const diff = this.pos - window.pageYOffset
        if (diff < 0) {
          this.$refs.foreignLabour.classList.add('in-action')
        } else if (diff > 0) {
          this.$refs.foreignLabour.classList.remove('in-action')
        }
      },
      $_foreignLabour_handleTouchStart (e) {
        if (e.target.classList.contains('item')) {
          e.target.classList.add('touch')
        } else {
          e.target.parentNode.classList.add('touch')
        }
      },
      $_foreignLabour_handleTouchEnd (e) {
        if (e.target.classList.contains('item')) {
          e.target.classList.remove('touch')
        } else {
          e.target.parentNode.classList.remove('touch')
        }
      }
    }
  }

</script>
<style lang="stylus" scoped>
theme-color-i = hsl(298.5,23.4%,65.7%)
theme-color-i-dark = hsl(298.5,23.4%,55.7%)
theme-color-ii = hsl(123.6,24.8%,73.9%)
theme-color-ii-dark = hsl(123.6,24.8%,63.9%)
theme-color-iii = hsl(37.2,41.8%,62.9%)
theme-color-iii-dark = hsl(37.2,41.8%,52.9%)
theme-color-iv = hsl(354.3,58%,64.5%)
theme-color-iv-dark = hsl(354.3,58%,54.5%)

.foreign-labour
  color #fff
  font-family "source-han-sans-traditional", sans-serif
  line-height 1.67
  background-color #1a1a1a
  h1, h2, h3, p
    margin 0
  h3
    transition color .5s
  > img
    position fixed
    top 0
    left 0
    z-index 1
    width 100%
    height 67vh
    object-fit cover
    object-position 70% 50%
    transform scale(1)
    transition transform 3s
    pointer-events none
  &.in-action
    > img
      transform scale(1.1)
      transition transform 3s
  &__title
    display none
.list
  position relative
  z-index 10
  padding-top 67vh
  background-color transparent
  img
    position absolute
    left 50%
    z-index 10
    transform translateX(-50%)
    width 85%
    height auto
    pointer-events none
  &__subTitle
    padding 25px 0
    text-align center
    font-size 1.5rem
    font-weight 300
    letter-spacing 3px
    background-color #1a1a1a
.item
  display block
  position relative
  z-index 10
  padding 2em 40px
  color #fff
  text-decoration none
  background-color #1a1a1a
  transition background-color .5s
  &:nth-of-type(1)
    h3
      color theme-color-i
      &:hover
        color theme-color-i-dark
    p
      border-color theme-color-i
  &:nth-of-type(2)
    h3
      color theme-color-ii
      &:hover
        color theme-color-ii-dark
    p
      border-color theme-color-ii
  &:nth-of-type(3)
    h3
      color theme-color-iii
      &:hover
        color theme-color-iii-dark
    p
      border-color theme-color-iii
  &:nth-of-type(4)
    h3
      color theme-color-iv
      &:hover
        color theme-color-iv-dark
    p
      border-color theme-color-iv
  &.touch
    background-color #000
  h3
    font-size 1.5rem
    font-family "source-han-serif-tc", serif
  p
    position relative
    padding-left .5em
    margin-top .5em
    font-weight 300
    border-left 2px solid #000

@media (min-width: 768px)
  .foreign-labour
    > img
      height calc(100vh - 224px)
      object-position 50% 100%
    &__title
      display block
      position fixed
      left 10%
      bottom 245px
      z-index 10
      width 60%
      line-height 1
      img
        width 100%
      h2
        position absolute
        left 80%
        bottom 0
        font-weight 300
        letter-spacing 2px
        white-space nowrap
  .list
    display inline
    position fixed
    left 0
    bottom 0
    z-index 10
    width 100%
    padding 0
    background-color #1a1a1a
    overflow-x auto
    overflow-y hidden
    ::-webkit-scrollbar
      display none
    img
      display none
    &__subTitle
      display none
    &__items
      display flex
      width 165%
      
  .item
    display block
    width 40%
    padding-bottom 2.5em
    float left
    &:first-of-type
      margin-left 5%

@media (min-width: 1100px)
  .foreign-labour
    position relative
    height 100vh
    > img
      height 100vh
    &__title
      width 500px
      left 5%
      h2
        font-size 1.5rem
        letter-spacing 4px
  .list
    display flex
    position absolute
    left 0
    bottom 0
    z-index 10
    min-width 878px
    width 1080px
    padding 30px 35px 60px 0
    background-color rgba(0, 0, 0, .7)
  .item
    display block
    max-width calc(78% / 3)
    padding 0
    background-color transparent
    &:first-of-type
      margin-left 10%
    & + .item
      margin-left 6%
    h3
      font-size 1.5rem
    
</style>
