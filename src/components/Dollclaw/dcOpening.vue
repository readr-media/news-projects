<template>

    <div class="openingwpr">
        
        <div class="fontPreload">
            <ul>
                <li>700</li>
                <li>550</li>
            </ul>

            <ul>
                <li>截至 2018 年 7 月</li>
                <li>30,667</li>
            </ul>

            <ol>
                <li>台北市</li>
                <li>新北市</li>
                <li>台中市</li>
            </ol>
        </div>
        
        
        <canvas id="openingLandscape" width="1488" height="1116"></canvas>    

    </div>

</template>

<script>

import {drawOpeningLandscape} from './js/drawOpening.js';

export default {

  data: function() {
      return {

        openingLandscape: null,    

      }
  },

  props: {
    wwidth: Number,
    wheight: Number
  },

  watch: {
    wwidth: function () {
      this.setCanvasSize();
    }

  },

  methods: {

      drawOpeningLandscape,

      setCanvasSize: function(){

        if(this.wheight / this.wwidth > 0.75){

            this.openingLandscape.style.width = this.wwidth * 0.9 + 'px';
            this.openingLandscape.style.height = this.wwidth * 0.9 * 0.75 + 'px';
        
        } else {
     
            this.openingLandscape.style.width = this.wheight * 0.9 / 0.75 + 'px';
            this.openingLandscape.style.height = this.wheight * 0.9 + 'px';
        }

      },

  },

  mounted: function(){

      const FontFaceObserver = require('fontfaceobserver');

      this.openingLandscape = document.getElementById('openingLandscape');

      this.setCanvasSize();      
      
      this.drawOpeningLandscape(FontFaceObserver);

  }

};
</script>

<style scoped>
.openingwpr {width:100%; height:100vh;
margin:0 auto; display:flex; justify-content:center; align-items:center;
background-color:#fbdfdb;
}

.fontPreload {display:none;}


</style>

