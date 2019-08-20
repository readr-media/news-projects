<template>
  <div
    class="lightbox"
    :style="{
      height: `${vh}px`
    }"
    @click.self="$emit('closeLightbox')"
  >
    <button
      class="article-wrapper__close-button close-button"
      @click="$emit('closeLightbox')"
    >
      關閉視窗
    </button>
    <div class="lightbox__article-wrapper article-wrapper">
      <div
        class="article-wrapper__close-icon close-icon"
        @click="$emit('closeLightbox')"
      >
        <div class="close-icon__icon" />
      </div>
      <TimelineArticles
        class="article-wrapper__article"
      />
    </div>
  </div>
</template>

<script>
import TimelineArticles from './TimelineArticles.vue'
import viewportMixin from '../mixins/viewport'

export default {
  components: {
    TimelineArticles
  },
  mixins: [
    viewportMixin
  ]
}
</script>

<style lang="stylus" scoped>
.lightbox
  width 100vw
  background-color rgba(0, 0, 0, 0.75)
  display flex
  justify-content center
  z-index 1000

.article-wrapper
  width 1024px
  background-color black
  overflow-y scroll
  // position relative
  -webkit-overflow-scrolling touch
  &__close-icon
    position fixed
    top 16px
    right calc((100vw - 1000px) / 2 + 16px)
  &__article
    margin 0 auto

.close-icon
  cursor pointer
  d = 28px
  width d
  height d
  &__icon
    width 100%
    height 100%
    background-color white
    clip-path polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%)

.close-button
  position fixed
  top 0
  left 0
  display none
  z-index 9999
  width 100%
  height 40px
  cursor pointer
  background-color #4a4a4a
  border none
  outline none
  color white

@media (max-width 1024px)
  .article-wrapper
    // -webkit-overflow-scrolling touch
    &__close-icon
      display none
      
  .close-button
      display initial
</style>