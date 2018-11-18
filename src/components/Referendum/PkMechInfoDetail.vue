<template>
  <div class="info">
    <div class="info__picker picker">
      <select v-model="selectedRef">
        <option v-for="n in 10" v-text="$t(`REFERENDUM.ITEMS.${n - 1}`)" :value="`no${n + 6}`"></option>
      </select>          
    </div>
    <div class="info__detail">
      <div class="info__detail__value" :style="{ color, }">
        <span v-text="$t(`REFERENDUM.PK.INFO.${selectedItem.toUpperCase()}`)"></span>
        <span v-text="val" class="value"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import { find, get, } from 'lodash'
  const debug = require('debug')('CLIENT:PkMechInfoDetail')
  const setUpSelecteditem = (store, key, value) => store.dispatch('Referendum/SET_TARGETS', { key, value })
  export default {
    name: 'PkMechInfoDetail',
    computed: {
      raw () {
        return get(this.$store, `state.Referendum.applicationDetail`)
      },
      ref () {
        return get(this.raw, this.selectedRef)
      },
      val () {
        return get(find(this.ref, c => c.city === this.activeCity), this.selectedItem)
      },
    },
    data () {
      return {
        selectedRef: 'no7'
      }
    },
    methods: {},
    mounted () {
      // this.$forceUpdate()
      // debug('mounted', [ this.type, this.activeCity, this.selectedItem, this.selectedRef, this.raw, this.ref, this.val ])
    },
    props: {
      type: {
        type: String,
        default: 'base',
      },
      color: {
        type: String,
        defaul: '#996c33',
      },
      selectedItem: {
        type: String,
        default: 'participant',
      },
      activeCity: {
        type: String,
        default: '',
      },
    },
    watch: {
      selectedRef () {
        setUpSelecteditem(this.$store, this.type, this.selectedRef)
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .info
    &__detail 
      margin-top 55px
      text-align center
      &__value
        font-size 16px
        line-height 2.77
        color #996c33
        .value
          margin-left 10px
          font-size 1.875rem
          font-weight 600
</style>