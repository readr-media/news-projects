<template>
  <header class="header">
    <div :class="[ 'header__date', { 'header__date--small': isDateDuration } ]" v-text="date"></div>
    <div class="header__icon">
      <img v-if="isByGovernment" class="government-icon" src="/proj-assets/political-contribution/government.png" alt="">
    </div>
  </header>
</template>

<script>
export default {
  props: {
    isByGovernment: {
      type: Boolean,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    isDateDuration () {
      return this.date.includes('~')
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  position relative
  &__date
    width 300px
    height 40px
    border-radius 0 19.5px 19.5px 0
    background-color #2fd8ba
    color white
    display flex
    align-items center
    font-size 24px
    padding 0 0 0 58px
    &--small
      font-size 18px
  &__icon
    d = 50px
    position absolute
    top calc((-50px + 40px) / 2)
    left calc(-50px / 2 + 1px)
    width d
    height d
    border-radius d
    background-color white
    border 8px solid #2fd8ba
    display flex
    justify-content center
    align-items center

.government-icon
  width 20px

@media (max-width 1024px)
  .header
    &__date
      width 100%
      height 36px
      padding 0 0 0 30px
      &--small
        font-size 16px
    &__icon
      d = 45px
      position absolute
      top calc((-45px + 36px) / 2)
      left calc(-45px / 2 + 1px)
      width d
      height d
      border-radius d

  .government-icon
    width 18px
</style>


