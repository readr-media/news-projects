<template>
<div class="map-container">

<div class="mapwpr" id="mapContent"></div>

<div class="btnwpr">
    <div class="btn" 
        v-on:click="toggleMarker(markers.o2008,visibility.o2008); 
        visibility.o2008 = !visibility.o2008"
        v-bind:class="{hide: !visibility.o2008}"
    >2008</div>
    <div class="btn" 
        v-on:click="toggleMarker(markers.o2009,visibility.o2009); 
        visibility.o2009 = !visibility.o2009"
        v-bind:class="{hide: !visibility.o2009}"
    >2009</div>
</div>

</div>
</template>

<script>
import superagent from "superagent";
import {fetchData} from "./script/fetchData.js";

//map style: retro
import mapStyle from "./style/mapRetro.json";

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
      data: {
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

    getDataFail: (err) => {
      console.log(err);
    },

    storeData: (storage, data) => {

      setTimeout(() => {
        storage.splice(0, storage.length, ...data);
      },0);

    },

    setMark: function(data, color, markers, radius) {
      const map = this.map;
      // console.log(map);

      for (let i = 0, length = data.length; i < length; i++) {
        let lat = Number(data[i].lat.toFixed(6));
        let lng = Number(data[i].lng.toFixed(6));

        const position = {
          lat: lat,
          lng: lng
        };

        markers.push(
          //marker
          //   new google.maps.Marker({
          //     position: position,
          //     map: map
          //   })

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

    // resetMarker: (data, color, markers, radius, that) => {

    //   // console.log(this.map);

    //   if(markers.length > 0){
    //     markers.forEach(element => {            
    //       element.setMap(null);
    //     });
    //     markers = []; 
    //   }
    //   that.setMark(data, color, markers, radius);

    // },

    toggleMarker: function(markers, state) {
      if (state) {
        markers.forEach(element => {
          //hide marker
          element.setMap(null);
        });
      } else {
        markers.forEach(element => {
          //show marker
          element.setMap(this.map);
        });
      }
    }
  },

  beforeMount: function() {},

  mounted: function() {
    this.initMap();

    this.fetchData(superagent, this);
    /*
    superagent
      .get("/proj-assets/dollclaw/data/o2008.json")
      .then(res => {

        const data = JSON.parse(res.text);
        this.setMark(data, "#943126", this.markers.o2008, 2000);
        this.storeData(this.data.o2008, data);
       
      })
      .catch(err => {
        this.getDataFail(err);
      });

    superagent
      .get("/proj-assets/dollclaw/data/o2009.json")
      .then(res => {

        const data = JSON.parse(res.text);
        this.setMark(data, "#0abab5", this.markers.o2009, 6000);
        this.storeData(this.data.o2009, data);

      })
      .catch(err => {
        this.getDataFail(err);
      });
    */

    //get zoom level
    google.maps.event.addListener(this.map, "zoom_changed", () => {
      let zoom = this.map.getZoom();
      console.log("zoom level: " + zoom);

      if(zoom == 9){

        this.removeMarker(this.markers.o2008);
        this.setMark(this.data.o2008, "#943126", this.markers.o2008, 12000);
        // this.resetMarker(this.data.o2008, "#943126", this.markers.o2008, 12000, this);

      } else if(zoom == 7) {

        this.removeMarker(this.markers.o2008);
        this.setMark(this.data.o2008, "#943126", this.markers.o2008, 2000);
        // this.resetMarker(this.data.o2008, "black", this.markers.o2008, 2000, this);
      }

    });

    setTimeout(() => {
      console.log(this.data.o2008);
    },600);

    setTimeout(() => {
      console.log(this.data.o2009);
    },600);

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


