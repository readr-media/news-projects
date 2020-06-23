<template>
  <div>
    <template v-if="page === 'chart1'">
      <p>1. 在武漢肺炎的疫情仍在中國境內傳播時，假訊息傳播的速度顯然比較快。READr 分析國際事實查核組織聯盟超過 5000 篇查核報告，帶你看這五個月以來假訊息傳播的趨勢。</p>
      <Chart1></Chart1>
    </template>
    <template v-else-if="page === 'chart2-1'">
      <p>2. 在二月時，主要的假訊息的主題跟「中國」有關。</p>
      <Chart2_1></Chart2_1>
    </template>
    <template v-else-if="page === 'realproject'">
      <ProjectReal></ProjectReal>
    </template>
    <template v-else-if="page === 'chartline'">
      <ChartLine></ChartLine>
    </template>
    <template v-else>
      <Project></Project>
    </template>
  </div>
</template>

<script>
import Chart1 from './exp/Chart1.vue'
import Chart2_1 from './exp/Chart2-1.vue'
import Project from './exp/Project.vue'
import ProjectReal from './ProjectReal.vue'
import ChartLine from './exp/ChartLine.vue'

export default {
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: '',
      metaImage: ''
    }
  },
  components: {
    Chart1,
    Chart2_1,
    Project,
    ProjectReal,
    ChartLine
  },
  computed: {
    page() {
      return this.$route.query.page
    }
  }
}
</script>

<style scoped>

</style>
