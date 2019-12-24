<template>
  <li class="list-item">
    <h1
      class="list-item__title"
      v-text="countyName"
    />
    <div class="list-item__regions regions">
      <Square
        class="regions__region"
        v-for="(region, i) in countyRegions"
        :key="`${countyName}-${i}`"
        :color="getColor(region)"
        :shouldAnimate="getShouldAnimate(region)"
        :showBorder="getIsElected(region)"
        :number="getSquareNumber(region, i)"
        @click.native="handleClick"
      />
    </div>
    <LightboxWrapper
      :showLightbox.sync="showLightbox"
    >
      this is a lightbox
    </LightboxWrapper>
  </li>
</template>

<script>
import _ from 'lodash'

import Square from '../Square.vue'
import LightboxWrapper from '../LightboxWrapper.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('Election2020')

export default {
  props: {
    county: {
      type: Object,
      required: true
    }
  },
  components: {
    Square,
    LightboxWrapper,
  },
  data() {
    return {
      showLightbox: false
    }
  },
  computed: {
    ...mapGetters({
      isElectionBoxOpeningStart: 'timer/isElectionBoxOpeningStart'
    }),
    countyName() {
      return this.county.name
    },
    countyRegions() {
      return this.county.regions
    }
  },
  methods: {
    getHasPartyLeading(region) {
      return _.get(region, 'L', -1) !== -1
    },
    getIsElected(region) {
      return _.get(region, 'isElected', '') === '*'
    },
    getSquareNumber(region, i) {
      const shouldShowNumber = !this.getHasPartyLeading(region)

      return shouldShowNumber ? Number(i) : -1
    },
    getShouldAnimate(region) {
      const hasPartyLeading = this.getHasPartyLeading(region)
      const hasCandidateElected = this.getIsElected(region)
      return hasPartyLeading && !hasCandidateElected
    },
    getColor(region) {
      // TODO: we need a mapping of party <=> color
      return 'blue'
    },

    handleClick() {
      this.showLightbox = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  display flex
  align-items center
  &__title
    font-size 15px
    color $color-black-light
    font-weight normal
    max-width 45px
    min-width 45px
    overflow hidden
    white-space nowrap
    margin 0 10px
    text-align left

.regions
  display flex
  border-left solid 1px rgba(0, 0, 0, 0.4)
  padding 12px 10px
  flex-wrap wrap
  padding 8px 5px
  &__region
    margin 4px 5px

@media (min-width 768px)
  .list-item
    &__title
      font-size 16px
      margin 0 50px 0 0
      max-width 90px
      min-width 90px
  
  .regions
    border-left none
    &__region
      &:active // disable click, but allow hover
        pointer-events none
</style>
