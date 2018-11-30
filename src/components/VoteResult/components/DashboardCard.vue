<template>
  <div class="card">
    <div :class="[ 'card__title', `card__title--${theme}` ]" v-text="title"></div>
    <div :class="[ 'card__content', `card__content--${theme}` ]">
      <slot :dataVote="dataMapKeysVote"></slot>
    </div>
  </div>
</template>

<script>
import { mapKeys } from 'lodash'
import { recordCode } from '../constants/index.js'

export default {
  props: {
    theme: {
      type: String,
      required: true,
      validator (val) {
        return [ 'purple', 'gray' ].includes(val)
      }
    },
    title: {
      type: String,
      required: true,
    },
    dataVote: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    dataMapKeysVote () {
      return mapKeys(this.dataVote, (v, k) => k in recordCode ? recordCode[k] : k)
    }
  },
}
</script>

<style lang="stylus" scoped>
.card
  width 500px
  &__title
    display flex
    justify-content center
    align-items center
    font-size 20px
    color white
    letter-spacing 4px
    padding 8px 10px
    min-width 110px
    width max-content
    border-top-left-radius 8px
    border-top-right-radius 8px
    &--purple
      background-color #9e005d
    &--gray
      background-color #979797
  &__content
    // min-height 221px
    background-color #ffffff
    padding 11px 17px
    &--purple
      border 1px solid #979797
    &--gray
      box-shadow 2px 2px 4px 0 rgba(0, 0, 0, 0.5)
</style>


