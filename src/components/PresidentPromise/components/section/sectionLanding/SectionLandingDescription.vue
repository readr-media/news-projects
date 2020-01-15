<template>
  <div class="description">
    蔡英文政府完成了 <br class="description__br--mobile">
    <span class="description__promises-count description__promises-count--orange">
      <ICountUp
        class="description__promises-count-done"
        :startVal="iCountUpStartVal"
        :endVal="iCountUpEndVal"
        :decimals="iCountUpDecimals"
        :duration="iCountUpDuration"
        :options="iCountUpOptions"
      />
      / {{ promiseData.length }}
    </span>
    項政見，<br class="description__br--mobile">我們也會繼續替你追蹤
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PresidentPromise')

export default {
  components: {
    ICountUp,
  },
  watch: {
    promiseDataDone () {
      this.iCountUpEndVal = this.promiseDataDone.length
    }
  },
  data () {
    return {
      iCountUpStartVal: 0,
      iCountUpEndVal: 0,
      iCountUpDecimals: 0,
      iCountUpDuration: 5,
      iCountUpOptions: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
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
}
</script>

<style lang="stylus" scoped>
.description
  text-align justify
  &__br
    &--mobile
      display none
  &__promises-count
    font-size 57.5px
    color #fa8d62
    font-weight 900
  &__promises-count-done
    font-size 83px

@media (max-width 768px)
  .description
    &__promises-count
      font-size 29px
    &__promises-count-done
      font-size 41px

@media (max-width 425px)
  .description
    text-align center
    &__br
      &--mobile
        display initial
    &__promises-count
      font-size 22px
    &__promises-count-done
      font-size 32px
</style>


