<template>
  <section
    class="timeline"
    :style="{
      height: `${vh}px`
    }"
  >
    <div class="timeline__intros intros">
      <h1>大事記</h1>
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

export default {
  components: {
    TimelineList,
    TimelineLightbox
  },
  mixins: [
    viewportMixin
  ],
  data() {
    return {
      showLightbox: false
    }
  },
  methods: {
    handleOpenLightbox() {
      this.showLightbox = true
    },
    handleCloseLightbox() {
      this.showLightbox = false
    }
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
  justify-content flex-start
  &__list
    margin 26px 0 0 0
  &__lightbox
    position fixed
    top 0
    left 0

.intros
  max-width 844px
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

@media (max-width 768px)
  .timeline
    padding 100px 8px 0 8px !important
    justify-content flex-start

  .intros
    h1
      margin 0
    p
      display none
</style>
