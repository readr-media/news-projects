<template>
  <li class="timeline-list-item">
    <SectionContentStorysTimelineItemHeader
      :isByGovernment="event.isByGovernment"
      :date="event.date"
    />
    <div class="timeline-list-item__content">
      <p v-html="event.title"></p>
      <ul v-if="hasListItems" class="event-list">
        <li
          v-for="(item, i) in event.listItems"
          :key="i"
          class="event-list-item"
        >
          <a
            v-if="isLinkTypeOpenRelatedLightbox(item)"
            v-text="getListItemContent(item)"
            @click="openLightboxRelatedTopics"
            style="text-decoration: underline; cursor: pointer"
          >
          </a>
          <span
            v-else
            v-html="getListItemContent(item)"
          >
          </span>
          <img 
            v-if="isLinkTypeData(item)"
            class="event-list-item__data-icon"
            src="/proj-assets/political-contribution/attachment-g.png"
            alt=""
          >
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
import { get, } from 'lodash'
import SectionContentStorysTimelineItemHeader from './SectionContentStorysTimelineItemHeader.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapMutations, } = createNamespacedHelpers('PoliticalContribution')

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  components: {
    SectionContentStorysTimelineItemHeader,
  },
  computed: {
    hasListItems () {
      return 'listItems' in this.event
    },
  },
  methods: {
    ...mapMutations({
      openLightboxRelatedTopics: 'OPEN_LIGHTBOX_RELATEDTOPICS',
    }),
    getListItemContent (listItem) {
      return typeof listItem === 'string' ? listItem : listItem.content
    },
    isLinkTypeData (listItem) {
      return get(listItem, 'linkType', '') === 'data'
    },
    isLinkTypeOpenRelatedLightbox (listItem) {
      return get(listItem, 'linkType', '') === 'openRelatedLightbox'
    },
  }
}
</script>

<style lang="stylus" scoped>
.timeline-list-item
  &__content
    font-size 19px
    line-height 1.5
    padding 38px 58px
    border-left 3px dashed #2fd8ba
    & > p
      margin 0
    & >>> a
      color #9e005d
      font-weight 600

.event-list
  list-style-type disc
  margin 0
  padding 0 0 0 20px

.event-list-item
  &__data-icon
    width 30px
    margin 0 0 0 10px

@media (max-width 1024px)
  .timeline-list-item
    &__content
      font-size 22px
      padding 26px 0 26px 18px
      text-align justify
      & > p
        font-weight 600
</style>

