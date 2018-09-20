<template>
  <ol class="timeline-list">
    <SectionContentStorysTimelineItem
      v-for="event in events"
      :key="event.date"
      :event="event"
    />
    <div class="timeline-list__arrow"></div>
  </ol>
</template>

<script>
import SectionContentStorysTimelineItem from './SectionContentStorysTimelineItem.vue'

export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  components: {
    SectionContentStorysTimelineItem,
  },
}
</script>

<style lang="stylus" scoped>
.timeline-list
  list-style none 
  margin 0
  padding 0 0 40px 0
  position relative
  &__arrow
    width 0
    height 0
    border-style solid
    border-width 31px 14px 0 14px
    border-color #2fd8ba transparent transparent transparent
    position absolute
    left -13px
    bottom 30px

@media (max-width 1024px)
  .timeline-list
    padding 0 0 40px calc(45px / 2)
    &__arrow
      left calc(-13px + (45px / 2))
</style>

