<template>
  <div class="chart-wrapper">
    <VoteVisChartLegend class="chart-wrapper__legend"/>
    <div class="chart-wrapper__chart chart">
      <div class="chart__row chart__row--dark chart__row--head">
        <p>縣市</p>
        <p>總計</p>
      </div>
      <transition-group name="flip-list">
        <div
          v-for="(item, i) in data"
          :key="getLeaderName(item)"
          :class="[ 'chart__row', { 'chart__row--dark': i % 2 !== 0 }, { 'chart__row--light': i % 2 === 0 } ]"
        >
          <div class="left">
            <p class="left__county" v-text="getCountyName(item)"></p>
            <p class="left__leader" v-text="getLeaderName(item)"></p>
            <div class="left__row-bar" :style="{ marginLeft: `${15 + 30 * diffMaxLength(getLeaderName(item))}px` }">
              <VoteVisChartBar :data="item"/>
            </div>
          </div>
          <p class="bold" v-text="getCount(item)"></p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { get, } from 'lodash'
import { sum, } from 'd3-array'
import VoteVisChartLegend from './VoteVisChartLegend.vue'
import VoteVisChartBar from './VoteVisChartBar.vue'

export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    VoteVisChartLegend,
    VoteVisChartBar,
  },
  computed: {
    keyMaxLength () {
      return Math.max(...this.data.map(d => d.key.length))
    }
  },
  methods: {
    getCountyName (item) {
      return get(item, 'county', '')
    },
    getLeaderName (item) {
      return get(item, 'key', '')
    },
    getCount (item) {
      return sum(get(item, [ 'values' ], []), d => sum(d.values, _d => _d.values[0]['當選次數']))
    },
    diffMaxLength (leaderName) {
      return this.keyMaxLength - leaderName.length
    },
  },  
}
</script>

<style lang="stylus" scoped>
.chart-wrapper
  display flex
  flex-direction column
  align-items center

.chart
  min-width 1000px
  margin 50px 0 0 0
  &__row
    height 60px
    display flex
    justify-content space-between
    align-items center
    padding 10px 50px
    font-size 30px
    transition all .5s
    &--head
      justify-content space-between
      font-size 20px
    &--dark
      background-color #061c37
    &--light
      background-color #1c2d47

.left
  display flex
  &__leader
    font-weight 600
    // min-width 90px
    margin 0 0 0 15px
  &__row-bar
    min-width 600px
    display flex
    align-items center
    margin 0 15px

.bold
  font-weight bold

// .flip-list-move
//   // transition transform .5s
//   transition transform 3s
.flip-list-enter, .flip-list-leave-to 
  // transition transform .5s
  opacity 0
  transform translateY(30px)
</style>


