<template>
  <div class="formosa-incident">
    <main>
      <FixedSlides />
      <ScrollTimeline v-if="isMobW" />
      <FixedTimeline v-if="isDeskW" />
      <div class="ending">
        <picture>
          <source media="(min-width: 720px)" srcset="/proj-assets/formosaincident/img/ending-bg-desk.png">
          <img src="/proj-assets/formosaincident/img/ending-bg-mob.png" alt="">
        </picture>
        <p>40 年的時間，臺灣告別威權獨裁，民主深化正在進行式</p>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import FixedSlides from './components/FixedSlides.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'FormosaIncident',
  components: {
    FixedSlides,
    ScrollTimeline: () => import('./components/ScrollTimeline.vue'),
    FixedTimeline: () => import('./components/FixedTimeline.vue'),
    TheFooter
  },
  metaInfo () {
    return {
      title: '40年．致民主：重回美麗島現場',
      description: '未歷經過戒嚴年代，超過 31 萬的首投族，明年將用選票表達自己的理念，但對 40 年前的民眾來說，投票卻是禁忌，直到「美麗島事件」爆發，衝撞既有的黨國體制，民主運動在臺灣，才有了極大的躍進。',
      metaUrl: 'formosaincident',
      metaImage: 'formosaincident/img/og.png',
      customScript: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenLite.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineLite.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/CSSPlugin.min.js"><\/script><script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js"><\/script>'
    }
  },
  data () {
    return {
      isMounted: false,
      wEl: null,
      scrollY: 0,
      headerBarEl: null
    }
  },
  mounted () {
    this.isMounted = true
    this.wEl = window
    this.headerBarEl = document.getElementById('readr-app-header')
    this.scrollY = this.wEl.pageYOffset

    TweenLite.defaultEase = Power2.easeInOut

    this.wEl.addEventListener('scroll', this.displayHeaderBar)
    this.headerBarEl.addEventListener('mouseenter', this.enterHeaderBar)

    // TweenLite.defaultEase = Power0.easeNone
  },
  computed: {
    ww () {
      return this.$store.state.viewport[ 0 ]
    },
    isMobW () {
      return this.isMounted && this.ww <= 719.98
    },
    isDeskW () {
      return this.isMounted && this.ww >= 720
    }
  },
  methods: {
    displayHeaderBar () {
      const currentScrollY = this.wEl.pageYOffset
      if (currentScrollY > this.scrollY) {
        this.headerBarEl.classList.add('hidden')
      } else {
        this.headerBarEl.classList.remove('hidden')
      }
      this.scrollY = currentScrollY
    },
    enterHeaderBar () { 
      this.headerBarEl.classList.remove('hidden')
    }
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'
@import './util/global.styl'

html
  font-size 10px
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif
.formosa-incident
  overflow hidden
picture, img
  display block
.ending
  position relative
  font-size 1.8rem
  line-height 2
  color #fff
  @media (min-width $breakpoint.sm)
    font-size 2.4rem
    line-height 1.5
  & img
    width 100%
    height 100vh
    object-fit cover
  & p
    position absolute
    top 50%
    left 50%
    width 100%
    transform translate(-50%, -50%)
    padding 14px 22px
    background-color rgba(0, 0, 0, 0.9)
    box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
    text-align center
    max-width 280px
    @media (min-width $breakpoint.sm)
      padding 22px 125px
      max-width 700px
.header
  transition transform 0.3s ease-in-out
  &.hidden
    transform translateY(-100%)
</style>
