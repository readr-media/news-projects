<template>
  <header class="section-content-explore-party-header">
    <div :class="`section-content-explore-party-header__title section-content-explore-party-header__title--${$t(`POLITICAL_CONTRIBUTION.PARTY['${headerParty}']`)}`" v-text="headerParty"></div>
    <p :class="`section-content-explore-party-header__count section-content-explore-party-header__count--${$t(`POLITICAL_CONTRIBUTION.PARTY['${headerParty}']`)}`" v-text="headerCount"></p>
  </header>
</template>

<script>
export default {
  props: {
    headerParty: {
      type: String,
      required: true,
    },
    headerCount: {
      type: Number,
      default: 0,
    },
  }  
}
</script>

<style lang="stylus" scoped>
.section-content-explore-party-header
  display flex
  align-items center
  &__title
    font-size 19px
    color white
    padding 10px
    &--dpp
      background-color #53a66f
    &--kmt
      background-color #0071bc
    &--npp
      background-color #fcc037
    &--npsu
      background-color #c7195c
    &--indie
      background-color #736357
    &--pfp
      background-color #eb6c1f
    &--tsp
      background-color #A63F24
    &--tpp
      background-color #29C7C7
  &__count
    margin 0 0 0 20px
    font-size 40px
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
    &--tsp
      color #A63F24
    &--tpp
      color #29C7C7
</style>

