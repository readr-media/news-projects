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
      <h1>香港民運</h1>
      <p>立語的正的想確土你第過交行？活中他名位所少，且教臺不才快走間理！傳得許成意用地才。辦空美任給一產由沒生造廣難究：調洋活期魚不：的我位部目但不養：輕人。個怎獨傷古錢們在的作眼落查性道上樂長入雙道要得。約 80 字</p>
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
        if (this.vw <= 1280) {
          return this.vh / 2 + 392 / 2 - 26 - 50 - 10
        }
        return this.vh / 2 + 560 / 2 - 26 - 50
      } else {
        return this.vh / 2 + this.vh * 0.7 / 2 - 26 - 10
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
  background-image linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://storage.googleapis.com/mirrormedia-files/assets/images/20190815151015-4fc8be4b020e17fa12a021f2351af858-tablet.jpg)
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
    background-image linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://storage.googleapis.com/mirrormedia-files/assets/images/20190815151015-4fc8be4b020e17fa12a021f2351af858-mobile.jpg)
    &__list
      margin 10px 0 0 0

  .intros
    h1
      margin 0
    p
      display none
</style>
