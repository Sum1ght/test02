import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";

import { lazyPlugin } from "@/directives/index";
import { componentPlugin } from "@/components/index";

import "@/assets/iconfont/iconfont.css";
import "@/styles/common.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);

app.mount("#app");
