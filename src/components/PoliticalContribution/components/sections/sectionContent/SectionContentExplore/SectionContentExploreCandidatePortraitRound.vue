<template>
  <div class="section-content-explore-candidate-portrait-round">
    <div :class="[ 'candidate-portrait', `candidate-portrait--${$t(`POLITICAL_CONTRIBUTION.PARTY['${candidateParty}']`)}` ]">
      <img class="candidate-portrait__portrait-img" :src="`/proj-assets/political-contribution/candidate-portraits/${candidateName}.png`" :alt="candidateName">
    </div>
    <img v-if="isWon" class="section-content-explore-candidate-portrait-round__won-stamp" src="/proj-assets/political-contribution/elected.png" alt="">
  </div>
</template>

<script>
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
    isWon: {
      type: Boolean,
      default: false,
    },
  }  
}
</script>

<style lang="stylus" scoped>
.section-content-explore-candidate-portrait-round
  width max-content
  height max-content
  position relative
  &__won-stamp
    width 36px
    height 36px
    position absolute
    right -9px
    bottom -9px

.candidate-portrait
  width 90px
  height 90px
  border-radius 90px
  display flex
  justify-content center
  align-items center
  overflow hidden
  background-color white
  &--dpp
    border 3px solid #53a66f
  &--kmt
    border 3px solid #0071bc
  &--npp
    border 3px solid #fcc037
  &--npsu
    border 3px solid #c7195c
  &--indie
    border 3px solid #736357
  &--pfp
    border 3px solid #eb6c1f
  &__portrait-img
    width 90px
    min-width 90px
    height 90px
    // position relative
    // bottom 2px
    margin 0 0 2px 0
</style>


