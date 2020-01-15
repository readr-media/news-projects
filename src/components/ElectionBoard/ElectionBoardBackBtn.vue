<template>
  <div
    class="eb-back-landing"
    @click="$router.push({ path: '/project/election-board' })">
    <img src="/proj-assets/election-board/images/house.png" alt="">
  </div>
</template>
<script>
export default {
  name: 'ElectionBoardBackBtn'
}
</script>
<style lang="stylus" scoped>
.eb-back-landing
  position fixed
  top 0
  right 0
  z-index 999
  width 70px
  height 70px
  background-color #a0a0a0
  border-radius 0 0 0 70px
  cursor pointer
  > img
    position absolute
    top 15px
    right 15px
    width 24px
</style>
