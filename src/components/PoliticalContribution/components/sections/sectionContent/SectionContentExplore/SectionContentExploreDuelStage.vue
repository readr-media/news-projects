<template>
  <div class="section-content-explore-duel-stage">
    <div class="section-content-explore-duel-stage__container">
      <img class="section-content-explore-duel-stage__duel-img section-content-explore-duel-stage__duel-img--left" v-lazy="'/proj-assets/political-contribution/explore/pk-left.png'" alt="">
      <img class="section-content-explore-duel-stage__duel-img section-content-explore-duel-stage__duel-img--right" v-lazy="'/proj-assets/political-contribution/explore/pk-right.png'" alt="">
      <div class="duel-row">
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateFirstExist } ]"
          v-text="getCandidateName(rawDataBasicCandidateFirst)"
        >
        </div>
        <div class="duel-row__cell duel-row__cell--center">vs.</div>
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateSecondExist } ]"
          v-text="getCandidateName(rawDataBasicCandidateSecond)"
        >
        </div>
      </div>
      <div class="duel-row">
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateFirstExist } ]"
          v-text="getCompanyDonatesCount(rawDataBasicCandidateFirst)"
        >
        </div>
        <div class="duel-row__cell duel-row__cell--center">捐贈公司數</div>
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateSecondExist } ]"
          v-text="getCompanyDonatesCount(rawDataBasicCandidateSecond)"
        >
        </div>
      </div>
      <div class="duel-row">
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateFirstExist } ]"
          v-text="getCompanyDonates(rawDataBasicCandidateFirst)"
        >
        </div>
        <div class="duel-row__cell duel-row__cell--center">營利事業捐贈收入<br>（萬元）</div>
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateSecondExist } ]"
          v-text="getCompanyDonates(rawDataBasicCandidateSecond)"
        >
        </div>
      </div>
      <div class="duel-row">
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateFirstExist } ]"
          v-text="getParty(rawDataBasicCandidateFirst)"
        >
        </div>
        <div class="duel-row__cell duel-row__cell--center">政黨</div>
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateSecondExist } ]"
          v-text="getParty(rawDataBasicCandidateSecond)"
        >
        </div>
      </div>
      <div class="duel-row">
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateFirstExist } ]"
          v-text="getAge(rawDataBasicCandidateFirst)"
        >
        </div>
        <div class="duel-row__cell duel-row__cell--center">年齡</div>
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateSecondExist } ]"
          v-text="getAge(rawDataBasicCandidateSecond)"
        >
        </div>
      </div>
      <div class="duel-row">
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateFirstExist } ]"
        >
          <div v-show="getIsWon(rawDataBasicCandidateFirst)" class="icon icon--won"></div>
          <div v-show="!getIsWon(rawDataBasicCandidateFirst)" class="icon icon--lost"></div>
        </div>
        <div class="duel-row__cell duel-row__cell--center">當選</div>
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateSecondExist } ]"
        >
          <div v-show="getIsWon(rawDataBasicCandidateSecond)" class="icon icon--won"></div>
          <div v-show="!getIsWon(rawDataBasicCandidateSecond)" class="icon icon--lost"></div>
        </div>
      </div>
      <div class="duel-row">
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateFirstExist } ]"
          v-text="getTotalDonates(rawDataBasicCandidateFirst)"
        >
        </div>
        <div class="duel-row__cell duel-row__cell--center">總收入<br>（萬元）</div>
        <div
          :class="[ 'duel-row__cell', { 'duel-row__cell--show':isCandidateSecondExist } ]"
          v-text="getTotalDonates(rawDataBasicCandidateSecond)"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, isEmpty } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  computed: {
    ...mapState({
      candidatesOnStage: state => state.section.explore.duel.candidatesOnStage,
    }),
    ...mapGetters([
      'rawDataBasicCurrentOrdinalGroupByCandidate'
    ]),
    rawDataBasicCandidateFirst () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ get(this.candidatesOnStage, 0, '') ], {})
    },
    isCandidateFirstExist () {
      return !isEmpty(this.rawDataBasicCandidateFirst)
    },
    rawDataBasicCandidateSecond () {
      return get(this.rawDataBasicCurrentOrdinalGroupByCandidate, [ get(this.candidatesOnStage, 1, '') ], {})
    },
    isCandidateSecondExist () {
      return !isEmpty(this.rawDataBasicCandidateSecond)
    },
  },
  methods: {
    getCandidateName (data) {
      return get(data, [ 0, '候選人' ], '')
    },
    getCompanyDonatesCount (data) {
      return get(data, [ 0, '捐贈企業數' ], '')
    },
    getCompanyDonates (data) {
      return (+(get(data, [ 0, '營利事業捐贈收入' ], '').split(',').join('')) / 10000).toFixed(2)
    },
    getParty (data) {
      return get(data, [ 0, '推薦政黨' ], '')
    },
    getAge (data) {
      const currentYear = (new Date()).getFullYear()
      return currentYear - (+get(data, [ 0, '出生年次' ], ''))
    },
    getIsWon (data) {
      return get(data, [ 0, '當選註記' ], '') === '*'
    },
    getTotalDonates (data) {
      return (+(get(data, [ 0, '總收入' ], '').split(',').join('')) / 10000).toFixed(2)
    }
  },
}
</script>

<style lang="stylus" scoped>
.section-content-explore-duel-stage
  height 100vh
  padding 60px 0 0 0
  display flex
  justify-content center
  align-items center
  &__container
    position relative
    width 100%
    top 50px
  &__duel-img
    position absolute
    top -115px
    width 160px
    z-index -1
    &--left
      left 0
    &--right
      right 0

.duel-row
  display flex
  width 100%
  padding 0 0 16px 0
  margin 0 0 16px 0
  border-bottom 1px solid #ccc
  &__cell
    text-align center
    font-size 20px
    min-width 145px
    max-width 145px
    line-height 1.25
    display flex
    justify-content center
    align-items center
    opacity 0
    user-select none
    &--show
      opacity 1
      user-select initial
    &--center
      min-width 160px
      max-width 160px
      opacity 1
      user-select initial

.icon
  width 15px
  height 15px
  background-color black
  &--won
    transform rotate(45deg) translate3d(-5px, 0, 0)
    clip-path polygon(85% 0, 100% 0, 100% 100%, 43% 100%, 43% 85%, 85% 85%)
  &--lost
    // clip-path polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)
    clip-path polygon(5% 0, 0 5%, 45% 50%, 0 95%, 5% 100%, 50% 55%, 95% 100%, 100% 95%, 55% 50%, 100% 5%, 95% 0, 50% 45%)

</style>

