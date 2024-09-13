import httpInstance from "@/utils/http";

//获取轮播图数据
export const getBannerAPI = () => {
  return httpInstance({
    url: "/home/banner",
  });
};
//enf
//获取hot数据
export const getHotAPI = () => {
  return httpInstance({
    url: "/home/hot",
  });
};
export const getNewAPI = () => {
  return httpInstance({
    url: "/home/new",
  });
};
