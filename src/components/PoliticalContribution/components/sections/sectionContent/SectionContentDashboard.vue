<template>
  <main class="section-content-dashboard">
    <div class="section-content-dashboard__container">
      <SectionContentExploreRadios :class="[ 'section-content-dashboard__radios', { 'section-content-dashboard__radios--sticky': radiosFixed } ]"/>

      <div class="section-content-dashboard__charts section-content-dashboard__charts--mobile">
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[0][0]')">
          <BarHorizontalStackedOrdinalDonatesFrom
            class="chart-container__chart"
            id="dashboard-chart-ordinal-donates-from-mobile"
            :legends="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM_LEGENDS"
            :data="CHART_DATA.DATA_ALL_ORDINAL_DONATES_FROM"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[0][1]')">
          <ParallelOrdinalPartyDonatesFrom
            class="chart-container__chart"
            id="dashboard-chart-ordinal-parallel-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_PARTY_DONATES_FROM"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[0][2]')">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-five-donates-total-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_TOTAL"
          />
          <p class="chart-container__hint">＊政治獻金總收入</p>
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[0][3]')">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-five-donates-company-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_COMPANY"
          />
          <p class="chart-container__hint">＊營利事業政治獻金</p>
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[1][0]')">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-five-donates-company-count-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_COMPANY_COUNT"
            :dataHintUnit="'家'"
          />
          <p class="chart-container__hint">＊營利事業捐贈家數</p>
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[1][1]')">
          <BarHorizontalOrdinalCandidate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-five-donates-but-lost-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_BUT_LOST"
          />
          <p class="chart-container__hint">＊政治獻金總收入</p>
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[1][2]')">
          <BarHorizontalOrdinalIndustryDonates
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-ten-donates-industry-mobile"
            :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_DONATES_INDUSTRY_NEW"
            :isNewData="true"
          />
          <p class="chart-container__hint">＊分類資料：財務部稅籍登記</p>
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[1][3]')">
          <BarHorizontalOrdinalIndustryParticipate
            class="chart-container__chart"
            id="dashboard-chart-ordinal-top-ten-participate-industry-mobile"
            :legends="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY_LEGENDS"
            :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY_NEW"
          />
          <p class="chart-container__hint">＊有捐贈的公司數佔該年度同類型公司總數比例</p>
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[2][0]')">
          <SectionContentDashboardOrdinalCorpDonatesMobile
            class="chart-container__chart"
            id="dashboard-chart-ordinal-corp-donates-mobile"
          />
          <p class="chart-container__hint">＊集團捐贈金額前十名</p>
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[2][1]')">
          <SectionContentDashboardOrdinalCorpDonatesMobile
            class="chart-container__chart"
            id="dashboard-chart-ordinal-corp-donates-mobile"
            :filterCorp="CHART_DATA.GROUPS_TOP_TEN_DONATES_SEVENTH_EIGHTH_NINTH"
          />
          <p class="chart-container__hint">＊連續三屆選舉都有捐贈的公司，金額統計前十名</p>
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[2][2]')">
          <TableDuel
            class="chart-container__chart"
            id="dashboard-chart-table-duel-re-elected-or-not-mobile"
            :data="CHART_DATA.DATA_ORDINAL_DUEL_RE_ELECTED_OR_NOT"
          />
        </AppChartCollapse>
        <AppChartCollapse :title="$t('POLITICAL_CONTRIBUTION.CHARTS[2][3]')">
          <TableDuel
            class="chart-container__chart"
            id="dashboard-chart-table-duel-newbie-elected-or-not-mobile"
            :ordinal="'ninth'"
            :data="CHART_DATA.DATA_ORDINAL_DUEL_NEWBIE_ELECTED_OR_NOT"
          />
        </AppChartCollapse>
      </div>

      <div class="section-content-dashboard__charts section-content-dashboard__charts--desktop">
        <div class="row">
          <div class="buttons-container">
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '1-1' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '1-1'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[0][0]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '1-2' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '1-2'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[0][1]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '1-3' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '1-3'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[0][2]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '1-4' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '1-4'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[0][3]')"
            >
            </button>
          </div>
          <AppChartExpand
            v-show="currentChartShownRow === '1'"
            class="row__chart"
            :showColumn="currentChartShownColumn"
            @closeExpand="currentChartShown = '0-0'"
          >
            <SectionContentExploreRadios
              v-show="showRadio"
              :showNinthOnly="showNinthOnly"
              slot="radios"
            />
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
              id="dashboard-chart-ordinal-parallel-chart-container"
              v-if="currentChartShownRow === '1' && currentChartShownColumn === '2'"
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
              id="dashboard-chart-ordinal-top-five-donates-total-chart-container"
              v-if="currentChartShownRow === '1' && currentChartShownColumn === '3'"
              slot="chart"
            >
              <BarHorizontalOrdinalCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-five-donates-total"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_TOTAL"
              />
              <p class="chart-container__hint">＊政治獻金總收入</p>
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-five-donates-company-chart-container"
              v-if="currentChartShownRow === '1' && currentChartShownColumn === '4'"
              slot="chart"
            >
              <BarHorizontalOrdinalCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-five-donates-company"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_COMPANY"
              />
              <p class="chart-container__hint">＊營利事業政治獻金</p>
            </div>
          </AppChartExpand>
        </div>
        <div class="row">
          <div class="buttons-container">
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '2-1' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '2-1'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[1][0]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '2-2' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '2-2'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[1][1]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '2-3' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '2-3'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[1][2]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '2-4' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '2-4'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[1][3]')"
            >
            </button>
          </div>
          <AppChartExpand
            v-show="currentChartShownRow === '2'"
            class="row__chart"
            :showColumn="currentChartShownColumn"
            @closeExpand="currentChartShown = '0-0'"
          >
            <SectionContentExploreRadios
              v-show="showRadio"
              :showNinthOnly="showNinthOnly"
              slot="radios"
            />
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-five-donates-company-count-chart-container"
              v-if="currentChartShownRow === '2' && currentChartShownColumn === '1'"
              slot="chart"
            >
              <BarHorizontalOrdinalCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-five-donates-company-count"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_COMPANY_COUNT"
                :dataHintUnit="'家'"
              />
              <p class="chart-container__hint">＊營利事業捐贈家數</p>
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-five-donates-but-lost-chart-container"
              v-if="currentChartShownRow === '2' && currentChartShownColumn === '2'"
              slot="chart"
            >
              <BarHorizontalOrdinalCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-five-donates-but-lost"
                :legends="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_LEGENDS"
                :data="CHART_DATA.DATA_ORDINAL_TOP_FIVE_DONATES_BUT_LOST"
              />
              <p class="chart-container__hint">＊政治獻金總收入</p>
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-top-ten-donates-industry-chart-container"
              v-if="currentChartShownRow === '2' && currentChartShownColumn === '3'"
              slot="chart"
            >
              <BarHorizontalOrdinalIndustryDonates
                class="chart-container__chart"
                id="dashboard-chart-ordinal-top-ten-donates-industry"
                :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_DONATES_INDUSTRY_NEW"
                :isNewData="true"
              />
              <p class="chart-container__hint">＊分類資料：財務部稅籍登記</p>
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
                :data="CHART_DATA.DATA_ORDINAL_TOP_TEN_PARTICIPATE_INDUSTRY_NEW"
              />
              <p class="chart-container__hint">＊有捐贈的公司數佔該年度同類型公司總數比例</p>
            </div>
          </AppChartExpand>
        </div>
        <div class="row">
          <div class="buttons-container">
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '3-1' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '3-1'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[2][0]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '3-2' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '3-2'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[2][1]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '3-3' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '3-3'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[2][2]')"
            >
            </button>
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '3-4' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '3-4'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[2][3]')"
            >
            </button>
          </div>
          <AppChartExpand
            v-show="currentChartShownRow === '3'"
            class="row__chart"
            :showColumn="currentChartShownColumn"
            @closeExpand="currentChartShown = '0-0'"
          >
            <SectionContentExploreRadios
              v-show="showRadio"
              :showNinthOnly="showNinthOnly"
              slot="radios"
            />
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-corp-donates-chart-container"
              v-if="currentChartShownRow === '3' && currentChartShownColumn === '1'"
              slot="chart"
            >
              <ScatterOrdinalCorpDonates
                class="chart-container__chart"
                id="dashboard-chart-ordinal-corp-donates"
              />
              <p class="chart-container__hint">＊集團捐贈金額前十名</p>
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-corp-donates-top10-evolved-chart-container"
              v-if="currentChartShownRow === '3' && currentChartShownColumn === '2'"
              slot="chart"
            >
              <ScatterOrdinalCorpDonates
                class="chart-container__chart"
                id="dashboard-chart-ordinal-corp-donates-top10-evolved"
                :filterCorp="CHART_DATA.GROUPS_TOP_TEN_DONATES_SEVENTH_EIGHTH_NINTH"
              />
              <p class="chart-container__hint">＊連續三屆選舉都有捐贈的公司，金額統計前十名</p>
            </div>
            <div
              class="chart-container"
              id="dashboard-chart-table-duel-re-elected-or-not-chart-container"
              v-if="currentChartShownRow === '3' && currentChartShownColumn === '3'"
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
              v-if="currentChartShownRow === '3' && currentChartShownColumn === '4'"
              slot="chart"
            >
              <TableDuel
                class="chart-container__chart"
                id="dashboard-chart-table-duel-newbie-elected-or-not"
                :ordinal="'ninth'"
                :data="CHART_DATA.DATA_ORDINAL_DUEL_NEWBIE_ELECTED_OR_NOT"
              />
            </div>
          </AppChartExpand>
        </div>
        <div class="row">
          <div class="buttons-container">
            <button
              :class="[
                'buttons-container__button',
                { 'buttons-container__button--active': currentChartShown === '4-1' },
                { 'buttons-container__button--en': $i18n.locale === 'en' }
              ]"
              @click="currentChartShown = '4-1'"
              v-html="$t('POLITICAL_CONTRIBUTION.CHARTS[3][0]')"
            >
            </button>
          </div>
          <AppChartExpand
            v-show="currentChartShownRow === '4'"
            class="row__chart"
            :showColumn="currentChartShownColumn"
            @closeExpand="currentChartShown = '0-0'"
          >
            <SectionContentExploreRadios
              v-show="showRadio"
              :showNinthOnly="showNinthOnly"
              slot="radios"
            />
            <div
              class="chart-container"
              id="dashboard-chart-ordinal-corp-donates-to-candidate-chart-container"
              v-if="currentChartShownRow === '4' && currentChartShownColumn === '1'"
              slot="chart"
            >
              <SankeyOrdinalCorpDonatesToCandidate
                class="chart-container__chart"
                id="dashboard-chart-ordinal-corp-donates-to-candidate"
              />
              <p class="chart-container__hint">＊各屆營利事業收入前十名</p>
            </div>
          </AppChartExpand>
        </div>
      </div>
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
      return this.currentChartShown !== '1-1'
    },
    showNinthOnly () {
      return this.currentChartShown === '3-4'
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
    display none !important
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
  &__hint
    font-size 18px
    text-align center
    color #808080
    margin 14px 0 0 0
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
    cursor pointer
    border 2px solid #808080
    font-size 20px
    background-color #eaeaea
    color #808080
    transition background-color .25s ease-out, color .25s ease-out
    line-height 1.25
    &--active
      background-color #808080
      color white
    &--en
      height 200px
    &:focus
      outline none
    &:hover
      background-color #808080
      color white
    & + &
      margin 0 0 0 26px

#dashboard-chart-ordinal-donates-from-chart-container
  width 100%
  // height 360px
  padding 0px 80px
  margin 0 0 40px 0

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
  padding 0px 60px

#dashboard-chart-duels-chart-container
  width 100%
  // height 360px
  padding 0px 80px

#dashboard-chart-ordinal-top-ten-donates-industry-chart-container
  width 100%
  // height 360px
  padding 0px 0px

#dashboard-chart-ordinal-corp-donates-chart-container
  width 100%
  // height 360px
  padding 0px 120px

#dashboard-chart-ordinal-corp-donates-top10-evolved-chart-container
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

#dashboard-chart-ordinal-corp-donates-to-candidate-chart-container
  width 100%
  // height 360px
  // padding 0px 80px

@media (max-width 1024px)
  .section-content-dashboard
    &__radios
      display flex !important
      width 100%
      &--sticky
        background-color white
    &__charts
      &--desktop
        display none
      &--mobile
        display flex
  .chart-container
    &__hint
      margin 44px 0
      line-height 1.25
</style>


