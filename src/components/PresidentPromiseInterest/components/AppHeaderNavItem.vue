<template>
  <a class="nav-item" :href="item.href">
    <div
      class="nav-item__icon"
      :style="{ maskImage: `url(${item.iconSrc})` }"
    >
    </div>
    <p class="nav-item__title" v-text="item.title"></p>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style lang="stylus" scoped>
.nav-item
  display flex
  text-decoration none
  padding 0 0 6px 0
  border-bottom 4px solid transparent
  position relative
  top 4px
  color white
  transition color .1s ease-out, border-bottom .1s ease-out
  &:hover
    color #b1dad4
    border-bottom 4px solid currentColor
    .nav-item__icon
      background-color currentColor
  &__icon
    width 20px
    height 20px
    margin 0 11px 0 0
    mask-position center center
    mask-size auto 100%
    mask-repeat no-repeat
    background-color white
    transition background-color .1s ease-out
  &__title
    margin 0
    font-size 18px
    font-weight 400
</style>


