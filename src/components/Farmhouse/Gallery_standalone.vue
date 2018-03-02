<template>
<section class="gallery" id="wrapper">

<div id="gallery">
	<div class="section">
        <comparison></comparison>
    </div>

	<div class="section" v-for="item in imgSrc" :key="item.id">
        <div class="imgwpr">
            <img v-bind:src="item.url" />
            <div class="gallery--desc">
                <div class="innerwpr">{{item.description}}</div>
            </div>
        </div>
    </div>

    <div class="section" id="footer">
        <!-- <extend></extend> -->
    </div>
</div>

<progress value="0"></progress>

</section>
</template>

<script>

import imgSrc from './data/gallery.json';
import comparison from './ImageComparison.vue';
// import extend from './Extend.vue';

export default {
    components: {
        'comparison': comparison,
        // 'extend': extend
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

        }

    },
    mounted: function(){

        window.$ = require('jquery');
        require('fullpage.js');

        // console.log($.fn.fullpage)

        if (process.browser) {
            this.setFullpage();
        }


    }

}
</script>

<style>
#footer {height:auto !important;}
#footer .fp-tableCell {height:auto !important;}
.extend--entry.gallery {display:none;}
</style>

<style scoped>

@import './style/jquery.fullPage.css';

.gallery {padding:0;
background-color:#000;
}

.section {width:100%; height:100vh; position:relative; z-index:1000;
background-color:#000;
}
.imgwpr {width:100%; height:100vh; padding-top:15px;
box-sizing:border-box;
display:flex; justify-content:center; align-items:center;
}
.imgwpr img {max-width:100%; max-height:100%;}

.gallery--desc {width:100%; height:30vh;
position:absolute; left:0; bottom:0;
display:flex; justify-content:center; align-items:center;
}
.gallery--desc .innerwpr {width:70%;
font-size:16px; text-shadow:0 1px 1px rgba(0, 0, 0, 0.8);
color:#fff; text-align:center;
}


progress {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 15px;
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;
    border: none;
    background-color: #FFF;
    color: #30509E;
    z-index: 999;
}
progress::-webkit-progress-bar {
    background-color: #FFF;
}
progress::-webkit-progress-value {
    background-color: #30509E;
}
progress::-moz-progress-bar {
    background-color: #30509E;
}


</style>