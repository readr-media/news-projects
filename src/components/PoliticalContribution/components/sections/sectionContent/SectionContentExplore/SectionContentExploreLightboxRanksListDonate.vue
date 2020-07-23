<template>
  <div class="section-content-explore-lightbox-ranks-list-donate">
    <h1 class="section-content-explore-lightbox-ranks-list-donate__title">{{ checkName }}的營利事業捐贈排名</h1>
    <AppFingerHint class="section-content-explore-lightbox-ranks-list-donate__finger-hint--mobile" :hint="fingerHint"/>
    <ol class="section-content-explore-lightbox-ranks-list-donate__list">
      <SectionContentExploreLightboxRanksListDonateListItem
        class="section-content-explore-lightbox-ranks-list-donate__list-item"
        v-for="(entry, i) in rankDataGroupCompanyDonatesCurrentOrdinalNameLightboxShown"
        :key="entry.key"
        :entry="entry"
        :index="i"
      />
    </ol>
  </div>
</template>

<script>
import AppFingerHint from '../../../AppFingerHint.vue'
import SectionContentExploreLightboxRanksListDonateListItem from './SectionContentExploreLightboxRanksListDonateListItem.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    AppFingerHint,
    SectionContentExploreLightboxRanksListDonateListItem,
  },
  computed: {
    ...mapGetters([
      'nameUrlQuery',
      'rankDataGroupCompanyDonatesCurrentOrdinalNameLightboxShown',
      'isNameLightboxShownCorp',
    ]),
    fingerHint () {
      return this.isNameLightboxShownCorp ? '點選這些候選人看獻金資訊' : '點選這些企業看捐給了誰'
    },
    checkName () {
      return this.nameUrlQuery.replace(/南投/, '')
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-ranks-list-donate
  margin 0 0 20px 0
  &__title
    position sticky
    top 0
    background-color white
    font-size 20px
    font-weight 400
    margin 0 0 15px 0
    padding 0 0 5px 0
  &__finger-hint
    &--mobile
      display none
  &__list
    list-style none
    margin 0
    padding 0
    &:hover
      .section-content-explore-lightbox-ranks-list-donate__list-item:not(:hover)
        opacity .5
  &__list-item
    &:hover
      opacity 1

@media (max-width 1024px)
  .section-content-explore-lightbox-ranks-list-donate
    margin 20px 0
    &__title
      display none
    &__finger-hint
      &--mobile
        display initial
    &__list
      &:hover
        .section-content-explore-lightbox-ranks-list-donate__list-item:not(:hover)
          opacity 1
</style>

