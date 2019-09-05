<template>
  <div class="youtube" ref="youtube" >
    <iframe :id="youtubeRef" :src="`https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0&playsinline=1&origin=https://www.readr.tw/`" width="100%" :height="youtubeH" frameborder="0" allowfullscreen>
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'YouTube',
  props: ['youtubeRef', 'videoId', 'wh', 'isMobW'],
  data () {
    return {
      isMounted: false
    }
  },
  mounted () {
    this.isMounted = true
  },
  computed: {
    // wh () {
    //   return this.$parent.$parent.wh
    // },
    // isMobW () {
    //   return this.$parent.$parent.isMobW
    // },
    youtubeH () {
      if (!this.isMounted) return 0
      const youtubeEl = this.$refs.youtube
      const offsetT = youtubeEl.offsetTop
      const paddingB = this.isMobW ? 50 : 40
      const offsetW = youtubeEl.offsetWidth
      const aspectRatio = 16 / 9
      const minH = offsetW / aspectRatio
      const fitH = (this.wh - (offsetT + paddingB))
      return fitH >= minH ? fitH : minH
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.youtube
  margin-top 35px
  & > iframe
    display block
</style>