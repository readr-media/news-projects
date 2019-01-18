<template>
  <div
    class="lightbox-wrapper"
    :style="{ height: `${viewport[1]}px` }"
  >
    <div
      class="lightbox-wrapper__dimmed"
      @click="HIDE_LIGHTBOX"
    >
    </div>
    <div class="lightbox-wrapper__lightbox lightbox">
      <!-- close button -->
      <img
        class="lightbox__close-button"
        src="/proj-assets/election-news/img/close-lightbox.png"
        alt=""
        @click="HIDE_LIGHTBOX"
      >
      <!-- content -->
      <div class="lightbox__content" ref="lightbox__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

import { mapState as mapStateRoot, createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  watch: {
    showLightbox () {
      if (this.showLightbox) {
        disableBodyScroll(this.$refs['lightbox__content'])
      } else {
        enableBodyScroll(this.$refs['lightbox__content'])
      }
    }
  },
  computed: {
    ...mapStateRoot([
      'viewport'
    ]),
    ...mapState([
      'showLightbox'
    ])
  },
  methods: {
    ...mapMutations([
      'HIDE_LIGHTBOX'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.lightbox-wrapper
  position fixed
  top 0
  left 0
  width 100vw
  display flex
  justify-content center
  align-items center
  z-index 10000
  &__dimmed
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .8)
    position absolute
    top 0
    left 0
    z-index 9998
  &__lightbox
    width 100% // mutate when needed
    height 100% // mutate when needed
    background-color #fff
    z-index 9999

.lightbox
  &__close-button
    position fixed // or sticky?
    top 0
    right 0
    cursor pointer
    -webkit-tap-highlight-color transparent
    z-index 10000
    width 40px
  &__content
    height 100%
    overflow-y scroll
    -webkit-overflow-scrolling touch

@media (min-width 1024px)
  .lightbox-wrapper
    &__lightbox
      width 41% // mutate when needed
      height 88% // mutate when needed

  .lightbox
    &__close-button
      top calc((100% - 88%) / 2 - 40px / 2)
      right calc((100% - 41%) / 2 - 40px / 2)
    &__content
      &::-webkit-scrollbar
        display none
        background-color transparent
      &::-webkit-scrollbar-track
        background-color transparent
      &::-webkit-scrollbar-thumb
        background-color transparent
</style>