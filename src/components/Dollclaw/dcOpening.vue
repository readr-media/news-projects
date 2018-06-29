<template>

    <!-- <div class="openingOuter"> -->
    <div class="openingwpr">
        
        <div id="fontPreload"></div>        
        
        <div id="openingwprL" class="canvaswpr">
            <canvas id="openingLandscape" width="1488" height="1116"></canvas>
            <div class="btn-scrolldown"></div>
        </div>          

        <div id="openingwprP" class="canvaswpr">
            <canvas id="openingPortrait" width="1032" height="1290"></canvas> 
            <div class="btn-scrolldown"></div>
        </div>            
        
    </div>

    <!-- <div class="opening--footer"></div> -->
    <!-- </div> -->

</template>

<script>

// import { throttle } from 'lodash'
// import superagent from "superagent";

// import {
//     setCanvasSize,
//     drawOpeningLandscape,
//     drawOpeningPortrait
// } from './js/drawOpening.js';

export default {

  data: function() {
      return {

        // openingwprL: null,
        // openingwprP: null,

        // openingLandscape: null, 
        // openingPortrait: null   

      }
  },

  props: {

  },

  watch: {

  },

  methods: {    

    //   setCanvasSize,
    //   drawOpeningLandscape,
    //   drawOpeningPortrait

  },

  mounted: function(){

    // const FontFaceObserver = require('fontfaceobserver');
    // const typekitFont = new FontFaceObserver('source-han-sans-traditional');

    // this.openingwprL = document.getElementById('openingwprL');
    // this.openingwprP = document.getElementById('openingwprP');

    // this.openingLandscape = document.getElementById('openingLandscape');
    // this.openingPortrait = document.getElementById('openingPortrait');

    // this.setCanvasSize();

    // const resizeThrottle = throttle(this.setCanvasSize,300,{
    //     'leading': false
    // });

    // window.addEventListener('resize',() => {

    //     resizeThrottle();

    // }, false);

    // superagent.get('/proj-assets/dollclaw/data/data.json')
    //     .then((res) => {
    //         // data for opening
    //         const source = JSON.parse(res.text);

    //         const openingData = {
    //             'price_conch': source.price_conch,
    //             'price_waist': source.price_waist,
    //             'date': `截至 ${source.date[0]} 年 ${source.date[1]} 月`,
    //             'total': source.total,
    //             'popular_city': source.popular_city
    //         }    

    //         const preLoadString = 
    //         `${openingData.date} ${openingData.total} 
    //         ${openingData.popular_city[0]} ${openingData.popular_city[1]} ${openingData.popular_city[2]}`;

    //         document.getElementById('fontPreload').textContent = preLoadString;

    //         drawOpeningLandscape(this,typekitFont,openingData);
    //         // drawOpeningPortrait(this,typekitFont,openingData);         

    //     })
    //     .catch((err) => {
    //         console.log('get data fail');
    //     });

  }

};
</script>

<style scoped>
/* .openingOuter {position:relative;} */

.openingwpr {width:100%; height:100vh; position:relative; z-index:1000;
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

/* .opening--footer {position:absolute; width:100%; height:60px; overflow:hidden;
left:0; bottom:-60px;
}
.opening--footer:before {content:""; display:block; width:0; height:0;
position:absolute; left:0; bottom:0;
border-style:solid; border-width:60px 100vw 0 0;
border-color:#fcd5cd transparent transparent transparent;
} */

#fontPreload {width:0; height:0; overflow:hidden;
position:fixed; left:0; top:0;
}

/* ---------- Canvas ---------- */
.canvaswpr {position:relative; z-index:100;}
.canvaswpr canvas {width:100%; height:100%;
position:absolute; left:0; top:0;
}

#openingwprL {display:none;
background-image:url("/proj-assets/dollclaw/images/opening-landscape.png");
background-size:100% auto; background-repeat:no-repeat;
background-position:center center;
}
#openingwprP {display:none;
background-image:url("/proj-assets/dollclaw/images/opening-portrait.png");
background-size:100% auto; background-repeat:no-repeat;
background-position:center center;
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

