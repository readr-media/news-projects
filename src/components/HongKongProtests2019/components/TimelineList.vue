<template>
  <div
    class="horizontal-scroll-wrapper"
    :style="{
      height: `${vw}px`
    }"
  >
    <ol class="list">
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
      <TimelineListItem
        class="list__list-item"
        @click.native="$emit('openLightbox')"
      />
    </ol>
  </div>
</template>

<script>
import TimelineListItem from './TimelineListItem.vue'
import viewportMixin from '../mixins/viewport'

export default {
  components: {
    TimelineListItem
  },
  mixins: [
    viewportMixin
  ]
}
</script>

<style lang="stylus" scoped>
::-webkit-scrollbar
  width 0
  height 0

::-webkit-scrollbar-button
  width 0
  height 0

.horizontal-scroll-wrapper
  position fixed
  top 0
  left 0
  width 100vh
  // height 100vw
  overflow-y auto
  overflow-x hidden
  transform rotate(-90deg) translateY(-100vh)
  transform-origin right top
  display flex
  justify-content center

marginList = 16px
marginListItem = 16px
.list
  list-style none
  margin 400px 0 0 0
  padding-top "calc(16px + %s)" % marginList
  &__list-item
    transform rotate(90deg)
    transform-origin right top
    & + &
      margin-top "calc(-1 * (560px - 400px) + 16px + %s)" % marginListItem

@media (max-width 768px)
  .list
    margin 90vw 0 0 0
    padding-top calc((100vw - 90vw + 16px) / 2)
    &__list-item
      & + &
        margin-top "calc(-1 * (70vh - 90vw) + 16px + %s)" % marginListItem
</style>
