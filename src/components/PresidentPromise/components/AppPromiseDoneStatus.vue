<template>
  <div class="status">
    蔡英文政府完成了 <br>
    <span class="status__count status__count--orange">
      <ICountUp
        class="status__count-done"
        :startVal="iCountUp.startVal"
        :endVal="iCountUp.endVal"
        :decimals="iCountUp.decimals"
        :duration="iCountUp.duration"
        :options="iCountUp.options"
      />
      / {{ promiseData.length }}
    </span>
    項政見，
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import { createNamespacedHelpers, } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PresidentPromise')

export default {
  components: {
    ICountUp,
  },
  watch: {
    shouldStartCounting () {
      if (this.shouldStartCounting) this.iCountUp.endVal = this.promiseDataDone.length
    }
  },
  data () {
    return {
      shouldStartCounting: false,
      iCountUp: {
        startVal: 0,
        endVal: 0,
        decimals: 0,
        duration: 5,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      },
    }
  },
  computed: {
    ...mapState({
      promiseData: state => state.promiseData
    }),
    ...mapGetters([
      'promiseDataDone',
    ]),
  },
  mounted () {
    require('intersection-observer')
    window.scrollama = require('scrollama')
    this._scroller = window.scrollama()
    this._scroller
      .setup({
        step: '.status',
        offset: .9,
        once: true,
      })
      .onStepEnter(({ direction, }) => {
        if (direction === 'down') this.shouldStartCounting = true
      })
  }
}
</script>

<style lang="stylus" scoped>
.status
  line-height 1
  br
    display none
  &__count
    font-size 1.3em
    &--orange
      color #fa8d62
  &__count-done
    font-size 1.5em

@media (max-width 425px)
  .status
    line-height 1.25
    br
      display initial
    &__count
      font-size 1.1em
    &__count-done
      font-size 1.3em
</style>

