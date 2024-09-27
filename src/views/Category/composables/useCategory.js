import { getTopCategoryAPI } from "@/apis/categoryAPI";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export function useCategory() {
  //获取页面路由
  const route = useRoute();
  //调用分类接口
  const topCategoryData = ref({});
  const getTopCategory = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id);
    topCategoryData.value = res.result;
  };
  //初始化
  onMounted(() => {
    getTopCategory(route.params.id);
  });
  //监听路由变化重新获取数据
  onBeforeRouteUpdate((to) => {
    getTopCategory(to.params.id);
  });
  return { topCategoryData };
}
