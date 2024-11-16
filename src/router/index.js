import Home from "@/views/Home/index.vue";
import Layout from "@/views/Layout/index.vue";
import { createRouter, createWebHistory } from "vue-router";

/**
 * @description: 该模块包含了所有路由
 * @author: xiaotuxian
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "",
          redirect: "/home",
        },
        {
          path: "home",
          name: "home",
          component: Home,
        },
        //!不能直接写  'home' 否则就是相对于当前页面后添加/home
        //用一个重定向把空白路由转到home去
        //?但是必须先声明home，不知道为什么
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
          // meta: {
          //   scrolltop: true,
          // },
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("@/views/Cart/index.vue"),
        },
        {
          path: "checkout",
          component: () => import("@/views/Checkout/index.vue"),
        },
        {
          path: "pay",
          component: () => import("@/views/Pay/index.vue"),
        },
        {
          path: "payback",
          component: () => import("@/views/Pay/PayBack.vue"),
        },
        {
          path: "member",
          component: () => import("@/views/Member/index.vue"),
          children: [
            {
              path: "",
              // !此处设置name: "blank"与前面的重定向有冲突,name应该独一无二
              redirect: "/member/info",
            },
            {
              path: "info",
              component: () => import("@/views/Member/components/UserInfo.vue"),
            },
            {
              path: "order",
              component: () =>
                import("@/views/Member/components/UserOrder.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login/index.vue"),
    },
  ],
  // 切换路由时返回顶部
  // eslint-disable-next-line no-unused-vars
  // to, from, savedPosition
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    };
  },
});

export default router;
