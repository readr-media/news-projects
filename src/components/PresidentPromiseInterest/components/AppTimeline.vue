<template>
  <div class="container">
    <section class="timeline">
      <AppTimelineItem
        v-for="item in timelineData"
        class="timeline__item"
        :key="item.description"
        :item="item"
      />
      <div class="timeline__arrow"></div>
    </section>
    <div class="legend">
      <div class="legend__icon"></div>
      <p class="legend__hint">蔡英文政府執政時期</p>
    </div>
  </div>
</template>

<script>
import AppTimelineItem from './AppTimelineItem.vue'

export default {
  props: {
    timelineData: {
      type: Array,
      required: true,
    },
  },
  components: {
    AppTimelineItem,
  },
}
</script>

<style lang="stylus" scoped>
.container
  display flex
  flex-direction column
  align-items flex-end

.timeline
  &__item
    &:nth-last-child(2)
      & >>> .description
        padding 36px 0 23px 0
  &__arrow
    width 0
    height 0
    border-style solid
    border-width 18px 31px 0 31px
    border-color #fa8d62 transparent transparent transparent

.legend
  display flex
  &__icon
    d = 18px
    width d
    height d
    background-color #fa8d62
  &__hint
    margin 0
    font-size 18px
    color #c9c9c9
    margin 0 0 0 14px

@media (max-width 425px)
  .timeline
    &__item
      &:nth-last-child(2)
        & >>> .description
          padding 28px 0 23px 0
    &__arrow
      border-width 13px 22px 0 22px

  .legend
    &__icon
      d = 14px
      width d
      height d
    &__hint
      font-size 14px
      margin 0 0 0 7px
</style>


