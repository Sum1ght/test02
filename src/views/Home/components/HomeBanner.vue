<script setup>
import { getBannerAPI } from '@/apis/homeAPI';
import { onMounted, ref } from 'vue';

//*不要把操作暴露在外，都封装进函数内使得可以操纵自如，也就是说外层只有数据和函数，没有孤行操作
//获取轮播图数据
const bannerData = ref([])
const getBanner = async () => {
    const res = await getBannerAPI()
    bannerData.value = res.result
}
//初始化
onMounted(() => getBanner())
</script>


<template>
    <div class="home-banner">
        <el-carousel height="500px" motion-blur>
            <el-carousel-item v-for="item in bannerData" :key="item.id">
                <img :src="item.imgUrl" alt="none" />
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