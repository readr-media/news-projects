<template>

<div id="mainWrapper">

<app-logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/dollclaw/images/logo_readr.png"></app-logo>
<app-share :shareUrl="shareLink" top="20px" right="20px" bgColor="#544356" direction="down"></app-share>

<div class="deco-claw">
  <div class="centerwpr">
    <div class="deco-claw--pic"></div>
  </div>
</div>

<dc-opening></dc-opening>
<dc-article></dc-article>
<dc-footer></dc-footer>

</div>

</template>

<script>
// common
import { READR_SITE_URL } from '../../constants';
import titleMeta from '../../util/titleMeta';
import Logo from '../Logo.vue';
import Share from '../Share.vue';

import { throttle } from 'lodash'
import superagent from "superagent";

// style
import './style/common.css';

// section
import dcOpening from './dcOpening.vue';
import dcArticle from './dcArticle.vue';
import dcFooter from './dcFooter.vue';

// opening
import {
    setCanvasSize,
    drawOpeningLandscape,
    drawOpeningPortrait
} from './js/drawOpening.js';

export default {

  name: 'Dollclaw',

  mixins: [titleMeta],

  components: {
    'app-logo': Logo,
    'app-share': Share,

    'dc-opening': dcOpening,
    'dc-article': dcArticle,
    'dc-footer': dcFooter
  },  

  metaInfo() {
    let ogTitle = '夾娃娃機專題';
    let description = '夾娃娃機專題';
    let metaUrl = 'dollclaw';
    let ogImage = 'dollclaw/images/og.jpg';

    return {
      title: ogTitle,
      description: description,
      metaUrl: metaUrl,
      metaImage: ogImage
    };
  },

  data: function() {
    return {
      shareLink: `${READR_SITE_URL}dollclaw`,

      openingwprL: null,
      openingwprP: null,
      openingLandscape: null, 
      openingPortrait: null 
    };
  },

  props: {},

  watch: {},

  computed: {},

  methods: {

    setCanvasSize,
    drawOpeningLandscape,
    drawOpeningPortrait

  },

  beforeMount: function() {},

  mounted: function() {
    // scroll to content
    document.querySelectorAll('.btn-scrolldown').forEach(element => {
      element.addEventListener('click', () => {

        let offset = document.querySelector('.openingwpr').offsetHeight;

        window.scroll({
          top: offset, 
          left: 0, 
          behavior: 'smooth' 
        });

        },
        false
      );
    });


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

    superagent.get('/proj-assets/dollclaw/data/data.json')
        .then((res) => {
            // data for opening
            const source = JSON.parse(res.text);

            const openingData = {
                'price_conch': source.price_conch,
                'price_waist': source.price_waist,
                'date': `截至 ${source.date[0]} 年 ${source.date[1]} 月`,
                'total': source.total,
                'popular_city': source.popular_city
            }    

            const preLoadString = 
            `${openingData.date} ${openingData.total} 
            ${openingData.popular_city[0]} ${openingData.popular_city[1]} ${openingData.popular_city[2]}`;

            document.getElementById('fontPreload').textContent = preLoadString;

            // 文章中的價格
            document.getElementById('price_conch').textContent = openingData.price_conch;
            document.getElementById('price_waist').textContent = openingData.price_waist;

            setTimeout(() => {

              // canvas 中的文字內容
              drawOpeningLandscape(this,typekitFont,openingData);
              drawOpeningPortrait(this,typekitFont,openingData);

            },0);                     

        })
        .catch((err) => {
            console.log('get data fail');
        });

  }
};
</script>

<style scoped>

/* ---------- Aside illustration ---------- */
.deco-claw {position:fixed; width:100%; left:0; top:0; z-index:999;}
.deco-claw--pic {width:83px; height:393px;
position:absolute; right:-83px; top:-45px;
background-image:url("/proj-assets/dollclaw/images/deco-claw.png");
background-size:100% auto; background-repeat:no-repeat;
}




/* ---------- RWD ---------- */
@media screen and (max-width: 1000px) {

  .deco-claw {display:none;}

}

</style>
