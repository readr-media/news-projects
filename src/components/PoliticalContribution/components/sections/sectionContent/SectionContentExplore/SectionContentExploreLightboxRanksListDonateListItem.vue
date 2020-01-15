<template>
  <li
    class="ranks-list-donate-list-item"
    @mouseover="highlightForceLink(entry.key)"
    @mouseout="resumeForceLink(entry.key)"
    @click="navigateRoute(name)"
  >
    <div class="ranks-list-donate-list-item__entry-container">
      <div class="ranks-list-donate-list-item__index-name-container">
        <p class="ranks-list-donate-list-item__index" v-text="`${index + 1}.`"></p>
        <p v-if="!isNameLightboxShownCorp" class="ranks-list-donate-list-item__name" v-text="formatName(name)"></p>
        <p 
          v-else
          :class="[ 'ranks-list-donate-list-item__name', `ranks-list-donate-list-item__name--${$t(`POLITICAL_CONTRIBUTION.PARTY['${getCandidateParty(entry)}']`)}` ]"
          v-text="formatName(name)"
        >
        </p>
        <div
          v-if="isGroup"
          :class="[ 'ranks-list-donate-list-item__toogle-companies-icon', { 'ranks-list-donate-list-item__toogle-companies-icon--toogled': isGroupCompaniesToogle } ]"
          @click.stop="toogleGroupCompanies"
        >
        </div>
      </div>
      <p class="ranks-list-donate-list-item__company-donate" v-text="formatDonate(donates)"></p>
    </div>
    <ol class="ranks-list-donate-sublist" v-if="isGroup" v-show="isGroupCompaniesToogle">
      <li
        class="ranks-list-donate-sublist__list-item"
        v-for="subCompnay in entry.values"
        :key="subCompnay.key"
        @click.stop="navigateRoute(subCompnay.keyCompanyFormatted)"
      >
        <p class="ranks-list-donate-sublist__company-name" v-text="formatName(subCompnay.keyCompanyFormatted)"></p>
        <p class="ranks-list-donate-sublist__company-donate" v-text="formatDonate(subCompnay.value.values)"></p>
      </li>
    </ol>
  </li>
</template>

<script>
import { get, sumBy, truncate, find, } from 'lodash'
import SectionContentExploreLightboxHighlightForceNode from 'src/components/PoliticalContribution/mixins/SectionContentExploreLightboxHighlightForceNode'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  },
  mixins: [ SectionContentExploreLightboxHighlightForceNode ],
  data () {
    return {
      isGroupCompaniesToogle: !this.$store.state.useragent.isDesktop
    }
  },
  computed: {
    ...mapGetters([
      'ordinalUrlQuery',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownRelated',
      'isNameLightboxShownCorp',
    ]),
    isGroup () {
      return get(this.entry, 'type', '') === 'group'
    },
    donates () {
      return this.isNameLightboxShownCorp ? get(this.entry, 'value') : sumBy(this.entry.values, o => o.value.values)
    },
    name () {
      return this.isNameLightboxShownCorp ? get(this.entry, 'key', '') : get(this.entry, 'keyCompanyFormatted', '')
    }
  },
  methods: {
    formatName (keyCompanyFormatted) {
      const nameOmitCoLTD = keyCompanyFormatted.replace(/[股份]*有限公司/, '')
      return truncate(nameOmitCoLTD, { length: 9 }) // length includes '...'
    },
    formatDonate (donate) {
      return `$${donate.toLocaleString()}`
    },
    toogleGroupCompanies () {
      this.isGroupCompaniesToogle = !this.isGroupCompaniesToogle
    },
    navigateRoute (name) {
      this.$router.replace(`explore?name=${name}&ordinal=${this.ordinalUrlQuery}`)
      this.resumeForceLink(this.entry.key)
    },
    getCandidateParty (entry) {
      return entry.party
    },
  },
}
</script>

<style lang="stylus" scoped>
.ranks-list-donate-list-item
  margin 10px 0
  cursor pointer
  &__entry-container
    display flex
    justify-content space-between
    align-items center
  &__index-name-container
    display flex
    align-items center
  &__index
    font-size 18px
    margin 0
    min-width 26px
  &__name
    font-size 18px
    margin 0 0 0 5px
    &--dpp
      color #53a66f
    &--kmt
      color #0071bc
    &--npp
      color #fcc037
    &--npsu
      color #c7195c
    &--indie
      color #736357
    &--pfp
      color #eb6c1f
  &__company-donate
    font-size 18px
    margin 0
    color #9e005d
  &__toogle-companies-icon
    cursor pointer
    margin 0 0 5px 8px
    width 0
    height 0
    border-style solid
    border-width 7.5px 0 7.5px 10px
    border-color transparent transparent transparent black
    &--toogled
      width 0
      height 0
      border-style solid
      border-width 10px 7.5px 0 7.5px
      border-color black transparent transparent transparent

.ranks-list-donate-sublist
  list-style none
  margin 0 0 0 26px
  padding 0
  &__list-item
    display flex
    justify-content space-between
    margin 10px 0
  &__company-name
    font-size 18px
    margin 0 0 0 5px
  &__company-donate
    font-size 18px
    margin 0
    color #9e005d
</style>


