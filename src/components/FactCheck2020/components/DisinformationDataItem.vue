<template>
  <div class="data-item">
    <button
      :class="{ active: showDetailed  }"
      class="data__control"
      alt="查核說明"
      @click="showDetailed = !showDetailed"
    />
    <div class="data__image">
      <img :src="candidateImage" :alt="data.candidate">
    </div>
    <div class="data__content">
      <h3
        class="justify"
        v-text="data.typescript"
      />
      <div
        v-show="showDetailed"
        class="data__detailed"
      >
        <p
          class="small"
          v-html="data.description"
        />
        <p class="small">
          出處：{{ data.reference }}
        </p>
      </div>
      <div class="data__info">
        <img
          v-if="resultImage"
          :src="resultImage"
          :alt="data.result"
          class="data__authenticity"
        >
        <div class="data__tags-date">
          <span
            v-if="data.tags"
            v-text="data.tags"
          />
          <span
            v-if="data.date && data.date !== '#N/A'"
            v-text="data.date"
          />
          <span v-if="data.media">
            主責媒體：{{ data.media }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DisinformationDataItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDetailed: false
    }
  },
  computed: {
    candidateImage () {
      const list = {
        '蔡英文': '/proj-assets/fact-check/tsai.png',
        '韓國瑜': '/proj-assets/fact-check/han.png'
      }
      return list[this.data.candidate]
    },
    resultImage () {
      const list = {
        '片面事實': '/proj-assets/fact-check/controversial.png',
        '含有錯誤訊息': '/proj-assets/fact-check/wrong.png',
        '真實': '/proj-assets/fact-check/real.png'
      }
      return list[this.data.result]
    }
  }
}
</script>
<style lang="stylus" scoped>

.data-item
  position relative
  padding 15px
  background-color rgba(255, 255, 255, .1)
  border-radius 4px

.data
  &__control
    position absolute
    top 22.5px
    right 15px
    width 20px
    height 20px
    padding 0
    background-image url(/proj-assets/fact-check/read_default.png)
    background-repeat no-repeat
    background-size contain
    background-position center center
    cursor pointer
    &.active
      background-image url(/proj-assets/fact-check/read_pressed.png)
  &__image
    position relative
    width 35px
    height 35px
    background-color #9b9b9b
    background-repeat no-repeat
    background-size 30px 30px
    background-position center bottom
    border-radius 50%
    overflow hidden
    img
      position absolute
      left 2.5px
      bottom 0
      width 30px
      height 30px
      object-fit contain
      object-position center center
  &__content
    margin-top 5px
    line-height 1.4
    word-break break-word
    > *
      & + *
        margin-top 10px

  &__detailed
    color #9b9b9b
    p
      &:first-child
        text-align justify
      & + p
        margin-top 2px
        
  &__typescript
    text-align justify
  &__info
    display flex 
  &__authenticity
    width 35px
    height 35px
    object-fit contain
    object-position center center
  &__tags-date
    margin-left 5px
    color #9b9b9b
    font-size .875rem
    span
      & + span
        margin-left 1em
.justify
  text-align justify

@media (min-width: 1024px)
  .data-item
    display flex
    padding 20px
  .data__control
    right 20px
  .data__image
    width 85px
    height 85px
    img
      width 80px
      height 80px
  .data__content
    flex 1
    margin-top 0
    margin-left 30px
    > h3
      padding-right 40px
    
</style>