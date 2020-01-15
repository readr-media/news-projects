<template>
  <div class="section-content-explore-lightbox-force-zoom">
    <img class="section-content-explore-lightbox-force-zoom__zoom-in" src="/proj-assets/political-contribution/explore/+.png" alt="" @click="toogleZoom('zoomIn')">
    <img class="section-content-explore-lightbox-force-zoom__zoom-out" src="/proj-assets/political-contribution/explore/_.png" alt="" @click="toogleZoom('zoomOut')">
  </div>
</template>

<script>
export default {
  methods: {
    toogleZoom (type) {
      this.$root.$emit('toogleZoom', type)
    }
  }
}
</script>


<style lang="stylus" scoped>
.section-content-explore-lightbox-force-zoom
  display flex
  flex-direction column
  &__zoom-in, &__zoom-out
    cursor pointer
    width 35px
    height 35px
    &:hover
      filter brightness(0%)
  &__zoom-out
    margin 5px 0 0 0
</style>

