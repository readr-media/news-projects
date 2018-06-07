<template>
  <main ref="foreignLabour" class="foreign-labour">
    <app-logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/logo_readr_black.png"></app-logo>
    <app-share :shareUrl="url" top="15px" right="15px" bgColor="#000" direction="down"></app-share>
    <img src="/proj-assets/foreign-labour-landing/images/landing.jpg">
    <section ref="foreignLabourList" class="list" @mouseover="$_foreignLabour_handleMouseover" @mouseout="$_foreignLabour_handleMouseout">
      <img src="/proj-assets/foreign-labour-landing/images/title.png" alt="">
      <div class="list__subTitle">
        外籍移工專題
      </div>
      <a href="/project/foreign-labour" class="item" target="_blank" @touchstart="$_foreignLabour_handleTouchStart" @touchend="$_foreignLabour_handleTouchEnd">
        <h3>窮得只剩一條命</h3>
        <p>在這座島，他們即便能掙到錢，也不一定有命回家……</p>
      </a>
      <a href="/project/foreign-labour-ii" class="item" target="_blank" @touchstart="$_foreignLabour_handleTouchStart" @touchend="$_foreignLabour_handleTouchEnd">
        <h3>沒有路的地方</h3>
        <p>往前望是漆黑，往後看是荒蕪</p>
      </a>
      <a href="/project/foreign-labour-iii" class="item" target="_blank" @touchstart="$_foreignLabour_handleTouchStart" @touchend="$_foreignLabour_handleTouchEnd">
        <h3>農地上的 Andy Lau</h3>
        <p>當他們合法工作時，往往只能得到非法的對待。無奈之下，他們只好非法進入農業，耕種餵飽台灣人⋯⋯⋯</p>
      </a>
    </section>
  </main>
</template>
<script>
  import { getFBCommentsUrl } from '../../util/comm'
  import Logo from '../Logo.vue'
  import Share from '../Share.vue'

  const PROJECT_NAME = 'foreign-labour-iii'

  export default {
    name: 'ForeignLabourLanding',
    components: {
      'app-logo': Logo,
      'app-share': Share,
    },
    metaInfo () {
      let metaUrl = PROJECT_NAME
      let metaImage = `${PROJECT_NAME}/images/og-tw.jpg`
      
      return {
        title: '外籍移工專題',
        description: '外籍移工專題',
        metaUrl: metaUrl,
        metaImage: metaImage
      }
    },
    data () {
      return {
        inAction: false,
        pos: undefined,
        url: ''
      }
    },
    mounted () {
      this.url = getFBCommentsUrl()

      window.addEventListener('scroll', this.$_foreignLabour_handleScroll)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.$_foreignLabour_handleScroll)
    },
    methods: {
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
theme-color-ii = hsl(123.6,24.8%,73.9%)
theme-color-iii = hsl(37.2,41.8%,62.9%)

.foreign-labour
  color #fff
  line-height 1.67
  background-color #000
  h1, h2, h3, p
    margin 0
  > img
    position fixed
    top 0
    left 0
    z-index 1
    width 100%
    height calc(100vh - 254px)
    object-fit cover
    object-position 70% 50%
    transform scale(1)
    transition transform 3s
    pointer-events none
  &.in-action
    > img
      transform scale(1.1)
      transition transform 3s
.list
  position relative
  z-index 10
  padding-top calc(100vh - 254px)
  background-color transparent
  img
    position absolute
    top calc(100vh - 254px - 58px - 20px)
    left 50%
    z-index 10
    transform translateX(-50%)
    width 250px
    height auto
    pointer-events none
  &__subTitle
    padding 25px 0
    text-align center
    font-size 1.5rem
    font-family "source-han-serif-tc", serif
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
    p
      border-color theme-color-i
  &:nth-of-type(2)
    h3
      color theme-color-ii
    p
      border-color theme-color-ii
  &:nth-of-type(3)
    h3
      color theme-color-iii
    p
      border-color theme-color-iii
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
      height calc(100vh - 228px)
  .list
    padding-top calc(100vh - 228px)

@media (min-width: 900px)
  .foreign-labour
    position relative
    height 100vh
    > img
      height 100vh
  
  .list
    display flex
    position absolute
    left 0
    bottom 0
    z-index 10
    min-width 878px
    width 878px
    padding 30px 35px 60px 0
    background-color rgba(0, 0, 0, .7)
    img
      top auto
      left 50px
      bottom calc(236px + 15px)
      transform none
      width 500px
    &__subTitle
      position absolute
      right 70px
      bottom calc(236px + 15px)
      padding 0
      font-size 2.1875rem
      background-color transparent
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
      font-size 1.3rem
    
</style>
