<script setup>
import { useCategoryStore } from '@/stores/categoryStore1';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

//获取数据
const categoryStore = useCategoryStore();
const { categoryData } = storeToRefs(categoryStore);
//#实现激活样式不丢失
const route = useRoute();
const activeCategoryId = ref(null);
//##监听路由变化
//*大道至简，分类讨论，if-else和中间值秒了
onBeforeRouteUpdate((to) => {
    const categoryId = to.params.id;
    if (to.name === 'subCategory' && categoryId) {
        // 直接用当前页面的id
        activeCategoryId.value = route.params.id;
    } else if (to.name === 'category' && categoryId) {
        // 用要去的一级分类页面的id
        activeCategoryId.value = categoryId;
    } else {
        // 非分类页面时取消激活
        activeCategoryId.value = null;
    }
});
</script>

<template>
    <header class='app-header'>
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/">小兔鲜</RouterLink>
            </h1>
            <ul class="category">
                <li v-for="item in categoryData" :key="item.id">
                    <RouterLink :class="{ active: activeCategoryId === item.id }" :to="`/category/${item.id}`">
                        {{ item.name }}
                    </RouterLink>
                </li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="搜一搜">
            </div>
        </div>
    </header>
</template>


<style scoped lang='scss'>
.app-header {
    background: #fff;
    position: sticky;
    //!太小有可能导致在特定部分被覆盖
    z-index: 100;
    top: 0;

    .container {
        display: flex;
        align-items: center;
    }

    //logo
    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
        }
    }

    //分类
    .category {
        width: 820px;
        display: flex;
        padding-left: 40px;
        position: relative;
        z-index: 998;

        li {
            margin-right: 10px;
            width: 60px;
            text-align: center;
            line-height: 32px;
            height: 32px;

            a {
                font-size: 16px;
                display: inline-block;

                //悬浮变色加下划线
                &:hover {
                    color: $xtxColor;
                    border-bottom: 1px solid $xtxColor;
                }
            }

            //选中后
            .active {
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }
    }

    //搜索栏
    .search {
        width: 160px;
        height: 35px;
        position: relative;
        border-bottom: 1px solid #e7e7e7;
        line-height: 35px;

        //对字体图标微调
        .icon-search::before {
            font-size: 15px;
            margin-left: 5px;
        }

        input {
            width: 140px;
            padding-left: 5px;
            color: #666;
            height: 30px;
        }
    }

    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: $helpColor;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>
