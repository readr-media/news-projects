<template>
<div class="comparisonwpr">

    <div class="js-comparison-container">
          <img class="comparison-image" src="/proj-assets/farmhouse/images/sample/extend01.jpg">
          <img class="comparison-image" src="/proj-assets/farmhouse/images/sample/extend02.jpg">
    </div>

</div>
</template>

<script>
import ImageComparison from "image-comparison";

export default {
  components: {},
  data() {
    return {};
  },
  mounted: function() {
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

.comparison-separator:before {content:""; display:block;
width:120px; height:147px;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-repeat:no-repeat;
background-position:0 -242px;
position:absolute; left:50%; top:50%; margin-left:35px;
z-index:999; pointer-events:none;
transition:400ms; transition-property:opacity,margin-top;
}
/* .comparison-widget:hover .comparison-separator:before {opacity:0; margin-top:20px;} */
.comparison-separator:hover:before {opacity:0; margin-top:20px;}


@media screen and (max-width: 500px) {

  .comparison-separator:before {
    transform:scale(0.6);  transform-origin:0 0;
  }

}

@media screen and (max-width: 350px) {

  .comparison-separator:before {transform:scale(0.5);}

}

</style>