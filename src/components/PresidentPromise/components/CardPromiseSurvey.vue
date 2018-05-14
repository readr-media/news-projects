<template>
  <div class="card">
    <div class="icon_container">
      <img :class="[ 'card__icon', { 'card__icon--small': isCategoryMutiple } ]" :src="`/proj-assets/president-promise/category/${category[0]}.png`" alt="">
      <div v-if="isCategoryMutiple" class="plus"></div>
      <img v-if="isCategoryMutiple" :class="[ 'card__icon', { 'card__icon--small': isCategoryMutiple } ]" :src="`/proj-assets/president-promise/category/${category[1]}.png`" alt="">
    </div>
    <p class="card__title" v-text="title"></p>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  computed: {
    isCategoryMutiple () {
      return this.category.length > 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  width 308px
  height 407px
  border-radius 20px
  background-color transparent
  border solid 2px white
  // padding 58px 22px
  padding 0 22px
  display flex
  flex-direction column
  // justify-content space-between
  justify-content center
  align-items center
  &__icon
    side = 111px
    width side
    height side
    &--small
      side = 86px
      width side
      height side
  &__title
    font-size 24px
    line-height 1.42
    text-align justify
    color #ffffff

.icon_container
  display flex
  align-items center

.plus
  length = 26px
  display inline-block
  width length
  height length
  position relative
  margin-right 7.5px
  // CSS based plus sign
  &::before
    content ''
    width length
    height 4px
    background-color white
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
  &::after
    content ''
    width 4px
    height length
    background-color white
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto

@media (max-width 425px)
  .card
    width 280px
    height 340px
    // padding 33px 22px 13px 22px
    &__icon
      side = 100px
      width side
      height side
      &--small
        side = 74px
        width side
        height side
    &__title
      font-size 22px
      line-height 1.36
      text-align justify
      color #ffffff

  .plus
    length = 24px
    width length
    height length
    // CSS based plus sign
    &::before
      width length
    &::after
      height length
</style>

