import { getBannerAPI } from "@/apis/homeAPI";
import { onMounted, ref } from "vue";

export function useBanner() {
  //调用分类接口
  const bannerData = ref([]);
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: "2",
    });
    bannerData.value = res.result;
  };
  //初始化
  onMounted(() => {
    getBanner();
  });
  //返回数据
  return {
    bannerData,
  };
}
