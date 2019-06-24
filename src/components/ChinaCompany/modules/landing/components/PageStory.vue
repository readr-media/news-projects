<template>
  <section
    :class="[
      'story',
      `story--${direction}`
    ]"
  >
    <main class="story__wrapper story__img-wrapper img-wrapper">
      <picture>
        <source
          :srcset="`/proj-assets/china-company/${img}-mobile.png`"
          media="(max-width: 1400px)"
        >
        <img
          class="img-wrapper__img"
          :src="`/proj-assets/china-company/${img}-web.png`"
          alt=""
        >
      </picture>
    </main>
    <aside
      :class="[
        'story__wrapper',
        'story__intro-wrapper',
        'intro-wrapper',
        `intro-wrapper--${direction}`
      ]"
    >
      <h1
        class="intro-wrapper__title"
        v-text="title"
      />
      <p
        class="intro-wrapper__description"
        v-html="description"
      />
    </aside>
  </section>
</template>

<script>
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

.img-wrapper
  &__img
    width 100%
    height 100%
    object-fit contain

.intro-wrapper
  display flex
  flex-direction column
  justify-content center
  &--normal
    padding 98px 0 98px 98px
  &--reverse
    padding 98px 98px 98px 0
  &__title
    font-size 120px
    font-weight 500
    color #dd3c2d
    margin 0
  &__description
    font-size 40px
    color white
    line-height 1.5
    margin 35px 0 0 0

@media (max-width 1400px)
  .story
    height 200vh
    &--normal, &--reverse
      flex-direction column
    &__wrapper
      width auto

  .img-wrapper
    &__img
      height 100vh

  .intro-wrapper
    display flex
    flex-direction column
    justify-content center
    align-items center !important
    padding 33px
    text-align left !important
    height 100vh
    &__title
      font-size 60px
    &__description
      font-size 20px
      margin 35px 0 0 0
      & >>> br
        display none
</style>
