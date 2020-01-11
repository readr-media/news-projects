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
        @click.native="handleClick(i + 1)"
        @mouseenter.native="handleTooltip({ showTooltip: true, districtCode: i + 1 }, $event)"
        @mouseleave.native="handleTooltip({ showTooltip: false, districtCode: i + 1 })"
      />
    </div>
    <LightboxWrapper
      :showLightbox.sync="showLightbox"
    >
      <InfoDetailed
        :title="currentRegionDataName"
        :description="currentRegionDataLocations"
        :tableHeading="{ P: '政黨', c: '候選人', R: '得票數', tks: '得票率' }"
        :tableData="candidateData"
      />
    </LightboxWrapper>
    <Tooltip :showTooltip="showTooltip" :x="tooltipX" :y="tooltipY">
      <InfoDetailed
        :title="currentRegionDataName"
        :description="currentRegionDataLocations"
        :tableHeading="{ P: '政黨', c: '候選人', R: '得票數', tks: '得票率' }"
        :tableData="candidateData"
      />
    </Tooltip>
  </li>
</template>

<script>
import _ from 'lodash'

import Square from '../Square.vue'
import LightboxWrapper from '../LightboxWrapper.vue'
import Tooltip from '../Tooltip.vue'
import InfoDetailed from '../InfoDetailed.vue'

import { mapState as mapStateRoot, mapGetters as mapGettersRoot } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('Election2020')

import { mapPartyNameAbbr } from '../../utility/mappings'

import * as Firebase from 'firebase/app'

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
    Tooltip,
    InfoDetailed
  },
  data() {
    return {
      showLightbox: false,
      showTooltip: false,
      tooltipX: 0,
      tooltipY: 0,
      districtCode: null,
      dbChannelOpenedList: []
    }
  },
  computed: {
    ...mapStateRoot({
      vw: state => state.viewport[0],
      realtimeLegislatorsDistrictCandidates: state => state.realtimeLegislatorsDistrictCandidates.data,
      realtimeLegislatorsDistrictCandidatesAboriginal: state => state.realtimeLegislatorsDistrictCandidatesAboriginal.data
    }),
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
      regionData: state => _.mapKeys(state.gcs.data.region, (value, key) => key.toString().padStart(3, 0)),
      partyData: state => state.gcs.data.party
    }),
    countyCode() {
      if (this.county.code) {
        return this.county.code
      }

      const countyCode = _.findKey(this.regionData, [ 'name', this.countyName ])
      return (countyCode || '').padStart(3, '0')
    },
    isCountyAboriginal() {
      return this.countyCode === 'L2' || this.countyCode === 'L3'
    },
    countyDistricts() {
      return this.county.districtsCount
    },

    districtCodePadded() {
      if (this.countyDistricts === 1) {
        return '00'
      }
      return (this.districtCode || 0).toString().padStart(2, '0')
    },
    candidateDataKey() {
      const countyCode = this.countyCode
      const districtCode = this.districtCodePadded
      const key = `${countyCode}-${districtCode}`
      return key
    },
    currentRegionData() {
      const regionData = this.regionData
      if (this.isCountyAboriginal) {
        const zones = _.get(regionData, [ '00L', 'zones', this.countyCode ], {})
        return zones
      } else {
        const zones = _.get(regionData, [ this.countyCode, 'zones' ], {})
        const hasOneZoneOnly = Object.keys(zones).length === 1
        if (hasOneZoneOnly) {
          return _.get(Object.values(zones), 0, {})
        } else {
          return _.get(zones, this.districtCodePadded, {})
        }
      }
    },
    currentRegionDataName() {
      return _.get(this.currentRegionData, 'name', '')
    },
    currentRegionDataLocations() {
      return _.get(this.currentRegionData, 'locations', '')
    },
    candidateData() {
      let data
      if (this.isCountyAboriginal) {
        const store = this.realtimeLegislatorsDistrictCandidatesAboriginal
        data = _.get(store, this.countyCode, [])
      } else {
        const store = this.realtimeLegislatorsDistrictCandidates
        data = Object.values(_.filter(_.get(store, this.candidateDataKey, {}), (value, key) => key !== 'id'))
      }
      
      const result =
        data
          .map(({ P, R, tks, no }, index) => {
            const partyCode = String(P).padStart(3, '0')
            const color = this.mapColor(partyCode)
            const candidateNumber = no || index + 1
            const candidateName =
              _.get(this.currentRegionData, [ 'candidates', candidateNumber, 'name' ], '')
            return {
              P: color,
              c: candidateName,
              tks,
              R
            }
          })
          .sort((a, b) => b.tks - a.tks)
      return result
    }
  },
  watch: {
    showLightbox(value) {
      if (value) {
        this.openDBChannelCandidateData()
      }
    },
    showTooltip(value) {
      if (value) {
        this.openDBChannelCandidateData()
      }
    }
  },
  methods: {
    openDBChannelCandidateData() {
      if (this.isCountyAboriginal) {
        if (_.isEmpty(this.realtimeLegislatorsDistrictCandidatesAboriginal)) {
          this.$store.dispatch(
            'realtimeLegislatorsDistrictCandidatesAboriginal/openDBChannel'
          )
        }
      } else {
        const key = this.candidateDataKey
        if (!(this.dbChannelOpenedList.includes(key))) {
          this.$store.dispatch(
            'realtimeLegislatorsDistrictCandidates/openDBChannel',
            {
              where: [
                [
                  Firebase.firestore.FieldPath.documentId(),
                  '==',
                  key
                ]
              ]
            }
          )
          this.dbChannelOpenedList.push(key)
        }
      }

    },
    getParty(i) {
      const pad = this.isCountyAboriginal ? 0 : 2
      const isDistrictSingle = this.countyDistricts === 1
      const districtCode = isDistrictSingle ? '00' : i.padStart(pad, '0')
      const district = _.get(this.realtimeLegislatorsDistricts, [ this.countyCode, districtCode ], {})
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
      const pad = this.isCountyAboriginal ? 0 : 2
      const isDistrictSingle = this.countyDistricts === 1
      const districtCode = isDistrictSingle ? '00' : i.padStart(pad, '0')
      const district = _.get(this.realtimeLegislatorsDistricts, [ this.countyCode, districtCode ], {})
      return _.get(district, 'isElected', '') === '*'
    },
    getShouldAnimate(i) {
      const hasPartyLeading = this.getHasPartyLeading(i)
      const hasCandidateElected = this.getIsElected(i)
      return hasPartyLeading && !hasCandidateElected
    },
    getColor(i) {
      const partyCode = String(this.getParty(i)).padStart(3, '0')
      return this.mapColor(partyCode)
    },
    mapColor(partyCode) {
      const partyName = this.partyData[partyCode]
      const partyNameAbbr = mapPartyNameAbbr(partyName)

      switch (partyNameAbbr) {
        case '國民黨':
          return 'blue'
        case '民進黨':
          return 'green'
        case '無黨籍':
        case '無':
          return 'gray'
        default:
          return 'purple'
      }
    },

    handleClick(districtCode) {
      if (this.vw >= 768) {
        return
      }

      this.showLightbox = true
      this.districtCode = districtCode
    },
    handleTooltip ({ showTooltip, districtCode }, event) {
      if (this.vw < 768) {
        return
      }

      if (showTooltip) {
        this.districtCode = districtCode
      }
      this.showTooltip = showTooltip

      if (event) {
        this.tooltipX = event.clientX
        this.tooltipY = event.clientY
      }
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
