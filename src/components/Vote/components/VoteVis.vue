<template>
  <section class="vis">
    <div class="vis__buttons buttons">
      <VoteVisButton class="buttons__button" :isActive="view === 1" :text="'議員年資比一比'" @click.native="clickFilter(1)" />
      <VoteVisButton class="buttons__button" :isActive="view === 2" :text="'直系親屬議員年資'" @click.native="clickFilter(2)" />
      <VoteVisButton class="buttons__button" :isActive="view === 3" :text="'旁系親屬議員年資'" @click.native="clickFilter(3)" />
      <VoteVisButton class="buttons__button" :isActive="view === 4" :text="'議員政治世家縣市比一比(WIP)'"/>
      <VoteVisButton class="buttons__button" :isActive="view === 5" :text="'想當立委先當議員(WIP)'"/>
    </div>
    <VoteVisChart class="vis__chart" :data="dataProcessed"/>
  </section>
</template>

<script>
import { csv, } from 'd3-fetch'
import { nest, } from 'd3-collection'
import { sum, } from 'd3-array'
import { get, groupBy, mapValues, findKey, sortBy, take, } from 'lodash'
import VoteVisButton from './VoteVisButton.vue'
import VoteVisChart from './VoteVisChart.vue'

export default {
  components: {
    VoteVisButton,
    VoteVisChart,
  },
  data () {
    return {
      csvPath: '/proj-assets/vote2018/vote.csv',
      view: 1,
      countFilter: [ '本人' ],
      dataRaw: [],
      countyMapping: {},
      orderRelationship: [ '本人', '直系', '旁系' ],
      rankLimit: 10,
    }
  },
  computed: {
    dataFiltered () {
      return this.dataRaw.filter(d => this.countFilter.includes(d['關係']))
    },
    dataGroupByLeader () {
      const nestData =
        nest()
        .key(d => d['所屬議員'])
        .rollup(leaves => sum(leaves, d => d['當選次數']))
        .entries(this.dataFiltered)

      return nestData
    },
    orderLeader () {
      return sortBy(this.dataGroupByLeader, leader => -leader.value).map(leader => leader.key)
    },
    // dataGroupByCounty () {
    //   const nestData =
    //     nest()
    //     .key(d => d['所屬議員縣市'])
    //     .rollup(leaves => sum(leaves, d => d['當選次數']))
    //     .entries(this.dataFiltered)

    //   return nestData
    // },
    // orderCounty () {
    //   return sortBy(this.dataGroupByCounty, leader => -leader.value).map(leader => leader.key)
    // },

    // dataProcessed () {
    //   let nestData =
    //     nest()
    //     // .key(d => d['所屬議員縣市']).sortKeys((a, b) => this.orderCounty.indexOf(a) - this.orderCounty.indexOf(b))
    //     .key(d => d['所屬議員']).sortKeys((a, b) => this.orderLeader.indexOf(a) - this.orderLeader.indexOf(b))
    //     .key(d => d['關係']).sortKeys((a, b) => this.orderRelationship.indexOf(a) - this.orderRelationship.indexOf(b))
    //     .rollup(leaves => sum(leaves, d => d['當選次數']))
    //     .entries(this.dataFiltered)
        
    //   // nestData.forEach(county => county.values = take(county.values, 1))
    //   nestData.forEach(item => { item.county = this.countyMapping[item.key] })
    //   nestData = take(nestData, this.rankLimit)

    //   return nestData
    // },
    dataProcessed () {
      let nestData =
        nest()
        // .key(d => d['所屬議員縣市']).sortKeys((a, b) => this.orderCounty.indexOf(a) - this.orderCounty.indexOf(b))
        .key(d => d['所屬議員']).sortKeys((a, b) => this.orderLeader.indexOf(a) - this.orderLeader.indexOf(b))
        .key(d => d['關係']).sortKeys((a, b) => this.orderRelationship.indexOf(a) - this.orderRelationship.indexOf(b))
        // .rollup(leaves => sum(leaves, d => d['當選次數']))
        .key(d => d['姓名'])
        .entries(this.dataFiltered)
        
      // nestData.forEach(county => county.values = take(county.values, 1))
      nestData.forEach(item => { item.county = this.countyMapping[item.key] })
      nestData = take(nestData, this.rankLimit)

      return nestData
    },
  },
  methods: {
    clickFilter (num) {
      switch (num) {
        case 1:
          this.countFilter = [ '本人' ]
          break;
        case 2:
          this.countFilter = [ '本人', '直系' ]
          break;
        case 3:
          this.countFilter = [ '本人', '直系', '旁系' ]
          break;
        default:
          break;
      }
      this.view = num
    },
  },
  mounted () {
    const createRelationship = (data) => {
      return findKey(data, v => v === 'v')
    }

    const createCountyMapping = (data) => {
      const object = {}
      data.forEach(row => {
        const leaderName = get(row, '所屬議員', '')
        const county = get(row, '所屬議員縣市', '')
        if (object[leaderName] === undefined) {
          object[leaderName] = county
        }
      })
      return object
    }

    csv(this.csvPath, d => ({ ...d, '當選次數': +d['當選次數'], '關係': createRelationship(d) }))
    .then((data) => {
      this.dataRaw = data
      this.countyMapping = createCountyMapping(data)
    })
  }
}
</script>

<style lang="stylus" scoped>
.vis
  display flex
  flex-direction column
  align-items center
  &__chart
    margin 50px 0 0 0

.buttons
  display flex
  flex-direction column
  &__button
    & + &
      margin 20px 0 0 0
</style>

