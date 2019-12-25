<template>
  <ul class="list">
    <h1 class="list__title">
      <span class="mobile">點擊選區</span><span class="desktop">移動滑鼠至選區</span>以查看詳情
    </h1>
    <div class="list-item-wrapper">
      <div class="list-item-wrapper__catalog list-item-wrapper__catalog--first">
        <CountyListItem
          class="list__list-item"
          v-for="county in counties.slice(0, 12)"
          :key="county.name"
          :county="county"
        />
      </div>
      <div
        :class="[
          'list-item-wrapper__catalog',
          'list-item-wrapper__catalog--second',
          { 'list-item-wrapper__catalog--hide-mobile': !isExpandCountyClicked }
        ]"
      >
        <CountyListItem
          class="list__list-item"
          v-for="county in counties.slice(12, counties.length)"
          :key="county.name"
          :county="county"
        />
      </div>
      <ButtonExpandCounty
        class="list-item-wrapper__expand-button"
        @toggle="handleExpandCountyToggle"
      />
    </div>
  </ul>
</template>

<script>
import CountyListItem from './ChartCountyListItem.vue'
import ButtonExpandCounty from '../ButtonExpandCounty.vue'

import { LegislatorCounties } from '../../data/mock'

export default {
  components: {
    CountyListItem,
    ButtonExpandCounty
  },
  data() {
    return {
      counties: LegislatorCounties,
      isExpandCountyClicked: false
    }
  },
  methods: {
    handleExpandCountyToggle(value) {
      this.isExpandCountyClicked = value
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  list-style none
  margin 0
  padding 0
  &__title
    font-size 15px
    color $color-black-light
    text-align left
    margin 0 0 0 65px
    padding 12px 10px
    border-left solid 1px rgba(0, 0, 0, 0.4)
    font-weight normal
    span
      font-weight 600
      &.desktop
        display none

.list-item-wrapper
  &__catalog
    &--hide-mobile
      display none
  &__expand-button
    width 100%
    margin 12px 0

@media (min-width 768px)
  .list
    &__title
      text-align right
      border-left none
      margin 0
      padding 0
      span
        &.mobile
          display none
        &.desktop
          display inline

  .list-item-wrapper
    display flex
    margin 24px 0 0 0
    &__catalog
      width 576px
      &--hide-mobile
        display block
      &--first
        padding 0 51px 0 0
      &--second
        border-left 2px solid rgba(0, 0, 0, .1)
        padding 0 0 0 51px
    &__expand-button
      display none !important
</style>
