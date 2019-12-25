<template>
  <section class="section">
    <h1 v-text="title" />
    <div class="section__seats seats">
      <div class="seats__seats-wrapper seats-wrapper">
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'民進黨'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟無黨團結聯盟無黨團結聯盟無黨團結聯盟無黨團結聯盟無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
        <SeatsCard
          class="seats-wrapper__seat"
          :partyName="'無黨團結聯盟'"
        />
      </div>
    </div>
    <div class="section__seat-total-wrapper seat-total-wrapper">
      <SeatTotal
        class="seat-total-wrapper__seat-total"
        :count="79"
      />
    </div>
  </section>
</template>

<script>
import SeatsCard from './SeatsCard.vue'
import SeatTotal from '../SeatTotal.vue'

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    SeatsCard,
    SeatTotal
  }
}
</script>

<style lang="stylus" scoped>
.section
  h1
    font-size 15px
    font-weight normal
    color $color-black
    margin 0
  &__seats
    margin 26px 0 0 0
  &__seat-total-wrapper
    margin 20px 0 0 0

.seats
  padding 0 10px

.seats-wrapper
  display flex
  flex-wrap wrap
  margin -6px
  &__seat
    margin 6px

.seat-total-wrapper
  padding 10px 0
  margin-left 10px
  margin-right 10px
  border-top solid 2px rgba(0, 0, 0, 0.1)
  display flex
  justify-content flex-end
  &__seat-total
    margin 0

@media (min-width 768px)
  .section
    h1
      font-size 16px
      text-align left
    &__seat-total-wrapper
      margin 48px 0 0 0

  .seats
    padding 0

  .seats-wrapper
    margin -20px
    &__seat
      margin 20px

  .seat-total-wrapper
    margin-left 0
    margin-right 0
</style>
