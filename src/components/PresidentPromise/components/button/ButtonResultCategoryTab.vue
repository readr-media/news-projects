<template>
  <button :class="[ 'result-category-tab', { 'result-category-tab--active': active }, { 'result-category-tab--hover': isActive } ]"
          :id="`result-category-tab--${categoryEN[categoryName]}`"
          v-text="categoryName"
          @mouseover="toggleActive"
          @mouseout="toggleActive"
          @touchstart="toggleActive"
          @touchend="toggleActive">
  </button>
</template>

<script>
import buttonToogleActive from '../../mixins/buttonToogleActive'

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
      categoryEN: {
        '全部': 'all',
        '感興趣': 'interest',
        '內政': 'interior',
        '兩岸': 'china',
        '動保': 'animal',
        '勞動': 'labor',
        '司法': 'judicial',
        '國防': 'defense',
        '外交': 'foreign',
        '建設': 'construct',
        '教育': 'education',
        '文化': 'culture',
        '族群': 'people',
        '環保': 'Ecology',
        '科技': 'tech',
        '經濟': 'economy',
        '衛福': 'health',
        '財政': 'finance',
        '轉型正義': 'transitional-justice',
        '農業': 'agriculture',
      }
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
    border-bottom 2px solid #b2dbd5
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


