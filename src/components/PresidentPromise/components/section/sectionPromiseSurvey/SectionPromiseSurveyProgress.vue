<template>
  <div class="progress">
    <div v-for="count in 10" :key="count" :class="[ 'progress__count', { 'progress__count--highlight': progressPerRound <= count } ]"></div>
  </div>
</template>

<script>
export default {
  props: {
    progressPerRound: {
      type: Number,
      required: true,
    }
  }
}
</script>

<style lang="stylus" scoped>
.progress
  display flex
  flex-direction column
  position absolute
  top 0
  left 0
  bottom 0
  right 0
  margin auto 0 auto 14px
  width 36px
  height calc(120px + 45px)
  z-index 9999
  background-color #2b616d
  &__count
    width 36px
    height 12px
    border-radius 2px
    background-color #1f464f
    transition background-color .25s
    &--highlight
      background-color #b2dbd5
      transition background-color .25s
    & + &
     margin 5px 0 0 0

@media (max-width 425px)
  .progress
    flex-direction row
    width calc(120px + 45px)
    height 36px
    margin 14px auto 0 auto
    &__count
      width 13px
      height 36px
      & + &
        margin 0 0 0 4px

@media (max-width 320px)
  .progress
    margin 4px auto 0 auto
</style>


