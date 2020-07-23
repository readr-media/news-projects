<template>
  <div class="section-content-explore-radios">
    <div 
      v-if="(!isLightboxNavigation || showRadioInLightbox['seventh']) && !showNinthOnly"
      class="section-content-explore-radios__container"
      @click="navigateRoute(7)"
    >
      <div
        id="seventh-radio-icon"
        :class="[ 'section-content-explore-radios__custom-radio', { 'section-content-explore-radios__custom-radio--active': ordinalRadioPicked === 'seventh' } ]"
        @click="selectPicked('seventh')"
      >
      </div>
      <label for="seventh-radio-icon" @click="selectPicked('seventh')">第七屆</label>
    </div>
    <div 
      v-if="(!isLightboxNavigation || showRadioInLightbox['eighth']) && !showNinthOnly"
      class="section-content-explore-radios__container"
      @click="navigateRoute(8)"
    >
      <div
        id="eighth-radio-icon"
        :class="[ 'section-content-explore-radios__custom-radio', { 'section-content-explore-radios__custom-radio--active': ordinalRadioPicked === 'eighth' } ]"
        @click="selectPicked('eighth')"
      >
      </div>
      <label for="eighth-radio-icon" @click="selectPicked('eighth')">第八屆</label>
    </div>
    <div 
      v-if="!isLightboxNavigation || showRadioInLightbox['ninth']"
      class="section-content-explore-radios__container"
      @click="navigateRoute(9)"
    >
      <div 
        id="ninth-radio-icon"
        :class="[ 'section-content-explore-radios__custom-radio', { 'section-content-explore-radios__custom-radio--active': ordinalRadioPicked === 'ninth' || showNinthOnly || hideTenth } ]"
        @click="selectPicked('ninth')"
      >
      </div>
      <label for="ninth-radio-icon" @click="selectPicked('ninth')">第九屆</label>
    </div>
    <div 
      v-if="(!isLightboxNavigation || showRadioInLightbox['tenth']) && !showNinthOnly && !hideTenth"
      class="section-content-explore-radios__container"
      @click="navigateRoute(10)"
    >
      <div
        id="tenth-radio-icon"
        :class="[ 'section-content-explore-radios__custom-radio', { 'section-content-explore-radios__custom-radio--active': ordinalRadioPicked === 'tenth' } ]"
        @click="selectPicked('tenth')"
      >
      </div>
      <label for="tenth-radio-icon" @click="selectPicked('tenth')">第十屆</label>
    </div>
  </div>
</template>

<script>
import { get, mapValues, find, } from 'lodash'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    isLightboxNavigation: {
      type: Boolean,
      default: false,
    },
    showNinthOnly: {
      type: Boolean,
      default: false,
    },
    hideTenth: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapState({
      corpNameTaxIdMappingGroupByName: state => state.corpNameTaxIdMappingGroupByName
    }),
    ...mapGetters([
      'ordinalRadioPicked',
      // in lightbox used
      'nameLightboxShown',
      'rawDataBasicAllOrdinal',
      'isNameLightboxShownCorp',
    ]),
    showRadioInLightbox () {
      if (!this.isNameLightboxShownCorp) {
        // For viewing candidate in lightbox
        return mapValues(this.rawDataBasicAllOrdinal, rawDataBasicOrdinal => {
          return find(rawDataBasicOrdinal, [ '候選人', this.nameLightboxShown ]) !== undefined
        })
      } else {
        // For viewing group or company in lightbox
        const mappingObjs = get(this.corpNameTaxIdMappingGroupByName, this.nameLightboxShown, [])
        // TODO: remove hard coding of ordinal number
        return {
          seventh: find(mappingObjs, [ '屆數', '7' ]) !== undefined,
          eighth: find(mappingObjs, [ '屆數', '8' ]) !== undefined,
          ninth: find(mappingObjs, [ '屆數', '9' ]) !== undefined,
          tenth: find(mappingObjs, [ '屆數', '10' ]) !== undefined,
        }
      }
    }
  },
  methods: {
    selectPicked (pick) {
      this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_RADIO_PICKED', pick)
    },
    navigateRoute(ordinalNum) {
      if (!this.isLightboxNavigation) return
      this.$router.replace(`explore?name=${this.nameLightboxShown}&ordinal=${ordinalNum}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
.section-content-explore-radios
  display flex
  justify-content center
  align-content center
  &__container
    display flex
    justify-content center
    align-items center
    font-size 24px
    text-align center
    &:not([style*="none"]) + &
      margin 0 0 0 24px
    > label
      margin 0 0 0 14px
      cursor pointer
  &__custom-radio
    width 20px
    height 20px
    border-radius 20px
    background-color white
    display inline-block
    visibility visible
    border 5px solid white
    box-shadow 0 0 4px 0px rgba(42, 35, 38, 1)
    cursor pointer
    position relative
    bottom 2px
    &--active
      background-color #9e005d

@media (max-width 1024px)
  .section-content-explore-radios
    &__container
      font-size 20px

@media (max-width 375px)
  .section-content-explore-radios
    &__container
      font-size 14px

</style>

