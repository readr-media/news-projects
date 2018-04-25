<template>
<div class="map-container">

<div class="mapwpr" id="testmap"></div>

<div class="btnwpr">
    <div class="btn" 
        v-on:click="toggleMarker(markers2008)"
    >2008</div>
    <div class="btn" 
        v-on:click="toggleMarker(markers2009)"
    >2009</div>
</div>

</div>
</template>

<script>
import superagent from "superagent";

//map style: retro
import mapStyle from "./style/mapRetro.json";

export default {
  data: function() {
    return {
      map: {},
      markers2008: [],
      markers2009: []
    };
  },

  methods: {
    initMap: function() {
      const mapcenter = { lat: 23.740611, lng: 121.001421 };

      const mapOptions = {
        zoom: 8,
        center: mapcenter
        // styles: mapStyle
        // mapTypeId: "terrain"
      };

      this.map = new google.maps.Map(
        document.getElementById("testmap"),
        mapOptions
      );
    },

    setMark: function(data, color, markers) {
      const map = this.map;

      for (let i = 0, length = data.length; i < length; i++) {
        let lat = Number(data[i].lat.toFixed(6));
        let lng = Number(data[i].lng.toFixed(6));

        const position = {
          lat: lat,
          lng: lng
        };

        // console.log(position);

        markers.push(
          //marker
          //   new google.maps.Marker({
          //     position: position,
          //     map: map
          //   })

          //circle
          new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: map,
            center: position,
            radius: 2000
          })
        );
      }
    },

    toggleMarker: function(markers) {
    //   console.log(markers);
        markers.forEach((element) => {
            element.setMap(null);
        });
    }
  },

  beforeMount: function() {},

  mounted: function() {
    this.initMap();

    superagent
      .get("/proj-assets/dollclaw/data/o2008.json")
      .then(res => {
        const data = JSON.parse(res.text);
        this.setMark(data, "#943126", this.markers2008);
      })
      .catch(err => {
        console.log(err);
      });

    superagent
      .get("/proj-assets/dollclaw/data/o2009.json")
      .then(res => {
        const data = JSON.parse(res.text);
        this.setMark(data, "#0abab5", this.markers2009);
      })
      .catch(err => {
        console.log(err);
      });

    // setTimeout(() => {
    //     this.markers2.forEach((element) => {
    //         element.setMap(null);
    //     });
    // },5000);

    // setTimeout(() => {
    //     this.markers2.forEach((element) => {
    //         element.setMap(this.map);
    //     });
    // },10000);
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
</style>


