<template>
  <div class="card">
    <p
      class="card__party-name"
      v-text="partyName"
    />
    <p class="card__seat seat">
      <Counter
        class="seat__count"
        :count="20"
      />
      席
    </p>
  </div>
</template>

<script>
import Counter from '../Counter.vue'

export default {
  props: {
    partyName: {
      type: String,
      required: true
    },
    seat: {
      type: Number,
      default: 0
    }
  },
  components: {
    Counter
  }
}
</script>

<style lang="stylus" scoped>
.card
  width calc((100vw - 20px - 12px) / 2)
  height calc((100vw - 20px - 12px) / 2 * 0.9027) // 0.9027 = 130 / 144
  background-color rgba(216, 216, 216, 0.3)
  padding 0 22px
  display flex
  flex-direction column
  justify-content space-around
  align-items center
  &__party-name
    font-size 15px
    color $color-black-light
    width 100%
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  &__seat
    border-top 1px solid $color-black-light
    width 100%

.seat
  margin 0
  padding 10px 0
  &__count
    font-size 26px
    font-family $font-family-serif
    font-weight bold

@media (min-width 768px)
  .card
    width 110px
    height 130px
    padding 0 17px
    &__party-name
      font-size 16px

  .seat
    padding 16px 0
    &__count
      font-size 30px
</style>
