import Home from "@/views/Home/index.vue";
import Layout from "@/views/Layout/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
        },
        //用一个重定向把空白路由转到home去
        //?但是必须先声明home，不知道为什么
        {
          path: "",
          name: "blank",
          //!不能直接写  'home' 否则就是相对于当前页面后添加/home
          redirect: "/home",
        },
        {
          path: "category/:id",
          name: "category",
          component: () => import("@/views/Category/index.vue"),
        },
        {
          path: "category/sub/:id",
          name: "subCategory",
          component: () => import("@/views/SubCategory/index.vue"),
        },
        {
          path: "detail/:id",
          name: "detail",
          component: () => import("@/views/Detail/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/Login/index.vue"),
    },
  ],
  // scrollBehavior(){
  //   return{
  //     top:0
  //   }
  // }
});

export default router;
