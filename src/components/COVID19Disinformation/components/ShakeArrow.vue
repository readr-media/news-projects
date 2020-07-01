<template>
  <div class="shake-arrow" />
</template>

<script>
export default {
  name: 'ShakeArrow'
}
</script>

<style lang="stylus" scoped>
.shake-arrow
  width 25px !important
  height 25px !important
  border-left 3px solid #fff
  border-bottom 3px solid #fff
  transform rotate(-45deg)
  animation updown .8s infinite alternate

@keyframes updown
  0%
    transform translateY(0) rotate(-45deg)
  100%
    transform translateY(-20px) rotate(-45deg)

</style>
