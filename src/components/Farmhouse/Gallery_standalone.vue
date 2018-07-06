<template>
<section class="gallery">

<div id="gallery">

    <div class="section fp-auto-height">
        <div id="galleryOpening">
            <div class="intro">
                <h1>《宜蘭田中央》</h1>
                <p>在宜蘭，總是可以看見有著竹林環繞，如小島般浮在稻田的紅瓦厝。一座又一座的竹林稻子海浮島，因應自然環境而生，從冬尾注滿田水時倒映著天光雲影，到初春的青綠綠再到盛夏稻穗滿滿的黃澄澄，四時風景轉變，很令人動容。</p>
                <p>只是，現在的蘭陽平原在傳統綠竹林紅磚厝之外，更多的是，一棟比一棟還誇張的宅邸，有西班牙式的紅瓦石屋、有藍白相間的愛琴海式，或是瀰漫著熱帶氣息的峇里島風農舍，個個極盡絢麗！宜蘭農地地景快速翻轉，目不暇給，每每讓人有不知身在何處的錯覺！</p>

                <div class="author">
                    <h4>作者簡介</h4>
                    <p>張良一，長期關注土地與農業議題，曾任中央社、中國時報、蘋果日報攝影記者，亦曾舉辦《站在田中央》攝影個展，現為自由攝影師。此處所呈現的影像，為張良一以宜蘭農舍為主題，多年來陸續拍攝發表的《田中央》攝影系列，此為節選之作。</p>
                </div>                
                <div id="start" class="continue" @click="clickGA('next1')"></div>
            </div>            
        </div>

    </div>

	<div class="section fp-noscroll fp-auto-height-responsive">
        <comparison></comparison>
        <!-- <div class="continue"></div> -->
    </div>

	<div class="section fp-noscroll fp-auto-height-responsive" v-for="(item, index) in imgSrc" :key="item.id">
        <div class="imgwpr" v-bind:style="{ backgroundImage: 'url(' + item.url + ')' }">
            <div class="gallery--desc">
                <div class="innerwpr">{{item.description}}</div>
                <div class="continue" @click="clickGA(`next${index + 3}`)"></div>
            </div>            
        </div>        
    </div>

    <div class="section" id="footer">
        <ending></ending>
        <div class="footer--btnwpr">
            <div id="prevBtn"></div>
        </div>
    </div>
    
</div>

<progress value="0"></progress>

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
            let maxIndex = 0
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
                normalScrollElements: '#galleryOpening',
                paddingBottom: '10px',
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
                    if(direction =='down'){
                        if (maxIndex < nextIndex && nextIndex < 14) {
                            maxIndex = nextIndex
                            window.ga('send', 'event', 'projects', 'scroll', `scroll to ${nextIndex}`, { nonInteraction: false })
                        }
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

            // $("html").addClass("normal");
            // $(".continue").addClass("show");
            // console.log(window.iScroll);

        },

        clickGA (name) {
            window.ga('send', 'event', 'projects', 'click', name, { nonInteraction: false })
        },

    },
    mounted: function(){
        window.jQuery = require('jquery')
        require('./util/scrolloverflow.js')
        require('./util/jquery.fullpage.min.js')

        this.setFullpage();

        // Next Page
        $('.continue').on('click', function() {
            $.fn.fullpage.moveSectionDown();
        });

        $('#prevBtn').on('click', function() {
            $.fn.fullpage.moveSectionUp();
        });




    }

}
</script>

<style>
@import './style/jquery.fullPage.css';

/* .gallery--desc .innerwpr {width:70%; padding:0 30px; max-width:700px;
margin:0 auto;
} */
/* .intro {padding:30px 10px; max-width:660px;} */




.gallery {padding:0;
background-color:#000;
}

.section {width:100%; height:100vh; position:relative; z-index:1000;
background-color:#000;
}
.imgwpr {width:100%; height:100vh; 
box-sizing:border-box; position:relative;
display:flex; justify-content:center; align-items:flex-end;
background-size:contain; background-position:center center;
background-repeat:no-repeat;
}

