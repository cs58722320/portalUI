<template>
    <iframe class="iframe-content" frameborder="0" :src="reportSrc"></iframe>
</template>



<script>
    export default {
        name: 'upload',
        data: function(){
            return {
                reportSrc: ''
            }
        },
        methods:{
            
        },
        created(){
            console.log(localStorage.getItem('ms_username'));
            this.reportSrc='http://106.75.210.97:8080/storekpi.html?store=' + localStorage.getItem('ms_username');
        }
    }
</script>

<style scoped>
    .iframe-content{
        width: 100%;
        height: 100%;
    }

</style>