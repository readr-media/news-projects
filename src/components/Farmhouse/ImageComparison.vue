<template>
<div class="comparisonwpr">

    <div class="js-comparison-container">
          <img class="comparison-image" src="/proj-assets/farmhouse/images/gallery/com-before.jpg">
          <img class="comparison-image" src="/proj-assets/farmhouse/images/gallery/com-after.jpg">
    </div>
    <div class="alter">
      <p>左：初春的蘭陽平原，原本應該是遍插秧苗的水田裡，卻不斷冒出鋼筋，直上雲霄，一根根的鋼筋被強勁的東北風撞擊而發出刺耳的響聲，彷彿為蘭陽平原流失的農地敲起喪鐘。</p>
      <p class="right">右：農舍完工後的模樣。</p>
      <div class="continue" @click="clickGA"></div>
    </div>

</div>
</template>

<script>
import ImageComparison from "image-comparison";
import imagesLoaded from 'imagesloaded';

export default {
  components: {},
  data() {
    return {
      'before': '初春的蘭陽平原，原本應該是遍插秧苗的水田裡，卻不斷冒出鋼筋，直上雲霄，一根根的鋼筋被強勁的東北風撞擊而發出刺耳的響聲，彷彿為蘭陽平原流失的農地敲起喪鐘。',
      'after': '農舍完工後的模樣。',
      clicked: false
    };
  },
  methods: {

    insertContent: function(){

      //手動插入比較圖的文字
      const before = this.before;
      const after = this.after;
      
      let beforeEl = '<div class="gallery--desc"><div class="innerwpr">' + before + '</div><div class="continue"></div></div>';
      let afterEl = '<div class="gallery--desc"><div class="innerwpr">' + after + '</div><div class="continue"></div></div>';

      let comparisonItem = document.querySelectorAll(".comparison-item__content");

      let $beforeContainer = $(comparisonItem[0]);
      let $afterContainer = $(comparisonItem[1]);

      $beforeContainer.append(beforeEl);
      $afterContainer.append(afterEl);

      let handEl = '<div class="separator--hand"></div>';
      $(".comparison-separator").append(handEl);  

    },
    setDescWidth: function(){

      //set desc width
      let comparisonWidget = document.querySelector(".comparison-widget");
      let compareDesc = document.querySelectorAll(".gallery--desc");

      function setDesc(){
        let widgetWidth = comparisonWidget.offsetWidth;
        // console.log(widgetWidth);
        for(let i = 0; i < compareDesc.length; i++){

          compareDesc[i].style.width = widgetWidth + "px";
          // console.log("desc width set");
        }
      }

      window.addEventListener('resize',function(event){
        setDesc();
      });

      setDesc();


    },
    clickGA () {
        window.ga('send', 'event', 'projects', 'click', 'next2', { nonInteraction: false })
    },

    setGAEvent () {
      const btn = document.querySelector('.comparison-item .continue')
      const separator = document.querySelector('.comparison-separator')
      const hand = document.querySelector('.separator--hand')
      hand.addEventListener('click', () => {
        if (!this.clicked) {
          this.clicked = true
          window.ga('send', 'event', 'projects', 'drop', 'hand', { nonInteraction: false })
        }
      })
      separator.addEventListener('click', () => {
        if (!this.clicked) {
          this.clicked = true
          window.ga('send', 'event', 'projects', 'drop', 'hand', { nonInteraction: false })
        }
      })
      btn.addEventListener('click', () => {
        window.ga('send', 'event', 'projects', 'click', 'next2', { nonInteraction: false })
      })
    }

  },
  mounted: function() {

    window.$ = require('jquery');

    var images = document.querySelectorAll(".comparison-image");
    var imgContainer = document.querySelector(".js-comparison-container");

    new ImageComparison({
      container: imgContainer,
      startPosition: 55,
      data: [
        {
          image: images[0],
          label: "before"
        },
        {
          image: images[1],
          label: "after"
        }
      ]
    });

    this.insertContent();

    let setDescWidth = this.setDescWidth;

    imagesLoaded( document.querySelector('.comparisonwpr'), function() {
      // console.log('all images are loaded');
      setDescWidth();
    });
    
    this.setGAEvent()
  }
};
</script>

<style>

@import './style/comparison.css';

.comparisonwpr {width:100%; height:100vh; margin:0 auto;
display:flex; justify-content:center; align-items:center;
flex-direction:column;
position:relative;
box-sizing:border-box;
}

.comparison-item__image {max-height:100vh;}
.comparison-item__label {top:15px; display:none;}

/* .compare--desc {width:100%;
position:absolute; left:0; bottom:0;
display:flex; justify-content:center; align-items:center;
padding-bottom:90px;
}
.compare--desc .innerwpr {
font-size:16px; text-shadow:0 1px 1px rgba(0, 0, 0, 0.8);
color:#fff; text-align:center;
} */

.separator--hand {width:100px; height:60%; position:absolute; left:50%; top:20%;
margin-left:-50px;
}
.separator--hand:before {content:""; display:block;
width:120px; height:147px;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-repeat:no-repeat;
background-position:0 -242px;
position:absolute; left:50%; top:50%; margin-left:35px;
z-index:999; pointer-events:none;
transition:400ms; transition-property:opacity,margin-top;
}
.separator--hand:hover:before {opacity:0; margin-top:20px;}

.alter {margin-top:10px; padding:0 10px; display:none;
font-size:15px; text-shadow:0 1px 1px rgba(0, 0, 0, 0.8); color:#fff;
line-height:1.4;
position:absolute; left:0; bottom:0; z-index:99;
}
.alter p {margin-top:5px;}
/* .alter .right {text-align:right;} */

@media screen and (max-width: 800px) {
  .comparisonwpr {height:90vh;
  justify-content:flex-start;
  }
  .comparison-widget {margin-top:74px;}
  
}

@media screen and (max-width: 500px) {

  .comparison-separator:before {
    transform:scale(0.6);  transform-origin:0 0;
  }

  .comparison-item .gallery--desc {display:none;}
  .alter {display:block;}



}

@media screen and (max-width: 350px) {

  .comparison-separator:before {transform:scale(0.5);}

}

</style>