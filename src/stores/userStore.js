import { ref } from "vue";
import { defineStore } from "pinia";
import { getUserAPI } from "@/apis/loginAPI";

export const useUserStore = defineStore(
  "user",
  () => {
    //定义state
    const userData = ref({});
    //获取用户信息
    const getUser = async ({ account, password }) => {
      const res = await getUserAPI({ account, password });
      //console.log(res);
      userData.value = res.result;
    };
    //清除用户信息
    const clearUser = () => {
      userData.value = {};
    };

    return { userData, getUser, clearUser };
  },
  {
    persist: true,
  }
);
