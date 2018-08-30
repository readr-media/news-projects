<template>
  <main class="section-content-dashboard">
    <div class="section-content-dashboard__container">
      <SectionContentExploreRadios :class="[ 'section-content-dashboard__radios', { 'section-content-dashboard__radios--sticky': radiosFixed } ]"/>

      <div class="section-content-dashboard__charts section-content-dashboard__charts--mobile">
        <AppChartCollapse :title="'總政治獻金的收入組成'">
          <BarHorizontalStackedOrdinalDonatesFrom
            class="chart-container__chart"
            id="dashboard-chart-ordinal-donates-from-mobile"
            :legends="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM_LEGENDS"
            :data="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'年資和收入的關係'">
          <ScatterNinthCandidateDonatesExp
            class="chart-container__chart"
            id="dashboard-chart-ninth-candidate-donates-exp-mobile"
            :legends="CHART_DATA.DATA_NINTH_CANDIDATE_DONATES_EXP_LEGENDS"
            :data="CHART_DATA.DATA_NINTH_CANDIDATE_DONATES_EXP"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'候選人政黨政治獻金<br>收入組成'">
          <ParallelOrdinalPartyDonatesFrom
            class="chart-container__chart"
            id="dashboard-chart-ordinal-parallel-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'誰收到最多捐獻<br>但沒選上'">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-five-donates-but-lost-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_BUT_LOST"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'誰收到最多政治獻金捐贈？<br>（總收入）'">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-five-donates-total-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_TOTAL"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'誰收到最多家企業捐獻<br>（營利事業捐贈數/候選人）'">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-five-donates-company-count-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_COMPANY_COUNT"
            :dataHintUnit="'家'"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'捐贈公司數<br>占全台同產業別比例前十名'">
          <BarHorizontalOrdinalIndustryParticipate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-ten-participate-industry-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'現任立委佔優勢<br>（與非現任立委比較）'">
          <TableDuel
            class="chart-container__chart"
            id="dashboard-chart-table-duel-re-elected-or-not-mobile"
            :data="CHART_DATA.DATA_ORDINAL_DUEL_RE_ELECTED_OR_NOT"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'現任立委佔優勢<br>（與第一次參選公職者比較）'">
          <TableDuel
            class="chart-container__chart"
            id="dashboard-chart-table-duel-newbie-elected-or-not-mobile"
            :ordinal="'ninth'"
            :data="CHART_DATA.DATA_ORDINAL_DUEL_NEWBIE_ELECTED_OR_NOT"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'佛心產業前十名'">
          <BarHorizontalOrdinalIndustryDonates
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-ten-donates-industry-mobile"
            :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_DONATES_INDUSTRY"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="'哪個集團捐最多'">
          <SectionContentDashboardOrdinalCorpDonatesMobile
            class="chart-container__chart"
            id="dashboard-chart-ordinal-corp-donates-mobile"
          />
        </AppChartCollapse>
      </div>

      <div class="section-content-dashboard__charts section-content-dashboard__charts--desktop">
        <div class="row">
          <div class="buttons-container">
            <button class="buttons-container__button"
              @click="currentChartShown = '1-1'"
            >
              總政治獻金的<br>收入組成
            </button>
            <button class="buttons-container__button"
              @click="currentChartShown = '1-2'"
            >
              年資和收入的關係
            </button>
            <button class="buttons-container__button"
              @click="currentChartShown = '1-3'"
            >
              候選人政黨政治獻金<br>收入組成
            </button>
            <button class="buttons-container__button"
              @click="currentChartShown = '1-4'"
            >
              誰收到最多捐獻<br>但沒選上
            </button>
          </div>
          <AppChartExpand
            v-show="currentChartShownRow === '1'"
            class="row__chart"
            :showColumn="currentChartShownColumn"
            @closeExpand="currentChartShown = '0-0'"
          >
            <SectionContentExploreRadios v-show="showRadio" slot="radios"/>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-donates-from-chart-container"
              v-if="currentChartShownRow === '1' && currentChartShownColumn === '1'"
              slot="chart"
            >
              <BarHorizontalStackedOrdinalDonatesFrom
                class="chart-container__chart"
                id="dashboard-chart-ordinal-donates-from"
                :legends="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM_LEGENDS"
                :data="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ninth-candidate-donates-exp-chart-container"
              v-if="currentChartShownRow === '1' && currentChartShownColumn === '2'"
              slot="chart"
            >
              <ScatterNinthCandidateDonatesExp
                class="chart-container__chart"
                id="dashboard-chart-ninth-candidate-donates-exp"
                :legends="CHART_DATA.DATA_NINTH_CANDIDATE_DONATES_EXP_LEGENDS"
                :data="CHART_DATA.DATA_NINTH_CANDIDATE_DONATES_EXP"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-parallel-chart-container"
              v-if="currentChartShownRow === '1' && currentChartShownColumn === '3'"
              slot="chart"
            >
              <ParallelOrdinalPartyDonatesFrom
                class="chart-container__chart"
                id="dashboard-chart-ordinal-parallel"
                :legends="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-five-donates-but-lost-chart-container"
              v-if="currentChartShownRow === '1' && currentChartShownColumn === '4'"
              slot="chart"
            >
              <BarHorizontalOrdinalCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-five-donates-but-lost"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_BUT_LOST"
              />
            </div>
          </AppChartExpand>
        </div>
        <div class="row">
          <div class="buttons-container">
            <button class="buttons-container__button"
              @click="currentChartShown = '2-1'"
            >
              誰收到最多政治獻金捐贈？（總收入）
            </button>
            <button class="buttons-container__button"
              @click="currentChartShown = '2-2'"
            >
              誰收到最多營利事業<br>政治獻金捐贈？
            </button>
            <button class="buttons-container__button"
              @click="currentChartShown = '2-3'"
            >
              誰收到最多家<br>企業捐獻？
            </button>
            <button class="buttons-container__button"
              @click="currentChartShown = '2-4'"
            >
              捐贈公司數占全台<br>同產業別比例前十名
            </button>
          </div>
          <AppChartExpand
            v-show="currentChartShownRow === '2'"
            class="row__chart"
            :showColumn="currentChartShownColumn"
            @closeExpand="currentChartShown = '0-0'"
          >
            <SectionContentExploreRadios v-show="showRadio" slot="radios"/>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-five-donates-total-chart-container"
              v-if="currentChartShownRow === '2' && currentChartShownColumn === '1'"
              slot="chart"
            >
              <BarHorizontalOrdinalCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-five-donates-total"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_TOTAL"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-five-donates-company-chart-container"
              v-if="currentChartShownRow === '2' && currentChartShownColumn === '2'"
              slot="chart"
            >
              <BarHorizontalOrdinalCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-five-donates-company"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_COMPANY"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-five-donates-company-count-chart-container"
              v-if="currentChartShownRow === '2' && currentChartShownColumn === '3'"
              slot="chart"
            >
              <BarHorizontalOrdinalCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-five-donates-company-count"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_COMPANY_COUNT"
                :dataHintUnit="'家'"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-ten-participate-industry-chart-container"
              v-if="currentChartShownRow === '2' && currentChartShownColumn === '4'"
              slot="chart"
            >
              <BarHorizontalOrdinalIndustryParticipate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-ten-participate-industry"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY"
              />
            </div>
          </AppChartExpand>
        </div>
        <div class="row">
          <div class="buttons-container">
            <button class="buttons-container__button"
              @click="currentChartShown = '3-1'"
            >
              現任立委佔優勢（與非現任立委比較）
            </button>
            <button class="buttons-container__button"
              @click="currentChartShown = '3-2'"
            >
              
            現任立委佔優勢（與第一次參選公職者比較）</button>
            <button class="buttons-container__button"
              @click="currentChartShown = '3-3'"
            >
              佛心產業前十名
            </button>
            <button class="buttons-container__button"
              @click="currentChartShown = '3-4'"
            >
              哪個集團捐最多
            </button>
          </div>
          <AppChartExpand
            v-show="currentChartShownRow === '3'"
            class="row__chart"
            :showColumn="currentChartShownColumn"
            @closeExpand="currentChartShown = '0-0'"
          >
            <SectionContentExploreRadios v-show="showRadio" slot="radios"/>
            <div
              class="chart-container"
              id="dashboard-chart-table-duel-re-elected-or-not-chart-container"
              v-if="currentChartShownRow === '3' && currentChartShownColumn === '1'"
              slot="chart"
            >
              <TableDuel
                class="chart-container__chart"
                id="dashboard-chart-table-duel-re-elected-or-not"
                :data="CHART_DATA.DATA_ORDINAL_DUEL_RE_ELECTED_OR_NOT"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-table-duel-newbie-elected-or-not-chart-container"
              v-if="currentChartShownRow === '3' && currentChartShownColumn === '2'"
              slot="chart"
            >
              <TableDuel
                class="chart-container__chart"
                id="dashboard-chart-table-duel-newbie-elected-or-not"
                :ordinal="'ninth'"
                :data="CHART_DATA.DATA_ORDINAL_DUEL_NEWBIE_ELECTED_OR_NOT"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-ten-donates-industry-chart-container"
              v-if="currentChartShownRow === '3' && currentChartShownColumn === '3'"
              slot="chart"
            >
              <BarHorizontalOrdinalIndustryDonates
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-ten-donates-industry"
                :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_DONATES_INDUSTRY"
              />
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-corp-donates-chart-container"
              v-if="currentChartShownRow === '3' && currentChartShownColumn === '4'"
              slot="chart"
            >
              <ScatterOrdinalCorpDonates
                class="chart-container__chart"
                id="dashboard-chart-ordinal-corp-donates"
              />
            </div>
          </AppChartExpand>
        </div>
      </div>
      <!-- <div class="chart-container chart-container--fill">
        <SankeyOrdinalCorpDonatesToCandidate
          class="chart-container__chart"
          id="dashboard-chart-ordinal-corp-donates-to-candidate"
        />
      </div> -->
    </div>
  </main>
