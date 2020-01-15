<template>
  <section class="dashboard">
    <DashboardMap/>
    <div
      :class="[
        'dashboard__demographic-cards',
        { 'dashboard__demographic-cards--hide': isCurrentLevelTW },
        'demographic-cards'
      ]"
    >
      <DashboardDemographicInfo
        class="demographic-cards__info"
        :data="dataCurrentVote"
      />
      <DashboardCard
        class="demographic-cards__ages"
        :theme="'purple'"
        :title="'年齡'"
        :dataVote="dataCurrentVote"
      >
        <VerticalBar
          slot-scope="slotProps"
          :dataType="'age'"
          :data="slotProps.dataVote.age"
        />
      </DashboardCard>
      <DashboardCard
        class="demographic-cards__educations"
        :theme="'purple'"
        :title="'教育程度'"
        :dataVote="dataCurrentVote"
      >
        <VerticalBar
          slot-scope="slotProps"
          :dataType="'education'"
          :data="slotProps.dataVote.education"
        />
      </DashboardCard>
      <MapBack class="dashboard__map-back"/>
    </div>
    <div
      :class="[
        'dashboard__vote-cards',
        { 'dashboard__vote-cards--hide': isCurrentLevelTW },
        'vote-cards'
      ]"
    >
      <DashboardCard
        class="vote-cards__referendum"
        :theme="'gray'"
        :title="'公投結果'"
        :dataVote="dataCurrentVote"
      >
        <DashboardCardReferendum
          slot-scope="slotProps"
          :data="slotProps.dataVote"
        />
      </DashboardCard>
      <DashboardCard
        class="vote-cards__councilors"
        :theme="'gray'"
        :title="'當選議員及政黨得票率'"
        :dataVote="dataCurrentVote"
      >
        <DashboardCardElectedCouncilor
          slot-scope="slotProps"
          :data="slotProps.dataVote['區域縣市議員']"
        />
      </DashboardCard>
    </div>
    <div class="dashboard__more-hint">往下滑看文章分析</div>
  </section>
</template>

<script>
import DashboardMap from './DashboardMap.vue'
import DashboardDemographicInfo from './DashboardDemographicInfo.vue'
import DashboardCard from './DashboardCard.vue'
import DashboardCardElectedCouncilor from './DashboardCardElectedCouncilor.vue'
import DashboardCardReferendum from './DashboardCardReferendum.vue'
import VerticalBar from './charts/VerticalBar.vue'
import MapBack from './buttons/MapBack.vue'

import { get } from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('VoteResult')

export default {
  components: {
    DashboardMap,
    DashboardDemographicInfo,
    DashboardCard,
    DashboardCardElectedCouncilor,
    DashboardCardReferendum,
    VerticalBar,
    MapBack
  },
  computed: {
    ...mapState({
      currentLocation: state => state.map.currentLocation,
      currentLocationLevel: state => state.map.currentLocation.level,
      dataVote: state => state.rawData.vote
    }),
    isCurrentLevelTW () {
      return this.currentLocationLevel === 'tw'
    },
    dataCurrentVote () {
      const _getDataKeyVote = () => {
        const { level, id } = this.currentLocation
        if (level === 'village') {
          return `${id.slice(0, id.length - 3)}_detail`
        }
        return id
      }

      const dataKeyVote = _getDataKeyVote()

      if (this.currentLocation.level === 'village') {
        const id = this.currentLocation.id
        const villageIdShort = id.slice(id.length - 3, id.length)
        return get(this.dataVote, [ dataKeyVote, villageIdShort ], {})
      }

      return get(this.dataVote, [ dataKeyVote ], {})
    }
  },
}
</script>

<style lang="stylus" scoped>
.dashboard
  position relative
  background-color white
  &__demographic-cards
    position absolute
    left 40px
    bottom 40px
    &--hide
      opacity 0
      pointer-events none !important
      & > div, button
        pointer-events none !important
  &__map-back
    position absolute
    bottom 0
    left calc(100% + 20px)
    pointer-events initial
  &__vote-cards
    position absolute
    right 40px
    bottom 40px
    &--hide
      opacity 0
      pointer-events none !important
      & > div
        pointer-events none !important
  &__more-hint
    position absolute
    top calc(100vh - 60px)
    left 0
    width 100vw
    height 60px
    background-color #9e005d
    color white
    display flex
    justify-content center
    align-items center

.demographic-cards
  pointer-events none
  &__info
    pointer-events initial
  &__ages
    margin 46px 0 0 0
    pointer-events initial
  &__educations
    margin 36px 0 0 0
    pointer-events initial

.vote-cards
  pointer-events none
  &__referendum
    pointer-events initial
  &__councilors
    margin 34px 0 0 0
    pointer-events initial
</style>


