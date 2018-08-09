<template>
  <div :style="style"></div>
</template>
<script>
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  import { get, } from 'lodash'
  const debug = require('debug')('CLIENT:InfographicGraph')
  export default {
    name: 'InfographicGraph',
    computed: {
      style () {
        const _style = {}
        !this.isActive && (_style[ 'display' ] = 'none')
        this.loadedGraph && (_style[ 'backgroundImage' ] = `url(${this.loadedGraph})`)
        return _style
      }
    },
    data () {
      return {
        isLoaded: false,
        isActive: false,
        refDomTopY: 0,
        loadedGraph: {},
      }
    },
    methods: {
      loadGraph () {
        const graph = new Image()
        graph.onload = () => {
          // this.$el.setAttribute('style', `background-image: url(${graph.src});`)
          this.loadedGraph = graph.src
          this.isLoaded = true
        }
        graph.src = get(this.program, 'graph')
      },
    },
    mounted () {
      //p.p_top_y < (current_top_y + device_height / 2)
      window.addEventListener('scroll', () => {
        const current_top_y = currentYPosition()
        const device_height = get(this.$store, 'state.viewport.1', 0)
        // if (this.refDomTopY < (current_top_y + device_height / 2)) {
        if (current_top_y > (this.refDomTopY - device_height) && current_top_y < (this.refDomTopY + device_height)) {
          if (!this.isLoaded) { this.loadGraph()}
          if (current_top_y > (this.refDomTopY - device_height / 2) && current_top_y < (this.refDomTopY + device_height / 2)) {
            this.isActive = true
          } else {
            this.isActive = false
          }
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
<style lang="stylus" scoped></style>