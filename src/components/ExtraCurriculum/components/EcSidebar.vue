<template>
  <aside class="ec-sidebar">

  </aside>
</template>
<script>
export default {
  name: 'EcSidebar'
}
</script>
<style lang="stylus" scoped>
.ec-sidebar
  position fixed
  top 0
  left 0
  bottom 0
  z-index 500
  width 100% !important
  padding-top 50px
  background-color #2c585e
  transform translateX(-100%)
  transition transform .5s

@media (max-width: 767px)
  .ec-sidebar
    &.active
      transform translateX(0)

// fix header
@media (max-width: 768px)
  .ec-sidebar
    padding-top 40px

@media (min-width: 768px)
  .ec-sidebar
    position absolute
    width 300px !important
    padding-top 0
    transform translateX(0)

@media (min-width: 1200px)
  .ec-sidebar
    width 400px !important
</style>