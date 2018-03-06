<template>
<div class="map-container">
    <div class="btnwpr">
        <div class="btn poly" v-bind:class="{active:polyActive}" v-on:click="togglePoly">
            <i></i><span class="text">所有農舍</span>
        </div>
        <div class="btn heat" v-bind:class="{active:heatActive}" v-on:click="toggleHeat">
            <i></i><span class="text">交易熱點</span>
        </div>
    </div>
    <div class="mapwpr" id="mapAll"></div>
</div>
</template>

<script>
//所有農舍 GeoJSON polygon
import mapData_all from './data/yilan-geo-min.json';

//實價交易資料 JSON 座標
import mapData_trans from './data/yilan-transaction.json';

//地圖樣式 Night style
import mapStyle from './data/mapStyle-night.json';

//中心點
const mapcenter  = {lat:24.733178, lng:121.732370};

let map;
let dataLayer_all;
let heatmap;

//所有農舍 poly 樣式
let polyStyle = {
    fillColor: 'rgba(0,136,136,0.7)',
    strokeColor: 'rgba(0,136,136,0.7)',
    strokeWeight: 2,
    visible: true
}


export default {
    name: 'allFarmhouseMap',
    data (){
        return {
            polyActive: true,
            heatActive: true
        }
    },
    methods: {
        togglePoly(){
            if(this.polyActive){
                //隱藏圖層
                this.polyActive = false;
                dataLayer_all.setStyle({visible: false});
            } else {
                //顯示圖層
                this.polyActive = true;
                dataLayer_all.setStyle(polyStyle);
            }
        },
        toggleHeat(){
            if(this.heatActive){
                //隱藏圖層
                this.heatActive = false;
                heatmap.setMap(null);
            } else {
                //顯示圖層
                this.heatActive = true;
                heatmap.setMap(map);
            }
        },
        setScene: function(){
            const ScrollMagic = require("scrollmagic");
            const { TweenMax, TimelineMax } = require('gsap');
            require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
            require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');

            let controller = new ScrollMagic.Controller();

            let canvasScene = new ScrollMagic.Scene({
                triggerElement: ".map-container",
                triggerHook: 0.15
            })
            .setClassToggle("#mapAll","active")
            // .addIndicators({name: "nav", colorStart: "red"});

            controller.addScene([
                canvasScene
            ]);

        }

    },
    mounted: function(){

        let mapOptions = {
            zoom: 12,
            center: mapcenter,
            styles: mapStyle,
            mapTypeId: 'terrain'
        };

        map = new google.maps.Map(document.getElementById('mapAll'), mapOptions);

        //所有農舍
        dataLayer_all = new google.maps.Data({map: map});
        dataLayer_all.addGeoJson(mapData_all);
        dataLayer_all.setStyle(polyStyle);

        // 實價交易資料
        var heatmapData = [];  
        
        for(let i =0; i < mapData_trans.results.length; i++){

            let lat = Number(mapData_trans.results[i].geometry.location.lat);
            let lng = Number(mapData_trans.results[i].geometry.location.lng);

            var latLng = new google.maps.LatLng(lat, lng);

            var pushData = {
                location: latLng
            };

            heatmapData.push(pushData);
        }        
        
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            radius: 10,
            maxIntensity: 2,
            opacity: 0.7
        });
        heatmap.setMap(map);

        window.addEventListener('resize', function(event){
            google.maps.event.trigger(map, 'resize');
        });

        if (process.browser) {
            this.setScene();            
        }   
       
    } //mounted

}    
</script>

<style>
#mapAll canvas {opacity:0;
transition:1200ms; transition-property:opacity; 
}
#mapAll.active canvas {opacity:1;}
.gm-style-pbc {background-color:transparent !important;}
</style>

<style scoped>
.map-container {position:relative;}
.mapwpr {position:relative; 
height:100vh; overflow:hidden;
}
.btnwpr {position:absolute; left:0; top:15px; width:100%; 
text-align:center; z-index:200;
}
.btn {width:130px; height:40px;
cursor:pointer; margin:0 5px;
font-size:17px; font-weight:400; color:#273947;
background-color:#c5c5c5; border-radius:25px;
display:inline-flex; justify-content:center; align-items:center;
}
.btn.active {
color:#fff;    
background-color:#ff7b90;
}

.btn i {width:26px; height:26px; display:block; margin-right:6px;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-size:60px auto; background-repeat:no-repeat;
}
.poly i {background-position:-34px 1px;}
.heat i {background-position:-28px -58px;}

.active.poly i {background-position:0 1px;}
.active.heat i {background-position:6px -58px;}

</style>