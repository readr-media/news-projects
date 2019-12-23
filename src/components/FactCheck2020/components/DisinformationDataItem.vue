<template>
  <div class="data-item">
    <button
      :class="{ active: showDetailed  }"
      class="data__control"
      alt="查核說明"
      @click="toggleDetailed()"
    />
    <div class="data__image-container">
      <div class="data__image">
        <img :src="candidateImage" :alt="data.candidate">
      </div>
      <img
        v-if="resultImage"
        :src="resultImage"
        :alt="resultText"
        class="data__result-image"
      >
      <p v-text="resultText" />
    </div>
    <div class="data__content">
      <h3
        class="justify"
        v-text="data.sentences"
      />
      <div
        v-show="showDetailed"
        class="data__detailed"
      >
        <p class="description" v-html="data.description" />
        <p v-if="data.references.length > 0" class="small reference">
          參考資料：
          <template v-for="(item, i) in data.references">
            <span
              v-if="i > 0 && i < data.references.length"
              :key="`${data.sentences}-${item.name}-${i}-separator`"
            >
              、
            </span>
            <a
              v-if="item.url"
              :key="`${data.sentences}-${item.name}-${i}-a`"
              :href="item.url"
              target="_blank"
              v-text="item.name"
            />
            <span
              v-else
              :key="`${data.sentences}-${item.name}-${i}-span`"
              v-text="item.name"
            />
          </template>
        </p>
        <p class="small typescript">原文：{{ data.typescript }}</p>
        <p class="small typescript-source">出處：<a :href="data.typescriptSource" target="_blank" >發言影片</a></p>
      </div>
      <div class="data__info">
        <div>
          <div class="data__authenticity">
            <img
              v-if="resultImage"
              :src="resultImage"
              :alt="resultText"
            >
            <p v-text="resultText" />
          </div>
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
        <button
          v-if="hasOpinion"
          :class="{ open: showOpinion }"
          class="btn-opinion"
          @click="showOpinion = !showOpinion"
        >
          其他看法
        </button>
        <a
          v-if="!hasOpinion"
          :href="getErrorReportLink()"
          class="feedback"
          target="_blank"
        >
          我要回報
        </a>
      </div>
      
      <div
        v-if="hasOpinion"
        v-show="showOpinion"
        :class="{ open: showOpinion }"
        class="opinion"
      >
        <p class="heading">網友回報</p>
        <div>
          <div
            v-for="item in opinions"
            :key="`opinion-${item.description}`"
            class="opinion__item"
          >
            <p v-text="item.authenticity" />
            <p v-text="item.description" />
          </div>
        </div>
        <a
          v-if="data.opinionCount > 3"
          href="https://docs.google.com/spreadsheets/d/1jGKhvooG95B5x3dnwWN_fQwrT40-c0dWgb7Gxoe4idM/edit#gid=0"
          target="_blank"
        >
          看更多
        </a>
        <template v-if="data.showOpinion">
          <p class="heading">媒體回覆</p>
          <p v-text="data.mediaResponse"></p>
        </template>
        <a
          :href="getErrorReportLink()"
          class="feedback"
          target="_blank"
        >
          我要回報
        </a>
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
      showDetailed: false,
      showOpinion: false
    }
  },
  computed: {
    candidateImage () {
      const list = {
        '蔡英文': '/proj-assets/fact-check/tsai.png',
        '韓國瑜': '/proj-assets/fact-check/han.png',
        '宋楚瑜': '/proj-assets/fact-check/soong.png'
      }
      return list[this.data.candidate]
    },
    opinions () {
      return this.data.opinions
        .filter(opinion => (opinion && opinion !== '#N/A' ))
        .map(opinion => ({
          authenticity: (opinion.split('||')[0] || '').replace('應更正為：', '').trim(),
          description: (opinion.split('||')[1] || '').trim()
        }))
    },
    resultImage () {
      const list = {
        '片面事實': '/proj-assets/fact-check/controversial.png',
        '含有錯誤訊息': '/proj-assets/fact-check/wrong.png',
        '真實': '/proj-assets/fact-check/real.png',
        '不屬於查核範圍': '/proj-assets/fact-check/not_belong_to_scope.png'
      }
      return list[this.data.result]
    },
    resultText () {
      const mapping = {
        '真實': '正確'
      }
      return mapping[this.data.result] || this.data.result
    },
    hasOpinion () {
      return this.opinions.length > 0
    }
  },
  methods:{
    getErrorReportLink () {
      return `https://docs.google.com/forms/d/e/1FAIpQLSdW5VSIp4tZySW9lLgqO9rSl6AChQ3Odg-90apO-K6vFOTn-w/viewform?usp=pp_url&entry.295882445=${this.data.candidate}&entry.1734633711=${this.data.sentences}`
    },
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
  padding 15px 0 0
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
  &__image-container
    display flex
    align-items center
    width calc(100% - 30px)
    margin-left auto
    margin-right auto
    p
      font-size .875rem
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
    & + *
      margin-left 10px
    img
      position absolute
      left 2.5px
      bottom 0
      width 30px
      height 30px
      object-fit contain
      object-position center center
  &__result-image
    width 30px
    height 30px
    object-fit contain
    object-position center center
  &__content
    margin-top 5px
    line-height 1.4
    word-break break-word
    > *
      width calc(100% - 30px)
      margin-left auto
      margin-right auto
      & + *
        margin-top 10px
    
    .btn-opinion
      width 100%
      height 45px
      margin-top 5px
      color #fff
      font-size .875rem
      background-color rgba(255, 255, 255, .1)
      border-radius 1px
      &::after
        content ''
        display inline-block
        width 20px
        height 20px
        margin-left 4px
        vertical-align text-bottom
        background-image url(/proj-assets/fact-check/dropdown.png)
        background-size 60%
        background-repeat no-repeat
        background-position center center
        transition transform .5s
      &.open
        &::after
          transform rotate(-180deg)

    .opinion
      position relative
      width auto
      padding 5px 0 15px 0
      margin 0
      text-align right
      background-color rgba(255, 255, 255, .1)
      border-radius 1px
      > *
        & + *
          margin-top 15px
        & + p.heading
          margin-top 25px
      > p
        width calc(100% - 30px)
        margin-left auto
        margin-right auto
        font-size .875rem
        text-align justify
        &.heading
          font-size 1rem
      > a
        display inline-block
        margin-right 15px
        font-size .875rem
        text-decoration underline
        & + p.heading
          margin-top 25px
      .feedback
        margin 0
      
      &__item
        display flex
        align-items flex-start
        padding 5px 15px 5px 5px
        border-top 1px solid #979797
        &:last-child
          border-bottom 1px solid #979797
        > p
          font-size .875rem
        > p:first-of-type
          width 55px
          margin-right 5px
          text-align center
        > p:last-of-type
          flex 1
          text-align justify
          line-height 1.57
          word-break break-all
  &__detailed
    display flex
    flex-direction column
    align-items flex-start
    color #9b9b9b
    p, a
      word-break break-all
    p
      &:first-child
        text-align justify
    a
      color #9b9b9b
      border-bottom 1px solid #9b9b9b
    .description
      color #fff
    .reference
      align-self flex-end
      color #fff
      margin-top 5px
      a
        color #fff
        border-bottom-color #fff
    .typescript
      margin-top 10px
      padding-top 10px
    .typescript-source
      align-self flex-end
      margin-top 2px
      font-size .875rem
      text-align right

  &__typescript
    text-align justify
  &__info
    position relative
    display flex
    flex-direction column
    width auto
    margin-top 20px
    > div
      width calc(100% - 30px)
      margin 0 auto 15px
    .feedback
      top auto
      bottom 15px
      font-size .875rem
      text-decoration underline
  &__authenticity
    height 35px
    img
      width 35px
      height 35px
      object-fit contain
      object-position center center
  &__tags-date
    display flex
    flex-wrap wrap
    align-items center
    padding-right 70px
    color #9b9b9b
    font-size .875rem
    span
      margin-right .5em

.justify
  text-align justify
.feedback
  position absolute
  top 8px
  right 15px
  color #9b9b9b

@media (max-width: 1023px)
  .data__info
    .data__authenticity
      display none

@media (min-width: 1024px)
  .data-item
    display flex
    padding 20px
    align-items flex-start
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
  .data__image-container
    width auto
    margin-top 4px
    p
      display none
  .data__image
    width 85px
    height 85px
    img
      width 80px
      height 80px
  .data__result-image
    display none
  .data__content
    flex 1
    margin-top 0
    margin-left 30px
    > *
      width auto
    > h3
      padding-right 40px

    .btn-opinion
      display inline-block
      width auto
      height auto
      margin 0
      background-color transparent
    .opinion
      padding 20px 0
      margin-top 20px
      > div
        width calc(100% - 30px)
        margin-left auto
        margin-right auto
      > a:last-of-type
        margin-bottom 0
    .opinion__item
      > p:first-of-type
        width 110px
      
  .data__info
    flex-direction row
    flex-wrap nowrap
    align-items flex-end
    > div
      width auto
      margin 0 auto 0 0
    .feedback
      bottom 1px
  .data__authenticity
    position relative
    left -6px 
    width 100%
    p
      display inline
      line-height 35px
      vertical-align top
  .data__tags-date
    padding-right 110px
  .feedback
    top 23px
  
</style>