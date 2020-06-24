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
    <h2>{{ $t('COVID19_D.CHAPTER_2.HEADING') }}</h2>
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
    text-align justify
    + *
      margin-top 30px
  > *
    width 280px
    margin-left auto
    margin-right auto
    @media (min-width: 768px)
      width 60%
      max-width 800px
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
