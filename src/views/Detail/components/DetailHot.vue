<script setup>
import { getDetailHotAPI } from "@/apis/detailAPI";
import { onMounted, ref, computed } from 'vue';
import { useRoute } from "vue-router";
//定义属性
const props = defineProps({
    type: {
        type: Number,
        default: 1
    },
})
//获取数据
const route = useRoute()
const detailHotData = ref({})
const getDetailHot = async () => {
    const res = await getDetailHotAPI({
        id: route.params.id,
        type: props.type
    })
    detailHotData.value = res.result
}
onMounted(() => getDetailHot())
// 动态更新榜单标题
const TITLEMAP = {
    1: '24小时热榜',
    2: '周热榜',
}
//*用计算属性而不是ref是因为我并不是直接改title的值，而是通过prop.type去间接改变title，这样需要通过监听prop.type手动更新，丢失响应式
//*用计算属性代替watch监听，毕竟监听是很消耗资源的
const title = computed(() => TITLEMAP[props.type])
</script>


<template>
    <div class="goods-hot">
        <!-- 这种简单但不好维护，因为榜单一多就得重构 -->
        <!-- <h3> {{ (type===1)?'24小时热榜':'周热榜' }} </h3> -->
        <h3> {{ title }} </h3>
        <!-- 商品区块 -->
        <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in detailHotData" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: $helpColor;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }
}
</style>