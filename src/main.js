import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";

import { componentPlugin } from "@/components/index";
import { lazyPlugin } from "@/directives/index";
import piniaPersistPlugin from "pinia-plugin-persistedstate";

import "@/assets/iconfont/iconfont.css";
import "@/styles/common.scss";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersistPlugin);

app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);

app.mount("#app");

