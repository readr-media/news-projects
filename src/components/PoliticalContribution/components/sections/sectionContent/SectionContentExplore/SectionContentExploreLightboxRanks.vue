<template>
  <section class="section-content-explore-lightbox-ranks">
    <template v-if="!isLightBoxWorks">
      invalid candidate: "{{ nameUrlQuery }}",<br>
      cause by invalid query string,<br>
      or candidate didn't exist in data
    </template>
    <template v-else>
      <SectionContentExploreLightboxRanksTabs
        class="section-content-explore-lightbox-ranks__tabs--mobile"
        :currentToogled.sync="mobileCurrentToogled"
      />
      <SectionContentExploreLightboxRanksListDonate
        v-show="isListDonateShown"
        :class="[ 'section-content-explore-lightbox-ranks__list-donate', { 'section-content-explore-lightbox-ranks__list-donate--long': isNameLightboxShownCorp } ]"
      />
      <SectionContentExploreLightboxRanksListRelationship
        v-show="isListRelationshipShown"
        class="section-content-explore-lightbox-ranks__list-relationship"
      />
    </template>
  </section>
</template>

<script>
import SectionContentExploreLightboxRanksTabs from './SectionContentExploreLightboxRanksTabs.vue'
import SectionContentExploreLightboxRanksListDonate from './SectionContentExploreLightboxRanksListDonate.vue'
import SectionContentExploreLightboxRanksListRelationship from './SectionContentExploreLightboxRanksListRelationship.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreLightboxRanksTabs,
    SectionContentExploreLightboxRanksListDonate,
    SectionContentExploreLightboxRanksListRelationship,
  },
  data () {
    return {
      mobileCurrentToogled: 'donate',
    }
  },
  computed: {
    ...mapGetters([
      'nameUrlQuery',
      'isQueryValidCandidateName',
      'isLightBoxWorks',
      'isNameLightboxShownCorp',
    ]),
    isListDonateShown () {
      return this.$store.state.useragent.isDesktop || this.mobileCurrentToogled === 'donate'
    },
    isListRelationshipShown () {
      return (this.$store.state.useragent.isDesktop || this.mobileCurrentToogled === 'relationship') && !this.isNameLightboxShownCorp
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-ranks
  padding 0 40px 0 0
  width 344px
  height calc(95vh - 40px)
  display flex
  flex-direction column
  &__tabs
    &--mobile
      display none !important
  &__list-donate
    height calc((95vh - 40px) / 2)
    overflow-y scroll
    &::-webkit-scrollbar
      display none
      background-color transparent
    &::-webkit-scrollbar-track
      background-color transparent
    &::-webkit-scrollbar-thumb
      background-color transparent
    &--long
      height calc(95vh - 40px)
  &__list-relationship
    height calc((95vh - 40px) / 2)
    overflow-y scroll
    border-top 1px solid gray
    &::-webkit-scrollbar
      display none
      background-color transparent
    &::-webkit-scrollbar-track
      background-color transparent
    &::-webkit-scrollbar-thumb
      background-color transparent

@media (max-width 1024px)
  .section-content-explore-lightbox-ranks
    padding 0
    width 100%
    height auto
    &__tabs
      &--mobile
        display flex !important
    &__list-donate
      height auto
      overflow-y visible
    &__list-relationship
      height auto
      overflow-y visible
      border-top none
</style>

