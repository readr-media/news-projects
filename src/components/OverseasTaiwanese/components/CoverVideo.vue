<template>
  <section class="cover">

    <video src="/proj-assets/overseastaiwanese/video/cover.mp4"
      :poster="`/proj-assets/overseastaiwanese/img/cover-${isLapW ? 'lap' : 'mob'}.png`"
      data-object-fit
      muted autoplay loop playsinline webkit-playsinline
    >
    </video>

    <transition name="fadeCoverTitle">
      <img src="/proj-assets/overseastaiwanese/img/title.png" alt="海海人生：回流青年的告白" class="total-center" v-if="isMounted" :style="{ width: isLapW ? '41.7%' : '90.6%' }">
    </transition>

  </section>
</template>

<script>
import '../util/objectFitPolyfill.basic.min'

export default {
  name: 'CoverVideo',
  props: ['isLapW'],
  data () {
    return {
      isMounted: false
    }
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.cover
  position relative
  width 100%
  height 100vh
  overflow hidden
  & video
    width 100%
    height 100%
    object-fit cover

.fadeCoverTitle
  &-enter
    opacity 0
  &-enter-active
    transition opacity 1.6s ease-out
</style>