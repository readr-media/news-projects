<template>
  <section
    :class="[
      'story',
      `story--${direction}`
    ]"
  >
    <PageStoryPoster
      class="story__wrapper story__img-wrapper"
      :img="img"
    />
    <PageStoryIntro
      :class="[
        'story__wrapper',
        'story__intro-wrapper',
      ]"
      :direction="direction"
      :title="title"
      :description="description"
    />
  </section>
</template>

<script>
import PageStoryPoster from './PageStoryPoster.vue'
import PageStoryIntro from './PageStoryIntro.vue'

export default {
  props: {
    direction: {
      type: String,
      default: 'normal',
      validator (value) {
        return ['normal', 'reverse'].includes(value)
      }
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  },
  components: {
    PageStoryPoster,
    PageStoryIntro
  }
}
</script>

<style lang="stylus" scoped>
.story
  height 100vh
  background-color #000537
  display flex
  max-width 1400px
  margin 0 auto
  &--normal
    flex-direction row
  &--reverse
    flex-direction row-reverse
    & .intro-wrapper
      align-items flex-end
      text-align right
  &__wrapper
    width 50%

@media (max-width 1400px)
  .story
    height 200vh
    &--normal, &--reverse
      flex-direction column
    &__wrapper
      width auto
</style>
