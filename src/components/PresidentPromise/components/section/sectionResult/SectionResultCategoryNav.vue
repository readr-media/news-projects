<template>
  <div class="category-nav-container">
    <nav class="category-nav">
      <ButtonResultCategoryTab
        v-for="(category, i) in Object.keys(categories)"
        :key="category"
        :active="activeIndex === i"
        :categoryName="category"
        @click.native="changeCategory(category, i)"
      />
    </nav>
  </div>
</template>

<script>
import { get, } from 'lodash'
import ButtonToogleActive from '../../../mixins/ButtonToogledActive'
import ButtonResultCategoryTab from '../../button/ButtonResultCategoryTab.vue'
import { categories } from '../../../constants'
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

export default {
  props: {
    activeIndex: {
      type: Number,
      required: true,
    }
  },
  watch: {
    activeIndex () {
      if (!this.isDesktop) {
        this.$scrollTo(`#result-category-tab--${Object.values(this.categories)[this.activeIndex]}`, 500, { container: '.category-nav-container', x: true, y: false, offset: -20 })
      }
    }
  },
  components: {
    ButtonResultCategoryTab
  },
  mixins: [ ButtonToogleActive ],
  data () {
    return {
      categories,
      isDesktop: get(this.$store.state, 'useragent.isDesktop', false),
    }
  },
  methods: {
    changeCategory (category, index) {
      this.$emit('update:activeIndex', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.category-nav-container
  width 100%
  background-color #1f464f
  display flex
  justify-content center
  // z-index 0
.category-nav
  max-width 760px
  // padding 0 0 11px 0
  display flex
  flex-wrap wrap
  justify-content center
  align-items center

@media (max-width 425px)
  .category-nav-container
    width auto
    overflow-x scroll
    -webkit-overflow-scrolling touch
    justify-content flex-start
    padding 0 20px
    &::-webkit-scrollbar
      display none
      background-color transparent
    &::-webkit-scrollbar-track
      background-color transparent
    &::-webkit-scrollbar-thumb
      background-color transparent
  .category-nav
    display block
    max-width none
    white-space nowrap
    padding 0
</style>

