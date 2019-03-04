<template>
  <button :class="type" class="read-more-btn" @click="$emit('click')">
    <template v-if="type === 'open'">
      <div class="bar"></div>
    </template>
    <!-- <template v-if="type === 'close'">

    </template> -->
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
  button
    &.read-more-btn
      position relative
      // display flex
      width 40px
      height 40px
      padding 0
      color #fff
      font-size 1.25rem
      background-color #f8e71c
      border none
      border-radius 50%
      cursor pointer
      // &.open
      //   flex-direction column
      //   justify-content center
      //   align-items center
    > span
      position absolute
      top 50%
      left 45px
      transform translateY(-50%)
      color #f8e71c
      font-size .625rem
      white-space nowrap
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
    // & + .bar
    //   margin-top 3px

@media (max-width: 374px)
  button
    &.read-more-btn
      font-size 1.125rem

@media (min-width: 768px)
  button
    &.read-more-btn
      font-size 1.5rem
    > span
      left 50px
      font-size 1rem
</style>

