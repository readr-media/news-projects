<template>
  <div class="chart-wrapper">
    <VoteVisChartLegend
      class="chart-wrapper__legend"
      :view="view"
      :countFilter="countFilter"
      @changeView="changeView"
      @popFilter="popFilter"
      @pushFilter="pushFilter"
    />
    <div class="chart-wrapper__chart chart">
      <div v-show="data.length === 0" class="chart__no-data">
        無資料
      </div>
      <div v-show="data.length !== 0">
        <div class="chart__row chart__row--dark chart__row--head">
          <p>{{ viewStatus === 'relationship' || viewStatus === 'county' ? '縣市' : '姓名' }}</p>
          <p>{{ viewStatus === 'county' ? '平均' : '總計' }}</p>
        </div> 
        <transition-group name="flip-list">
          <div
            v-for="(item, i) in data"
            :key="getLeaderName(item)"
            :class="[ 'chart__row', { 'chart__row--dark': i % 2 !== 0 }, { 'chart__row--light': i % 2 === 0 } ]"
          >
            <div class="left">
              <p :class="[ 'left__county', { 'left__county--pointer': view === 1 } ]" v-text="getCountyName(item)" @click="filterCounty(getCountyName(item))"></p>
              <p :class="[ 'left__leader', { 'left__leader--marginless': viewStatus === 'legislator' || viewStatus === 'county' } ]" v-text="getLeaderName(item)"></p>
              <div class="left__row-bar" :style="{ marginLeft: `${15 + 24 * diffMaxLength(getLeaderName(item))}px` }">
                <VoteVisChartBar :data="item" :view="view" :countFilter="countFilter" :nonVisibleColor="i % 2 !== 0 ? '#061c37' : '#1c2d47'" :maxCount="maxCount"/>
              </div>
            </div>
            <p v-text="getCount(item)"></p>
          </div>
        </transition-group>
      </div>
      <VoteVisButtonWhite v-show="showLoadMoreButton" class="chart__button" :text="'看更多'" @click.native="$emit('loadmore')"/>
      <VoteVisButtonWhite class="chart__button chart__button--less-margin" :text="'資料來源'" @click.native="toggleMethodology"/>
      <transition name="fade" mode="out-in">
        <div v-show="showMethodology" class="chart__methodology">
          反成古簡在河當學度做在持親利那定座主，營的化無方兒或座華後除展金房紙子還多？此二似不源現外文友一無至物到。父是請美道。一不專麗獨，克動是數公，規現提老出主學主美那醫童利中！
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { get, } from 'lodash'
import { sum, } from 'd3-array'
import VoteVisChartLegend from './VoteVisChartLegend.vue'
import VoteVisChartBar from './VoteVisChartBar.vue'
import VoteVisButtonWhite from './VoteVisButtonWhite.vue'

export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    view: {
      type: Number,
      required: true
    },
    countFilter: {
      type: Array,
      required: true
    },
    showLoadMoreButton: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    VoteVisChartLegend,
    VoteVisChartBar,
    VoteVisButtonWhite
  },
  watch: {
    view () {
      this.showMethodology = false
    }
  },
  data () {
    return {
      showMethodology: false
    }
  },
  computed: {
    keyMaxLength () {
      return Math.max(...this.data.map(d => d.key.length))
    },
    viewStatus () {
      if ([ 1, 2, 3, 6 ].includes(this.view)) {
        return 'relationship'
      } else if ([ 4 ].includes(this.view)) {
        return 'county'
      } else if ([ 5 ].includes(this.view)) {
        return 'legislator'
      }
    },
    maxCount () {
      return Number((sum(get(this.data, [ '0', 'values' ], []), d => sum(d.values, _d => _d['當選次數'])) / sum(get(this.data, [ '0', 'values' ], []), d => d.values.length)).toFixed(1))
    },
  },
  methods: {
    getCountyName (item) {
      return get(item, 'county', '')
    },
    getLeaderName (item) {
      return get(item, 'key', '')
    },
    getCount (item) {
      if (this.viewStatus === 'relationship') {
        return sum(get(item, [ 'values' ], []), d => sum(d.values, _d => _d.values[0]['當選次數']))
      } else if (this.viewStatus === 'county') {
        return (sum(get(item, [ 'values' ], []), d => sum(d.values, _d => _d['當選次數'])) / sum(get(item, [ 'values' ], []), d => d.values.length)).toFixed(1)
      } else if (this.viewStatus === 'legislator') {
        return get(item, 'timeline', []).map(d => d.value).filter(d => d !== '').length
      }
    },
    diffMaxLength (leaderName) {
      return this.keyMaxLength - leaderName.length
    },
    toggleMethodology () {
      this.showMethodology = !this.showMethodology
    },
    changeView (view) {
      this.$emit('changeView', view)
    },
    popFilter (filter) {
      this.$emit('popFilter', filter)
    },
    pushFilter (filter) {
      this.$emit('pushFilter', filter)
    },
    filterCounty (county) {
      this.$emit('filterCounty', county)
    }
  },  
}
</script>

<style lang="stylus" scoped>
.chart-wrapper
  display flex
  flex-direction column
  align-items center

.chart
  min-width 1100px
  margin 15px 0 0 0
  padding 33px 0 0 0
  display flex
  flex-direction column
  align-items center
  border-top 2px solid white
  &__no-data
    font-size 50px
  &__row
    width 1000px
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
  &__button
    margin 75px 0 0 0
    &--less-margin
      margin 30px 0 0 0
  &__methodology
    width 1000px
    font-size 16px
    line-height 1.5
    margin 18px 0 0 0

.left
  display flex
  font-size 24px
  &__county
    font-weight 300
    &--pointer
      cursor pointer
  &__leader
    font-weight 400
    // min-width 90px
    margin 0 0 0 15px
    &--marginless
      margin 0
  &__row-bar
    min-width 600px
    display flex
    align-items center
    margin 0 15px

// .flip-list-move
//   // transition transform .5s
//   transition transform 3s
.flip-list-enter, .flip-list-leave-to 
  // transition transform .5s
  opacity 0
  transform translateY(30px)

.fade-enter-active, .fade-leave-active
  transition opacity .1s
.fade-enter, .fade-leave-to
  opacity 0
</style>


