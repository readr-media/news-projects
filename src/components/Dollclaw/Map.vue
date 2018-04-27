<template>
<div class="map-container">

<div class="mapwpr" id="mapContent"></div>

<div class="btnwpr">
    <div class="btn" 
        v-on:click="toggleMarker(markers.o2008, visibility.o2008); 
        visibility.o2008 = !visibility.o2008"
        v-bind:class="{hide: !visibility.o2008}"
    >2008</div>
    
    <div class="btn" 
        v-on:click="toggleMarker(markers.o2009, visibility.o2009); 
        visibility.o2009 = !visibility.o2009"
        v-bind:class="{hide: !visibility.o2009}"
    >2009</div>

    <div class="btn" 
        v-on:click="toggleMarker(markers.o2010, visibility.o2010); 
        visibility.o2010 = !visibility.o2010"
        v-bind:class="{hide: !visibility.o2010}"
    >2010</div>

    <div class="btn" 
        v-on:click="toggleMarker(markers.o2011, visibility.o2011); 
        visibility.o2011 = !visibility.o2011"
        v-bind:class="{hide: !visibility.o2011}"
    >2011</div>

    <div class="btn" 
        v-on:click="toggleMarker(markers.o2012, visibility.o2012); 
        visibility.o2012 = !visibility.o2012"
        v-bind:class="{hide: !visibility.o2012}"
    >2012</div>

    <div class="btn" 
        v-on:click="toggleMarker(markers.o2013, visibility.o2013); 
        visibility.o2013 = !visibility.o2013"
        v-bind:class="{hide: !visibility.o2013}"
    >2013</div>

    <div class="btn" 
        v-on:click="toggleMarker(markers.o2014, visibility.o2014); 
        visibility.o2014 = !visibility.o2014"
        v-bind:class="{hide: !visibility.o2014}"
    >2014</div>
    
    <div class="btn" 
        v-on:click="toggleMarker(markers.o2015, visibility.o2015); 
        visibility.o2015 = !visibility.o2015"
        v-bind:class="{hide: !visibility.o2015}"
    >2015</div>

    <div class="btn" 
        v-on:click="toggleMarker(markers.o2016, visibility.o2016); 
        visibility.o2016 = !visibility.o2016"
        v-bind:class="{hide: !visibility.o2016}"
    >2016</div>

    <div class="btn" 
        v-on:click="toggleMarker(markers.o2017, visibility.o2017); 
        visibility.o2017 = !visibility.o2017"
        v-bind:class="{hide: !visibility.o2017}"
    >2017</div>

    <div class="btn" 
        v-on:click="toggleMarker(markers.o2018, visibility.o2018); 
        visibility.o2018 = !visibility.o2018"
        v-bind:class="{hide: !visibility.o2018}"
    >2018</div>
</div>

</div>
</template>

<script>
import superagent from "superagent";
import {fetchData} from "./script/fetchData.js";

//map style: retro
// import mapStyle from "./style/mapStyle-night.json";

export default {
  data: function() {
    return {
      //google map container
      map: {},

      //map visibility
      visibility: {
        o2008: true,
        o2009: true,
        o2010: true,
        o2011: true,
        o2012: true,
        o2013: true,
        o2014: true,
        o2015: true,
        o2016: true,
        o2017: true,
        o2018: true
      },

      //map data
      // data: {
      //   o2008: [],
      //   o2009: [],
      //   o2010: [],
      //   o2011: [],
      //   o2012: [],
      //   o2013: [],
      //   o2014: [],
      //   o2015: [],
      //   o2016: [],
      //   o2017: [],
      //   o2018: []
      // },

      // map marker collection
      markers: {
        o2008: [],
        o2009: [],
        o2010: [],
        o2011: [],
        o2012: [],
        o2013: [],
        o2014: [],
        o2015: [],
        o2016: [],
        o2017: [],
        o2018: []
      },

    };
  },

  methods: {

    fetchData: fetchData,

    initMap: function() {
      //map center
      const mapcenter = { lat: 23.740611, lng: 121.001421 };

      //map option
      const mapOptions = {
        zoom: 8,
        center: mapcenter
        // styles: mapStyle
        // mapTypeId: "terrain"
      };

      //set map
      this.map = new google.maps.Map(
        document.getElementById("mapContent"),
        mapOptions
      );
    },
    /*
    storeData: (storage, data) => {

      setTimeout(() => {
        storage.splice(0, storage.length, ...data);
      },0);

    },
    */
    setMark: function(data, color, markers, radius) {
      const map = this.map;
      const dataLength = data.length;

      //store map data
      // storage.splice(0, storage.length, ...data);

      for (let i = 0; i < dataLength; i++) {
        // let lat = Number(data[i].location.lat.toFixed(6));
        // let lng = Number(data[i].location.lng.toFixed(6));
        let lat = data[i].location.lat;
        let lng = data[i].location.lng;

        const position = {
          lat: lat,
          lng: lng
        };

        // init and store marker
        markers.push(
          //circle mark
          new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: map,
            center: position,
            radius: radius
          })
        );
      }

    },

    removeMarker: function(markers){
      markers.forEach(element => {            
        element.setMap(null);
      });
      markers = [];
    },

    toggleMarker: function(markers, state) {      
      if (state) {
        markers.forEach(element => {
          //hide marker
          // element.setMap(null);
          // element.setVisible(false);
          element.set("strokeOpacity",0);
          element.set("fillOpacity",0);
        });

      } else {
        markers.forEach(element => {
          //show marker
          // element.setMap(this.map);
          // element.setVisible(true);
          element.set("strokeOpacity",0.8);
          element.set("fillOpacity",0.35);
        });

      }
    }
  },

  beforeMount: function() {},

  mounted: function() {
    this.initMap();

    this.fetchData(superagent, this);

    //get zoom level    
    google.maps.event.addListener(this.map, "zoom_changed", () => {
      let zoom = this.map.getZoom();
      console.log("zoom level: " + zoom);

      // if(zoom == 9){
      //   this.removeMarker(this.markers.o2008);
      //   this.setMark(this.data.o2008, "#943126", this.markers.o2008, 12000);
      // } else if(zoom == 7) {
      //   this.removeMarker(this.markers.o2008);
      //   this.setMark(this.data.o2008, "#943126", this.markers.o2008, 2000);
      // }

    });
    

    // setTimeout(() => {
    //   console.log(this.data.o2008);
    // },1000);

    // setTimeout(() => {
    //   console.log(this.data.o2009);
    // },1000);

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


