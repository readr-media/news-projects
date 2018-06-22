<template>

    <div class="footerwpr">
        <related-reports theme="dark"></related-reports>
    </div>
    
</template>

<script>

import RelatedReports from '../RelatedReports.vue';


export default {

    components: {
      'related-reports': RelatedReports
    },
    
}
</script>


<style scoped>

.footerwpr {position:relative; padding:20px 0;    
text-align:left;    
background-color:#fbe0db;
border-top:10px solid #f9d3cc;
}


</style>