</template>

<script>
import * as CHART_DATA from '../../charts/data'

import SectionContentExploreRadios from '../sectionContent/SectionContentExplore/SectionContentExploreRadios.vue'

import BarHorizontalStackedOrdinalDonatesFrom from '../../charts/BarHorizontalStackedOrdinalDonatesFrom.vue'
import BarHorizontalOrdinalCandidate from '../../charts/BarHorizontalOrdinalCandidate.vue'
import BarHorizontalOrdinalIndustryDonates from '../../charts/BarHorizontalOrdinalIndustryDonates.vue'
import BarHorizontalOrdinalIndustryParticipate from '../../charts/BarHorizontalOrdinalIndustryParticipate.vue'
import ScatterOrdinalCorpDonates from '../../charts/ScatterOrdinalCorpDonates.vue'
import ScatterNinthCandidateDonatesExp from '../../charts/ScatterNinthCandidateDonatesExp.vue'
import TableDuel from '../../charts/TableDuel.vue'
import ParallelOrdinalPartyDonatesFrom from '../../charts/ParallelOrdinalPartyDonatesFrom.vue'
import SankeyOrdinalCorpDonatesToCandidate from '../../charts/SankeyOrdinalCorpDonatesToCandidate.vue'

import AppChartExpand from '../../AppChartExpand.vue'
import AppChartCollapse from '../../AppChartCollapse.vue'
import SectionContentDashboardOrdinalCorpDonatesMobile from './SectionContentDashboard/SectionContentDashboardOrdinalCorpDonatesMobile.vue'

