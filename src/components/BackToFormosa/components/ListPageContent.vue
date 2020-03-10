<template>
  <div class="list-page-content">
    <div class="list-page-content__item" v-for="item in listItems" :key="item.name">
      <p class="list-page-content__name">{{ item.name }}</p>
      <ul v-html="item.description" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListPageContent',
  props: {
    listItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.list-page-content
  &__name
    font-size 2.0rem
    // font-weight 700
    line-height 1.4
    margin-bottom 8px
    @media (min-width $breakpoint-md)
      font-size 3.0rem
  &__item
    & + &
      margin-top 30px
      @media (min-width $breakpoint-md)
        margin-top 40px
  & ul
    line-height 1.75
    font-size 1.6rem
    @media (min-width $breakpoint-md)
      font-size 2.0rem
      line-height 2
  & li
    position relative
    // padding-top 2px
    // padding-bottom 2px
    padding-left 22px
    & + li
      margin-top 4px
    &::before
      content ''
      display block
      position absolute
      width 12px
      height 12px
      border-radius 50%
      background-color #a56c6a
      // (28 - 12) / 2
      top 8px
      left 0
      @media (min-width $breakpoint-md)
        // (40 - 12) / 2
        top 14px
</style>
