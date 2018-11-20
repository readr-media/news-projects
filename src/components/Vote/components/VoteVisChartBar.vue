<template>
  <div class="bar-wrapper">
    <div class="bar" v-show="viewStatus === 'relationship'">
      <div class="bar__blue blue">
        <div
          v-for="(candidate, i) in blue"
          :key="candidate['姓名']"
          class="blue__candidate candidate"
        >
          <VoteVisChartBarCircle
            v-for="count in candidate['當選次數']"
            :key="`blue-${count}`"
            :backgroundColor="'#1aa6de'"
            :text="count === candidate['當選次數'] && i === blue.length - 1 ? blueTotal : ''"
            :data="candidate"
            :view="view"
            :hasTooltip="false"
          />
        </div>
      </div>
      <div class="bar__yellow yellow">
        <div
          v-for="(candidate, i) in yellow"
          :key="candidate['姓名']"
          :class="['yellow__candidate', 'candidate', { 'candidate--border-white-circle': hovering === `yellow-${i}` }]"
        >
          <VoteVisChartBarCircle
            v-for="count in candidate['當選次數']"
            :key="`yellow-${count}`"
            :backgroundColor="'#fda134'"
            :text="count === candidate['當選次數'] && i === yellow.length - 1 ? yellowTotal : ''"
            :data="candidate"
            :view="view"
            @handleMouse="handleCandidate($event, `yellow-${i}`)"
          />
        </div>
      </div>
      <div class="bar__orange orange">
        <div
          v-for="(candidate, i) in orange"
          :key="candidate['姓名']"
          :class="['orange__candidate', 'candidate', { 'candidate--border-white-circle': hovering === `orange-${i}` }]"
        >
          <VoteVisChartBarCircle
            v-for="count in candidate['當選次數']"
            :key="`orange-${count}`"
            :backgroundColor="'#ef5233'"
            :text="count === candidate['當選次數'] && i === orange.length - 1 ? orangeTotal : ''"
            :data="candidate"
            :view="view"
            @handleMouse="handleCandidate($event, `orange-${i}`)"
          />
        </div>
      </div>
    </div>
    <div class="bar" v-show="viewStatus === 'county'">
      <div class="bar__blue blue">
        <div
          v-for="(candidate, i) in (get(blue, 'resultFloor', 0) || (get(blue, 'resultDecimal', 0) !== 0 ? 1 : 0))"
          :key="candidate['姓名']"
          class="blue__candidate candidate"
        >
          <VoteVisChartBarCircle
            v-if="get(blue, 'resultFloor', 0) !== 0"
            :backgroundColor="'#1aa6de'"
            :text="''"
            :view="view"
            :hasTooltip="false"
          />
          <VoteVisChartBarCirclePortion
            v-if="(candidate === get(blue, 'resultFloor', 0) && get(blue, 'resultDecimal', 0) !== 0) || (get(blue, 'resultFloor', 0) === 0 && get(blue, 'resultDecimal', 0) !== 0)"
            :portion="blue.resultDecimal"
            :backgroundColor="'#1aa6de'"
            :nonVisibleColor="nonVisibleColor"
          />
        </div>
      </div>
      <div class="bar__yellow yellow">
        <div
          v-for="(candidate, i) in (get(yellow, 'resultFloor', 0) || (get(yellow, 'resultDecimal', 0) !== 0 ? 1 : 0))"
          :key="candidate['姓名']"
          :class="['yellow__candidate', 'candidate', { 'candidate--border-white-circle': hovering === `yellow-${i}` }]"
        >
          <VoteVisChartBarCircle
            v-if="get(yellow, 'resultFloor', 0) !== 0"
            :backgroundColor="'#fda134'"
            :text="''"
            :view="view"
            :hasTooltip="false"
          />
          <VoteVisChartBarCirclePortion
            v-if="(candidate === get(yellow, 'resultFloor', 0) && get(yellow, 'resultDecimal', 0) !== 0) || (get(yellow, 'resultFloor', 0) === 0 && get(yellow, 'resultDecimal', 0) !== 0)"
            :portion="yellow.resultDecimal"
            :backgroundColor="'#fda134'"
            :nonVisibleColor="nonVisibleColor"
          />
        </div>
      </div>
      <div class="bar__orange orange">
        <div
          v-for="(candidate, i) in (get(orange, 'resultFloor', 0) || (get(orange, 'resultDecimal', 0) !== 0 ? 1 : 0))"
          :key="candidate['姓名']"
          :class="['orange__candidate', 'candidate', { 'candidate--border-white-circle': hovering === `orange-${i}` }]"
        >
          <VoteVisChartBarCircle
            v-if="get(orange, 'resultFloor', 0) !== 0"
            :backgroundColor="'#ef5233'"
            :text="''"
            :view="view"
            :hasTooltip="false"
          />
          <VoteVisChartBarCirclePortion
            v-if="(candidate === get(orange, 'resultFloor', 0) && get(orange, 'resultDecimal', 0) !== 0) || (get(orange, 'resultFloor', 0) === 0 && get(orange, 'resultDecimal', 0) !== 0)"
            :portion="orange.resultDecimal"
            :backgroundColor="'#ef5233'"
            :nonVisibleColor="nonVisibleColor"
          />
        </div>
      </div>
    </div>
    <div class="bar" v-show="viewStatus === 'legislator'">
      <div class="bar__blue blue">
        <div
          v-for="item in timeline"
          :key="item['key']"
          class="blue__candidate candidate"
        >
          <VoteVisChartBarCircle
            v-if="item.value !== ''"
            :backgroundColor="item.value === '議員' ? '#1aa6de' : '#cddc32'"
            :text="''"
            :data="item"
            :view="view"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sum, } from 'd3-array'
