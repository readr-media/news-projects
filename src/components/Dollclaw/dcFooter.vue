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

<style>
/* ---------- footer ---------- */
.footerwpr .related-reports.dark .report {background-color:#544356;}
.footerwpr .related-reports.dark .report:hover {
background-color:#49394b;
}
.footerwpr .related-reports .report h1 {font-size:22px; line-height:1.3;}
.footerwpr .related-reports button {font-family:"source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif; color:#544356;
margin-top:15px;
}
</style>


<style scoped>

.footerwpr {position:relative; padding:20px 0;    
text-align:left;    
background-color:#fbe0db;
border-top:10px solid #f9d3cc;
}


</style>


