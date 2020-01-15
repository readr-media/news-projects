<template>
  <div class="app-lightbox-container" ref="app-lightbox-container">
    <div class="app-lightbox-container__dimmed" ref="app-lightbox-container__dimmed" @click="closeLightbox"></div>
    <div class="content">
      <ButtonClose class="content__close-button" @click.native="closeLightbox"/>
      <section class="app-lightbox" ref="app-lightbox">
        <!-- <transition-group name="fade" mode="out-in"> -->
          <slot></slot>
        <!-- </transition-group> -->
      </section>
    </div>
  </div>
</template>

<script>
import ButtonClose from './buttons/ButtonClose.vue'

export default {
  props: {
    isLightboxShown: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    ButtonClose,
  },
  watch: {
    isLightboxShown () {
      // Calculate real viewport height repeatedly, due to mobile bottom nav bar will fade out sometimes
      if (this.isLightboxShown && !this.$store.state.useragent.isDesktop) {
        const realVH = this.getVH()
        this.calcLightboxDimensions(realVH)
      }
    }
  },
  methods: {
    getVH () {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    },
    calcLightboxDimensions (realVH = this.$store.getters['heightMobile']) {
      // Using JS to calculate the dimensions except using CSS viewport, in order to avoid browser's bottom nav bar causing vh inconsistent
      this.$refs['app-lightbox-container'].style['height'] = `${realVH}px`
      this.$refs['app-lightbox-container__dimmed'].style['height'] = `${realVH}px`
      this.$refs['app-lightbox'].style['height'] = `${realVH}px`
    },
    closeLightbox () {
      this.$emit('closeLightbox')
    }
  },
  mounted () {
    if (!this.$store.state.useragent.isDesktop) {
      this.calcLightboxDimensions()
    }
  },
}
</script>

<style lang="stylus" scoped>
.app-lightbox-container
  width 100vw
  height 100vh
  display flex
  justify-content center
  align-items center
  position fixed
  top 0
  left 0
  z-index 10090
  &__dimmed
    width 100vw
    height 100vh
    background-color rgba(0, 0, 0, .8)
    position absolute
    top 0
    left 0

.content
  position relative
  &__close-button
    z-index 10002
    position absolute
    top 0
    right -30px
    // right calc(-50px / 3)
    // top calc(-50px / 3)

.app-lightbox
  width 95vw
  height 95vh
  // border-radius 10px
  background-color white
  // padding 34px 10px 36px 10px
  overflow-y scroll
  &::-webkit-scrollbar
    display none
    background-color transparent
  &::-webkit-scrollbar-track
    background-color transparent
  &::-webkit-scrollbar-thumb
    background-color transparent

@media (max-width 1024px)
  .app-lightbox
    width 100vw
    overflow-y hidden
    // -webkit-overflow-scrolling touch

  .content
    // overflow-y scroll
    // -webkit-overflow-scrolling touch
    &__close-button
      left initial
      right 0
</style>

