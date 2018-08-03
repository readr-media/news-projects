<template>
  <h1 class="app-finger-hint">
    <img class="app-finger-hint__finger" v-lazy="'/proj-assets/political-contribution/finger.png'" alt="">{{ hint }}
  </h1>
</template>

<script>
export default {
  props: {
    hint: {
      type: String,
      default: '',
    },
  }
}
</script>

<style lang="stylus" scoped>
.app-finger-hint
  margin 20px 0
  &__finger
    width 40px
    transform rotate(90deg)
    vertical-align middle
    margin 0 10px 0 0

@media (max-width 1024px)
  .app-finger-hint
    font-size 18px
    &__finger
      width 20px
      margin 0 5px 0 0
</style>


