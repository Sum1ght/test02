import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layoutAPI";

export const useCategoryListStore = defineStore("categoryList", () => {
  const categoryList = ref([]);
  const getCategoryList = async () => {
    const res = await getCategoryAPI();
    //console.log(res);
    categoryList.value = res.result;
  };

  return { categoryList, getCategoryList };
});
