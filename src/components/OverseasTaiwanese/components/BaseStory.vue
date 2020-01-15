<template>
  <article class="base-story">
    <h3>
      <slot name="title"></slot>
    </h3>
    <div class="base-story__intro">
      <slot name="intro"></slot>
    </div>
    <div class="base-story__content">
      <slot name="content"></slot>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BaseStory'
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.base-story
  &__intro
    font-weight 500
    padding-top 15px
    padding-bottom 15px
    border-top 1px solid #979797
    border-bottom 1px solid #979797
    margin-top 25px
    margin-bottom 25px
    @media (min-width $tab-breakpoint)
      padding-top 20px
      padding-bottom 20px
      margin-top 35px
      margin-bottom 35px
  & p + p
    margin-top 20px
    @media (min-width $tab-breakpoint)
      margin-top 36px
</style>