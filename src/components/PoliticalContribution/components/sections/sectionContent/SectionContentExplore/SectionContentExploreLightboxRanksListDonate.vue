<template>
  <div class="section-content-explore-lightbox-ranks-list-donate">
    <h1 class="section-content-explore-lightbox-ranks-list-donate__title">{{ nameUrlQuery }}的營利事業捐贈排名</h1>
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
import SectionContentExploreLightboxRanksListDonateListItem from './SectionContentExploreLightboxRanksListDonateListItem.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreLightboxRanksListDonateListItem,
  },
  computed: {
    ...mapGetters([
      'nameUrlQuery',
      'rankDataGroupCompanyDonatesCurrentOrdinalNameLightboxShown'
    ])
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
    font-weight 600
    margin 0 0 15px 0
    padding 0 0 5px 0
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
</style>

