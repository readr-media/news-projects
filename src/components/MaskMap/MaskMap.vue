<template>
  <div class="mask-map">
    <div class="map" ref="map" />
    <SearchBar />
  </div>
</template>

<script>
// import MaskMapStoreModule from '../../store/modules/firebase-modules/maskMap'
// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('maskMap')
import SearchBar from './components/SearchBar.vue'

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
    SearchBar
  },
  created () {
    // this.$store.registerModule('MaskMap', MaskMapStoreModule)
    // this.$store.dispatch('maskMap/fetchAndAdd')
    // this.$store.dispatch('realtimeLegislatorsDistrictCandidates/openDBChannel')
  },
  beforeMount () {
    console.log(this.$store.state.maskMap);
    
    window.addEventListener('load', () => { this.initMap() })
  },
  computed: {
    // ...mapState({
    //   maskMap: (state) => state.maskMap.data,
    // })
  },
  methods: {
    initMap () {
      const lat = this.$store.state.viewport[ 0 ] >= 1200 ? 25.0412406 : 25.0435151
      const lng = this.$store.state.viewport[ 0 ] >= 1200 ? 121.5492358 : 121.5491499
      const map = new google.maps.Map(this.$refs.map, {
        center: { lat, lng },
        zoom: 16,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false
      })
      // this.getCurrentPosition(map)
    },
    getCurrentPosition (map) {
      const infoWindow = new google.maps.InfoWindow
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

          // infoWindow.setPosition(pos)
          // infoWindow.setContent('Location found.')
          // infoWindow.open(map)
          map.setCenter(pos)
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter())
        })
      } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter())
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
.map
  height 100vh
</style>
