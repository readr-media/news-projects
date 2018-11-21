<template>
  <div class="bar-wrapper">
    <div class="bar" v-if="viewStatus === 'relationship'">
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
    <div class="bar" v-if="viewStatus === 'county'">
      <div class="bar__blue blue">
        <VoteVisChartBarRect
          :backgroundColor="'#1aa6de'"
          :amount="blue"
          :amountMax="maxCount"
        />
      </div>
      <div class="bar__yellow yellow">
        <VoteVisChartBarRect
          :backgroundColor="'#fda134'"
          :amount="yellow"
          :amountMax="maxCount"
        />
      </div>
      <div class="bar__orange orange">
        <VoteVisChartBarRect
          :backgroundColor="'#ef5233'"
          :amount="orange"
          :amountMax="maxCount"
        />
      </div>
    </div>
    <div class="bar" v-if="viewStatus === 'legislator'">
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
import { get, isNaN, find, uniq } from 'lodash'
import VoteVisChartBarCircle from './VoteVisChartBarCircle.vue'
import VoteVisChartBarCirclePortion from './VoteVisChartBarCirclePortion.vue'
import VoteVisChartBarRect from './VoteVisChartBarRect.vue'

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
    },
    countFilter: {
      type: Array,
      required: true
    },
    maxCount: {
      type: Number,
      required: true
    }
  },
  components: {
    VoteVisChartBarCircle,
    VoteVisChartBarCirclePortion,
    VoteVisChartBarRect
  },
  data () {
    return {
      hovering: null
    }
  },
  computed: {
    viewStatus () {
      if ([ 1, 2, 3, 6 ].includes(this.view)) {
        return 'relationship'
      } else if ([ 4 ].includes(this.view)) {
        return 'county'
      } else if ([ 5 ].includes(this.view)) {
        return 'legislator'
      }
    },
    blueTotal () {
      return sum(get(find(get(this.data, 'values', []), o => o.key === '本人'), 'values', []), item => sum(item.values, d => d['當選次數']))
    },
    yellowTotal () {
      return sum(get(find(get(this.data, 'values', []), o => o.key === '二親等'), 'values', []), item => sum(item.values, d => d['當選次數']))
    },
    orangeTotal () {
      return sum(get(find(get(this.data, 'values', []), o => o.key === '二親等以外'), 'values', []), item => sum(item.values, d => d['當選次數']))
    },
    blue () {
      if (this.viewStatus === 'relationship') {
        // return get(this.data, [ 'values', '0', 'values' ], []).map(item => item.values[0])
        return get(find(get(this.data, 'values', []), o => o.key === '本人'), 'values', []).map(item => item.values[0])
      } else if (this.viewStatus === 'county') {
        const result = sum(get(this.data, [ 'values', '0', 'values' ], []).map(item => item['當選次數'])) / sum(get(this.data, [ 'values' ], []), d => {
          const relArray = d.values
          return uniq(relArray.map(o => `${o['所屬議員']}-${o['所屬議員縣市']}`)).length
        })
        return typeof result === 'number' && !isNaN(result) ? result : 0
      }
    },
    yellow () {
      if (this.viewStatus === 'relationship') {
        // return get(this.data, [ 'values', '1', 'values' ], []).map(item => item.values[0])
        return get(find(get(this.data, 'values', []), o => o.key === '二親等'), 'values', []).map(item => item.values[0])
      } else if (this.viewStatus === 'county') {
        const result = sum(get(this.data, [ 'values', '1', 'values' ], []).map(item => item['當選次數'])) / sum(get(this.data, [ 'values' ], []), d => {
          const relArray = d.values
          return uniq(relArray.map(o => `${o['所屬議員']}-${o['所屬議員縣市']}`)).length
        })
        return typeof result === 'number' && !isNaN(result) ? result : 0
      }
    },
    orange () {
      if (this.viewStatus === 'relationship') {
        // return get(this.data, [ 'values', '2', 'values' ], []).map(item => item.values[0])
        return get(find(get(this.data, 'values', []), o => o.key === '二親等以外'), 'values', []).map(item => item.values[0])
      } else if (this.viewStatus === 'county') {
        const result = sum(get(this.data, [ 'values', '2', 'values' ], []).map(item => item['當選次數'])) / sum(get(this.data, [ 'values' ], []), d => {
          const relArray = d.values
          return uniq(relArray.map(o => `${o['所屬議員']}-${o['所屬議員縣市']}`)).length
        })
        return typeof result === 'number' && !isNaN(result) ? result : 0
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

@media (max-width 768px)
  .bar-wrapper
    width 100%

  .bar
    flex-direction column
    width 100%
    &__blue
      display flex
      flex-wrap wrap
      margin 10px 0 0 0
      position relative
    &__yellow
      display flex
      flex-wrap wrap
      margin 10px 0 0 0
      position relative
    &__orange
      display flex
      flex-wrap wrap
      margin 10px 0 0 0
      position relative
</style>

