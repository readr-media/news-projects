<template>
    <div class="item" :class="{ active: isActive }" @click="isActive = !isActive">
        <div class="expand"><span class="text">點選看查核</span> <i class="icon-expand"></i></div>
        <div class="row">
            <div class="avatar">
                <div class="img" :class="whichCandidate"></div>
            </div>
            <div class="status">
                <!-- [查核結果] -->
                <i :class="factcheckStatusIcon"></i>
                <span>{{item['標示']}}</span>
            </div>
        </div>
        <div class="content">
            <div class="fact-title">{{item['需查核的句子']}}</div>
            <div class="fact-detail">
                <div class="fact-quote">{{item['分段的逐字稿']}}</div>
                <div class="fact-source">出處：[出處*缺]</div>
                <div class="fact-explain">{{item['查核說明']}}</div>
                <div class="fact-reference">參考資料：{{item['查核參考資料']}}</div>
            </div>
            <div class="fact-status">
                <div class="status">
                    <!-- [查核結果] -->
                    <i :class="factcheckStatusIcon"></i>
                </div>
                <div class="source">{{item['內容標籤']}}    [日期時間*缺]    主責媒體：{{item['認領媒體']}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
    },
    data () {
        return {
            isActive: false
        }
    },
    computed: {
        whichCandidate: function() {
            switch(this.item['候選人']) {
                case '蔡英文':
                    return 'tsai'
                case '宋楚瑜':
                    return 'sung'
                case '韓國瑜':
                    return 'han'
            }
            return ''
        },
        factcheckStatusIcon: function() {
            switch(this.item['查核結果']) {
                case '真實':
                    return {'icon-true': true}
                case '含有錯誤訊息':
                    return {'icon-controversy': true}
                case '錯誤':
                    return {'icon-false': true}
            }
            return {}
        }
    },
}
</script>