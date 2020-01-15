<template>
  <div class="card">
    <div class="card__header header">
      <div :class="[ 'header__title', `header__title--${theme}` ]">
        <p class="header__text" v-text="title"></p>
        <img class="header__action" :src="`/proj-assets/vote2018-result/${isCardExpand ? 'shrink' : 'expand'}.png`" alt="" @click="toggleAction">
      </div>
    </div>
    <div :class="[ 'card__content', `card__content--${theme}`, { 'card__content--shrink': !isCardExpand } ]">
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
  data () {
    return {
      isCardExpand: true
    }
  },
  computed: {
    dataMapKeysVote () {
      return mapKeys(this.dataVote, (v, k) => k in recordCode ? recordCode[k] : k)
    }
  },
  methods: {
    toggleAction () {
      this.isCardExpand = !this.isCardExpand
    }
  },
}
</script>

<style lang="stylus" scoped>
.card
  width 400px
  &__header
    display flex
    align-items center
  &__content
    // min-height 221px
    background-color #ffffff
    padding 11px 17px
    &--purple
      border 1px solid #979797
    &--gray
      box-shadow 2px 2px 4px 0 rgba(0, 0, 0, 0.5)
    &--shrink
      height 0
      div
        opacity 0
        pointer-events none

.header
  &__title
    display flex
    justify-content center
    align-items center
    font-size 20px
    font-weight 300
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
  &__text
    margin 0
  &__action
    height 25px
    margin 0 0 0 10px
    cursor pointer
</style>


