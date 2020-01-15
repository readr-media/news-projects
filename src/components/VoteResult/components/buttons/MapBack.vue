<template>
  <button class="button" @click="mapBack">
    <img class="button__icon" src="/proj-assets/vote2018-result/back.png" alt="">
    <p class="button__text">回到上層</p>
  </button>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('VoteResult')

const debug = require('debug')('VOTE2018-RESULT:CLIENT:MapBack')

export default {
  computed: {
    ...mapState({
      previousLocationId: state => state.map.previousLocationId
    })
  },
  methods: {
    mapBack () {
      const targetSelector = `#map .svg #id-${this.previousLocationId}`
      debug('---')
      debug('MapBack clicked')
      debug('Send a mouse onclicked event to:', targetSelector)
      debug('---')

      const t = document.querySelector(targetSelector)
      let event = new MouseEvent('click', {})
      t.dispatchEvent(event)
    }
  }
}
</script>

<style lang="stylus" scoped>
.button
  display flex
  justify-content center
  align-items center
  width 110px
  height 40px
  border-radius 8px
  background-color #ffffff
  border 1px solid black
  cursor pointer
  &__icon
    height 20.8px
  &__text
    margin 0 0 0 10px
    font-size 14px
  &:focus
    outline none
  &:hover
    filter brightness(.9)
</style>

