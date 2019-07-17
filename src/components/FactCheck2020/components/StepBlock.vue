<template>
  <div class="step-block">
    <p v-text="indexText"></p>
    <div class="step-block__content">
      <h3 v-text="contentText"></h3>
      <img v-lazy="imgSrc" :alt="contentText">
    </div>
    <p
      v-if="additionalText"
      class="small"
      v-text="additionalText"
    />
    <a
      v-if="link && linkText"
      :href="link"
      class="step-block__link"
      target="_blank"
      v-text="linkText"
      @click="$emit('click')"
    />
  </div>
</template>
<script>
export default {
  name: 'StepBlock',
  props: {
    additionalText: {
      type: String
    },
    contentText: {
      type: String
    },
    imgSrc: {
      type: String
    },
    indexText: {
      type: String
    },
    link: {
      type: String
    },
    linkText: {
      type: String
    }
  }

}
</script>
<style lang="stylus" scoped>
.step-block
  padding 10px 20px
  background-color rgba(255, 255, 255, .1)
  p
    text-align justify
    &.small
      margin-top 15px
      color #9b9b9b
      line-height 1.43
  &__content
    display flex
    align-items flex-start
    margin-top 20px
    h3
      flex 1
      line-height 1.5
    img
      width 55px
      margin-left 25px
  &__link
    display block
    padding 15px 0
    margin-top 15px
    color #fff
    font-size 1.25rem
    text-align center
    text-decoration none
    background-color #e56300
    border-radius 6px

@media (min-width: 768px)
  .step-block
    padding 20px
  
</style>
