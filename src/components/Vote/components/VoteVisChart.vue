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
      <div v-show="data.length !== 0" class="chart__chart-wrapper">
        <div class="chart__row chart__row--dark chart__row--head">
          <p>{{ viewStatus === 'relationship' || viewStatus === 'county' ? '縣市' : '姓名' }}</p>
          <p>{{ viewStatus === 'county' ? '平均' : '總計' }}</p>
        </div> 
        <transition-group name="flip-list">
          <div
            v-for="(item, i) in data"
            :key="item.key"
            :class="[ 'chart__row', { 'chart__row--dark': i % 2 !== 0 }, { 'chart__row--light': (i % 2 === 0) && view !== 4 } ]"
          >
            <div v-if="i === 0" v-show="view !== 4" class="mobile-hint">
              <p class="mobile-hint__text">點圖看細節</p>
              <img class="mobile-hint__finger" src="/proj-assets/vote2018/finger.png" alt="">
            </div>
            <div class="left">
              <p :class="[ 'left__county', { 'left__county--pointer': view === 1 } ]" v-text="getCountyName(item)" @click="filterCounty(getCountyName(item))"></p>
              <p
                :class="[ 'left__leader', { 'left__leader--marginless': viewStatus === 'legislator' || viewStatus === 'county' } ]"
                :style="{ marginLeft: `${(viewStatus === 'relationship' ? 15 : 0) + 24 * diffMaxLengthFirst(getCountyName(item))}px` }"
                v-text="getLeaderName(item)"
              >
              </p>
              <div class="left__row-bar" :style="{ marginLeft: `${15 + 24 * diffMaxLength(getLeaderName(item))}px` }">
                <VoteVisChartBar :data="item" :view="view" :countFilter="countFilter" :nonVisibleColor="i % 2 !== 0 ? '#061c37' : '#1c2d47'" :maxCount="maxCount"/>
              </div>
            </div>
            <p class="count"><span>{{ viewStatus === 'county' ? '平均：' : '總計：' }}</span>{{ getCount(item) }}</p>
          </div>
        </transition-group>
      </div>
      <VoteVisButtonWhite v-show="showLoadMoreButton" class="chart__button" :text="'看更多'" @click.native="$emit('loadmore')"/>
      <VoteVisButtonWhite class="chart__button chart__button--less-margin" :text="'資料來源'" @click.native="toggleMethodology"/>
      <transition name="fade" mode="out-in">
        <div v-show="showMethodology" class="chart__methodology">
          <div v-if="view === 1" style="text-align: justify">
            二親等為《公務人員法》中載明應迴避之親屬關係範圍，二親等之外、關係太遠致難以找到正確稱謂的，以「姻親」代之。為統計需求，區域名稱以現在的行政區名為主。若有跨縣市擔任單議員，以最新一次當選區域為議員區域。
          </div>
          <template v-else-if="view === 5">
            此區資料呈現同時擔任過議員及立委的政治人物。立委年份為正式上任之年度，部分為遞補，所以會與選舉年不同。
          </template>
          <template v-else-if="view === 6">
            參選名單以中選會最新（11 月中）公布的資料為主。
          </template>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { get, uniq } from 'lodash'
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
      // if (this.viewStatus === 'relationship') {
        return Math.max(...this.data.map(d => d.key.split('-')[0].length))
      // }
    },
    firstMaxLength () {
      if (this.viewStatus === 'relationship') {
        return Math.max(...this.data.map(d => d.key.split('-')[1].length))
      } else {
        return 0
      }
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
      if (this.viewStatus === 'relationship') {
        return get(item, 'key', '').split('-')[1]
      } else {
        // return get(item, 'key', '')
      }
    },
    getLeaderName (item) {
      if (this.viewStatus === 'relationship') {
        return get(item, 'key', '').split('-')[0]
      } else if (this.viewStatus === 'legislator') {
        return get(item, 'key', '').split('-')[0]
      } else {
        return get(item, 'key', '')
      }
    },
    getCount (item) {
      if (this.viewStatus === 'relationship') {
        return sum(get(item, [ 'values' ], []), d => sum(d.values, _d => _d.values[0]['當選次數']))
      } else if (this.viewStatus === 'county') {
        return (sum(get(item, [ 'values' ], []), d => sum(d.values, _d => _d['當選次數'])) / sum(get(item, [ 'values' ], []), d => {
          const relArray = d.values
          return uniq(relArray.map(o => `${o['所屬議員']}-${o['所屬議員縣市']}`)).length
        })).toFixed(1)
      } else if (this.viewStatus === 'legislator') {
        return get(item, 'timeline', []).map(d => d.value).filter(d => d !== '').length
      }
    },
    diffMaxLength (leaderName = '') {
      return this.keyMaxLength - leaderName.length
    },
    diffMaxLengthFirst (leaderName = '') {
      return this.firstMaxLength - leaderName.length
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
    width 1100px
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
    text-align center

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

.count
  span
    display none

.mobile-hint
  display none

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

@media (max-width 768px)
  .chart-wrapper
    width 100%
    align-items flex-start

  .chart
    min-width 100%
    width 100%
    margin 30px 0 0 0
    padding 0
    &__no-data
      margin 10px 0 0 0
    &__chart-wrapper
      width 100%
      position relative
    &__row
      width 100%
      height auto
      padding 20px 0
      flex-direction column
      justify-content flex-start
      align-items flex-start
      & + &
        border-top 2px solid white
      &--head
        display none
      &--light
        background-color #061c37
    &__methodology
      width 100%
      font-size 20px
      text-align justify

  .left
    flex-direction column
    font-size 20px
    width 100%
    &__leader
      margin 10px 0 0 0 !important
    &__row-bar
      min-width 0
      margin 10px 0 0 0 !important

  .count
    margin 20px 0 0 0
    font-size 20px
    span
      display initial

  .mobile-hint
    position absolute
    top 30px
    right 0
    display flex
    &__text
      font-size 16px
      color #9b9b9b
      margin 0 11px 0 0
    &__finger
      height 40px
</style>


