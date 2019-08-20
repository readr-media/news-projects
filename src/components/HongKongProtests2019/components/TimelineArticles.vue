<template>
  <section class="articles">
    <TimelineArticle
      v-for="(item, i) in dataTimeline"
      :key="i"
      class="articles__article"
      :id="`article-${getId(item)}`"
      :h1="getH1(item)"
      :h2="getH2(item)"
      :imgUrl="getImgUrl(item)"
      :description="getDescription(item)"
    />
  </section>
</template>

<script>
import TimelineArticle from './TimelineArticle.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('HongKongProtests')

export default {
  components: {
    TimelineArticle
  },
  computed: {
    ...mapState([
      'dataTimeline'
    ])
  },
  methods: {
    getId(item) {
      return this.getH1(item).replace(/\./g, '')
    },
    getH1(item) {
      return item['時間']
    },
    getH2(item) {
      return item['一二三四五六七八九十（標題）']
    },
    getImgUrl(item) {
      return item['圖片（填 gcs 網址）']
    },
    getDescription(item) {
      return item['完整內容']
    }
  }
}
</script>

<style lang="stylus" scoped>
.articles
  width 640px
  padding 43px 0
  &__article
    & + &
      margin 130px 0 0 0

@media (max-width 1024px)
  .articles
    width 100%
    padding-top calc(43px + 40px)
    &__article
      & + &
        margin 43px 0 0 0
</style>