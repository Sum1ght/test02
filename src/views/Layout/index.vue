<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";
</script>

<template>
    <LayoutNav/>
    <LayoutHeader/>
    <RouterView/>
    <LayoutFooter/>
</template>