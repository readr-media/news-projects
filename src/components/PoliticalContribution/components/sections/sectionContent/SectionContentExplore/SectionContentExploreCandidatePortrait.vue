<template>
  <router-link 
    :class="[ 'section-content-explore-candidate-portrait', `section-content-explore-candidate-portrait--${$t(`POLITICAL_CONTRIBUTION.PARTY['${candidateParty}']`)}` ]"
    :to="`/project/political-contribution/explore?name=${candidateName}&ordinal=${electionOrdinalNum}`"
  >
    <img class="section-content-explore-candidate-portrait__portrait" :src="`/proj-assets/political-contribution/candidate-portraits/${candidateName}.png`" :alt="candidateName">
  </router-link>
</template>

<script>
import { DATA, } from 'src/components/PoliticalContribution/constants'

export default {
  props: {
    candidateName: {
      type: String,
      required: true,
    },
    candidateParty: {
      type: String,
      required: true,
    },
    electionOrdinal: {
      type: String,
      required: true,
    },
  },
  computed: {
    electionOrdinalNum () {
      return DATA[this.electionOrdinal].oridinalNum
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-candidate-portrait
  display inline-block
  // width 90px
  // height 90px
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  overflow hidden
  &--dpp
    background-color #dbed9a
  &--kmt
    background-color #a8dbef
  &--npp
    background-color #f7e5a9
  &--npsu
    background-color #e0bfd0
  &--indie
    background-color #c7b299
  &--pfp
    background-color #f2c1a5
  &__portrait
    // width 100px
    // min-width 100px
    // height 100px
    width calc(100% * 1.11)
    min-width calc(100% * 1.11)
    height calc(100% * 1.11)
    position relative
    bottom 5px
    filter grayscale(100%)

@media (max-width 1024px)
  .section-content-explore-candidate-portrait
    &__portrait
      bottom 3px
</style>

