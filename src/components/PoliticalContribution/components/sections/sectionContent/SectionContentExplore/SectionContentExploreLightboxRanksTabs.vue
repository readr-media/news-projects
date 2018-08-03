<template>
  <nav class="section-content-explore-lightbox-ranks-tabs">
    <button
      :class="[ 'section-content-explore-lightbox-ranks-tabs__tab',
        { 'section-content-explore-lightbox-ranks-tabs__tab--toogled': currentToogled === 'donate' },
        'tab'
      ]"
      @click="toogleTab('donate')"
    >
      <div class="tab__container">
        <p class="tab__text">{{ nameUrlQuery }}的</p>
        <p class="tab__text">營利事業捐贈排名</p>
      </div>
    </button>
    <button
      v-show="!isNameLightboxShownCorp"
      :class="[ 'section-content-explore-lightbox-ranks-tabs__tab',
        { 'section-content-explore-lightbox-ranks-tabs__tab--toogled': currentToogled === 'relationship' },
        'tab'
      ]"
      @click="toogleTab('relationship')"
    >
      <div class="tab__container">
        <p class="tab__text">誰跟{{ nameUrlQuery }}的</p>
        <p class="tab__text">政商關係最接近</p>
      </div>
    </button>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    currentToogled: {
      type: String,
      required: true,
      validator (value) {
        return [ 'donate', 'relationship' ].indexOf(value) !== -1
      }
    }
  },
  computed: {
    ...mapGetters([
      'nameUrlQuery',
      'isNameLightboxShownCorp',
    ])
  },
  methods: {
    toogleTab (type) {
      this.$emit('update:currentToogled', type)
    }
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-ranks-tabs
  position relative
  left -10px
  width calc(100% + 20px)
  height 60px
  background-color #666
  display flex
  align-items flex-end
  &__tab
    width 50%
    height 55px
    border none
    background-color #666
    color white
    padding 0 10px
    &:focus
      outline none
    &--toogled
      background-color white
      color #666

.tab
  display flex
  align-items center
  &__container
    display flex
    flex-direction column
  &__text
    margin 2px 0
    text-align left
</style>


