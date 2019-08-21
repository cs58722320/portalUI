<template>
    <div class="detailWrapper">
        <iframe class="iframe-content" :src="detailSrc" frameborder="0"></iframe>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data: function(){
            return {
                detailSrc:''
            }
        },
        methods:{
            
        },
        created(){
            console.log(localStorage.getItem('ms_username'));
            // this.detailSrc='http://crm.ugg.cn:8088/dist/index.html?storeId=' + localStorage.getItem('ms_username');
            this.detailSrc='http://www.jeffdu.top/uggportal/index.html?storeId=' + localStorage.getItem('ms_username');
        }
    }
</script>

<style scoped>
    .iframe-content{
        width: 100%;
        /* height: 100%; */
        height: 1100px;
    }
    .detailWrapper{
        -webkit-overflow-scrolling: touch;
        overflow:auto; 
        width:100%; 
        height:100%;
    }


</style>