<template>
  <li class="list-item">
    <h1
      class="list-item__title"
      v-text="countyName"
    />
    <div class="list-item__regions regions">
      <Square
        class="regions__region"
        v-for="(region, i) in countyDistricts"
        :key="`${countyName}-${i + 1}`"
        :color="getColor(String(i + 1))"
        :shouldAnimate="getShouldAnimate(String(i + 1))"
        :showBorder="getIsElected(String(i + 1))"
        :number="getSquareNumber(String(i + 1))"
        @click.native="handleClick"
      />
    </div>
    <LightboxWrapper
      :showLightbox.sync="showLightbox"
    >
      this is a lightbox
    </LightboxWrapper>
  </li>
</template>

<script>
import _ from 'lodash'

import Square from '../Square.vue'
import LightboxWrapper from '../LightboxWrapper.vue'

import { mapGetters as mapGettersRoot } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('Election2020')

import { mapPartyNameAbbr } from '../../utility/mappings'

export default {
  props: {
    county: {
      type: Object,
      required: true
    }
  },
  components: {
    Square,
    LightboxWrapper,
  },
  data() {
    return {
      showLightbox: false
    }
  },
  computed: {
    ...mapGetters({
      isElectionBoxOpeningStart: 'timer/isElectionBoxOpeningStart'
    }),
    ...mapGettersRoot({
      realtimeLegislatorsDistricts: 'realtimeLegislatorsDistricts/dataPadKeys'
    }),
    countyName() {
      return this.county.name
    },
    ...mapState({
      regionData: state => state.gcs.data.region,
      partyData: state => state.gcs.data.party
    }),
    countyCode() {
      const countyCode = _.findKey(this.regionData, [ 'name', this.countyName ])
      return (countyCode || '').padStart(3, '0')
    },
    countyDistricts() {
      return this.county.districtsCount
    }
  },
  methods: {
    getParty(i) {
      const district = _.get(this.realtimeLegislatorsDistricts, [ this.countyCode, i.padStart(2, '0') ], {})
      return _.get(district, 'L', -1)
    },
    getHasPartyLeading(i) {
      return this.getParty(i) !== -1
    },
    getSquareNumber(i) {
      const shouldShowNumber = !this.getHasPartyLeading(i)
      return shouldShowNumber ? Number(i) : -1
    },
    getIsElected(i) {
      const district = _.get(this.realtimeLegislatorsDistricts, [ this.countyCode, i.padStart(2, '0') ], {})
      return _.get(district, 'isElected', '') === '*'
    },
    getShouldAnimate(i) {
      const hasPartyLeading = this.getHasPartyLeading(i)
      const hasCandidateElected = this.getIsElected(i)
      return hasPartyLeading && !hasCandidateElected
    },
    getColor(i) {
      const partyCode = String(this.getParty(i)).padStart(3, '0')
      const partyName = this.partyData[partyCode]
      const partyNameAbbr = mapPartyNameAbbr(partyName)

      switch (partyNameAbbr) {
        case '國民黨':
          return 'blue'
        case '民進黨':
          return 'green'
        case '無黨籍':
          return 'gray'
        default:
          return 'purple'
      }
    },

    handleClick() {
      this.showLightbox = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  display flex
  align-items center
  &__title
    font-size 15px
    color $color-black-light
    font-weight normal
    max-width 45px
    min-width 45px
    overflow hidden
    white-space nowrap
    margin 0 10px
    text-align left

.regions
  display flex
  border-left solid 1px rgba(0, 0, 0, 0.4)
  padding 12px 10px
  flex-wrap wrap
  padding 8px 5px
  &__region
    margin 4px 5px

@media (min-width 768px)
  .list-item
    &__title
      font-size 16px
      margin 0 50px 0 0
      max-width 90px
      min-width 90px
  
  .regions
    border-left none
    &__region
      &:active // disable click, but allow hover
        pointer-events none
</style>
