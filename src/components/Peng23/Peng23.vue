<template>
  <div class="peng23">
    <div class="peng23__wrapper">
      <div class="peng23__title"><span v-text="$t('PENG23.HOMERUN_DISTRIBUTION')"></span></div>
      <HomerunCountByCity v-if="isHomerunCountByCityActive"
        :groupedByStadium="groupedByStadium"
        :groupedData="groupedData" />
      
      <div class="peng23__title"><span v-text="$t('PENG23.HIT_DISTRIBUTION')"></span></div>
      <HitCountByCity v-if="isHitCountByCityActive"
        :groupedPerformanceByCity="groupedPerformanceByCity" />
      <HitCountByCityYear v-if="isHitCountByCityActive"
        :performanceRaw="performanceRaw" />
    </div>
  </div>
</template>
<script>
  import HomerunCountByCity from './infographics/HomerunCountByCity.vue'
  import HitCountByCity from './infographics/HitCountByCity.vue'
  import HitCountByCityYear from './infographics/HitCountByCityYear.vue'
  import axios from 'axios'
  import numeral from 'numeral'
  import { STATIUMS_CITY_MAP } from './constants'
  import { find, filter, get, groupBy, max, map as lmap, min, sortBy } from 'lodash'
  const debug = require('debug')('CLIENT:Peng23')
  const fetchHomeRunsByGame = () => {
    return axios.get('/proj-assets/peng23/json/home-run-by-game.json')
      .then(response => response.data)
      .catch(error => {
        console.error(error) 
      })     
  }
  const fetchPerformanceByGame = () => {
    return axios.get('/proj-assets/peng23/json/performance-by-game.json')
      .then(response => response.data)
      .catch(error => {
        console.error(error) 
      })     
  }
  const fetchGameInfoFrom2001To2018 = () => {
    return axios.get('/proj-assets/peng23/json/gameinfo-from-2001-to-2018.json')
      .then(response => response.data)
      .catch(error => {
        console.error(error) 
      })     
  }
  export default {
    name: 'Peng23',
    metaInfo () {
      return {
        title: this.$t('PENG23.TITLE'),
        description: this.$t('PENG23.DESCRIPTION'),
        metaUrl: 'peng23',
        metaImage: '',
      }
    },
    components: {
      HomerunCountByCity,
      HitCountByCity,
      HitCountByCityYear,
    },
    data () {
      return {
        groupedData: {},
        groupedByStadium: {},
        groupedPerformanceByCity: {},
        performanceRaw: [],
        gamesInfoGroupedByYear: {},
        isHomerunCountByCityActive: false,
        isHitCountByCityActive: false,
      }
    },
    methods: {
      async nomalizedHomeRundata () {
        const rawData = await fetchHomeRunsByGame()
        lmap(rawData, h => {
          h.city = get(find(STATIUMS_CITY_MAP, { name: h.place }), 'city')
        })
        this.groupedData = groupBy(rawData, h => h.city)
        this.groupedByStadium = groupBy(rawData, h => h.place)
        return sortBy(this.groupedData)
      },
    },
    beforeMount () {
      this.nomalizedHomeRundata().then(async dt => {
        this.isHomerunCountByCityActive = true
        this.gamesInfoGroupedByYear = await fetchGameInfoFrom2001To2018().then(games => groupBy(games, g => g.year))
        this.performanceRaw = await fetchPerformanceByGame().then(performance => {
          const expGameNo = /^[0-9]*\/[0-9]*\(([0-9]*)\)/
          lmap(performance, g => { 
            const capturedGameNoRaw = g[ 'DATE(GAME)' ].match(expGameNo)
            g.game_no = numeral(capturedGameNoRaw[ 1 ]).value()
            g.stadium = get(this.gamesInfoGroupedByYear, `${g.year}.${g.game_no - 1}.stadium`)
            g.city = get(find(STATIUMS_CITY_MAP, { name: g.stadium }), 'city')
          })
          return performance
        })
        this.groupedPerformanceByCity = groupBy(this.performanceRaw, g => g.city)
        this.isHitCountByCityActive = true
        return console.log('Data prepared.')
      })      
    },
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
.peng23
  &__wrapper
    position relative
  &__title
    font-size 1.5rem
    font-weight bold
    margin 20px auto
</style>