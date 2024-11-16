import httpInstance from "@/utils/http";

/**
 * @description: 获取当前用户的订单列表
 * @param {Object} params - http get query params
 * 获取当前用户的订单列表
 * @param {Object} params -  http  get  query  params
 * @param {number} [params.page=1] -  页码
 * @param {number} [params.pageSize=2] -  一页显示的数量
 * @param {number} [params.orderState=0] -  订单状态  0 -  1 -  2 -  3 -  4 -  5 -
 * @return {Promise}  Promise  resolve  {  items: [], counts: 0  }
 */
export const getUserOrder = (params) => {
  return httpInstance({
    url: "/member/order/",
    method: "GET",
    params,
  });
};
