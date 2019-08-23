<template>
  <section
    class="timeline"
    :style="{
      height: `${vh}px`
    }"
  >
    <div
      class="timeline__intros intros"
      :style="{
        position: 'absolute',
        bottom: `${introsBottom}px`
      }"
    >
      <h1>一國兩制 22 年，<br>香港民主運動軌跡</h1>
      <p>1984 年，香港回歸中國，當時前中國領導人鄧小平承諾「港人治港」的方針 50 年不變，近年卻出現巨大變化。港人對民主進步的追求從未停歇，從最早聲援中國六四的遊行、四年前的雨傘運動、到今年反對中國干預司法獨立性的「反送中」，READr 帶你從 1989 年開始回顧。</p>
    </div>
    <TimelineList
      class="timeline__list"
      @openLightbox="handleOpenLightbox"
    />
    <transition name="fade" mode="out-in">
      <TimelineLightbox
        v-show="showLightbox"
        class="timeline__lightbox"
        @closeLightbox="handleCloseLightbox"
      />
    </transition>
  </section>
</template>

<script>
import TimelineList from './TimelineList.vue'
import TimelineLightbox from './TimelineLightbox.vue'
import viewportMixin from '../mixins/viewport'
import scrollGATimelineMixin from '../mixins/scrollGATimeline'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('HongKongProtests')
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo, {
  container: '.article-wrapper',
  easing: 'ease',
  duration: 600
})

export default {
  components: {
    TimelineList,
    TimelineLightbox
  },
  mixins: [
    viewportMixin,
    scrollGATimelineMixin
  ],
  serverPrefetch() {
    return this.FETCH_TIMELINE()
  },
  data() {
    return {
      showLightbox: false
    }
  },
  computed: {
    introsBottom() {
      const breakpoint = 425

      if (this.vw > breakpoint) {
        if (this.vw <= 1440) {
          return this.vh / 2 + 392 / 2 - 26 - 50 - 10
        }
        return this.vh / 2 + 560 / 2 - 26 - 50
      } else {
        return this.vh / 2 + this.vh * 0.65 / 2 - 26 - 35
      }
    }
  },
  methods: {
    scrollIntoArticle(articleDate) {
      const dateFormatted = articleDate.replace(/\./g, '')
      this.$scrollTo(`#article-${dateFormatted}`, { offset: -60 })
    },
    handleOpenLightbox({ articleDate, articleSubtitle }) {
      this.showLightbox = true
      this.$nextTick()
        .then(() => {
          this.scrollIntoArticle(articleDate)
        })
      window.ga('send', 'event', 'projects', 'click', articleSubtitle, { nonInteraction: false })
    },
    handleCloseLightbox() {
      this.showLightbox = false
    },
    ...mapActions([
      'FETCH_TIMELINE'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.timeline
  // width max-content
  // height 100vh
  padding 80px 16px 0 16px !important
  display flex
  flex-direction column
  justify-content center
  background-image linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://storage.googleapis.com/mirrormedia-files/assets/images/20190816121749-c4a9d27601008cc827d1d66c4761f243-tablet.jpg)
  background-repeat no-repeat
  background-size cover
  &__list
    margin 26px 0 0 0
  &__lightbox
    position fixed
    top 0
    left 0

.intros
  max-width 844px
  color white
  h1
    margin 15px 0
    font-size 32px
    br
      display none
  p
    margin 0
    font-size 18px
    line-height 1.78

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (max-width 425px)
  .timeline
    padding 100px 8px 0 8px !important
    justify-content flex-start
    background-image linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://storage.googleapis.com/mirrormedia-files/assets/images/20190816121749-c4a9d27601008cc827d1d66c4761f243-mobile.jpg)
    &__list
      margin 40px 0 0 0

  .intros
    h1
      margin 0
      line-height 1.25
      br
        display initial
    p
      display none
</style>
