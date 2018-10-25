<template>
  <div class="timeline">
    <p class="timeline__time" v-text="time"></p>
    <div class="timeline__line"></div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: '00:00:00'
    }
  }  
}
</script>

<style lang="stylus" scoped>
.timeline
  text-align center
  &__time
    font-size 30px
    font-weight bold
    color #d0021b
    margin 0 0 5px 0
  &__line
    width 150px
    height 10px
    border-left 1px solid black
    border-right 1px solid black
    position relative
    &:after
      position absolute
      left 0
      top 4.5px
      content ''
      width 100%
      height 1px
      background-color black
</style>

