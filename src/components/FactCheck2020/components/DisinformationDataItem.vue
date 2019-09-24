<template>
  <div class="data-item">
    <button
      :class="{ active: showDetailed  }"
      class="data__control"
      alt="查核說明"
      @click="toggleDetailed()"
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
        <p class="small reference" v-if="data.references.length > 0">
          出處：
          <template v-for="item in data.references">
            <a
              v-if="item.url"
              :key="`${data.sentences}-${item.name}`"
              :href="item.url"
              target="_blank"
              v-text="item.name"
            />
            <span
              v-else
              :key="`${data.sentences}-${item.name}`"
              v-text="item.name"
            />
          </template>
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
  },
  methods:{
    toggleDetailed () {
      !this.showDetailed && window.ga && window.ga('send', 'event', 'projects', 'click', '點選「查看更多」', { nonInteraction: false })
      this.showDetailed = !this.showDetailed
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
    display flex
    flex-wrap wrap
    align-items center
    margin-left 5px
    color #9b9b9b
    font-size .875rem
    span
      margin-right .5em

.reference
  > *
    word-break break-all
    & + *
      &:before
        content '、'
  a
    color #9b9b9b
    padding-bottom 1px
    border-bottom 1px solid #9b9b9b

.justify
  text-align justify

@media (min-width: 1024px)
  .data-item
    display flex
    padding 20px
  .data__control
    right 20px
    &:hover
      &::before
        content ''
      &::after
        content '看原文'
    &::before, &::after
      position absolute
      left 50%
      transform translateX(-50%)
    &::before
      top calc(100% + 5px)
      width 0
      height 0
      border-style solid
      border-width 0 3px 5.2px 3px
      border-color transparent transparent rgba(0, 0, 0, .8) transparent
    &::after
      top calc(100% + 10px)
      width 70px
      padding .4em .8em
      color rgba(255, 255, 255, .8)
      font-size .875rem
      background-color rgba(0, 0, 0, .8)
      border-radius 2px
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