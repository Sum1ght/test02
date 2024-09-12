<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";
// import LayoutFixed from "./components/LayoutFixed.vue";
import { onMounted } from 'vue';
import { useCategoryListStore } from '@/stores/categoryList';
// import { storeToRefs } from 'pinia';

const categoryListStore = useCategoryListStore()
// const { categoryList } = storeToRefs(categoryListStore)
// const { getCategoryList } = categoryListStore
onMounted(() => {
    categoryListStore.getCategoryList()
})

</script>

<template>
    <LayoutNav />
    <!-- <LayoutFixed/> -->
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
</template>