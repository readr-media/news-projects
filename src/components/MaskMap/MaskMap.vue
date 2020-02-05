<template>
  <div class="mask-map">
    <div class="map" ref="map" />
    <SearchBar />
    <PharmacyInfo :isShow="isShowPharmacyInfo" :infoData="pharmacyInfoData" @close="isShowPharmacyInfo = false" />
  </div>
</template>

<script>
// import MaskMapStoreModule from '../../store/modules/firebase-modules/maskMap'
// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('maskMap')
import SearchBar from './components/SearchBar.vue'
import PharmacyInfo from './components/PharmacyInfo.vue'

// 110台北市信義區巿府路1號
const DEFAULT_CENTER = { lat: 25.037891, lng: 121.564008 }
const DEFAULT_ZOOM = 16

export default {
  name: 'MaskMap',
  metaInfo () {
    return {
      title: '即時口罩存量查詢地圖',
      description: '',
      metaUrl: 'maskmap'
      // metaImage: 'maskmap/img/cover-desktop-large.jpg'
    }
  },
  components: {
    SearchBar,
    PharmacyInfo
  },
  // created () {
  //   // this.$store.registerModule('MaskMap', MaskMapStoreModule)
  //   // this.$store.dispatch('maskMap/openDBChannel')
  //   // this.$store.dispatch('realtimeLegislatorsDistrictCandidates/openDBChannel')
  // },
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
      const lat = 25.037891
      const lng = 121.564008
      this.map = new google.maps.Map(this.$refs.map, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false
      })
      // this.map.data.loadGeoJson('/proj-assets/maskmap/data/location.geojson', {}, (res) => {
      //   console.log(res);
      // })
      this.map.data.loadGeoJson('https://storage.googleapis.com/projects.readr.tw/coronavirus2019/location_only.geojson')
      // this.map.data.loadGeoJson('/proj-assets/maskmap/data/location.geojson')
      this.map.data.addListener('click', (evt) => {
        const { id } = evt.feature.i
        const key = id % 2 ? '1234567890' : '1234567891'
        const { data } = this.$store.state.maskMap
        // const { data } = this.maskMap
        this.isShowPharmacyInfo = true
        if (key in data) {
          this.pharmacyInfoData = data[ key ]
        } else {
          this.$store.dispatch('maskMap/fetchById', key).then(() => {
            this.pharmacyInfoData = data[ key ]
          })
        }
      })
      
      // this.map.data.setStyle((feat) => ({
      //   icon: '/proj-assets/maskmap/img/location.svg'
      // }))

    },
    getCurrentPosition () {
      // const infoWindow = new google.maps.InfoWindow
      const { geolocation } = navigator
      if (geolocation) {
        geolocation.getCurrentPosition((pos) => {
          const { latitude: lat, longitude: lng } = pos.coords
          // infoWindow.setPosition(pos)
          // infoWindow.setContent('Location found.')
          // infoWindow.open(map)
          this.map.setCenter({ lat, lng })
        }, function (err) {
          console.log(err)
        })
      } else {
        console.log('"Browser doesn\'t support Geolocation');
      }
    }
  },
  // beforeDestroy () {
  //   this.$store.unregisterModule('FoodDelivery')
  // }
}
</script>

<style lang="stylus">
@import './util/reset.css'
// html, body
//   height 100%
html
  font-size 10px
body
  color rgba(0, 0, 0, 0.87)
.map
  height 100vh
</style>
