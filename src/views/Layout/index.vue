<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
</script>

<template>
    <LayoutNav/>
    <!-- <LayoutFixed/> -->
    <LayoutHeader/>
    <RouterView/>
    <LayoutFooter/>
</template>