<template>
  <div class="mask-map">
    <div class="map" ref="map" />
    <IntroInfo />
    <SearchBar />
    <LegendField />
    <PharmacyInfo :isShow="isShowPharmacyInfo" :infoData="pharmacyInfoData" @close="isShowPharmacyInfo = false" />
    <CommonInfo />
  </div>
</template>

<script>
import IntroInfo from './components/IntroInfo.vue'
import SearchBar from './components/SearchBar.vue'
import LegendField from './components/LegendField.vue'
import PharmacyInfo from './components/PharmacyInfo.vue'
import CommonInfo from './components/CommonInfo.vue'

import mapStyle from './data/mapStyle.js'
import { GOOGLE_API_KEY } from '../../../api/config'

// 110台北市信義區巿府路1號
const DEFAULT_CENTER = { lat: 25.037891, lng: 121.564008 }
const DEFAULT_ZOOM = 16

export default {
  name: 'MaskMap',
  metaInfo () {
    return {
      title: '即時口罩存量查詢地圖',
      description: '因應新型冠狀病毒（武漢肺炎）疫情，從 2 月 6 日起，口罩採實名制購買，需要的民眾得依照身分證／居留證號尾數在指定日期，攜帶健保卡前往藥局購買。READr 依照最新資料製作實時口罩地圖，快來查詢離你最近的口罩購買處！',
      metaUrl: 'maskmap',
      metaImage: 'maskmap/img/og.jpg',
      customScript: `<script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}" async defer><\/script>`
    }
  },
  components: {
    IntroInfo,
    SearchBar,
    LegendField,
    PharmacyInfo,
    CommonInfo
  },
  beforeMount () {
    window.addEventListener('load', () => { this.initMap() })
  },
  data () {
    return {
      map: null,
      isShowPharmacyInfo: false,
      pharmacyInfoData: {}
    }
  },
  methods: {
    initMap () {
      this.map = new google.maps.Map(this.$refs.map, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: mapStyle
      })
      new google.maps.Marker({
        map: this.map,
        position: DEFAULT_CENTER,
        icon: '/proj-assets/maskmap/img/man.svg'
      })
      this.map.data.loadGeoJson('https://storage.googleapis.com/projects.readr.tw/coronavirus2019/location_only.geojson', {}, () => {
        this.map.data.setStyle((feat) => {
          const status = feat.getProperty('s')
          let suffix = ''
          switch (status) {
            case 'O':
              suffix = 'over'
              break
            case 'U':
              suffix = 'under'
              break
            case 'N':
              suffix = 'none'
              break
            default:
              suffix = '0'
              break
          }
          return {
            icon: `/proj-assets/maskmap/img/location-${suffix}.svg`
          }
        })
      })
      this.map.data.addListener('click', (evt) => {
        const { i } = evt.feature.i
        const { data } = this.$store.state.maskMap
        this.isShowPharmacyInfo = true
        if (i in data) {
          this.pharmacyInfoData = data[ i ]
        } else {
          this.$store.dispatch('maskMap/fetchById', i).then(() => {
            this.pharmacyInfoData = data[ i ]
          })
        }
      })
    },
    getCurrentPosition () {
      const { geolocation } = navigator
      if (geolocation) {
        geolocation.getCurrentPosition((pos) => {
          const position = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          this.map.setCenter(position)
          this.map.setZoom(DEFAULT_ZOOM)
          new google.maps.Marker({
            map: this.map,
            position,
            icon: '/proj-assets/maskmap/img/man.svg'
          })
        }, function (err) {
          console.log(err)
        })
      } else {
        console.log('"Browser doesn\'t support Geolocation')
      }
    }
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'

html
  font-size 10px
body
  color rgba(0, 0, 0, 0.87)
  background-color #000
.mask-map
  max-width 420px
  position relative
  margin-left auto
  margin-right auto
.map
  height 100vh
</style>
