<template>
  <button 
    :class="[ 'result-category-tab', { 'result-category-tab--active': active }, { 'result-category-tab--orange': categoryName === '我關心' }, { 'result-category-tab--hover': isActive }, ]"
    :id="`result-category-tab--${categories[categoryName]}`"
    v-text="categoryName"
    @mouseover="toggleActive"
    @mouseout="toggleActive"
    @touchstart="toggleActive"
    @touchend="toggleActive"
  >
  </button>
</template>

<script>
import buttonToogleActive from '../../mixins/buttonToogleActive'
import { categories } from '../../constants'

export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    }
  },
  mixins: [ buttonToogleActive ],
  data () {
    return {
      categories
    }
  }
}
</script>

<style lang="stylus" scoped>
.result-category-tab
  cursor pointer
  background-color transparent
  border none
  border-bottom 2px solid transparent
  font-size 18px
  line-height 1.17
  text-align center
  color #c9c9c9
  transition color .25s
  padding 11px 4px 9px 4px
  &--active
    color #b2dbd5
    border-bottom 2px solid #b2dbd5
  &--orange
    color #fa8d62
  &--hover
    color white
    transition color .25s
  &:focus
    outline 0
  & + &
    margin-left 24px

@media (max-width 425px)
  .result-category-tab
    height 30px
    font-size 14px
    line-height 1.5
    padding 6px 4px 8px 4px
</style>


