<template>
  <div class="section-content-dashboard-ordinal-corp-donates-mobile" :style="{minHeight: '2100px'}">
    <div class="section-content-dashboard-ordinal-corp-donates-mobile__hint">
      <p>註：</p>
      <p>註：捐給 17 個人中，有 6 人當選，顯示為 6/17</p>
    </div>
    <div v-show="!isDataAvailable" class="section-content-dashboard-ordinal-corp-donates-mobile__loading">
      正在讀取營利事業捐贈明細...
    </div>
    <ol v-show="isDataAvailable" class="section-content-dashboard-ordinal-corp-donates-mobile__list">
      <SectionContentDashboardOrdinalCorpDonatesMobileListItem
        v-for="companyData in dataProcessed"
        :key="companyData.name"
        :data="companyData"
      />
    </ol>
  </div>
</template>

<script>
import { get, sortBy, sumBy, isEmpty, groupBy, filter } from 'lodash'

import ChartLazyVisualizing from '../../../../mixins/ChartLazyVisualizing'

import SectionContentDashboardOrdinalCorpDonatesMobileListItem from './SectionContentDashboardOrdinalCorpDonatesMobileListItem.vue'

import { fetchSheetCompanyDonate, } from 'src/components/PoliticalContribution/dispatchers'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    ordinal: {
      type: String,
      default: '',
    },
    howManyNodes: {
      type: Number,
      default: 10,
    },
    filterCorp: {
      type: Array,
      default () {
        []
      }
    }
  },
  components: {
    SectionContentDashboardOrdinalCorpDonatesMobileListItem,
  },
  mixins: [ ChartLazyVisualizing ],
  watch: {
    shouldVisualizeOrdinal () {
      if (!this.isDataAvailable) {
        if (this.isInView) {
          this.isDataLoading = true
          this.loadData()
        }
      } else {
        this.isDataLoading = false
      }
    }
  },
  data () {
    return {
      doNotVisualizeAfterLoading: true,
      isDataLoading: false,
      currentDataLoading: null,
    }
  },
  computed: {
    containerSelector () {
      return `#${this.$el.id}`
    },
    ...mapGetters([
      'ordinalRadioPicked',
    ]),
    shouldVisualizeOrdinal () {
      return this.ordinal === '' ? this.ordinalRadioPicked : this.ordinal
    },
    isDataAvailable () {
      return !isEmpty(this.data)
    },
    data () {
      const data = get(this.$store.state.PoliticalContribution.data, [ this.shouldVisualizeOrdinal, 'rawDataCompanyDonateGroupByGroupOrCompany' ], {})
      return filter(data, (value, key) => isEmpty(this.filterCorp) || this.filterCorp.includes(key))
    },
    dataSorted () {
      return sortBy(this.data, array => {
        return -sumBy(array, o => +(o['收入金額'].split(',').join('')))
      })
    },
    dataProcessed () {
      const dataSliced = this.dataSorted.slice(0, this.howManyNodes)
      return dataSliced.map(corp => ({
        name: !isEmpty(get(corp, [ 0, '集團碼' ], '')) ? get(corp, [ 0, '集團碼' ], '') : get(corp, [ 0, '統一編號' ], ''),
        mainCompanies: get(corp, [ 0, '旗下核心公司' ], ''),
        bosses: get(corp, [ 0, '董事長' ], ''),
        donatesSum: sumBy(corp, o => +(o['收入金額'].split(',').join(''))),
        candidates: groupBy(corp, '推薦政黨')
      }))
    },
  },
  methods: {
    loadData () {
      if (this.currentDataLoading !== this.shouldVisualizeOrdinal) {
        this.currentDataLoading = this.shouldVisualizeOrdinal
        fetchSheetCompanyDonate(this.$store, this.shouldVisualizeOrdinal)
        .then(() => {
          this.isDataLoading = false
          this.currentDataLoading = null
        })
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-dashboard-ordinal-corp-donates-mobile
  &__hint
    display flex
    font-size 18px
    color #808080
    line-height 1.5
    margin 0 0 20px 0
  &__loading
    display flex
    justify-content center
    align-items center
  &__list
    list-style none
    padding 0
    margin 0
</style>


