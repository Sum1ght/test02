/* eslint-disable no-unused-vars */
import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/user";
import router from "@/router/index";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 10000,
});

//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userData.token;
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);
// axios响应拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    //全局返回错误提示
    ElMessage({ type: "warning", message: e.response.data.message });
    //401token失效处理
    if (e.response.status === 401) {
      const userStore = useUserStore();
      userStore.clearUser();
      router.replace("/login");
    }

    return Promise.reject(e);
  }
);
export default httpInstance;
