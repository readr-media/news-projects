<template>
<div class="map-container">

<div class="mapwpr" id="mapContent"></div>

<div class="btnwpr">

    <div 
      class="btn" 
      v-for="(item) in markers" 
      :key="item.id"
      v-on:click="toggleMarker(item.group, item.visible); 
        item.visible = !item.visible"
        v-bind:class="{hide: !item.visible}"
    >{{item.year}}</div>

</div>

</div>
</template>

<script>
import superagent from "superagent";
import {fetchData, 
        initMap, 
        setMark, 
        toggleMarker
        } from "./script/map_action.js";

//map style: retro
// import mapStyle from "./style/mapStyle-night.json";

export default {
  data: function() {
    return {
      //google map container
      map: {},

      // map marker collection
      markers: [
        {year: "2008", group: [], visible: true, color: "#DC143C", radius: 1500},
        {year: "2009", group: [], visible: true, color: "#D2691E", radius: 1500},
        {year: "2010", group: [], visible: true, color: "#00008B", radius: 1500},
        {year: "2011", group: [], visible: true, color: "#008B8B", radius: 1500},
        {year: "2012", group: [], visible: true, color: "#B8860B", radius: 1500},
        {year: "2013", group: [], visible: true, color: "#006400", radius: 1500},
        {year: "2014", group: [], visible: true, color: "#8B008B", radius: 1500},
        {year: "2015", group: [], visible: true, color: "#943126", radius: 1500},
        {year: "2016", group: [], visible: true, color: "#8B0000", radius: 1500},
        {year: "2017", group: [], visible: true, color: "#8FBC8F", radius: 1500},
        {year: "2018", group: [], visible: true, color: "#2F4F4F", radius: 1500}
      ]

    };
  },

  methods: {

    fetchData,    
    initMap,
    setMark,
    toggleMarker

  },

  mounted: function() {
    this.initMap(this);

    this.fetchData(superagent, this);

    //get zoom level    
    google.maps.event.addListener(this.map, "zoom_changed", () => {
      let zoom = this.map.getZoom();
      console.log("zoom level: " + zoom);

      // if(zoom == 12){
 
      //   this.setMarkerRadius(this.markers[1].group, 7400);

      // } else if(zoom == 11) {

      //   this.setMarkerRadius(this.markers[1].group, 1500);

      // }

    });


  }
};
</script>

<style>
/* map container */
.map-container {
  position: relative;
}
.mapwpr {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.gm-style-pbc {
  background-color: transparent !important;
}

/* map toggle btn */
.btnwpr {
  width: 100%;
  position: fixed;
  left: 0;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  display: inline-block;
  cursor: pointer;
  padding: 2px 12px;
  margin: 0 4px;
  text-align: center;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #999;
}

.btn.hide {
  opacity: 0.5;
}
</style>


