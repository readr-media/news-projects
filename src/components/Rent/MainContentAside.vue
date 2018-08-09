<template>
  <div class="main-aside">
    <MainContentAsideGear v-for="(g, k) in GEARS" :options="get(g, 'OPTIONS', {})" :name="k" :key="k" :isMulti="get(g, 'isMulti', false)"></MainContentAsideGear>
    <MainContentAsideExplanation :class="{ 'first-explanation': k === 0 }" v-for="(p, k) in PROGRAM" :data="p" :key="k" :id="`program-${p.id}`"></MainContentAsideExplanation>
  </div>
</template>
<script>
  import MainContentAsideGear from 'src/components/Rent/MainContentAsideGear.vue'
  import MainContentAsideExplanation from 'src/components/Rent/MainContentAsideExplanation.vue'
  import { GEARS, PROGRAM, } from 'src/components/Rent/constants'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  import { findLast, each, get, } from 'lodash'
  const debug = require('debug')('CLIENT:MainContentAside')
  const setupFilters = (store, filters) => store.dispatch('Rent/SETUP_FILTER', { filters, })
  const resetFilters = (store, filters) => store.dispatch('Rent/RESET_FILTER', {})
  export default {
    name: 'MainContentAside',
    components: {
      MainContentAsideGear,
      MainContentAsideExplanation,
    },
    data () {
      return {
        GEARS,
        PROGRAM,
        program_ref: [],
      }
    },
    methods: {
      get,
      initProgram () {
        each(PROGRAM, p => {
          if (p.filters) {
            const p_top_y = elmYPosition(`.main-aside #program-${p.id}`)
            debug('p_top_y', p_top_y)
            this.program_ref.push({
              p_top_y,
              filters: p.filters,
            })
          }
        })
      },
      setupProgram () {
        window.addEventListener ('scroll', event => {
          const current_top_y = currentYPosition()
          const device_height = get(this.$store, 'state.viewport.1', 0)
          const targProgram = findLast(this.program_ref, p => {
            return p.p_top_y < (current_top_y + device_height / 2)
          })
          targProgram && debug('Got p', get(targProgram, 'p_top_y'))
          targProgram && setupFilters(this.$store, get(targProgram, 'filters', {}))
          // targProgram
          //   ? setupFilters(this.$store, get(targProgram, 'filters', {}))
          //   : resetFilters(this.$store, {})
        })
      },
    },
    mounted () {},
    watch: {
      '$store.state.Rent.isLoaded': function () {
        if (get(this.$store, 'state.Rent.isLoaded')) {
          // this.initProgram()
          // this.setupProgram()
        }
      }
    },
  }
</script>
<style lang="stylus" scoped>
  @media screen and (min-width: 0px) and (max-width: 767px)
    .first-explanation
      margin-top 256px
</style>