<template>
  <div class="item">
    <div :class="[ 'item__time-stamp', { 'item__time-stamp--orange': item.isDuringTsai }, { 'item__time-stamp--less-padding': 'date' in item }, 'time-stamp' ]">
      <p class="time-stamp__year" v-text="item.year"></p>
      <p
        v-if="'date' in item"
        :class="[ 'time-stamp__date', { 'time-stamp__date--small': isDateTextTooLong } ]"
        v-html="item.date"
      >
      </p>
    </div>
    <div class="item__description description">
      <div :class="[ 'description__content', { 'description__content--white': item.isDuringTsai } ]" v-text="item.description"></div>
    </div>
  </div>
</template>

<script>
import { get, } from 'lodash'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isDateTextTooLong () {
      return get(this.item, 'date', '').includes('日')
    },
  },
}
</script>

<style lang="stylus" scoped>
.item
  display flex
  &__time-stamp
    min-width 62px
    height auto
    background-color #c9c9c9
    color #1f464f
    margin 0 17px 0 0
    padding 28px 0 0 0
    &--orange
      background-color #fa8d62
      color white
    &--less-padding
      padding 18px 0 0 0
  &__description
    width 650px

.time-stamp
  display flex
  flex-direction column
  align-items center
  font-size 18px
  font-weight 900
  line-height 1.25
  text-align center
  &__year
    margin 0
  &__date
    margin 5px 0 0 0
    & >>> br
      display none
    &--small
      font-size 14px
  
.description
  padding 36px 0 0 0
  &__content
    padding 13px 0 0 16px
    border-top 2px solid #c9c9c9
    font-size 18px
    line-height 1.78
    text-align justify
    color #c9c9c9
    &--white
      color white
      border-top 2px solid white

@media (max-width 425px)
  .item
    &__time-stamp
      min-width 44px
      width 44px
      padding 26px 0 0 0
      &--less-padding
        padding 18px 0 0 0
    &__description
      min-width calc(100vw - 20px - 20px - 44px - 17px)
      width calc(100vw - 20px - 20px - 44px - 17px)

  .time-stamp
    font-size 14px
    // line-height 2.29
    &__date
      margin 5px 0 0 0
      & >>> br
        display initial

  .description
    padding 28px 0 0 0
    &__content
      padding 14px 0 0 6px
      font-size 14px
      line-height 1.43
</style>

