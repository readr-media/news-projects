<template>

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

</template>

<script>

export default {

  data: function() {
      return { 

      }
  },

  methods: { 

  },

  mounted: function(){

  }

};
</script>

<style scoped>
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

