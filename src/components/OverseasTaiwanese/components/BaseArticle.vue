<template>
  <article class="base-article">
    <slot></slot>
    <!-- <h2>
      <slot name="title"></slot>
    </h2>
    <div class="article__intro">
      <slot name="intro"></slot>
    </div>
    <h3>
      <slot name="subtitle"></slot>
    </h3>
    <div class="article__content">
      <slot name="content"></slot>
    </div> -->
  </article>
</template>

<script>
export default {
  name: 'BaseArticle'
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.base-article
  max-width 800px
  font-size 1.4rem
  line-height 1.8
  margin-right auto
  margin-left auto
  // padding 24px 15px 32px 15px
  // padding 24px 15px
  padding 30px 15px
  @media (min-width $tab-breakpoint)
    font-size 2.0rem
    padding 60px 30px
  @media (min-width 860px)
    padding-right 0
    padding-left 0
  & h2
    font-size 2.4rem
    font-weight 300
    // margin-bottom 15px
    line-height 1.4
    @media (min-width $tab-breakpoint)
      font-size 4.0rem
  & h3
    font-size 1.8rem
    margin-top 20px
    margin-bottom 20px
    line-height 1.6
    @media (min-width $tab-breakpoint)
      font-size 3.0rem
      margin-top 35px
      margin-bottom 35px
  & a
    color #4f7e7a
  & p + p
    margin-top 20px
    @media (min-width $tab-breakpoint)
      margin-top 35px
</style>