<template>
  <article class="covid-article">
    <p>{{ $t('COVID19_D.CHAPTER_1.P_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_3.TEXT_1') }}<a href="https://www.poynter.org/fact-checking/2020/783880/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_3.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_3.TEXT_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_4') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_5.TEXT_1') }}<a href="https://www.poynter.org/fact-checking/2020/the-2019-coronavirus-virus-lands-in-the-u-s-after-killing-17-and-taking-eight-to-prison/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_5.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_5.TEXT_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_6') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_7') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_8') }}</p>
    <p><a href="https://reutersinstitute.politics.ox.ac.uk/risj-review/how-fact-checkers-are-fighting-coronavirus-misinformation-worldwide" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_9.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_9.TEXT_1') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_10.TEXT_1') }}<a href="https://www.poynter.org/ifcn-covid-19-misinformation/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_10.LINK') }}</a>{{ $t('COVID19_D.CHAPTER_1.P_10.TEXT_2') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_11') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_1.P_12.TEXT_1') }}<a href="/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.CHAPTER_1.P_12.LINK') }}</a></p>
    <figure class="covid-article__img">
      <p class="title" v-text="$t('COVID19_D.CHART_1.TITLE')" />
      <picture>
        <source
          media="(min-width: 1024px)"
          srcset="/proj-assets/covid19-disinformation/chart-01-desktop.jpg"
        >
        <img
          src="/proj-assets/covid19-disinformation/chart-01.jpg"
          :alt="$t('COVID19_D.CHART_1.TITLE')"
        >
      </picture>
      <p>
        <strong>{{ $t('COVID19_D.SOURCE') }}</strong>
        <a
          href="https://www.poynter.org/ifcn-covid-19-misinformation/"
          target="_blank"
          rel="noopener noreferrer"
        >The CoronaVirusFacts Alliance Database</a>（2020-01-29~2020-05-12）
      </p>
      <p><strong v-text="$t('COVID19_D.ANNOTATION')" />{{ $t('COVID19_D.CHART_1.ANNOTATION') }}</p>
    </figure>
    <h2>{{ $t('COVID19_D.CHAPTER_2.HEADING') }}</h2>
    <p class="quote">{{ $t('COVID19_D.CHAPTER_2.QUOTE_1') }}</p>
    <p class="quote">{{ $t('COVID19_D.CHAPTER_2.QUOTE_2') }}</p>
    <p class="quote">{{ $t('COVID19_D.CHAPTER_2.QUOTE_3') }}</p>
    <p>{{ $t('COVID19_D.CHAPTER_2.P_1') }}</p>
    <!-- <p>
      {{ $t('COVID19_D.CHAPTER_1.P_6.TEXT_1') }}<ArticleAnnotation
        :text="$t('COVID19_D.CHAPTER_1.P_6.ANNOTATION')"
        :annotationContent="$t('COVID19_D.CHAPTER_1.P_6.ANNOTATION_CONTENT')"
      />{{ $t('COVID19_D.CHAPTER_1.P_6.TEXT_2') }}
    </p> -->
    <div class="info-box">
      <h3>{{ $t('COVID19_D.INFO_BOX.HEADING') }}</h3>
      <ol>
        <li>
          {{ $t('COVID19_D.INFO_BOX.P_1.TEXT_1') }}<a href="https://www.poynter.org/ifcn-covid-19-misinformation/" target="_blank" rel="noopener noreferrer">{{ $t('COVID19_D.INFO_BOX.P_1.LINK') }}</a>{{ $t('COVID19_D.INFO_BOX.P_1.TEXT_2') }}
        </li>
      </ol>
    </div>
  </article>
</template>

<script>
import ArticleAnnotation from './ArticleAnnotation.vue'

export default {
  name: 'TheArticle',
  components: {
    ArticleAnnotation
  }
}
</script>

<style lang="stylus" scoped>
.covid-article
  padding 39px 0 59px
  background-color #f8f8f8
  @media (min-width: 1024px)
    padding 109px 0 54px
  *
    + .info-box
      margin-top 60px
  h2, h3, p
    margin-top 0
  h2
    + p
      margin-top 20px
  p
    margin 0 auto
    text-align justify
    + *
      margin-top 30px
  picture
    margin 0
  > *
    width 280px
    margin-left auto
    margin-right auto
    @media (min-width: 768px)
      width 60%
      max-width 800px
  &__img
    color #4a4a4a
    font-size 15px
    font-weight 300
    line-height normal
    text-align justify
    + h2
      margin-top 60px
    picture
      display block
      img
        display block
        width 100%
      + *
        margin-top 10px
    .title
      font-size 21px
      text-align center
      + *
        margin-top 10px
    p
      + p
        margin-top 1em
.quote
  position relative
  padding-left 38px
  color #000
  font-size 16px
  font-weight 500
  line-height 30px
  &::before
    content ''
    position absolute
    top 6px
    left 0
    display inline-block
    width 30px
    height 30px
    background-image url(/proj-assets/covid19-disinformation/quote-tw.svg)
    background-size 30px 30px
    background-repeat no-repeat
    background-position center center
    @media (min-width: 1024px)
      top 0
.info-box
  h3
    font-size 16px
    font-weight 500
    line-height 1.75
    & + p
      margin-top 6px
  p
    font-size 15px
    line-height 1.6
    + p
      margin-top 30px
</style>
