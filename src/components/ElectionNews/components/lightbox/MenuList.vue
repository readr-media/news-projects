<template>
  <div class="list-wrapper">
    <div
      :class="[ 'list-wrapper__header', 'header', { 'header--show-list': showList }]"
      @click="toggle"
    >
      <slot name="header"></slot>
      <div class="header__icon icon">
        <div class="icon__horizontal"></div>
        <div v-show="!showList" class="icon__vertical"></div>
      </div>
    </div>
    <ul
      v-show="showList"
      class="list-wrapper__list list"
    >
      <MenuListItem
        v-for="(listItem, i) in list"
        :key="i"
        class="list__item"
        :listItem="listItem"
      />
    </ul>
  </div>
</template>

<script>
import MenuListItem from './MenuListItem.vue'

export default {
  props: {
    shouldShowList: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      defalut () {
        return []
      }
    }
  },
  components: {
    MenuListItem
  },
  data () {
    return {
      showList: this.shouldShowList
    }
  },
  methods: {
    toggle () {
      this.showList = !this.showList
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  height 50px
  display flex
  justify-content center
  align-items center
  font-size 18px
  border-top 1px solid #999999
  border-bottom 1px solid #999999
  background-color #f0f0f0
  // position relative
  position sticky
  top 170px
  left 0
  &--show-list
    background-color white
    border-bottom none
  &__icon
    position absolute
    right 16px
    top calc((50px - 20px) / 2 - 2px)
    width 20px
    height 20px

.icon
  &__horizontal
    position absolute
    top calc((20px - 4px) / 2)
    left 0
    width 100%
    height 4px
    background-color #4a90e2
  &__vertical
    position absolute
    top 0
    left calc((20px - 4px) / 2)
    width 4px
    height 100%
    background-color #4a90e2

.list
  list-style none
  margin 0
  padding 0 16px
  &__item
    margin 20px 0
</style>