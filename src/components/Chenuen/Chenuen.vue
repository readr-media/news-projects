<template>

<!-- /project/chenuen/page -->
<div v-if="getParams == 'page'">

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`"></share>

  <page></page>
</div>

<!-- /project/chenuen/pagem 手機版暫時 -->
<div v-else-if="getParams == 'pagem'">

  <logo :top="`2px`" :left="`6px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`2px`" :left="`54px`" :bgColor="`#b1adca`"></share>

  <pagem></pagem>
</div>

<!-- Homepage -->
<div v-else>

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`"></share>

  <div class="outerwpr">
    <home></home>
    <page></page>
  </div>  

</div>

</template>

<script>
//common
import { SITE_URL } from "../../constants";
import titleMeta from "../../util/titleMeta";
import Logo from '../Logo.vue';
import Share from '../Share.vue';

//plugins
import _ from 'lodash';

// pages
import home from './Home.vue';
import page from './Page.vue';
import pagem from './Pagem.vue';

export default {

  name: "ChenUenProject",

  mixins: [titleMeta],

  components: {
    'logo': Logo,
    'share': Share,

    'home': home,
    'page': page,
    'pagem': pagem
  },

  computed: {
    getParams() {
      //取得網址列參數
      return _.get(this.$route, "params.params");
    }
  },

  data: function() {
    return {
      shareLink: `${SITE_URL}chenuen`,
      // shareLinkOpinion: `${SITE_URL}farmhouse/opinion`,
      // shareLinkFaq: `${SITE_URL}farmhouse/faq`,
      // shareLinkGallery: `${SITE_URL}farmhouse/gallery`
      currentDevice: ''
    };
  },

  metaInfo() {
    let ogTitle = "鄭問專題";
    let description = "鄭問專題";
    let metaUrl = "chenuen";
    let ogImage = "chenuen/images/og.jpg";

    return {
      title: ogTitle,
      description: description,
      metaUrl: metaUrl,
      metaImage: ogImage
    };
  },

  methods: {

    showGallery: function(){
      document.querySelector('.pagewpr').classList.add('show');
    }

  },

  created () {    
    //current device
    this.currentDevice = this.$store.state.isMobile ? 'mobile' : 'desktop';
    console.log("device: " + this.currentDevice);
  },

  mounted: function() {

    let homewpr = document.querySelector('.homewpr');
    let pagewpr = document.querySelector('.pagewpr');

    document.getElementById('showGallery').addEventListener('click',() => {
      this.showGallery();
    });

    homewpr.addEventListener('wheel',(e) => {

      console.log(e.deltaY);
    
      if (e.deltaY > 0 && homewpr.classList.contains('up')){
        pagewpr.classList.add('show');  
        // return false;      
      }
      
    });

    pagewpr.addEventListener('wheel',(e) => {
    
      if (e.deltaY < 0){
        pagewpr.classList.remove('show');
        // return false; 
      }
      
    });


  }

};
</script>

<style>
@import './style/animate.css';
@import './style/common.css';

/* .pagewpr {display:block;}
.fp-tableCell {display:flex; width:100%;} */
</style>

<style scoped>
.outerwpr {width:100%; height:100vh; position:relative; overflow:hidden;}
</style>
