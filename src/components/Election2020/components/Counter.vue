<template>
  <ICountUp
    class="counter"
    :startVal="iCountUp.startVal"
    :endVal="count"
    :decimals="iCountUp.decimals"
    :duration="iCountUp.duration"
    :options="iCountUp.options"
  />
</template>

<script>
import ICountUp from 'vue-countup-v2'

export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  components: {
    ICountUp,
  },
  data () {
    return {
      iCountUp: {
        startVal: 0,
        // endVal: 0,
        decimals: 0,
        duration: 1,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      }
    }
  }
}
</script>
