<template>
  <div class="legend">
    <div v-show="showLegends || showLegendsLegislator" class="legend__item item">
      <div class="item__icon item__icon--blue"></div>
      <p class="item__text">議員當選次數</p>
    </div>
    <div v-show="showLegends && (this.view === 2 || this.view === 3 || this.view === 4)" class="legend__item item">
      <div class="item__icon item__icon--yellow"></div>
      <p class="item__text">直系親屬議員當選次數</p>
    </div>
    <div v-show="showLegends && (this.view === 3 || this.view === 4)" class="legend__item item">
      <div class="item__icon item__icon--orange"></div>
      <p class="item__text">旁系親屬議員當選次數</p>
    </div>
    <div v-show="showLegendsLegislator" class="legend__item item">
      <div class="item__icon item__icon--green"></div>
      <p class="item__text">立委當選次數</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    view: {
      type: Number,
      required: true
    }
  },
  computed: {
    showLegends () {
      return [ 1, 2, 3, 4 ].includes(this.view)
    },
    showLegendsLegislator () {
      return [ 5 ].includes(this.view)
    },
  }
}
</script>


<style lang="stylus" scoped>
.legend
  display flex
  justify-content center
  align-items center
  &__item
    & + &
      margin 0 0 0 25px

.item
  display flex
  align-items center
  &__icon
    d = 20px
    width d
    height d
    border-radius d
    &--blue
      background-color #1aa6de
    &--yellow
      background-color #fda134
    &--orange
      background-color #ef5233
    &--green
      background-color #cddc32
  &__text
    margin 0 0 0 10px
</style>