import { get, isNaN } from 'lodash'
import VoteVisChartBarCircle from './VoteVisChartBarCircle.vue'
import VoteVisChartBarCirclePortion from './VoteVisChartBarCirclePortion.vue'

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    view: {
      type: Number,
      required: true
    },
    nonVisibleColor: {
      type: String,
      required: true
    }
  },
  components: {
    VoteVisChartBarCircle,
    VoteVisChartBarCirclePortion,
  },
  data () {
    return {
      hovering: null
    }
  },
  computed: {
    viewStatus () {
      if ([ 1, 2, 3 ].includes(this.view)) {
        return 'relationship'
      } else if ([ 4 ].includes(this.view)) {
        return 'county'
      } else if ([ 5 ].includes(this.view)) {
        return 'legislator'
      }
    },
    blueTotal () {
      return sum(get(this.data, [ 'values', '0', 'values' ], []), item => sum(item.values, d => d['當選次數']))
    },
    yellowTotal () {
      return sum(get(this.data, [ 'values', '1', 'values' ], []), item => sum(item.values, d => d['當選次數']))
    },
    orangeTotal () {
      return sum(get(this.data, [ 'values', '2', 'values' ], []), item => sum(item.values, d => d['當選次數']))
    },
    blue () {
      if (this.viewStatus === 'relationship') {
        return get(this.data, [ 'values', '0', 'values' ], []).map(item => item.values[0])
      } else if (this.viewStatus === 'county') {
        const result = sum(get(this.data, [ 'values', '0', 'values' ], []).map(item => item['當選次數'])) / sum(get(this.data, [ 'values' ], []), d => d.values.length)
        const resultFloor = Math.floor(result)
        const resultDecimal = result - resultFloor
        // return typeof result === 'number' && !isNaN(result) ? { resultFloor, resultDecimal } : 0
        return { resultFloor, resultDecimal }
      }
    },
    yellow () {
      if (this.viewStatus === 'relationship') {
        return get(this.data, [ 'values', '1', 'values' ], []).map(item => item.values[0])
      } else if (this.viewStatus === 'county') {
        const result = sum(get(this.data, [ 'values', '1', 'values' ], []).map(item => item['當選次數'])) / sum(get(this.data, [ 'values' ], []), d => d.values.length)
        const resultFloor = Math.floor(result)
        const resultDecimal = result - resultFloor
        // return typeof result === 'number' && !isNaN(result) ? { resultFloor, resultDecimal } : 0
        return { resultFloor, resultDecimal }
      }
    },
    orange () {
      if (this.viewStatus === 'relationship') {
        return get(this.data, [ 'values', '2', 'values' ], []).map(item => item.values[0])
      } else if (this.viewStatus === 'county') {
        const result = sum(get(this.data, [ 'values', '2', 'values' ], []).map(item => item['當選次數'])) / sum(get(this.data, [ 'values' ], []), d => d.values.length)
        const resultFloor = Math.floor(result)
        const resultDecimal = result - resultFloor
        // return typeof result === 'number' && !isNaN(result) ? { resultFloor, resultDecimal } : 0
        return { resultFloor, resultDecimal }
      }
    },
    timeline () {
      return get(this.data, 'timeline', [])
    }
  },
  methods: {
    get,
    handleCandidate (type, on) {
      this.hovering = type === 'mouseover' ? on : null
    },
  }
}
</script>

<style lang="stylus" scoped>
.bar
  display flex
  &__blue
    display flex
  &__yellow
    display flex
  &__orange
    display flex

.candidate
  display flex
  &--border-white-circle
    & >>> .circle
      border 2px solid white
</style>

