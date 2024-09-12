<script setup>
import { getBannerAPI } from '@/apis/HomeAPI';
import { ref } from 'vue';
const bannnerList = ref([])
// const res = getBannerAPI()
// bannner.value=res.result
//!不要把操作暴露在外，都封装进函数内使得可以操纵自如，也就是说只有属性和方法，没有孤立的操作
const getBanner = async () => {
    const res = getBannerAPI()
    bannnerList.value = res.result
}

getBanner()
</script>

<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg"
                    alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang="scss">
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    img {
        width: 100%;
        height: 500px;
    }
}
</style>