<template>
  <div class="step-block">
    <p v-text="indexText"></p>
    <div class="step-block__container">
      <div class="step-block__text">
        <h3 v-text="contentText"></h3>
        <p
          v-if="additionalText"
          class="small"
          v-html="additionalText"
        />
        <p
          v-if="progress"
          class="progress"
        >
          目前進度
          <span class="highlight" v-text="progress"></span>
        </p>
      </div>
      <img v-lazy="imgSrc" :alt="contentText">
    </div>
    <template>
      <a
        v-if="link && linkText"
        :href="link"
        class="step-block__link"
        target="_blank"
        v-text="linkText"
        @click="handleClick"
      />
      <p
        v-else-if="!link && linkText"
        class="step-block__link empty"
        v-text="linkText"
      />
    </template>
    
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
    },
    progress: {
      type: String
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
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
      >>> br
        line-height 2
  &__container
    display flex
    align-items flex-start
    margin-top 20px
    img
      width 55px
      margin-left 25px
  &__text
    flex 1
    h3
      line-height 1.5
    * 
      & + p
        margin-top .5em
  &__link
    display block
    display flex
    justify-content center
    align-items center
    padding 15px 0
    margin-top 15px
    color #fff
    font-size 1.25rem
    text-align center
    text-decoration none
    background-color #e56300
    border-radius 6px
    &.empty
      color #a04500
      background-color #f4c099

  .progress
    color #9b9b9b
    .highlight
      margin-left .2em
      color #f6b721
      font-size 1.25rem
@media (min-width: 768px)
  .step-block
    padding 20px
    &__text
      max-width 320px

@media (min-width: 1024px)
  .step-block
    &__container
      img
        width 85px
        margin 0 auto
    .progress
      .highlight
        font-size 1.75rem

</style>