export default {
  components: {
    SectionContentExploreRadios,
    BarHorizontalStackedOrdinalDonatesFrom,
    BarHorizontalOrdinalCandidate,
    BarHorizontalOrdinalIndustryDonates,
    BarHorizontalOrdinalIndustryParticipate,
    ScatterOrdinalCorpDonates,
    ScatterNinthCandidateDonatesExp,
    TableDuel,
    ParallelOrdinalPartyDonatesFrom,
    SankeyOrdinalCorpDonatesToCandidate,
    AppChartExpand,
    AppChartCollapse,
    SectionContentDashboardOrdinalCorpDonatesMobile
  },
  data () {
    return {
      CHART_DATA,
      scroller: undefined,
      radiosFixed: false,
      currentChartShown: '1-1'
    }
  },
  computed: {
    currentChartShownRow () {
      return this.currentChartShown.split('-')[0]
    },
    currentChartShownColumn () {
      return this.currentChartShown.split('-')[1]
    },
    showRadio () {
      return this.currentChartShown !== '1-1' &&
             this.currentChartShown !== '1-2' &&
             this.currentChartShown !== '3-2'
    }
  },
  methods: {
    scrollerResizeHandler () {
      this.scroller.resize()
    },
  },
  mounted () {
    this.scroller = window.scrollama()
    this.scroller
      .setup({
        step: '.section-content-dashboard__container',
        offset: 0,
      })
      .onStepEnter(() => {
        this.radiosFixed = true
      })
      .onStepExit(() => {
        this.radiosFixed = false
      })

    window.addEventListener('resize', this.scrollerResizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.scrollerResizeHandler)
  }
}
</script>

