<template>
<div class="comparisonwpr">

    <div class="js-comparison-container">
          <img class="comparison-image" src="/proj-assets/farmhouse/images/sample/fhsample-03.jpg">
          <img class="comparison-image" src="/proj-assets/farmhouse/images/sample/fhsample-02.jpg">
    </div>

</div>
</template>

<script>
import ImageComparison from "image-comparison";

export default {
  components: {},
  data() {
    return {
      'before': '初春的蘭陽平原，原本應該是遍插秧苗的水田裡，卻不斷冒出鋼筋，直上雲霄，一根根的鋼筋被強勁的東北風撞擊而發出刺耳的響聲，彷彿為蘭陽平原流失的農地敲起喪鐘。',
      'after': '農舍完工後的模樣。'
    };
  },
  methods: {

    insertContent: function(){

      //手動插入比較圖的文字
      const before = this.before;
      const after = this.after;
      
      let beforeEl = '<div class="compare--desc"><div class="innerwpr">' + before + '</div></div>';
      let afterEl = '<div class="compare--desc"><div class="innerwpr">' + after + '</div></div>';

      let comparisonItem = document.querySelectorAll(".comparison-item__content");

      let $beforeContainer = $(comparisonItem[0]);
      let $afterContainer = $(comparisonItem[1]);

      $beforeContainer.append(beforeEl);
      $afterContainer.append(afterEl);

      let handEl = '<div class="separator--hand"></div>';
      $(".comparison-separator").append(handEl);

    }

  },
  mounted: function() {

    window.$ = require('jquery');

    var images = document.querySelectorAll(".comparison-image");
    var imgContainer = document.querySelector(".js-comparison-container");

    new ImageComparison({
      container: imgContainer,
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

  }
};
</script>

<style>

@import './style/comparison.css';

.comparisonwpr {width:100%; height:100vh; margin:0 auto;
display:flex; justify-content:center; align-items:center;
position:relative;
padding-top:15px;
box-sizing:border-box;
}

.compare--desc {width:100vw; height:30vh;
position:absolute; left:0; bottom:0;
display:flex; justify-content:center; align-items:center;
}
.compare--desc .innerwpr {width:70%;
font-size:16px; text-shadow:0 1px 1px rgba(0, 0, 0, 0.8);
color:#fff; text-align:center;
}

.separator--hand {width:100px; height:100%; position:absolute; left:50%; top:0;
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


@media screen and (max-width: 500px) {

  .comparison-separator:before {
    transform:scale(0.6);  transform-origin:0 0;
  }

}

@media screen and (max-width: 350px) {

  .comparison-separator:before {transform:scale(0.5);}

}

</style>