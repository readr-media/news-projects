<template>
  <div>
    <ProjectReal></ProjectReal>
  </div>
</template>

<script>
import ProjectReal from './ProjectReal.vue'

export default {
  metaInfo () {
    return {
      title: '五千篇事實查核報告分析：武漢肺炎假訊息戰役',
      description: 'READr 分析國際事實查核組織聯盟超過 5000 篇查核報告，探索「武漢肺炎假訊息」的危害，用視覺化的方式帶你看這 5 個月以來假訊息傳播的趨勢。',
      metaUrl: 'ncov2019misinfo',
      metaImage: 'ncov2019misinfo/og.png'
    }
  },
  components: {
    ProjectReal,
  },
}
</script>

<style scoped>

</style>
