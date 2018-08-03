<template>
  <div class="section-content-explore-lightbox-ranks-list-relationship">
    <h1 class="section-content-explore-lightbox-ranks-list-relationship__title">誰跟{{ nameUrlQuery }}的政商關係最接近</h1>
    <AppFingerHint class="section-content-explore-lightbox-ranks-list-relationship__finger-hint--mobile" :hint="'點選這些候選人看獻金資訊'"/>
    <ol class="section-content-explore-lightbox-ranks-list-relationship__list">
      <li 
        v-for="(candidate, i) in rankDataRelationshipCurrentOrdinalCandidateLightboxShown" :key="getCandidateName(candidate)"
        class="section-content-explore-lightbox-ranks-list-relationship__list-item"
        @mouseover="highlightForceNode(getCandidateName(candidate))"
        @mouseout="resumeForceNode(getCandidateName(candidate))"
        @click="navigateRoute(getCandidateName(candidate))"
      >
        <p class="section-content-explore-lightbox-ranks-list-relationship__index" v-text="`${i + 1}.`"></p>
        <p class="section-content-explore-lightbox-ranks-list-relationship__list-item-content">
          <span :class="`section-content-explore-lightbox-ranks-list-relationship__candidate--${$t(`POLITICAL_CONTRIBUTION.PARTY['${getCandidateParty(candidate)}']`)}`">{{ getCandidateName(candidate) }}</span>
          重複 {{ getOverlappingCompanyCount(candidate) }} 家子公司
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
import AppFingerHint from '../../../AppFingerHint.vue'
import SectionContentExploreLightboxHighlightForceNode from 'src/components/PoliticalContribution/mixins/SectionContentExploreLightboxHighlightForceNode'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    AppFingerHint
  },
  mixins: [ SectionContentExploreLightboxHighlightForceNode ],
  computed: {
    ...mapGetters([
      'nameUrlQuery',
      'ordinalUrlQuery',
      'rankDataRelationshipCurrentOrdinalCandidateLightboxShown'
    ])
  },
  methods: {
    getCandidateName (entry) {
      return entry[0]
    },
    getOverlappingCompanyCount (entry) {
      return entry[1]
    },
    getCandidateParty (entry) {
      return entry[2]
    },
    navigateRoute (candidate) {
      this.$router.replace(`explore?name=${candidate}&ordinal=${this.ordinalUrlQuery}`)
      this.resumeForceNode(candidate)
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-ranks-list-relationship
  &__title
    position sticky
    top 0
    background-color white
    font-size 20px
    font-weight 600
    margin 0 0 15px 0
    padding 15px 0 5px 0
  &__finger-hint
    &--mobile
      display none
  &__list
    list-style none
    margin 0
    padding 0
    &:hover
      .section-content-explore-lightbox-ranks-list-relationship__list-item:not(:hover)
        opacity .5
  &__list-item
    display flex
    margin 10px 0
    cursor pointer
    &:hover
      opacity 1
  &__index
    font-size 18px
    margin 0
    min-width 26px
  &__list-item-content
    font-size 18px
    margin 0 0 0 5px
  &__candidate
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

@media (max-width 1024px)
  .section-content-explore-lightbox-ranks-list-relationship
    margin 20px 0
    &__title
      display none
    &__finger-hint
      &--mobile
        display initial
    &__list
      &:hover
        .section-content-explore-lightbox-ranks-list-relationship__list-item:not(:hover)
          opacity 1
</style>

