<template>
  <div class="section-content-explore-duel-county-list">
    <h2 class="section-content-explore-duel-county-list__county-name" v-text="countyName"></h2>
    <ul class="section-content-explore-duel-county-list__list">
      <li 
        v-for="candidate in countyCandidates"
        :key="getCandidateName(candidate)"
        :class="[ 'section-content-explore-duel-county-list__list-item', { 'section-content-explore-duel-county-list__list-item--on-stage': candidatesOnStage.includes(getCandidateName(candidate)) } ]"
        v-text="getCandidateName(candidate)"
        @click="pushCandidateToStage(getCandidateName(candidate))"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import { get, } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapState, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    countyName: {
      type: String,
      required: true,
    },
    countyCandidates: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState({
      candidatesOnStage: state => state.section.explore.duel.candidatesOnStage,
    })
  },
  methods: {
    getCandidateName (data) {
      return get(data, '候選人', '')
    },
    pushCandidateToStage (candidateName) {
      this.$store.commit('PoliticalContribution/PUSH_CANDIDATE_TO_DUEL', candidateName)
    },
  },
}
</script>

<style lang="stylus" scoped>
.section-content-explore-duel-county-list
  &__county-name
    width max-content
    font-size 19px
    font-weight 400
    color white
    padding 5px
    background-color #666
    border 1px solid #666
    margin 0 0 0 5px
  &__list
    padding 0
    list-style none
    display flex
    flex-wrap wrap
  &__list-item
    margin 0 0 5px 5px
    padding 5px
    border 1px solid transparent
    font-size 19px
    cursor pointer
    min-width 69px
    height 33px
    overflow hidden
    text-align justify
    // workaround for text-align-last justify for safari
    &:after
      content: '';
      width: 100%;
      height 0
      display: inline-block;
    &--on-stage
      border 1px solid black
</style>

