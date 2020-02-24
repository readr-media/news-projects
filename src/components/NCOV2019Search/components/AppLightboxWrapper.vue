<template>
  <div
    v-show="showLightbox"
    class="lightbox-wrapper"
    :style="{ height: `${viewport[1]}px` }"
  >
    <div
      class="lightbox-wrapper__dimmed"
      @click="handleCloseLightbox"
    >
    </div>
    <div
      :class="[
        'lightbox-wrapper__lightbox',
        'lightbox'
      ]"
    >
      <!-- close button -->
      <!-- <div
        class="lightbox__close-button"
        @click="handleCloseLightbox"
      /> -->
      <!-- content -->
      <div
        :class="[
          'lightbox__content',
        ]"
        ref="lightbox__content"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import { mapState } from 'vuex'

export default {
  props: {
    showLightbox: {
      type: Boolean,
      default: false
    }
  },
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
    ...mapState([
      'viewport'
    ])
  },
  methods: {
    handleCloseLightbox() {
      this.$emit('update:showLightbox', false)
    }
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
    background-color rgba(0, 0, 0, .7)
    position absolute
    top 0
    left 0
    z-index 9998
  &__lightbox
    background-color #f5f5f5
    z-index 9999
    // padding 12px 15px
    padding 0
    width 100%
    height 100%

.lightbox
  position relative
  // &__close-button
  //   position absolute
  //   top 11px
  //   right 11px
  //   cursor pointer
  //   -webkit-tap-highlight-color transparent
  //   z-index 10000
  //   width 14px
  //   height 14px
  //   &:after
  //     content ''
  //     display block
  //     width 100%
  //     height 100%
  //     clip-path polygon(10% 0, 0 10%, 39% 49%, 0 89%, 9% 100%, 50% 59%, 92% 100%, 100% 92%, 60% 49%, 100% 9%, 90% 0, 50% 38%)
  //     background-color black
  &__content
    height 100%
    &--scrollable
      overflow-y scroll
      -webkit-overflow-scrolling touch
</style>