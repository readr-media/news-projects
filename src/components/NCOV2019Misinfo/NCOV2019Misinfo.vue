<template>
  <div>
    <ProjectRealEN v-if="$route.params.params === 'en'"></ProjectRealEN>
    <ProjectReal v-else></ProjectReal>
  </div>
</template>

<script>
import ProjectReal from './ProjectReal.vue'
import ProjectRealEN from './en/ProjectReal.vue'

export default {
  metaInfo () {
    const isEn = this.$route.params.params === 'en'
    if (isEn) {
      return {
        title: '5000 Fact-checking Reports Analysis: COVID-19 Disinformation War',
        description: 'READr analyzed over 5000 fact-checking reports, and discovered the danger of "COVID-19 disinformation". We show the trends in the spread of  disinformation in the last 5 months through data visualization.',
        metaUrl: 'covid19-disinformation-vis/en',
        metaImage: 'covid19-disinformation-vis/og.png'
      }
    }
    return {
      title: '五千篇事實查核報告分析：武漢肺炎假訊息戰役',
      description: 'READr 分析國際事實查核組織聯盟超過 5000 篇查核報告，探索「武漢肺炎假訊息」的危害，用視覺化的方式帶你看這 5 個月以來假訊息傳播的趨勢。',
      metaUrl: 'covid19-disinformation-vis',
      metaImage: 'covid19-disinformation-vis/og.png'
    }
  },
  components: {
    ProjectReal,
    ProjectRealEN
  },
}
</script>

<style scoped>

</style>
