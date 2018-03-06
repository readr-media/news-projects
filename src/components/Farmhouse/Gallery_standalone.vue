<template>
<section class="gallery">

<div id="gallery">
	<div class="section">
        <comparison></comparison>
        <div class="continue"></div>
    </div>

	<div class="section" v-for="item in imgSrc" :key="item.id">
        <div class="imgwpr" v-bind:style="{ backgroundImage: 'url(' + item.url + ')' }">
            <!-- <img v-bind:src="item.url" /> -->
            <div class="gallery--desc">
                <div class="innerwpr">{{item.description}}</div>
            </div>
            <div class="continue"></div>
        </div>        
    </div>

    <div class="section fp-auto-height" id="footer">
        <ending></ending>
    </div>
    
</div>

<progress value="0"></progress>

<div id="galleryOpening">
<!-- <div class="mobileCenter"> -->
<div class="intro">
    <h1>《宜蘭田中央》<br />張良一攝影專題</h1>
    <p>在宜蘭，總是可以看見有著竹林環繞，如小島般浮在稻田的紅瓦厝。一座又一座的竹林稻子海浮島，因應自然環境而生，從冬尾注滿田水時倒映著天光雲影，到初春的青綠綠再到盛夏稻穗滿滿的黃澄澄，四時風景轉變，很令人動容。</p>
    <p>只是，現在的蘭陽平原在傳統綠竹林紅磚厝之外，更多的是，一棟比一棟還誇張的宅邸，有西班牙式的紅瓦石屋、有藍白相間的愛琴海式，或是瀰漫著熱帶氣息的峇里島風農舍，個個極盡絢麗！宜蘭農地地景快速翻轉，目不暇給，每每讓人有不知身在何處的錯覺！</p>

    <div class="author">
        <h4>作者簡介</h4>
        <p>張良一，長期關注土地與農業議題，曾任中央社、中國時報、蘋果日報攝影記者，亦曾舉辦《站在田中央》攝影個展，現為自由攝影師。此處所呈現的影像，為張良一以宜蘭農舍為主題，多年來陸續拍攝發表的《田中央》攝影系列，此為節選之作。</p>
    </div>

    <div id="start"></div>
</div>
<!-- </div> -->
</div>

</section>
</template>

<script>

import imgSrc from './data/gallery.json';
import comparison from './ImageComparison.vue';
import ending from './Ending.vue';

export default {
    components: {
        'comparison': comparison,
        'ending': ending
    },
    data (){
        return {
            imgSrc: imgSrc
        }
    },    
    methods: {

        setFullpage: function(){

            var progressBar = $('progress');

            // Set the Max attr for the first time
            progressBar.attr({
                value: 1,
                max: $('div.section').length
            });
 
            $('#gallery').fullpage({
                scrollingSpeed: 600,
                scrollOverflow: true,
                fitToSection: false,
                css3: true,
                scrollOverflowOptions: {
                    mouseWheelSpeed: 20
                },
                afterLoad: function(anchorLink, index) {
                    // console.log('afterLoad', index);  
                    // var loadedSection = $(this).next();
                    // //FIRE SCRIPT
                    // $(this).smartBackgroundImage($(this).data('src'));
                    // $(this).next().smartBackgroundImage($(this).next().data('src'));
                },
                onLeave: function(index, nextIndex, direction){
                    var leavingSection = $(this);

                    // console.log('scroll to ', nextIndex);
                    // ga('send', 'event', 'projects', 'scroll', 'scroll to '+nextIndex);

                    if(direction =='down'){
                        progressBar.animate({
                            value: nextIndex
                        }, 600);
                    } else if(direction == 'up'){
                            progressBar.animate({
                                value: nextIndex
                            }, 600);
                        }
                } //onLeave
            });

            $("html").addClass("normal");
            $(".continue").addClass("show");

        }

    },
    mounted: function(){

        window.$ = require('jquery');
        window.jQuery = require('jquery');
        require('./util/scrolloverflow.js');
        require('fullpage.js');

        if (process.browser) {            

            let $trigger = $("#start");
            let $opening = $("#galleryOpening");
            let fullPageinit = this.setFullpage;

            $trigger.click(function(){
                $opening.addClass("hide");
                fullPageinit();
            });

            // Next Page
            $('.continue').on('click', function() {
                $.fn.fullpage.moveSectionDown();
            });

        }




    }

}
</script>

