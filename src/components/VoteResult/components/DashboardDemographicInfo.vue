<template>
  <div class="content">
    <div class="content__locations locations">
      <p
        v-for="location in locations"
        :key="location"
        class="locations__location"
        v-text="location"
      >
      </p>
    </div>
    <div class="content__stacked">
      <StackedBarDemographic :data="data.sex"/>
    </div>
    <div class="content__middle-salary middle-salary">
      <p class="middle-salary__text">收入中位數：</p>
      <p class="middle-salary__num" v-text="salaryMiddle"></p>
      <p class="middle-salary__num-suffix">萬元 / 年</p>
    </div>
  </div>
</template>

<script>
import { get, } from 'lodash'
// import { json } from 'd3-fetch'
import StackedBarDemographic from './charts/StackedBarDemographic.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('VoteResult')

export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    StackedBarDemographic
  },
  // data () {
  //   return {
  //     codeMapping: {}
  //   }
  // },
  computed: {
    ...mapState({
      currentLocation: state => state.map.currentLocation,
      previousLocationId: state => state.map.previousLocationId,
      codeMapping: state => state.locationCodeMapping
    }),
    salaryMiddle () {
      const num = ((get(this.data, 'middle_num', 0) * 1000) / 10000).toLocaleString()
      return num
    },
    locations () {
      let locations = []
      const { id, level } = this.currentLocation
      const isHsinchuCity = id.slice(0, 5) === '10018'

      if (level === 'county') {
        const countyId = id
        locations.push(get(this.codeMapping, [ countyId, 'name' ], ''))
      } else if (level === 'town') {
        const countyId = id.slice(0, id.length - (isHsinchuCity ? 2 : 3))
        locations.push(get(this.codeMapping, [ countyId, 'name' ], ''))

        const townId = id.slice(id.length - (isHsinchuCity ? 2 : 3), id.length)
        const townObj = get(this.codeMapping, [ countyId, townId ], {})
        const villageObjFirstItem = get(townObj, Object.keys(townObj)[0], {})

        locations.push(get(villageObjFirstItem, 'AreaName', ''))
        // locations.push(townId)
      } else if (level === 'village') {
        const countyId = id.slice(0, id.length - 6)
        locations.push(get(this.codeMapping, [ countyId, 'name' ], ''))

        const townId = id.slice(id.length - 6, id.length - 3)
        const villageId = id.slice(id.length - 3, id.length)
        if (this.previousLocationId.slice(0, 5) === '10018') {
          const voteDivisionId = `${this.previousLocationId.slice(this.previousLocationId.length - 2, this.previousLocationId.length)}`
          locations.push(get(this.codeMapping, [ countyId, voteDivisionId, villageId, 'AreaName' ], ''))
        } else {
          locations.push(get(this.codeMapping, [ countyId, townId, villageId, 'AreaName' ], ''))
        }
        locations.push(get(this.codeMapping, [ countyId, townId, villageId, 'VillageName' ], ''))
      }
      return locations
    }
  },
  methods: {
    ...mapActions([
      'FETCH_LOCATION_CODE_MAPPING'
    ])
  },
  mounted () {
    this.FETCH_LOCATION_CODE_MAPPING()
  }
}
</script>

<style lang="stylus" scoped>
.content
  &__stacked
    width 400px
    margin 15px 0 0 0

.locations
  display flex
  align-items flex-end
  p
    margin 0
    line-height 1
  p + p
    margin 0 0 0 10px
  &__location
    font-size 20px
    &:nth-last-child(1)
      font-size 30px
      font-weight 500
      color #9e005d
      margin 0 0 0 15px !important
    &:nth-child(1)
      margin 0 !important

.middle-salary
  display flex
  align-items flex-end
  margin 20px 0 0 0
  p
    margin 0
    line-height 1
  p + p
    margin 0 0 0 5px
  &__text, &__num-suffix
    font-size 20px
  &__num
    line-height .8 !important
    font-size 30px
    font-weight 600
    color #9e005d
</style>

