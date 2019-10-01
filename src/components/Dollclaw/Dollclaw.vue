<template>

<div id="mainWrapper" class="dollclaw">

<app-logo class="no-sprite" href="https://www.readr.tw/" top="20px" left="20px" bgImage="/proj-assets/dollclaw/images/logo_readr.png"></app-logo>
<app-share :shareUrl="shareLink" top="20px" right="20px" bgColor="#544356" direction="down"></app-share>

<div class="deco-claw">
  <div class="centerwpr">
    <!-- <div class="deco-claw--pic"></div> -->
    <div class="deco-claw__container">
      <div class="claw">
        <div class="claw__line">
          <div class="fixed"></div>
          <div class="dynamic" :style="{ height: `calc((100vh - 323px) * ${clawHeightPercentage})` }"></div>
        </div>
        <div class="claw__main"></div>
      </div>
      <img :src="[ scrollPercentage > 0.5 ? '/proj-assets/dollclaw/images/deco-doll1.png' : '/proj-assets/dollclaw/images/deco-doll2.png' ]"
        class="deco-claw--doll"
        :style="[ scrollPercentage > 0.5 ? { bottom: `calc((100vh - 313px) * ${1 - clawHeightPercentage})`  } : { botom: '10px' } ]">
      <img v-show="scrollPercentage > 0.5"
        src="/proj-assets/dollclaw/images/deco-cloud.png"
        class="deco-claw--cloud"
        :style="[ scrollPercentage > 0.5 ? { bottom: `calc( (100vh - 313px) * ${1 - clawHeightPercentage} - 50px)`  } : { botom: '10px' } ]">
    </div>
  </div>
</div>

<dc-opening></dc-opening>
<dc-article></dc-article>

</div>

</template>

<script>
// common
import { READR_SITE_URL } from '../../constants';
import { currentYPosition } from 'kc-scroll'
import titleMeta from '../../util/titleMeta';
import Logo from '../Logo.vue';
import Share from '../Share.vue';

import { throttle } from 'lodash'
import axios from 'axios'

// section
import dcOpening from './dcOpening.vue';
import dcArticle from './dcArticle.vue';

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
  },  

  metaInfo() {
    let ogTitle = '娃娃機夾什麼';
    let description = '好奇心的起源，是夾娃娃機店用著驚人的速度取代我熟悉的街景。本來以為又是一個「蛋塔風潮」，直到身邊開始出現了沉迷的朋友，我才發現這次好像有點不一樣。這個產業似乎自成了一個神秘的地下社會，每個人各有自己的角色分工，讓我決定一探究竟⋯⋯';
    let metaUrl = 'dollclaw';
    let ogImage = 'dollclaw/images/og-image.jpg';

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
      openingPortrait: null, 
      bodyHeight: 0,
      scrollPercentage: 0,
      clawHeightPercentage: 0,
    };
  },

  props: {},

  watch: {},

  computed: {},

  methods: {

    setCanvasSize,
    drawOpeningLandscape,
    drawOpeningPortrait,

    handleScroll () {
      if (this.$store.state.viewport[0] > 1000) {
        let percent = currentYPosition() / (this.bodyHeight - this.$store.state.viewport[1])
        if (percent > 1) { percent = 1 } 
        else if (percent < 0) { percent = 0 }
        this.scrollPercentage = percent
        if (percent > 0.5) { this.clawHeightPercentage = 1 - (percent - 0.5) * 2 }
        else { this.clawHeightPercentage = percent * 2 }
      }
    },
  },

  beforeMount: function() {
    this.bodyHeight = document.querySelector('body').offsetHeight || 0
  },

  mounted: function() {
    window.addEventListener('scroll', this.handleScroll)
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

    axios.get('/proj-assets/dollclaw/data/data.json')
    .then((res) => {
      const source = res.data
      const openingData = {
        'price_conch': source.price_conch,
        'price_waist': source.price_waist,
        'date': `截至 ${source.date[0]} 年 ${source.date[1]} 月`,
        'total': source.total,
        'popular_city': source.popular_city
      } 
      const preLoadString = `${openingData.date} ${openingData.total}${openingData.popular_city[0]} ${openingData.popular_city[1]} ${openingData.popular_city[2]}`
      document.getElementById('fontPreload').textContent = preLoadString
      // 文章中的價格
      // document.getElementById('price_conch').textContent = openingData.price_conch;
      // document.getElementById('price_waist').textContent = openingData.price_waist;
      setTimeout(() => {
        // canvas 中的文字內容
        drawOpeningLandscape(this,typekitFont,openingData)
        drawOpeningPortrait(this,typekitFont,openingData)
      }, 0)
    })
    .catch(() => {
      console.log('get data fail')
    })

  },

  beforeDestroy: function() {
    window.removeEventListener('scroll', this.handleScroll)
  }
};
</script>

<style src="./style/common.css"></style>

<style>
/* ---------- Aside illustration ---------- */
.deco-claw {position:fixed; width:100%; left:0; top:0; z-index:999;}
.deco-claw--pic {width:83px; height:393px;
position:absolute; right:-83px; top:-45px;
background-image:url("/proj-assets/dollclaw/images/deco-claw.png");
background-size:100% auto; background-repeat:no-repeat;
}
.deco-claw__container {
  width:85px;
  height:100vh;
  position:absolute; right:-85px;
}
.claw {
  /* display: flex; */
  /* flex-direction: column; */
  /* position: relative; */
  height: calc(100% - 58px);
  /* padding-bottom: 58px; */
}
.claw__line {
  /* flex: 1; */
  background-size: 9px 6px;
  background-image: url(/proj-assets/dollclaw/images/deco-rope.png);
  background-repeat: no-repeat repeat;
  background-position: 50% 50%;
}
.claw__line .fixed{
  height: 150px;
}
.claw__line .dynamic{
  height: calc((100vh - 323px) * 0);
}
.claw__main {
  position: relative;
  top: -4px;
  width: 85px;
  height: 115px;
  background-image:url("/proj-assets/dollclaw/images/deco-clawpart.png");
  background-size:69px 115px; background-repeat:no-repeat;
  background-position: 50% 50%;
}
.deco-claw--doll {
  position:absolute; left:10px; bottom:10px;
  width:65px;
  height:auto;
  width:85px; left:-3px;
}
.deco-claw--cloud {
  position:absolute; left:12px; bottom:-10px;
  width:77px;
  height:auto;
}
/* ---------- RWD ---------- */
@media screen and (max-width: 1000px) {
  .deco-claw {display:none;}
}
</style>
