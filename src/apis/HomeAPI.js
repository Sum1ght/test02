import httpInstance from "@/utils/http";

//获取轮播图数据（改造后）
export const getBannerAPI = (params = {}) => {
  const { distributionSite = "1" } = params;
  return httpInstance({
    url: "/home/banner",
    //!params永远是个对象！！！
    params: { distributionSite },
  });
};
//获取hot数据
export const getHotAPI = () => {
  return httpInstance({
    url: "/home/hot",
  });
};
//获取new数据
export const getNewAPI = () => {
  return httpInstance({
    url: "/home/new",
  });
};
//获取goods数据
export const getProductAPI = () => {
  return httpInstance({
    url: "/home/goods",
  });
};
