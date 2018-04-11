<template>
<div class="pagewpr">

<div class="header">

    <!-- pagination -->
    <div class="swiper-pagination" id="mFraction"></div>
 
    <div class="swiper-btnwpr">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    

</div>

<div class="swiper-container" id="mGallery">
    <div class="swiper-wrapper">
        <div class="swiper-slide" 
          v-for="(item, index) in galleryData" 
          :key="item.id"
        >
          <img class="swiper-slide__image" v-bind:src="item.url" />

          <div class="swiper-slide__content">
            <h2 v-text="item.title"><!-- 標題 --></h2>
            <div v-html="item.desc"><!-- 內容 HTML --></div>
          </div>

          <div class="note--container" v-html="item.note"></div>

          <div class="swiper-nexttbn">
            <div class="text">下一篇：</div>
            <h2 v-text="get(galleryData, [index + 1,'title'], galleryData[0].title)"></h2>
            <i></i>
          </div>

        </div>     
    </div> 

</div>



</div>
</template>

<script>
//plugins
import {get} from 'lodash'; 
import Swiper from 'swiper/dist/js/swiper.js';

//主圖資料
import {galleryData} from './data/gallery.js'

export default {

  components: {

  },

  // Component data must be a function.
  data: function() {
    return {
      galleryData: galleryData,
      gallery: {}

    };
  },

  props: {

  },

  watch: {

  },

  computed: {

  },

  methods: {  
    
    get //lodash get

  },

  mounted: function(){

    this.gallery = new Swiper ('#mGallery', {
      loop: true,
      observer: true,
      autoHeight: true,

      pagination: {
        el: '#mFraction',
        type: 'fraction',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      on: {
        slideChangeTransitionStart: function () {
          window.scrollTo(0,0);
        },
      },

    });

    {
      //slide to next
      let thatGallery = this.gallery;
      let slideNextBtns = document.querySelectorAll(".swiper-nexttbn");

      slideNextBtns.forEach(function(element){
        element.addEventListener("click",() => {
          thatGallery.slideNext();
        });
      });
    }


  }

};
</script>

<style>
@import './style/common.css';
@import './style/swiper.min.css';
</style>


<style scoped>
@import './style/pagem.css';
</style>
