<template>
  <section class="section-content-explore-lightbox-ranks">
    <template v-if="!isLightBoxWorks">
      invalid candidate: "{{ nameUrlQuery }}",<br>
      cause by invalid query string,<br>
      or candidate didn't exist in data
    </template>
    <template v-else>
      <SectionContentExploreLightboxRanksListDonate
        :class="[ 'section-content-explore-lightbox-ranks__list-donate', { 'section-content-explore-lightbox-ranks__list-donate--long': isNameLightboxShownCorp } ]"
      />
      <SectionContentExploreLightboxRanksListRelationship
        v-show="!isNameLightboxShownCorp"
        class="section-content-explore-lightbox-ranks__list-relationship"
      />
    </template>
  </section>
</template>

<script>
import SectionContentExploreLightboxRanksListDonate from './SectionContentExploreLightboxRanksListDonate.vue'
import SectionContentExploreLightboxRanksListRelationship from './SectionContentExploreLightboxRanksListRelationship.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    SectionContentExploreLightboxRanksListDonate,
    SectionContentExploreLightboxRanksListRelationship,
  },
  computed: {
    ...mapGetters([
      'nameUrlQuery',
      'isQueryValidCandidateName',
      'isLightBoxWorks',
      'isNameLightboxShownCorp',
    ]),
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
</style>

