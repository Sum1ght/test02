<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script setup>
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted } from 'vue';
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";

//!必须在起始路由里调用它的获取方法一次，不然是没有全局状态categoryData的
const categoryStore = useCategoryStore()
onMounted(() => {
    categoryStore.getCategory()
})
</script>


<template>
    <LayoutNav />
    <LayoutHeader />
    <!-- 粗犷解决路由缓存问题 -->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter />
</template>