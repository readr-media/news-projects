<template>
  <section class="vis">
    <div class="vis__buttons buttons">
      <VoteVisButton class="buttons__button" :isActive="view === 1 || view === 2 || view === 3" :text="'看誰全家都議員'" @click.native="clickFilter(1)"/>
      <!-- <VoteVisButton class="buttons__button" :isActive="view === 4" :text="'議員政治世家縣市比一比'" @click.native="clickFilter(4)"/> -->
      <VoteVisButton class="buttons__button" :isActive="view === 5" :text="'想當立委先當議員'" @click.native="clickFilter(5)"/>
      <!-- <VoteVisButton class="buttons__button" :isActive="view === 6" :text="'2018 參戰議員'" @click.native="clickFilter(6)"/> -->
      <div v-show="view !== 5" class="search">
        <img v-show="showSearchIcon" class="search__icon" src="/proj-assets/vote2018/search.svg" alt="">
        <input :class="[ 'search__input', { 'search__input--active': searchActive } ]" type="text" v-model="searchInput" @focus="focusInput" @blur="blurInput">
      </div>
      <VoteVisDropdown v-show="view !== 5" class="dropdown" :countyFilter.sync="countyFilter"/>
    </div>
    <VoteVisChart
      class="vis__chart"
      :data="dataProcessed"
      :view="view"
      :countFilter="countFilter"
      @changeView="clickFilter"
      @popFilter="popFilter"
      @pushFilter="pushFilter"
      @filterCounty="filterCounty"
      @loadmore="loadmore"
      :showLoadMoreButton="rankLimit < (dataCurrent.length || 0)"
    />
    <!-- <button @click="show('rel')">rel</button>
    <button @click="show('county')">county</button> -->
  </section>
</template>

<script>
import { csv, json } from 'd3-fetch'
import { nest, } from 'd3-collection'
import { sum, } from 'd3-array'
import { get, groupBy, mapValues, findKey, sortBy, take, isEmpty, remove, debounce, uniq } from 'lodash'
import VoteVisButton from './VoteVisButton.vue'
import VoteVisDropdown from './VoteVisDropdown.vue'
import VoteVisChart from './VoteVisChart.vue'

