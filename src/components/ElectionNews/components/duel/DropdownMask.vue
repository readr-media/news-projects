<template>
  <div class="mask">
    <div
      :class="[ 'mask__icon', { 'mask__icon--smaller-desktop': atFooter } ]"
      :style="{ backgroundColor: position === 'left' ? '#f37d85' : '#73cfea' }"
    >
    </div>
    <div :class="[ 'mask__select', { 'mask__select--smaller-desktop': atFooter }, 'select']">
      <p
        :class="[ 'select__keyword', { 'select__keyword--smaller': atFooter } ]"
        v-text="getKeywordLocale(keyword)"
      >
      </p>
      <div :class="[ 'select__triangle', { 'select__triangle--smaller-desktop': atFooter } ]"></div>
    </div>
  </div>
</template>

<script>
import getKeywordLocale from 'src/components/ElectionNews/mixins/getKeywordLocale'

export default {
  props: {
    position: {
      type: String,
      default: 'left'
    },
    atFooter: {
      type: Boolean,
      default: false
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  mixins: [ getKeywordLocale ]
}
</script>

<style lang="stylus" scoped>
.mask
  display flex
  cursor pointer
  -webkit-tap-highlight-color transparent
  &__icon
    d = 20px
    width d
    height d
  &__select
    width 100px
    height 20px
    border 1px solid #999999

.select
  display flex
  justify-content space-between
  align-items center
  padding 5px 5px 5px 10px
  // opacity 0
  &__keyword
    margin 0
    font-size 14px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    // &--smaller
    //   color #4a4a4a
    //   font-size 10px
  &__triangle
    width 0
    height 0
    border-style solid
    border-width 8.7px 5px 0 5px
    border-color #999999 transparent transparent transparent

@media (min-width 1024px)
  .mask
    &__icon
      d = 50px
      width d
      height d
      &--smaller-desktop
        d = 25px
        width d
        height d
    &__select
      width 180px
      height 50px
      &--smaller-desktop
        width 206px
        height 25px

  .select
    padding 10px
    // opacity 0
    &__keyword
      font-size 30px
      &--smaller
        color #4a4a4a
        font-size 14px
    &__triangle
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 17.3px 10px 0 10px;
      border-color: #999999 transparent transparent transparent;
      &--smaller-desktop
        width 0
        height 0
        border-style solid
        border-width 8.7px 5px 0 5px
        border-color #999999 transparent transparent transparent
</style>