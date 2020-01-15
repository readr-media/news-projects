<template>
  <div
    class="horizontal-scroll-wrapper"
    id="hk-timeline-horizontal-scroll-wrapper"
    :style="{
      height: `${vw}px`
    }"
  >
    <ol class="list">
      <TimelineListItem
        v-for="(item, i) in dataTimeline"
        :key="i"
        class="list__list-item hk-timeline-list-item"
        :h1="getH1(item)"
        :h2="getH2(item)"
        :data-h2="getH2(item)"
        :imgUrl="getImgUrl(item)"
        :imgCaption="getImgCaption(item)"
        @click.native="handleClickListItem(item)"
      />
    </ol>
  </div>
</template>

<script>
import TimelineListItem from './TimelineListItem.vue'
import viewportMixin from '../mixins/viewport'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('HongKongProtests')

export default {
  components: {
    TimelineListItem
  },
  mixins: [
    viewportMixin
  ],
  computed: {
    ...mapState([
      'dataTimeline'
    ])
  },
  methods: {
    getH1(item) {
      return item['時間']
    },
    getH2(item) {
      return item['一二三四五六七八九十（標題）']
    },
    getImgUrl(item) {
      return item['圖片（填 gcs 網址）']
    },
    getImgCaption(item) {
      const content = item['完整內容']
      const hasBreak = content.includes('<br>')
      return hasBreak ? content.split('<br>')[0] : content
    },
    handleClickListItem(item) {
      this.$emit('openLightbox', {
        articleDate: this.getH1(item),
        articleSubtitle: this.getH2(item)
      })
    }
  }
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

@media (max-width 1440px)
  .list
    margin 280px 80px 0 0
    &__list-item
      & + &
        margin-top "calc(-1 * (392px - 280px) + 16px + %s)" % marginListItem

@media (max-width 425px)
  .list
    margin 90vw 0 0 0
    padding-top calc((100vw - 90vw + 16px) / 2)
    &__list-item
      & + &
        margin-top "calc(-1 * (65vh - 50px - 90vw) + 16px + %s)" % marginListItem

@media (max-width 425px) and (min-height 630px)
  .list
    &__list-item
      & + &
        margin-top "calc(-1 * (55vh - 50px - 90vw) + 16px + %s)" % marginListItem
</style>
