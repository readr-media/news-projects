<template>
  <div class="section-content-explore-lightbox-info-profile">
    <div class="section-content-explore-lightbox-info-profile__description">
      <div class="section-content-explore-lightbox-info-profile__name-age">
        <p class="section-content-explore-lightbox-info-profile__name">{{ candidateName }}</p>
        <p class="section-content-explore-lightbox-info-profile__age">({{ candidateAge }} 歲)</p>
      </div>
      <div class="section-content-explore-lightbox-info-profile__party-veteran-committee">
        <div class="section-content-explore-lightbox-info-profile__party-veteran">
          <p class="section-content-explore-lightbox-info-profile__party">{{ candidateParty }}</p>
          <p class="section-content-explore-lightbox-info-profile__veteran">{{ candidateIsVeteranComputed }}</p>
        </div>
        <!-- <p class="section-content-explore-lightbox-info-profile__committee" v-show="isCandidateWon">{{ candidateCommittee }}委員會</p> -->
      </div>
    </div>
    <div class="section-content-explore-lightbox-info-profile__thumbnail-container">
      <SectionContentExploreCandidatePortraitRound v-if="showThumbnail && isCandidateWon" :candidateName="candidateName" :candidateParty="candidateParty"/>
    </div>
  </div>
</template>

<script>
import SectionContentExploreCandidatePortraitRound from './SectionContentExploreCandidatePortraitRound.vue'

export default {
  props: {
    candidateName: {
      type: String,
      required: true,
    },
    candidateBornYear: {
      type: String,
      required: true,
    },
    candidateParty: {
      type: String,
      required: true,
    },
    candidateIsVeteran: {
      type: String,
      required: true,
    },
    candidateCommittee: {
      type: String,
      required: true,
    },
    isCandidateWon: {
      type: Boolean,
      required: true,
    },
    showThumbnail: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SectionContentExploreCandidatePortraitRound,
  },
  computed: {
    candidateAge () {
      const currentYear = (new Date()).getFullYear()
      return currentYear - (+this.candidateBornYear)
    },
    candidateIsVeteranComputed () {
      if (!this.isCandidateWon) { return '未當選' }
      switch (this.candidateIsVeteran) {
        case '是':
          return '連任'
        case '否':
          return '現任'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-info-profile
  display flex
  justify-content space-between
  align-items flex-end
  min-height 113px
  &__description
    display flex
    flex-direction column
  &__name-age
    display flex
    align-items flex-end
  &__name
    margin 0
    font-size 36px
    font-weight 600
    line-height 1
  &__age
    margin 0
    font-size 18px
    margin 0 0 0 10px
  &__party-veteran-committee
    display flex
    flex-direction column
    margin 10px 0 0 0
    p
      font-size 20px
  &__party-veteran
    display flex
    margin 10px 0
  &__party
    margin 0
  &__veteran
    margin 0 0 0 10px
  &__committee
    margin 0
  &__thumbnail-container
    display flex
    align-items flex-end
</style>


