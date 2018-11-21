<template>
  <div class="legend">
    <div v-show="view !== 4 && view !== 5" class="legend__hint hint">
      <img class="hint__finger" src="/proj-assets/vote2018/finger.png" alt="">
      <p class="hint__text">點選可切換</p>
    </div>
    <div class="legend__wrapper">
      <div
        v-show="(showLegends || showLegendsLegislator)"
        :class="[ 'legend__item',  'item', { 'item--pointer': view === 1 || view === 2 || view === 3 || view === 6 }, { 'item--dimmed': !countFilter.includes('本人') } ]"
        @click="changeView(1, '本人')"
      >
        <div class="item__icon item__icon--blue"></div>
        <p class="item__text">議員當選次數</p>
      </div>
      <div
        v-show="showLegends"
        :class="[ 'legend__item',  'item', { 'item--pointer': view === 1 || view === 2 || view === 3 || view === 6 }, { 'item--dimmed': !countFilter.includes('二親等') } ]"
        @click="changeView(2, '二親等')"
      >
        <div class="item__icon item__icon--yellow"></div>
        <p class="item__text">二親等當選次數</p>
      </div>
      <div
        v-show="showLegends"
        :class="[ 'legend__item',  'item', { 'item--pointer': view === 1 || view === 2 || view === 3 || view === 6 }, { 'item--dimmed': !countFilter.includes('二親等以外') } ]"
        @click="changeView(3, '二親等以外')"
      >
        <div class="item__icon item__icon--orange"></div>
        <p class="item__text">二親等以外當選次數</p>
      </div>
      <div
        v-show="showLegendsLegislator"
        class="legend__item item"
      >
        <div class="item__icon item__icon--green"></div>
        <p class="item__text">立委當選次數</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    view: {
      type: Number,
      required: true
    },
    countFilter: {
      type: Array,
      required: true
    }
  },
  computed: {
    showLegends () {
      return [ 1, 2, 3, 4, 6 ].includes(this.view)
    },
    showLegendsLegislator () {
      return [ 5 ].includes(this.view)
    },
  },
  methods: {
    changeView (view, filter) {
      if (this.view === 1 || this.view === 2 || this.view === 3 || this.view === 6) {
        if (this.countFilter.includes(filter)) {
          this.$emit('popFilter', filter)
        } else {
          this.$emit('pushFilter', filter)
        }
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
.legend
  position relative
  &__wrapper
    display flex
    justify-content center
    align-items center
  &__item
    & + &
      margin 0 0 0 25px
  &__hint
    position absolute
    top -80px
    left 0

.hint
  display flex
  align-items flex-end
  &__finger
    height 60px
  &__text
    margin 0 0 0 11px
    font-size 16px
    color #9b9b9b

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
  &--pointer
    cursor pointer
    user-select none
   &--dimmed
    filter brightness(.7) 

@media (max-width 768px)
  .legend
    display flex
    flex-direction column-reverse
    &__wrapper
      flex-direction column
      align-items flex-start
    &__item
      & + &
        margin 10px 0 0 0
    &__hint
      position static
      margin 20px 0 0 0

  .hint
    &__finger
      height 40px
      transform rotate(180deg)

  .item
    &__icon
      d = 12px
      width d
      height d
      border-radius d
    &__text
      font-size 20px
</style>

