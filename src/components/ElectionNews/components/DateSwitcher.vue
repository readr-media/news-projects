<template>
  <div class="date-switcher">
    <div
      :class="[
        'date-switcher__arrow',
        'date-switcher__arrow--subtract',
        { 'date-switcher__arrow--show': showArrowLeft }
      ]"
      @click="subtract"
    >
    </div>
    <div class="date-switcher__date" v-text="dateFormatted"></div>
    <div
      :class="[
        'date-switcher__arrow',
        'date-switcher__arrow--add',
        { 'date-switcher__arrow--show': showArrowRight }
      ]"
      @click="add"
    >
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('ElectionNews')

export default {
  watch: {
    showLightbox () {
      this.date = this.graphTrackingLineDate
      this.$emit('dateSwitcherChanged', this.date)
    }
  },
  data () {
    return {
      date: null
    }
  },
  computed: {
    ...mapState({
      showLightbox: state => state.showLightbox,
      dateRange: state => state.data.date
    }),
    ...mapGetters([
      'graphTrackingLineDate'
    ]),
    dateFormatted () {
      return this.formatDate(this.date)
    },
    showArrowLeft () {
      let { start } = this.dateRange
      start = moment(start, 'YYYY/MM/DD')
      const date = moment(this.date, 'YYYY/MM/DD')
      return date.diff(start, 'days') >= 1
    },
    showArrowRight () {
      let { until } = this.dateRange
      until = moment(until, 'YYYY/MM/DD')
      const date = moment(this.date, 'YYYY/MM/DD')
      return date.diff(until, 'days') <= -1
    }
  },
  methods: {
    formatDate (date) {
      return moment(date, 'YYYY/MM/DD').format('MM 月 DD 日')
    },
    subtract () {
      const date = moment(this.date, 'YYYY/MM/DD').subtract(1, 'days').format('YYYY/MM/DD')
      this.date = date
      this.$emit('dateSwitcherChanged', this.date)
    },
    add () {
      const date = moment(this.date, 'YYYY/MM/DD').add(1, 'days').format('YYYY/MM/DD')
      this.date = date
      this.$emit('dateSwitcherChanged', this.date)
    }
  }
}
</script>

<style lang="stylus" scoped>
.date-switcher
  display flex
  align-items center
  &__date
    margin 0 30px
    font-size 20px
  &__arrow
    cursor pointer
    -webkit-tap-highlight-color transparent
    opacity 0
    pointer-events none
    &--show
      opacity 1
      pointer-events initial
    &--subtract
      width 0
      height 0
      border-style solid
      border-width 15px 26.0px 15px 0
      border-color transparent #007bff transparent transparent
    &--add
      width 0
      height 0
      border-style solid
      border-width 15px 0 15px 26.0px
      border-color transparent transparent transparent #007bff
</style>