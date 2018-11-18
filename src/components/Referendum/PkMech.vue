<template>
  <div class="pk-mech">
    <div class="info">
      <PkMechInfo
        :activeCity="activeCity"
        :activeAll.sync="activeAll"></PkMechInfo>
    </div>
    <div class="map">
      <PkMechMap :activeCity.sync="activeCity" :activeAll="activeAll" :pkData="pkData"></PkMechMap>
    </div>
  </div>
</template>
<script>
  import PkMechInfo from './PkMechInfo.vue'
  import PkMechMap from './PkMechMap.vue'
  import verge from 'verge'
  import { currentYPosition, elmYPosition, } from 'kc-scroll'
  import { filter, get, map, maxBy, } from 'lodash'
  export default {
    name: 'PkMech',
    components: {
      PkMechInfo,
      PkMechMap,
    },
    computed: {
      raw () {
        return get(this.$store, `state.Referendum.applicationDetail`)
      },
      base () {
        return get(this.$store, `state.Referendum.targets.base`)
      },
      comparison () {
        return get(this.$store, `state.Referendum.targets.comparison`)
      },
      item () {
        return get(this.$store, `state.Referendum.targets.item`)
      },
      pkData () {
        const baseData = filter(get(this.raw, this.base), (o, k) => k !== this.$t('REFERENDUM.TAIWAN'))
        const comparisonData = filter(get(this.raw, this.comparison), (o, k) => k !== this.$t('REFERENDUM.TAIWAN'))
        const data = {}
        const maxBase = maxBy(data, c => Number(get(c, this.item), '0'))
        const maxComparison = maxBy(comparisonData, c => Number(get(c, this.item), '0'))
        const max = get(maxBy([ maxBase, maxComparison ], c => Number(get(c, this.item), '0')), this.item)
        map(baseData, c => {
          data[ c.city ] = { base: (Number(get(c, this.item)) * 300) / Number(max) }
        })
        map(comparisonData, c => {
          data[ c.city ].comparison = (Number(get(c, this.item)) * 300) / Number(max)
        })
        return data
      },
      isDesktop () {
        return get(this.$store, 'state.useragent.isDesktop')
      },      
    },
    data () {
      return {
        activeCity: '臺灣',
        activeAll: false,
        data: {
          '基隆市': { base: 20, comparison: 50 },
          '臺北市': { base: 40, comparison: 50 },
          '新北市': { base: 78, comparison: 50 },
          '桃園市': { base: 23, comparison: 50 },
          '新竹縣': { base: 34, comparison: 50 },
          '新竹市': { base: 12, comparison: 50 },
          '苗栗縣': { base: 33, comparison: 50 },
          '臺中市': { base: 12, comparison: 50 },
          '南投縣': { base: 32, comparison: 50 },
          '彰化縣': { base: 12, comparison: 50 },
          '雲林縣': { base: 34, comparison: 50 },
          '嘉義縣': { base: 12, comparison: 50 },
          '嘉義市': { base: 41, comparison: 50 },
          '臺南市': { base: 53, comparison: 50 },
          '高雄市': { base: 29, comparison: 50 },
          '屏東縣': { base: 13, comparison: 50 },
          '宜蘭縣': { base: 43, comparison: 50 },
          '花蓮縣': { base: 23, comparison: 50 },
          '臺東縣': { base: 45, comparison: 50 },
          '澎湖縣': { base: 23, comparison: 50 },
          '金門縣': { base: 45, comparison: 50 },
          '連江縣': { base: 23, comparison: 50 },
        },
        isActive: false,
      }
    },
    methods: {
      setUpHandler () {
        this.isDesktop && window.addEventListener('scroll', () => {
          if (this.isActive) { return }
          const current_top_y = currentYPosition()
          const content_top_Y = elmYPosition('.pk-mech')
          const device_height = verge.viewportH()
          if (content_top_Y < current_top_y + device_height / 3) {
            this.isActive = true
            this.activeAll = true
          }
        })        
      }
    },
    mounted () {
      this.setUpHandler()
    },
  }
</script>
<style lang="stylus" scoped>
  .pk-mech
    display flex
    justify-content center
    align-items flex-start
    .ingo, .map
      flex 1
</style>