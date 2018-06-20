<template>

    <div class="openingwpr">
        
        <div class="fontPreload">
            <ul id="board1">
                <li>700</li>
                <li>550</li>
            </ul>

            <ul id="board2">
                <li>截至 2018 年 7 月</li>
                <li>30,667</li>
            </ul>

            <ol id="board3">
                <li>台北市</li>
                <li>新北市</li>
                <li>台中市</li>
            </ol>
        </div>        
        
        <div id="openingwprL" class="canvaswpr">
            <canvas id="openingLandscape" width="1488" height="1116"></canvas>
            <div class="btn-scrolldown"></div>
        </div>          

        <div id="openingwprP" class="canvaswpr">
            <canvas id="openingPortrait" width="1032" height="1290"></canvas> 
            <div class="btn-scrolldown"></div>
        </div>  
          

    </div>

</template>

<script>

import { throttle } from 'lodash'

import {
    setCanvasSize,
    drawOpeningLandscape,
    drawOpeningPortrait
} from './js/drawOpening.js';

export default {

  data: function() {
      return {

        openingwprL: null,
        openingwprP: null,

        openingLandscape: null, 
        openingPortrait: null   

      }
  },

  props: {

  },

  watch: {

  },

  methods: {    

      setCanvasSize,
      drawOpeningLandscape,
      drawOpeningPortrait

  },

  mounted: function(){

    const FontFaceObserver = require('fontfaceobserver');
    const typekitFont = new FontFaceObserver('source-han-sans-traditional');

    this.openingwprL = document.getElementById('openingwprL');
    this.openingwprP = document.getElementById('openingwprP');

    this.openingLandscape = document.getElementById('openingLandscape');
    this.openingPortrait = document.getElementById('openingPortrait');

    this.setCanvasSize();

    const resizeThrottle = throttle(this.setCanvasSize,300,{
        'leading': false
    });

    window.addEventListener('resize',() => {

        resizeThrottle();

    }, false);
    
    this.drawOpeningLandscape(typekitFont);
    this.drawOpeningPortrait(typekitFont);     

  }

};
</script>

<style scoped>
.openingwpr {width:100%; height:100vh; position:relative;
margin:0 auto; display:flex; justify-content:center; align-items:center;
background-color:#fbdad8;
}

.fontPreload {display:none;}

/* ---------- Canvas ---------- */
.canvaswpr {position:relative;}
.canvaswpr canvas {width:100%; height:100%;}

#openingwprL {display:block;}
#openingwprP {display:none;}

.btn-scrolldown {position:absolute; right:0; bottom:0;
cursor:pointer; border-radius:10px;
/* background-color:rgba(42,255,0,0.3); */
}
#openingwprL .btn-scrolldown {width:30%; height:18%; right:3%;}
#openingwprP .btn-scrolldown {width:20%; height:13%; right:6%;}

@media screen and (max-width: 1000px) {

    .openingwpr {height:auto; padding:50px 0;}

    /* ---------- Canvas ---------- */
    #openingwprL {display:none;}
    #openingwprP {display:block;}

}

</style>

