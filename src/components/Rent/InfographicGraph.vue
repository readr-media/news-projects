<template>
  <div class="demo-graph" :class="{ hide: !isActive, }"></div>
</template>
<script>
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  import { get, } from 'lodash'
  const debug = require('debug')('CLIENT:InfographicGraph')
  export default {
    name: 'InfographicGraph',
    computed: {
      isDesktop () {
        return get(this.$store, 'state.useragent.isDesktop')
      },
    },
    data () {
      return {
        isLoaded: false,
        isActive: false,
        refDomTopY: 0,
      }
    },
    methods: {
      loadGraph () {
        const graph = new Image()
        graph.onload = () => {
          this.$el.setAttribute('style', `background-image: url(${graph.src});`)
          this.isLoaded = true
        }
        graph.src = this.isDesktop ? get(this.program, 'graph') : get(this.program, 'graphMB')
      },
    },
    mounted () {
      window.addEventListener('scroll', () => {
        const current_top_y = currentYPosition()
        const device_height = get(this.$store, 'state.viewport.1', 0)
        const bias = this.isDesktop ? 1 / 2 : 2 / 3
        if (current_top_y > (this.refDomTopY - device_height) && current_top_y < (this.refDomTopY + device_height)) {
          if (!this.isLoaded) { this.loadGraph()}
          if (current_top_y > (this.refDomTopY - device_height * bias) && current_top_y < (this.refDomTopY + device_height * (1 - bias))) {
            this.isActive = true
          } else {
            if (current_top_y > (this.refDomTopY - device_height * bias) && get(this.program, 'last')) { return }
            this.isActive = false
          }
        } else {
          if (current_top_y > (this.refDomTopY - device_height * bias) && get(this.program, 'last')) { return }
          this.isActive = false
        }          
      })
    },
    props: {
      program: {
        type: Object,
      },
    },
    watch: {
      '$store.state.Rent.isLoaded': function () {
        if (get(this.$store, 'state.Rent.isLoaded')) {
          this.refDomTopY = elmYPosition(`.main-aside #program-${this.program.id}`)
        }
      }
    },
  }
</script>
<style lang="stylus" scoped>
  .demo-graph
    &.hide
      display none
</style>