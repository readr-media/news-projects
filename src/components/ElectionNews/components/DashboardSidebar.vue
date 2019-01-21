<template>
  <aside class="sidebar-wrapper">
    <div class="sidebar-wrapper__handle handle" @click="toggleHandle"></div>
    <div class="sidebar-wrapper__arrow" @click="toggleHandle"></div>
    <div class="sidebar-wrapper__sidebar sidebar">
      <h1 class="sidebar__title">媒體來源</h1>
      <ul class="sidebar__list list">
        <CheckItem
          class="list__list-item"
          :isChecked="isAllItemChecked"
          :checkboxColor="'black'"
          @click.native="toggleAllItem"
        >
          全選
        </CheckItem>
        <CheckItem
          v-for="id in graphDataKeywordSourceIds"
          :key="id"
          class="list__list-item"
          :isChecked="filter.includes(id)"
          :checkboxColor="getCheckboxColor(id)"
          @click.native="toggle(id)"
        >
          {{ getSourceAbbr(sourcesMapping[id]) }}
        </CheckItem>
      </ul>
    </div>
  </aside>
</template>

<script>
import { findKey } from 'lodash'

import CheckItem from './CheckItem.vue'

import { getSourceAbbr } from '../util'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  components: {
    CheckItem,
  },
  watch: {
    filter () {
      if (this.filter.length === 0) {
        this.isAllItemChecked = true
        this.RESET_COLOR_CANDIDATES()
      }
    }
  },
  data () {
    return {
      isAllItemChecked: true,
    }
  },
  computed: {
    ...mapState({
      sourcesMapping: state => state.mapping.sources,
      filter: state => state.filter.sources,
      colors: state => state.colors
    }),
    ...mapGetters([
      'graphDataKeywordSourceIds'
    ]),
  },
  methods: {
    ...mapActions([
      'TOGGLE_COLOR_PICKER'
    ]),
    ...mapMutations([
      'PUSH_TO_SOURCES_FILTER',
      'CLEAR_SOURCES_FILTER',
      'RESET_COLOR_CANDIDATES'
    ]),
    toggleHandle () {
      this.$emit('toggleHandle')
    },
    toggleAllItem () {
      this.CLEAR_SOURCES_FILTER()
      this.isAllItemChecked = true
      this.RESET_COLOR_CANDIDATES()
    },
    toggle (id) {
      this.TOGGLE_COLOR_PICKER(id)
      this.isAllItemChecked = false
    },
    getCheckboxColor (id) {
      return findKey(this.colors, o => o === id)
    },
    getSourceAbbr (source) {
      return getSourceAbbr(this.$store, source)
    }
  }
}
</script>

<style lang="stylus" scoped>
.sidebar-wrapper
  width 100px
  background-color #eae9eb
  height 100vh
  box-shadow -1px 0 4px 0 rgba(0, 0, 0, 0.5)
  z-index 1000
  &__handle
    position absolute
    top 0px
    left -10px
    z-index -1
    cursor pointer
    user-select none
    -webkit-tap-highlight-color transparent
  &__arrow
    d = 15px
    width d
    min-width d
    height d
    min-height d
    border-left 2px solid #999999
    border-bottom 2px solid #999999
    position absolute
    top calc(100px / 2 - 15px / 2)
    transform rotate(45deg)
    transition transform .25s ease-out, left .25s ease-out
    left -5px
    cursor pointer
    user-select none
    -webkit-tap-highlight-color transparent

.sidebar
  background-color #eae9eb
  padding 15px 11px
  height 100vh
  overflow-y scroll
  &__title
    font-size 14px
    font-weight 400
    margin 0
  &__list
    margin 16px 0 0 0
    padding 0

.handle
  width 20px
  height 100px
  background-color #eae9eb
  box-shadow -1px 0 4px 0px rgba(0, 0, 0, 0.5)

.list
  &__list-item
    & + &
      margin 15px 0 0 0

@media (min-width 1024px)
  .sidebar-wrapper
    &__handle
      display none
    &__arrow
      display none

  .sidebar
    padding 60px 20px
    &__title
      font-size 20px

  .list
    margin 26px 0 0 0
</style>