<template>
  <div class="peng23">
    <div class="peng23__wrapper">
      <HomerunCountByCity v-if="isHomerunCountByCityActive"
        :groupedByStadium="groupedByStadium"
        :groupedData="groupedData" />
    </div>
  </div>
</template>
<script>
  import HomerunCountByCity from './infographics/HomerunCountByCity.vue'
  import { STATIUMS_CITY_MAP } from './constants'
  import { find, filter, get, groupBy, max, map as lmap, min, sortBy } from 'lodash'
  import axios from 'axios'
  const debug = require('debug')('CLIENT:Peng23')
  const fetchHomeRunsByGame = () => {
    return axios.get('/proj-assets/peng23/json/home-run-by-game.json')
      .then(response => {
        debug('response', response)
        return response.data
      })
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
    },
    data () {
      return {
        groupedData: {},
        groupedByStadium: {},
        isHomerunCountByCityActive: false,
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
    mounted () {
      this.nomalizedHomeRundata().then(dt => {
        debug('get data!', dt)
        this.isHomerunCountByCityActive = true
      })
    },
  }
</script>
<style lang="stylus" scoped>
.peng23
  &__wrapper
    width 402px
    height 582px
    position relative
</style>