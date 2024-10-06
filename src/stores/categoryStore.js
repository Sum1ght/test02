import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layoutAPI";

export const useCategoryStore = defineStore("category", () => {
  const categoryData = ref([]);
  const getCategory = async () => {
    const res = await getCategoryAPI();
    //console.log(res);
    categoryData.value = res.result;
  };

  return { categoryData, getCategory };
});