export default {
  components: {
    VoteVisButton,
    VoteVisDropdown,
    VoteVisChart,
  },
  watch: {
    view () {
      if (this.view === 5 && isEmpty(this.dataRawLegislator)) {
        csv(this.csvPathLegislator)
        .then((data) => {
          this.dataRawLegislator = data
        })
      } else if (this.view === 4 && isEmpty(this.dataProcessedCountyRaw)) {
        json('/proj-assets/vote2018/voteCounty.json')
        .then(data => {
          this.dataProcessedCountyRaw = data
        })
      } else if (this.view === 6 && isEmpty(this.mapping)) {
        csv('/proj-assets/vote2018/2018Mapping.csv')
        .then(data => {
          this.mapping = uniq(data.map(i => `${i['所屬議員']}-${i['所屬議員縣市']}`))
        })
      }
    },
    searchInput () {
      debounce(() => {
        this.search = this.searchInput
      }, 250)()
    },
  },
  data () {
    return {
      csvPath: '/proj-assets/vote2018/voteRelease.csv',
      csvPathLegislator: '/proj-assets/vote2018/voteLegislatorRelease.csv',
      view: 1,
      dataRaw: [],
      dataRawLegislator: [],
      countyMapping: {},
      orderRelationship: [ '本人', '二親等', '二親等以外' ],
      rankLimit: 10,
      countFilter: [ '本人', '二親等', '二親等以外' ],
      countyFilter: '',
      searchInput: '',
      search: '',
      showSearchIcon: true,
      searchActive: false,
      dataProcessedRelationshipRaw: [],
      dataProcessedCountyRaw: [],
      mapping: []
    }
  },
  computed: {
    // dataFiltered () {
    //   return this.dataRaw
    //     .filter(d => d['當選次數'] > 0)
    //     .filter(d => this.countFilter.includes(d['關係']))
    //     .filter(d => this.countyFilter !== '' ? d['所屬議員縣市'] === this.countyFilter : d)
    //     .filter(d => this.view === 6 ? d['2018參選'] === '1' : d)
    //     .filter(d => this.search !== '' ? d['所屬議員'].includes(this.search) : d)
    // },
    // dataGroupByLeader () {
    //   const nestData =
    //     nest()
    //     .key(d => `${d['所屬議員']}-${d['所屬議員縣市']}`)
    //     .rollup(leaves => sum(leaves, d => d['當選次數']))
    //     .entries(this.dataFiltered)

    //   return nestData
    // },
    // dataGroupByCounty () {
    //   const nestData =
    //     nest()
    //     .key(d => d['所屬議員縣市'])
    //     .rollup(leaves => sum(leaves, d => d['當選次數']) / uniq(leaves.map(d => `${d['所屬議員']}-${d['所屬議員縣市']}`)).length)
    //     .entries(this.dataRaw)

    //   return nestData
    // },
    // orderCounty () {
    //   return sortBy(this.dataGroupByCounty, county => -county.value).map(county => county.key)
    // },
    // orderLeader () {
    //   return sortBy(this.dataGroupByLeader, leader => -leader.value).map(leader => leader.key)
    // },
    dataCurrent () {
      if ([ 1, 2, 3, 6 ].includes(this.view)) {
        return this.dataProcessedRelationship
      } else if ([ 4 ].includes(this.view)) {
        return this.dataProcessedCounty
      } else if ([ 5 ].includes(this.view)) {
        return this.dataProcessedLegislator
      }
    },
    dataProcessed () {
      return take(this.dataCurrent, this.rankLimit)
    },
    dataProcessedRelationship () {
      // let nestData =
      //   nest()
      //   // .key(d => d['所屬議員縣市']).sortKeys((a, b) => this.orderCounty.indexOf(a) - this.orderCounty.indexOf(b))
      //   .key(d => `${d['所屬議員']}-${d['所屬議員縣市']}`).sortKeys((a, b) => this.orderLeader.indexOf(a) - this.orderLeader.indexOf(b))
      //   .key(d => d['關係']).sortKeys((a, b) => this.orderRelationship.indexOf(a) - this.orderRelationship.indexOf(b))
      //   // .rollup(leaves => sum(leaves, d => d['當選次數']))
      //   .key(d => d['姓名'])
      //   .entries(this.dataFiltered)
        
      // // nestData.forEach(county => county.values = take(county.values, 1))
      // // nestData = take(nestData, this.rankLimit)
      // // nestData.forEach(item => { item.county = this.countyMapping[item.key] })

      // return nestData

      return this.dataProcessedRelationshipRaw
        .filter(d => this.view === 6 ? this.mapping.includes(d.key) : d)
        .filter(d => this.countyFilter !== '' ? d.key.split('-')[1] === this.countyFilter : d)
        .filter(d => this.search !== '' ? d.key.split('-')[0].includes(this.search) : d)
        .map(d => ({
          ...d,
          values: d.values
                   .filter(_d => this.countFilter.includes(_d.key))
        }))
        .map(d => ({
          ...d,
          sum: sum(d.values, _d => {
            const relationshipArray = _d.values
            return sum(relationshipArray, __d => {
              const personArray = __d.values
              return sum(personArray, ___d => ___d['當選次數'])
            })
          })
        }))
        .sort((a, b) => b.sum - a.sum)
    },
    dataProcessedLegislator () {
      if (isEmpty(this.dataRawLegislator)) { return [] }

      const getElectedCount = candidate => get(candidate, 'timeline', []).map(d => d.value).filter(d => d !== '').length

      return this.dataRawLegislator
             .map(candidate => ({
                key: `${candidate['姓名']}-${candidate['議員選區']}`,
                timeline: Object.entries(candidate)
                                .filter(item => item[0] !== '姓名' && item[0] !== '議員選區')
                                .map(item => {
                                  const key = item[0]
                                  const value = item[1]
                                  let _value

                                  if (value === '') {
                                    _value = ''
                                  } else if (key.includes('擔任議員')) {
                                    _value = '議員'
                                  } else if (key.includes('擔任立委')) {
                                    _value = '立委'
                                  }

                                  return { key, value: _value }
                                })
             }))
             .sort((a, b) => getElectedCount(b) - getElectedCount(a))
    },
    dataProcessedCounty () {
      // let nestData =
      //   nest()
      //   .key(d => d['所屬議員縣市']).sortKeys((a, b) => this.orderCounty.indexOf(a) - this.orderCounty.indexOf(b))
      //   .key(d => d['關係']).sortKeys((a, b) => this.orderRelationship.indexOf(a) - this.orderRelationship.indexOf(b))
      //   // .rollup(leaves => sum(leaves, d => d['當選次數']))
      //   // .key(d => d['姓名'])
      //   .entries(this.dataRaw)
        
      // // nestData = take(nestData, this.rankLimit)
      // nestData.forEach(o => {
      //   const relArray = o.values.map(_o => _o.values)
      //   return relArray
      // })

      // return nestData

      return this.dataProcessedCountyRaw
    },
  },
  methods: {
    clickFilter (num) {
      this.view = num
      this.countyFilter = ''
      this.countFilter = [ '本人', '二親等', '二親等以外' ]
      this.rankLimit = 10
    },
    popFilter (filter) {
      const index = this.countFilter.indexOf(filter)
      this.countFilter.splice(index, 1)
      this.rankLimit = 10
    },
    pushFilter (filter) {
      this.countFilter.push(filter)
      this.rankLimit = 10
    },
    filterCounty (county) {
      this.countyFilter = county
      this.rankLimit = 10
    },
    loadmore () {
      this.rankLimit += 10
    },
    focusInput () {
      this.searchActive = true
      this.showSearchIcon = false
    },
    blurInput () {
      if (this.searchInput === '') {
        this.searchActive = false
        this.showSearchIcon = true
      }
    },
    // show (type) {
    //   if (type === 'rel') {
    //     console.log(JSON.stringify(this.dataProcessedRelationship))
    //   } else {
    //     console.log(JSON.stringify(this.dataProcessedCounty))
    //   }
    // }
  },
  mounted () {
    // const createRelationship = (data) => {
    //   return findKey(data, v => v === 'v')
    // }

    // const createCountyMapping = (data) => {
    //   const object = {}
    //   data.forEach(row => {
    //     const leaderName = get(row, '所屬議員', '')
    //     const county = get(row, '所屬議員縣市', '')
    //     if (object[leaderName] === undefined) {
    //       object[leaderName] = county
    //     }
    //   })
    //   return object
    // }

    // // csv(this.csvPath, d => ({ ...d, '當選次數': +d['當選次數'], '關係': createRelationship(d) }))
    // csv(this.csvPath, d => ({ ...d, '當選次數': +d['當選次數'], }))
    // .then((data) => {
    //   // this.dataRaw = take(data, 1000)
    //   this.dataRaw = data
    //   // this.countyMapping = createCountyMapping(data)
    // })

    json('/proj-assets/vote2018/voteRelease.json')
    .then(data => {
      this.dataProcessedRelationshipRaw = data
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
    margin 178px 0 0 0

.buttons
  display flex
  flex-direction column
  &__button
    & + &
      margin 20px 0 0 0

.search
  margin 20px 0 0 0
  position relative
  &__icon
    position absolute
    top calc((60px - 43px) / 2)
    left calc(250px - 43px / 2)
    pointer-events none
  &__input
    width 500px
    height 60px
    border-radius 8px
    background-color #061c37
    border 2px solid white
    transition background-color .15s ease-out, color .15s ease-out
    text-align center
    font-size 30px
    color #061c37
    font-weight 400
    &--active
      outline none
      background-color white

.dropdown
  margin 20px 0 0 0

@media (max-width 768px)
  .vis
    width 100%
    padding 0 20px
    &__chart
      margin 60px 0 0 0

  .buttons
    width 100%

  .search
    &__icon
      height 30px
      top calc((40px - 30px) / 2)
      left calc(50% - 30px / 2)
    &__input
      width 100%
      height 40px
      font-size 20px
</style>