<style>
html {overflow:hidden;}
html.normal {overflow:visible;}

.comparison-separator,
.comparison-item__label,
.compare--desc {opacity:0;}

.normal .comparison-separator,
.normal .comparison-item__label,
.normal .compare--desc {opacity:1;}

.compare--desc .innerwpr,
.gallery--desc .innerwpr,
.intro {width:70%; padding:0 30px; max-width:700px;}

@media screen and (max-width: 800px) {
    /* html {overflow:visible;} */
}
</style>

<style scoped>

@import './style/jquery.fullPage.css';

.gallery {padding:0;
background-color:#000;
}

.section {width:100%; height:100vh; position:relative; z-index:1000;
background-color:#000;
}
.imgwpr {width:100%; height:100vh; 
/* padding-top:10px; */
box-sizing:border-box; position:relative;
display:flex; justify-content:center; align-items:center;
background-size:contain; background-position:center center;
background-repeat:no-repeat;
}
/* .imgwpr img {max-width:100%; max-height:100%;} */

.gallery--desc {width:100%;
position:absolute; left:0; bottom:0;
display:flex; justify-content:center; align-items:center;
padding-bottom:90px;
}
.gallery--desc .innerwpr {
font-size:16px; text-shadow:0 1px 1px rgba(0, 0, 0, 0.8);
color:#fff; text-align:center; line-height:1.5;
}

/* opening */
#galleryOpening {position:fixed; left:0; top:0; z-index:9999;
width:100%; height:100%; 
color:#fff; text-align:center; text-shadow:0 1px 4px rgba(0,0,0,0.4);
background-color:rgba(0,0,0,0.7);
display:flex; justify-content:center; align-items:center;
transition:600ms; transition-property:top;
}
#galleryOpening.hide {top:-100vh; pointer-events:none;}

/* #gallery {pointer-events:none;} */

.intro {font-size:16px;}
.intro p {text-align:center; color:rgba(255,255,255,0.8);}

#galleryOpening h1 {margin-top:0;
font-size:42px; letter-spacing:1px; line-height:1.4; font-weight:400;
}
#galleryOpening h4 {
font-size:24px; letter-spacing:1px; line-height:1; font-weight:400;
}

.author {margin:40px 0;}
.author h4 {font-size:24px;}
.author p {margin-top:15px;}

#start {width:60px; height:60px; margin:0 auto; cursor:pointer;
border-radius:50%;
background-color:#273947;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-size:70px auto; background-position:16px -598px;
background-repeat:no-repeat;
}
#start:hover {background-color:#76c2ac; background-position:16px -722px;}

.continue {width:50px; height:50px; margin:0 auto; cursor:pointer;
border-radius:50%;
/* background-color:#273947; */
position:absolute; left:50%; bottom:25px; z-index:9000;
margin-left:-25px;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-size:60px auto; background-position:13px -514px;
background-repeat:no-repeat;
opacity:0;
}
.continue.show {opacity:1;}
/* .continue:hover {background-color:#76c2ac; background-position:13px -620px;} */

/* footer */
/* #footer {padding-bottom:100px;} */


/* progress bar */
progress {position:fixed; left:0; bottom:0;
width:100%; height:10px;
-webkit-appearance:none; -moz-appearance:none; appearance:none;
border:none; background-color:#273947;
color:#79cfa8;
z-index:999;
display:none;
}
html.normal progress {display:block;}
progress::-webkit-progress-bar {background-color:#273947;}
progress::-webkit-progress-value {background-color:#79cfa8;}
progress::-moz-progress-bar {background-color: #79cfa8;}

@media screen and (max-width: 800px) {

    #galleryOpening {display:block; overflow-y:auto;
        line-height:1.7;
    }
    /* .mobileCenter {width:100%; height:100%; overflow-y:auto;
    display:flex; justify-content:center; align-items:center;
    } */
    
    .compare--desc .innerwpr,
    .gallery--desc .innerwpr,
    .intro {width:auto; padding:0 10px; max-width:none;}

    .intro {padding:25px 10px;}
    .author {margin:20px 0;}

    #galleryOpening h1 {font-size:30px; margin-bottom:0;}
    .intro p {margin-top:10px;}
    #galleryOpening h4 {font-size:22px;}

    .continue {bottom:10px;}

    .gallery--desc {padding-bottom:60px;}

}

</style>