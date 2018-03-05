<template>
<div class="swiperwpr">

<div class="swiper-container" id="swiper">    

    <div class="swiper-wrapper">

        <div class="swiper-slide" v-for="item in imgSrc" :key="item.id">

                <img v-bind:src="item.url" />

        </div>

    </div>    

</div>

<p class="chart--note">宜蘭縣在近年出現許多令人咋舌的豪華農舍。有農民認為無論違建與否，這些農舍多半也沒有維持農地農用，也對農業、農民造成負面影響。但也有人認為，只要可以維持農地農用，農舍怎麼蓋並不是重點。</p>

<div class="swiper-controlwpr">
    <div class="swiper-pagination"></div>
    <div class="swiper-buttonwpr">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</div>

</div>
</template>

<script>

import Swiper from 'swiper';
import imgSrc from './data/swiper.json';

// import comparison from './ImageComparison.vue';


export default {
    components: {

        // 'comparison': comparison

    },
    data (){
        return {
            imgSrc: imgSrc
        }
    },    
    methods: {


    },
    mounted: function(){
        
        var swiper = new Swiper('#swiper', {

            loop: true,
            allowTouchMove: false,

            pagination: {
                el: '.swiper-pagination',
                type: 'custom',
                renderCustom: function (swiper, current, total) {

                    if(current < 10){
                        current = "0" + current;
                    }

                    return '<span class="swiper-pagination-current">' + current + '</span> / ' + total;
                }
            },           

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }

        });       



    }

}
</script>

<style>
.swiper-pagination-current {color:#273744; font-size:50px;}
</style>

<style scoped>
@import './style/swiper.css';

/* .gallery {position:relative;}

.gallery h2 {text-align:center;} */

.swiper-container {margin-top:30px;}
.swiper-wrapper {position:relative; width:100%;}

.swiper-slide {display:flex; align-items:center; justify-content:center;}

.swiper-slide img {max-width:100%; max-height:100%; margin:0 auto;}

.swiper-controlwpr:after {content:""; display:table; clear:both;}

.swiper-pagination {position:relative; left:auto; bottom:auto;
font-size:40px; font-weight:bold; text-align:left; color:#aeaeae;
line-height:1;
display:inline-block; width:auto;
}

.swiper-buttonwpr {float:right;}
.swiper-button-prev,.swiper-button-next {
position:relative; left:auto; right:auto; top:auto; bottom:auto;
margin-top:0; display:inline-block; width:50px; height:50px;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-repeat:no-repeat; background-size:30px auto;
border:3px solid #273947;
}
.swiper-button-prev:hover,.swiper-button-next:hover {
background-color:#273947;    
}

.swiper-button-prev {background-position:13px -104px;
border-right:none;
}
.swiper-button-prev:hover {background-position:13px -179px;}

.swiper-button-next {background-position:13px -142px;}
.swiper-button-next:hover {background-position:13px -217px;}

.chart--note {margin:15px 0; line-height:1.6;}

</style>