<style lang="stylus" scoped>
.section-content-dashboard
  padding 60px 0 0 0 !important
  // max-width 1308px !important
  &__container
    padding 127px 0
    position relative
  &__radios
    display none
    width 900px
    padding 20px 0
    position absolute
    top 60px
    z-index 10003
    &--sticky
      position fixed
      top 60px
      background-color #eaeaea
  &__charts
    display flex
    flex-wrap wrap
    &--desktop
      display flex
    &--mobile
      display none

.chart-container
  width 600px
  padding 40px
  // border 1px solid blue
  background-color white
  position relative
  &--fill
    width 100%
  &__title
    height 30px
    background-color #d3d3d3
    font-size 18px
    font-weight 400
    display flex
    justify-content center
    align-items center
    margin 0
    position absolute
    top 0
    left 0
    width 100%
  &__chart
    width 100%
    // border 1px solid red
.row
  width 100%
  & + &
    margin 30px 0 0 0
  &__chart
    margin 46px 0 0 0

.buttons-container
  width 100%
  display flex
  &__button
    width calc((100% - 26px * 3) / 4)
    height 100px
    display flex
    justify-content center
    background-color transparent
    cursor pointer
    border 2px solid #808080
    font-size 20px
    color #808080
    line-height 1.25
    &:focus
      outline none
    & + &
      margin 0 0 0 26px

#dashboard-chart-ordinal-donates-from-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ninth-candidate-donates-exp-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ordinal-parallel-chart-container
  width 100%
  // height 360px
  padding 0px 80px

// bar charts with candidates portraits
#dashboard-chart-ordinal-top-five-donates-but-lost-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ordinal-top-five-donates-total-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ordinal-top-five-donates-company-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ordinal-top-five-donates-company-count-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ordinal-top-ten-participate-industry-chart-container
  width 100%
  // height 360px
  padding 0px 120px

#dashboard-chart-duels-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ordinal-top-ten-donates-industry-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ordinal-corp-donates-chart-container
  width 100%
  // height 360px
  padding 0px 120px

#dashboard-chart-table-duel-re-elected-or-not-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-table-duel-newbie-elected-or-not-chart-container
  width 100%
  // height 360px
  padding 0px 80px

@media (max-width 1024px)
  .section-content-dashboard
    &__radios
      display flex
      width 100%
      &--sticky
        background-color white
    &__charts
      &--desktop
        display none
      &--mobile
        display flex
</style>


