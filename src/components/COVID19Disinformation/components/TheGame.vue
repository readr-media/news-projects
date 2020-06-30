<template>
  <section class="covid-game">
    <SlotMachine
      :column1="column1"
      :column2="column2"
      :column3="column3"
      :transitioning="transitioning"
      @play="generateResult"
    />
  </section>
</template>

<script>
import { SLOT_MACHINE_RESULTS_EXIST } from '../const.js'
import SlotMachine from './SlotMachine.vue'

export default {
  name: 'TheGame',
  components: {
    SlotMachine
  },
  data () {
    return {
      column1: undefined,
      column2: undefined,
      column3: undefined,
      transitioning: false
    }
  },
  computed: {
    isExist () {
      return SLOT_MACHINE_RESULTS_EXIST.some(item => item === this.result)
    },
    result () {
      return `${this.column1}/${this.column2}/${this.column3}`
    }
  },
  methods: {
    generateResult () {
      // this.transitioning = true
      this.column1 = Math.floor(Math.random() * 13)
      this.column2 = Math.floor(Math.random() * 17)
      this.column3 = Math.floor(Math.random() * 14)
    }
  }
}
</script>

<style lang="stylus" scoped>
.covid-game
  padding 50px 0
  background-color #333
  @media (min-width: 1024px)
    min-height 80vh
    padding 79px 0
</style>
