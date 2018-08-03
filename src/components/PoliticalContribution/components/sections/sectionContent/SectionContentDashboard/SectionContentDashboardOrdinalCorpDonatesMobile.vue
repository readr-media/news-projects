<template>
  <div :style="{height: '500px'}">
    <SectionContentDashboardOrdinalCorpDonatesMobileListItem
      v-for="companyData in dataProcessed"
      :key="companyData.name"
      :data="companyData"
    />
  </div>
</template>

<script>
import { get, sortBy, sumBy, isEmpty, groupBy } from 'lodash'

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
      return get(this.$store.state.PoliticalContribution.data, [ this.shouldVisualizeOrdinal, 'rawDataCompanyDonateGroupByGroupOrCompany' ], {})
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

