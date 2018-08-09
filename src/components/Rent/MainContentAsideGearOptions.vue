<template>
  <div class="options">
    <div class="option" v-for="(opt, key) in options" 
      :class="{ active: isActive(key, opt), }" @click="check(key, opt)">
      <span v-text="$t(`RENT.INACTIVE_GEAR.${name}.OPTIONS.${key}`)"></span>
    </div>
  </div>
</template>
<script>
  import { filter, get, pull, } from 'lodash'
  const setupFilters = (store, filters) => store.dispatch('Rent/SETUP_FILTER', { filters, })
  const debug = require('debug')('CLIENT:MainContentAsideGearOptions')
  export default {
    name: 'MainContentAsideGearOptions',
    data () {
      return {
        activeItem: '',
        activeItems: [],
      }
    },
    methods: {
      check (key, opt) {
        return this.isMulti ? this.checkItemMulti(key, opt) : this.checkItem(key, opt)
      },
      checkItem (item, opt) {
        const ref = this.name !== 'POSITION' ? opt : item
        this.isActive(ref, opt) ? this.activeItem = '' : this.activeItem = ref
        const filter = {}
        filter[ this.name ] = this.activeItem
        setupFilters(this.$store, filter)
      },
      checkItemMulti (item, opt) {
        const ref = this.name !== 'POSITION' ? opt : item
        if (this.isActive(ref, opt)) {
          pull(this.activeItems, ref)
        } else {
          this.activeItems.push(ref)
        }
        debug('this.activeItems', this.activeItems)
        this.$forceUpdate()
        const filter = {}
        filter[ this.name ] = this.activeItems.length > 0 ? this.activeItems : undefined
        setupFilters(this.$store, filter)
      },
      get,
      isActive (item, opt) {
        // debug(`state.Rent.filters.${this.name}`, get(this.$store, `state.Rent.filters.${this.name}`))
        if (!get(this.$store, `state.Rent.filters.${this.name}`) && get(this.$store, `state.Rent.filters.${this.name}`) !== 0) {
          this.activeItems = []
          this.activeItem = ''
          return false
        } else if (this.isMulti) {
          const find = filter(this.activeItems, it => {
            return it === (this.name !== 'POSITION' ? opt : item)
          })
          return find.length > 0 ? true : false
        } else {
          return this.activeItem === (this.name !== 'POSITION' ? opt : item)
        }
      },
    },
    mounted () {},
    props: {
      name: {
        type: String,
        default: '',
      },
      options: {
        type: Object,
        default: {},
      },
      isMulti: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      '$store.state.Rent.filters.BUDGET': function () {
        debug('Nutation detected: ', '$store.state.Rent.filter.BUGDET', get(this.$store, 'state.Rent.filters.BUDGET'))
        debug(get(this.$store, 'state.Rent.filters'))
      }
    },
  }
</script>
<style lang="stylus" scoped>
  .options
    background-color #eee
    border-radius 1px
    .option
      border-radius 1px
      font-size 0.875rem
      font-weight normal
      line-height normal
      color #313131
      padding 13px 24px
      cursor pointer
      &.active
        background-color #dfe166
      &:not(.active):hover
        background-color #e5e5e5
</style>