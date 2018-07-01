<template>

<div class="footerwpr">

    <div class="credit">
        <div class="centerwpr">

            <ul>
                <li>文字：李又如</li>
                <li>網頁：v_k、Noah Tan</li>      
                <li>資料整理：李又如、陳彥宇</li>
                <li>讀+ READr 2018/7/3</li>
            </ul>

        </div>  
    </div>

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

.footerwpr {position:relative; padding-bottom:50px;    
text-align:left;    
background-color:#fbe0db;
}

/* ---------- Credit ---------- */
.credit {padding:30px 0;
text-align:center;
background-color:#60465a;
border-bottom:10px solid #f9d3cc;
}
.credit .centerwpr:before {display:none;}
.credit li {font-size:14px; color:#fff; letter-spacing:1px;}

/* ---------- footer: related reports ---------- */
.footerwpr .related-reports.dark .report {background-color:#544356;}
.footerwpr .related-reports.dark .report:hover {
background-color:#49394b;
}
.footerwpr .related-reports .report h1 {font-size:22px; line-height:1.3;}
.footerwpr .related-reports button {font-family:"source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif; color:#544356;
margin-top:15px;
}

@media screen and (max-width: 1000px) {

    .footerwpr {background-color:#544356;}

    .credit {border-bottom:10px solid #49394b;}

}

</style>