.gallery--desc {width:100%; padding-bottom:10px; position:relative;}
.gallery--desc .innerwpr {
width:70%; padding:0 30px; max-width:700px; margin:0 auto;    
font-size:16px; text-shadow:0 1px 1px rgba(0, 0, 0, 0.8);
color:#fff; text-align:center; line-height:1.5;
}

.comparison-item .gallery--desc {
/* width:100%; */
position:absolute; left:0; bottom:0;
display:flex; justify-content:center; align-items:center;
flex-direction:column;
/* padding-bottom:90px; */
}


/* opening */
#galleryOpening {
width:100%; min-height:100vh;
color:#fff; text-align:center; text-shadow:0 1px 4px rgba(0,0,0,0.4);
display:flex; justify-content:center; align-items:center;
background-image:url("/proj-assets/farmhouse/images/gallery/gallery-09.jpg");
background-size:cover; background-repeat:no-repeat;
}
#galleryOpening:before {content:""; display:block; width:100%; height:100%;
position:absolute; left:0; top:0;
background-color:rgba(0,0,0,0.5);
}

.intro {padding:30px 10px; max-width:660px;
font-size:16px; position:relative;
}
.intro p {margin-top:10px;}

#galleryOpening h1 {margin-top:0; margin-bottom:15px;
font-size:42px; letter-spacing:1px; line-height:1.4; font-weight:400;
}
#galleryOpening h4 {
font-size:24px; letter-spacing:1px; line-height:1; font-weight:400;
}

.author {margin-top:40px;}
.author h4 {font-size:24px;}

.continue {width:50px; height:50px; cursor:pointer;
position:relative; margin:0 auto 0 auto;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-size:60px auto; background-position:13px -515px;
background-repeat:no-repeat;
}

#start {width:60px; height:60px;
border-radius:50%; background-color:#273947;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-size:70px auto; background-position:16px -598px;
margin:20px auto 0 auto;
}
#start:hover {background-color:#76c2ac; background-position:16px -722px;}

.extra {min-height:580px;}
.extend .centerwpr {padding:20px !important;}
.extra .centerwpr {padding:20px !important;}

.footer--btnwpr {position:relative; padding-bottom:20px;
background-color:#273947;
}
#prevBtn {width:60px; height:60px; cursor:pointer; position:relative;
border-radius:50%; background-color:#76c2ac;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-size:70px auto; background-position:16px -600px;
margin:0 auto;
transform:rotate(180deg);
}


/* progress bar */
progress {position:fixed; left:0; bottom:0;
width:100%; height:10px;
-webkit-appearance:none; -moz-appearance:none; appearance:none;
border:none; background-color:#273947;
color:#79cfa8;
z-index:999;
}

progress::-webkit-progress-bar {background-color:#273947;}
progress::-webkit-progress-value {background-color:#79cfa8;}
progress::-moz-progress-bar {background-color: #79cfa8;}

@media screen and (max-width: 800px) {

    #galleryOpening {
        line-height:1.7;
    }
    
    .gallery--desc {padding-bottom:0;}
    .gallery--desc .innerwpr {
        width:auto; padding:0 10px; max-width:none;
        font-size:15px; line-height:1.4;
    }    

    .author {margin-top:20px;}

    #galleryOpening h1 {font-size:30px; margin-bottom:0;}
    .intro p {margin-top:10px; font-size:15px; line-height:1.4;}
    #galleryOpening h4 {font-size:22px;}

    .fp-tableCell {vertical-align:top;}
    .imgwpr {height:90vh; background-position:center 74px;}
    /* .comparisonwpr {height:90vh;} */   

    .extend .centerwpr {padding:20px !important;}
    .extra .centerwpr {padding:20px !important;}
    /* .extra .centerwpr {padding-left:30px !important; padding-right:30px !important;} */


}

</style>