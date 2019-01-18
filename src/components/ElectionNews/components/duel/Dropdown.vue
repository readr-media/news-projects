<template>
  <div class="dropdown">
    <DropdownMask
      :position="position"
      :atFooter="atFooter"
      :keyword="keyword"
      @click.native="click"
      v-click-outside="close"
    />
    <div
      v-show="showDropdown"
      :class="[ 'dropdown__select', 'select', { 'select--at-footer': atFooter } ]"
    >
      <div 
        v-for="(keyword, id) in keywords"
        :key="id"
        class="select__option"
        v-text="keyword"
        @click="navigate(keyword)"
      >
      </div>
    </div>
  </div>
</template>

<script>
import DropdownMask from './DropdownMask.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

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
  components: {
    DropdownMask
  },
  data () {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapState({
      keywords: state => state.mapping.keywords
    })
  },
  methods: {
    click () {
      this.showDropdown = !this.showDropdown
    },
    close () {
      this.showDropdown = false
    },
    navigate (keyword) {
      const { params = '', subparams = '' } = this.$route.params
      const option = this.position === 'left' ? { param: keyword, subparam: subparams } : { param: params, subparam: keyword }
      this.$router.navigate(option)
    }
  },
  directives: {
    'click-outside': {
      bind (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // here I check that click was outside the el and his childrens
          if (!(el == event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    },
  },
}
</script>

<style lang="stylus" scoped>
.dropdown
  position relative

.select
  z-index 2
  position absolute
  top 20px
  left 0
  width 100%
  max-width 100%
  height 200px
  overflow-y scroll
  border-left 1px solid #999999
  border-right 1px solid #999999
  border-bottom 1px solid #999999
  padding 0 10px
  background-color white
  // &--dropup
  //   top -200px
  &__option
    padding 5px 0
    font-size 14px
    line-height 1.25
    text-align justify
    cursor pointer

@media (min-width 1024px)
  .select
    top 50px
    &--at-footer
      top 25px
</style>