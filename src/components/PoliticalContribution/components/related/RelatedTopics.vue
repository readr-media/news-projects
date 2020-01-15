<template>
  <section class="related-topics">
    <h1 class="related-topics__title">相關討論</h1>
    <div class="cards">
      <div class="cards__column" v-for="(column, i) in RELATED_TOPICS" :key="i">
        <RelatedTopicsCard
          v-for="relatedTopic in column"
          :key="relatedTopic.meta.title"
          :href="relatedTopic.href"
          :imgsrc="relatedTopic.imgsrc"
          :meta="relatedTopic.meta"
        />
      </div>
    </div>
  </section>
</template>

<script>
import RelatedTopicsCard from './RelatedTopicsCard.vue'
import { RELATED_TOPICS, } from '../../constants'

export default {
  components: {
    RelatedTopicsCard,
  },
  data () {
    return {
      RELATED_TOPICS,
    }
  },
}
</script>

<style lang="stylus" scoped>
.related-topics
  width 70%
  margin auto
  &__title
    margin 20px 10px

.cards
  display flex
  flex-direction row
  justify-content flex-start
  align-items flex-start
  &__column
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
    width 90%
    // padding 50px
    margin 0 5px

@media (max-width 1024px)
  .related-topics
    width 90%
    height 100vh
    overflow-y scroll
    -webkit-overflow-scrolling touch
    padding 0 0 70px 0
    &__title
      margin 20px 15px

  .cards
    flex-direction column
    align-items center
    &__column
      width 100%
</style>

