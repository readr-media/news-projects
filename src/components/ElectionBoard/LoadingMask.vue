<template>
  <div class="loading-mask">
    <p>{{ status }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingMask',
  computed: {
    status () {
      const loadingStatus = this.$store.state.ElectionBoard.loadingStatus
      switch (loadingStatus) {
        case 'process image':
          return '正在努力處理照片⋯'
          break
        case 'check coordinate':
          return '正在取得看板位置⋯'
          break
        case 'check board':
          return '正在處理看板資訊⋯'
          break
        case 'upload board':
          return '正在送出看板資訊⋯'
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="stylus">
.loading-mask
  position fixed
  width 100%
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(#000, 0.72)
  z-index 9999
  display flex
  justify-content center
  align-items center
  & p
    color #fff
</style>