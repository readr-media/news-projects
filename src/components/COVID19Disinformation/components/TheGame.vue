<template>
  <section class="covid-game">
    <SlotMachine
      :column1="column1"
      :column2="column2"
      :column3="column3"
      :isPlayed="isPlayed"
      :transitioning="transitioning"
      @play="generateResult"
    />
    <SlotMachineResult
      :column1="column1"
      :column2="column2"
      :column3="column3"
      :isExist="isExist"
      :isPlayed="isPlayed"
      :result="result"
      :transitioning="transitioning"
    />
  </section>
</template>

<script>
import { SLOT_MACHINE_RESULTS_EXIST } from '../const.js'
import SlotMachine from './SlotMachine.vue'
import SlotMachineResult from './SlotMachineResult.vue'

export default {
  name: 'TheGame',
  components: {
    SlotMachine,
    SlotMachineResult
  },
  data () {
    return {
      column1: 12,
      column2: 15,
      column3: 10,
      isPlayed: false,
      timer: undefined,
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
  watch: {
    transitioning (value) {
      if (value) {
        this.timer = setTimeout(() => {
          this.transitioning = false
          this.timer = undefined
        }, 3000)
      }
    }
  },
  methods: {
    generateResult () {
      this.isPlayed = true
      this.transitioning = true
      this.column1 = Math.floor(Math.random() * 13)
      this.column2 = Math.floor(Math.random() * 17)
      this.column3 = Math.floor(Math.random() * 14)
      window.ga && window.ga('send', 'event', 'projects', 'click', '拉霸鈕')
    }
  }
}
</script>

<style lang="stylus" scoped>
.covid-game
  background-color #333
  @media (min-width: 1024px)
    min-height 100vh
    background-image url(/proj-assets/covid19-disinformation/bg.png)
    background-size cover
    background-position top right
    background-repeat no-repeat
</style>
