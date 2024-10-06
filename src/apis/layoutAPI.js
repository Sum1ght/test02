import httpInstance from "@/utils/http";

//*api解耦，把数据请求的的东西单独放到一个模块里
//*一般在导出方法的最后加上API 
//?然后前面加上get
export function getCategoryAPI() {
  return httpInstance({
    url: "/home/category/head",
  });
} 
