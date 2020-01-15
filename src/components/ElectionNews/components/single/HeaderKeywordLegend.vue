<template>
  <div class="legend">
    <div class="legend__line"></div>
    <p class="legend__keyword" v-text="getKeywordLocale($route.params.params)"></p>
  </div>
</template>

<script>
import getKeywordLocale from 'src/components/ElectionNews/mixins/getKeywordLocale'

export default {
  mixins: [ getKeywordLocale ]
}
</script>

<style lang="stylus" scoped>
.legend
  display flex
  align-items center
  &__line
    width 20px
    height 2px
    background-color #fad187
  &__keyword
    margin 0 0 0 10px
    font-size 14px

@media (min-width 1024px)
  .legend
    &__line
      width 30px
      height 4px
    &__keyword
      margin 0 0 0 20px
      font-size 30px
</style>