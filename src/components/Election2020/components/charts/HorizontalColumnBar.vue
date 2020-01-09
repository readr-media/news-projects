<template>
  <div class="chart">
    <div class="chart__x-axis axis">
      <HorizontalColumnBarTick
        v-for="tick in ticks"
        :key="tick"
        :value="tick"
      />
    </div>
    <div class="chart__groups groups">
      <HorizontalColumnBarGroup
        v-for="(group, i) in data"
        v-show="getShowGroup(i)"
        :key="group.title"
        :data="group"
        :showDetailDataColor="showDetailDataColor"
      />
      <ButtonExpandCounty
        v-if="groupLimitToShow !== Infinity"
        class="groups__expand-button"
        @toggle="handleExpandCountyToggle"
      />
    </div>
    <HorizontalColumnBarLegends
      :legendsType="legendsType"
      class="chart__legends"
    />
  </div>
</template>

<script>
import HorizontalColumnBarTick from './HorizontalColumnBarTick.vue'
import HorizontalColumnBarGroup from './HorizontalColumnBarGroup.vue'
import ButtonExpandCounty from '../ButtonExpandCounty.vue'
import HorizontalColumnBarLegends from './HorizontalColumnBarLegends.vue'

export default {
  props: {
    data: {
      type: Array,
      required: true,
      validator(data) {
        return data.reduce((acc, curr) => {
          const isTitleValid = 'title' in curr && typeof curr.title === 'string'
          const isBarsValid = 'bars' in curr && Array.isArray(curr.bars)
          return acc && isTitleValid && isBarsValid
        }, true)
      }
    },
    groupLimitToShow: {
      type: Number,
      default: Infinity
    },
    legendsType: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'normal',
          'other'
        ].includes(value)
      }
    },
    showDetailDataColor: {
      type: Boolean,
      default: true
    }
  },
  components: {
    HorizontalColumnBarTick,
    HorizontalColumnBarGroup,
    ButtonExpandCounty,
    HorizontalColumnBarLegends
  },
  data() {
    return {
      ticks: [
        0,
        50,
        100
      ],
      isExpandCountyClicked: false
    }
  },
  methods: {
    handleExpandCountyToggle(value) {
      this.isExpandCountyClicked = value
    },
    getShowGroup(index) {
      return index + 1 <= this.groupLimitToShow || this.isExpandCountyClicked
    }
  }
}
</script>

<style lang="stylus" scoped>
.chart
  &__x-axis
    margin 0 10px 0 73px
  &__groups
    margin 6px 0 0 0
  &__legends
    margin-top 18px

.axis
  display flex
  justify-content space-between
  align-items center

.groups
  &__expand-button
    margin 18px auto 0 auto

@media (min-width 768px)
  .chart
    &__x-axis
      margin 0 40px 0 145px
</style>
