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
background-color:#fcdcd7; overflow:hidden;
}

.openingwpr:before {content:""; display:block; width:100%; height:35vh;
position:absolute; left:0; bottom:0;
background-color:#fcd5cd;
}

.openingwpr:after {content:""; display:block; width:0; height:0;
position:absolute; left:0; bottom:35vh;
border-style:solid; border-width:0 0 25vh 100vw;
border-color:transparent transparent #fcd5cd transparent;
}

.fontPreload {display:none;}

/* ---------- Canvas ---------- */
.canvaswpr {position:relative; z-index:100;}
.canvaswpr canvas {width:100%; height:100%;
position:absolute; left:0; top:0;
}

#openingwprL {display:none;
background-image:url("/proj-assets/dollclaw/images/opening-landscape.png");
background-size:100% auto;
}
#openingwprP {display:none;
background-image:url("/proj-assets/dollclaw/images/opening-portrait.png");
background-size:100% auto;
}

.btn-scrolldown {position:absolute; right:0; bottom:0;
cursor:pointer; border-radius:10px;
}
#openingwprL .btn-scrolldown {width:30%; height:18%; right:3%;}
#openingwprP .btn-scrolldown {width:20%; height:13%; right:6%;}

@media screen and (min-width: 1001px) {

    /* ---------- Canvas ---------- */
    #openingwprL {display:block;}
    #openingwprP {display:none;}

}

@media screen and (max-width: 1000px) {

    .openingwpr {height:auto; min-height:100vh; padding:50px 0;}

    /* ---------- Canvas ---------- */
    #openingwprL {display:none;}
    #openingwprP {display:block;}

}

</style>

