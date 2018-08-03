<template>
  <div class="section-content-explore-lightbox-info-profile-corp">
    <h1 class="section-content-explore-lightbox-info-profile-corp__name" v-text="name"></h1>
    <p class="section-content-explore-lightbox-info-profile-corp__owner">
      代表人：{{ companyResData.owner }}
    </p>
    <p class="section-content-explore-lightbox-info-profile-corp__capital">
      資本<span v-show="isGroup">總</span>額：
      <span class="section-content-explore-lightbox-info-profile-corp__donate-sum-number">{{ companyResData.capital }}</span>
      億元
    </p>
    <p class="section-content-explore-lightbox-info-profile-corp__donate-sum">
      營利事業捐贈
      <span class="section-content-explore-lightbox-info-profile-corp__donate-sum-number">{{ donateSum }}</span>
      萬元
    </p>
  </div>
</template>

<script>
import { get, find, isEmpty, sumBy, uniq } from 'lodash'
import axios from 'axios'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    corpType: {
      type: String,
      required: true,
    },
    groupNameOrCompanyTaxId: {
      // String for node hovering, Object for link hovering(but not showing this component)
      type: [ String, Object ],
      required: true,
    },
  },
  watch: {
    groupNameOrCompanyTaxId () {
      this.fetchCompanyData()
    },
    rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany () {
      this.fetchCompanyData()
    },
    ordinalRadioPicked () {
      this.companyResStore = {}
    }
  },
  data () {
    return {
      companyAPIUrl: 'https://company.g0v.ronny.tw/api/show',
      companyResStore: {},
    }
  },
  computed: {
    ...mapState({
      corpNameTaxIdMappingGroupByName: state => state.corpNameTaxIdMappingGroupByName,
    }),
    ...mapGetters([
      'rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany',
      'rawDataCompanyDonateCurrentOrdinalGroupByCompany',
      'dataForceDonateSum',
      'isQueryValidCompanyBelongsGroup',
      'rankDataGroupCompanyDonatesCurrentOrdinalNameLightboxShown',
      'ordinalRadioPicked',
    ]),
    isGroup () {
      return this.corpType === 'group'
    },
    isCompany () {
      return this.corpType === 'company'
    },
    shouldCompanyBelongsGroup () {
      return !Object.keys(this.rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany).includes(this.groupNameOrCompanyTaxId)
    },
    name () {
      if (this.isGroup) {
        return this.groupNameOrCompanyTaxId
      } else if (this.shouldCompanyBelongsGroup) {
        return get(this.rawDataCompanyDonateCurrentOrdinalGroupByCompany, [ this.groupNameOrCompanyTaxId, 0, '捐贈者／支出對象' ], '')
      } else {
        return get(this.rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany, [ this.groupNameOrCompanyTaxId, 0, '捐贈者／支出對象' ], '')
      }
    },
    donateSum () {
      if (this.isQueryValidCompanyBelongsGroup) {
        return (sumBy(this.rankDataGroupCompanyDonatesCurrentOrdinalNameLightboxShown, 'value') / 10000).toFixed(2)
      } else {
        return (get(find(this.dataForceDonateSum['company'], [ 'key', this.groupNameOrCompanyTaxId ]), [ 'value', 'total' ], 0) / 10000).toFixed(2)
      }
    },
    companyResData () {
      return get(this.companyResStore, [ this.groupNameOrCompanyTaxId ], {})
    },
    isCompanyResDataCurrentCropEmpty () {
      return (isEmpty(this.companyResData) || get(this.companyResStore, [ this.groupNameOrCompanyTaxId, 'owner' ], '') === '')
    }
  },
  methods: {
    fetchCompanyData () {
      const currentIdentityId = this.groupNameOrCompanyTaxId
      if (this.isCompany && this.isCompanyResDataCurrentCropEmpty) {
        this.$set(this.companyResStore, currentIdentityId, { owner: '查詢中', capital: '查詢中' })
        const reqUrl = `${this.companyAPIUrl}/${currentIdentityId}`
        axios.get(reqUrl)
          .then(({ data }) => {
            const companyData = get(data, 'data', {})
            const isCompanyExist = !isEmpty(get(companyData, '財政部', {}))
            if (isCompanyExist) {
              const companyResCapital = get(companyData, [ '資本總額(元)' ], get(companyData, [ '資本額(元)' ]))
              this.companyResStore[currentIdentityId].capital = (+(companyResCapital.split(',').join('')) / 100000000).toFixed(2)
              this.companyResStore[currentIdentityId].owner = get(companyData, [ '代表人姓名' ], get(companyData, [ '負責人姓名' ]))
            } else {
              this.companyResStore[currentIdentityId].capital = '查無資料'
              this.companyResStore[currentIdentityId].owner = '查無資料'
            }
          })
          .catch(err => {
            this.companyResStore[currentIdentityId].capital = '錯誤，請稍後再試'
            this.companyResStore[currentIdentityId].owner = '錯誤，請稍後再試'
          })
      } else if (this.isGroup && this.isCompanyResDataCurrentCropEmpty) {
        const groupDonates = get(this.rawDataCompanyDonateCurrentOrdinalGroupByGroupOrCompany, currentIdentityId, [])
        const groupDonatesCompanyTaxIds = uniq(groupDonates.map(row => row['統一編號']))
        const companyReqs = groupDonatesCompanyTaxIds.map(taxId => {
          const reqUrl = `${this.companyAPIUrl}/${taxId}`
          return axios.get(reqUrl)
        })

        this.$set(this.companyResStore, currentIdentityId, { owner: get(groupDonates, [ 0, '董事長' ], ''), capital: '查詢中' })
        Promise.all(companyReqs)
          .then(res => {
            this.companyResStore[currentIdentityId].capital = (sumBy(res, ({ data } = company) => {
              const companyData = get(data, 'data', {})
              const companyResCapital = get(companyData, [ '資本總額(元)' ], get(companyData, [ '資本額(元)' ], 0))
              return +(companyResCapital.split(',').join(''))
            }) / 100000000).toFixed(2)
          })
      }
    },
  },
  created () {
    this.fetchCompanyData()
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-info-profile-corp
  h1
    font-size 28px
    margin 20px 0 10px 0
  p
    font-size 16px
    margin 10px 0
  &__donate-sum-number
    font-size 18px
    color #9e005d
    font-weight 600
</style>


