<template>
  <button :class="type" class="read-more-btn" @click="$emit('click')">
    <template v-if="type === 'open'">
      <div class="bar"></div>
    </template>
    <template v-if="type === 'close'">
      <img src="/proj-assets/energy-policy/close.png" alt="關閉">
    </template>
    <slot name="moreText"></slot>
  </button>
</template>
<script>
export default {
  name: 'ReadMoreButton',
  props: {
    type: {
      type: String,
      default: 'open'
    }
  }
}
</script>
<style lang="stylus" scoped>
  .read-more-btn
    position relative
    width 40px
    height 40px
    padding 0
    color #fff
    font-size 1.25rem
    text-align center
    background-color #f8e71c
    border none
    border-radius 50%
    cursor pointer
    > span
      position absolute
      top 50%
      left 45px
      transform translateY(-50%)
      color #f8e71c
      font-size .75rem
      white-space nowrap
    > img
      width 20px
      height 20px
      margin 10px auto
  .bar
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 25px
    height 3px
    background-color #9b9b9b
    &::before, &::after
      content ''
      position absolute
      left 0
      width 100%
      height 3px
      background-color #9b9b9b
    &::before
      top -6px
    &::after
      bottom -6px

@media (max-width: 374px) // iPhone SE
  .read-more-btn
    width 30px
    height 30px
    font-size 1.125rem
    > span
      left 40px
    > img
      width 15px
      height 15px
      margin 7.5px auto
    .bar
      width 15px

@media (min-width: 768px)
  .read-more-btn
    font-size 1.5rem
    > span
      left 50px
      font-size 1rem
</style>

