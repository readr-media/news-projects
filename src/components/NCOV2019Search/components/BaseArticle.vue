<template>
  <article class="article">
    <h1
      class="article__title"
      v-text="'買買買'"
    />
    <div class="article__related-link related-link">
      <span
        class="related-link__wording"
        v-text="wordingRelatedLink"
      />
      <a
        :class="[
          'related-link__link',
          { 'related-link__link--visited': isRelatedLinkVisited }
        ]"
        href="http://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
        v-text="'報導標題報導標題報導標題報導標題報導標題報導標題'"
        @click="handleRelatedLinkClick"
      />
    </div>
    <div class="article__meta meta">
      <div class="meta__keywords keywords">
        <BaseTag
          class="keywords__keyword"
          v-for="keyword in [ '酒精', '這是', '測試', '關鍵字', '123', '456', '768', '09090999', '這裏', '那裡', 'lakdfjaksdjlaskdj' ]"
          :key="keyword"
          :text="keyword"
          :to="`/project/ncov2019search/${keyword}`"
        />
      </div>
      <span
        class="meta__date"
        v-text="'2020/02/02 21:21'"
      />
    </div>
  </article>
</template>

<script>
import BaseTag from '../components/BaseTag.vue'

export default {
  components: {
    BaseTag
  },
  data() {
    return {
      wordingRelatedLink: '延伸閱讀：',
      isRelatedLinkVisited: false
    }
  },
  methods: {
    handleRelatedLinkClick() {
      this.isRelatedLinkVisited = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.article
  padding 23px
  background-color white
  color rgba(0, 0, 0, 0.87)
  &__title
    margin 0
    font-size 21px
    font-weight 600
    color currentColor
  &__related-link
    margin 18px 0 0 0
  &__meta
    margin 23px 0 0 0

.related-link
  color currentColor
  font-size 13px
  &__link
    color #429057
    font-weight 600
    text-decoration none
    &:hover
      text-decoration underline
    &--visited
      text-decoration underline
      color rgba(0, 0, 0, 0.61)

.meta
  display flex
  justify-content space-between
  align-items flex-end
  &__date
    font-size 13px
    color rgba(0, 0, 0, 0.66)
    min-width max-content

.keywords
  display flex
  flex-wrap wrap
  margin -5px 23px 0 -5px
  &__keyword
    margin 5px
</style>
