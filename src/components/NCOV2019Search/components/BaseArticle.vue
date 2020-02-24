<template>
  <article class="article">
    <h1
      class="article__title"
      v-text="title"
    />
    <div class="article__article-content article-content">
      <div
        class="article-content__less"
        v-html="articleContentPrefix"
      />
      <transition name="slide-fade">
        <div
          v-show="showArticleContentFull"
          class="article-content__full"
          v-html="articleContentPostfix"
        />
      </transition>
      <BaseButtonReadmore
        v-if="hasHr"
        class="article-content__read-more"
        :is-toggled="isReadmoreToggled"
        @click.native="handleReadmore"
      />
    </div>
    <div
      v-if="showRelatedLink"
      class="article__related-link related-link"
    >
      <span
        class="related-link__wording"
        v-text="wordingRelatedLink"
      />
      <a
        :class="[
          'related-link__link',
          { 'related-link__link--visited': isRelatedLinkVisited }
        ]"
        :href="relatedLinkHref"
        target="_blank"
        rel="noopener noreferrer"
        v-text="relatedLinkText"
        @click="handleRelatedLinkClick"
      />
    </div>
    <div
      :class="[
        'article__meta',
        'meta',
        { 'meta--flex-end': !showKeywords }
      ]"
    >
      <div
        v-if="showKeywords"
        class="meta__keywords keywords"
      >
        <BaseTag
          class="keywords__keyword"
          v-for="keyword in keywords"
          :key="keyword"
          :text="keyword"
          :to="`/project/ncov2019search/${keyword}`"
        />
      </div>
      <span
        v-if="showDate"
        class="meta__date"
        v-text="dateFormatted"
      />
    </div>
  </article>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'

import BaseButtonReadmore from './BaseButtonReadmore.vue'
import BaseTag from '../components/BaseTag.vue'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    articleContent: {
      type: String,
      default: ''
    },
    relatedLinkText: {
      type: String,
      default: ''
    },
    relatedLinkHref: {
      type: String,
      default: ''
    },
    keywords: {
      type: Array,
      default: () => []
    },
    date: {
      type: String,
      default: ''
    }
  },
  components: {
    BaseButtonReadmore,
    BaseTag
  },
  data() {
    return {
      isReadmoreToggled: false,
      wordingRelatedLink: '延伸閱讀：',
      isRelatedLinkVisited: false
    }
  },
  computed: {
    showRelatedLink() {
      return this.relatedLinkText && this.relatedLinkText !== ''
    },
    showKeywords() {
      return _.get(this.keywords, 'length', 0)
    },
    showDate() {
      return this.date !== ''
    },

    hrPosition() {
      return this.articleContent.search('<hr>')
    },
    hasHr() {
      return this.hrPosition !== -1
    },
    showArticleContentFull() {
      return this.hasHr && this.isReadmoreToggled
    },
    articleContentPrefix() {
      if (this.hasHr) {
        return _.get(this.articleContent.split('<hr>'), 0, '')
      } else {
        return this.articleContent.replace('<hr>', '')
      }
    },
    articleContentPostfix() {
      if (this.hasHr) {
        return _.get(this.articleContent.split('<hr>'), 1, '')
      } else {
        return ''
      }
    },

    dateFormatted() {
      return dayjs(this.date).format('YYYY/MM/DD HH:mm')
    }
  },
  methods: {
    handleRelatedLinkClick() {
      this.isRelatedLinkVisited = true
    },
    handleReadmore() {
      this.isReadmoreToggled = !this.isReadmoreToggled
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

.article-content
  font-size 15px
  color rgba(0, 0, 0, 0.87)
  line-height 1.87
  margin 18px 0 0 0
  & >>> p
    margin 0
  & >>> p + p
    margin 18px 0 0 0
  & >>> a
    color #429057
    font-weight 600
    text-decoration none
    &:hover
      text-decoration underline
  & >>> img
    width 100%
    object-fix contain
  &__read-more
    margin 20px 0 0 0

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

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
  &--flex-end
    justify-content flex-end
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
