<template>
  <li class="list-item">
    <div class="list-item__title-box title-box">
      <div class="title-box__title-texts title-texts">
        <h1 v-text="h1" />
        <h2 v-text="h2" />
      </div>
      <div class="title-box__arrow arrow" />
    </div>
    <figure class="figure">
      <img
        class="figure__img"
        :src="imgUrl"
        alt=""
      >
      <figcaption
        class="figure__figcapiton"
        v-text="imgCaption"
      />
    </figure>
  </li>
</template>

<script>
export default {
  props: {
    h1: {
      type: String,
      required: true
    },
    h2: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    imgCaption: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  // min-width 400px
  // min-height 560px
  width 400px
  height 560px
  background-color black
  box-shadow -16px 16px 0px 0px rgba(74,74,74,1)
  position relative
  cursor pointer
  &__title-box
    position absolute
    left -16px
    bottom 30%

.title-box
  width 276px
  height 118px
  border-radius 4px
  background-color #d20640
  padding 14px
  display flex
  align-items center
  justify-content space-between
  &__title-texts
    height 100%
  &__arrow
    position relative
    right 10px

.title-texts
  display flex
  flex-direction column
  justify-content space-between
  h1
    margin 0
    line-height 1
    font-size 58px
    color white
  h2
    margin 0
    line-height 1
    font-size 21px
    color white

.arrow
  d = 40px
  width d
  height d
  border-right 10px solid white
  border-bottom 10px solid white
  transform rotate(-45deg)

.figure
  margin 0
  height 100%
  color white
  display flex
  flex-direction column
  &__img
    min-width 100%
    // min-height 400px
    min-height 70%
    background-color black
    border none
  &__figcapiton
    // height 140px
    height 30%
    padding 11px 19px
    font-size 15px
    line-height 1.73
    text-align justify
    word-wrap break-word
    -webkit-line-clamp 5
    display -webkit-box
    -webkit-box-orient vertical
    overflow hidden

@media (max-width 768px)
  .list-item
    width 90vw
    height 70vh

  .title-box
    width 87%
    height 22%
</style>