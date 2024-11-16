// 封装所有和用户相关的接口函数
/**
 * @description: 该模块包含了所有和用户相关的接口函数
 * @author: xiaotuxian
 */
import httpInstance from "@/utils/http";

/**
 * @description: 实现用户登录
 * @param {Object} data - 用户登录数据
 * @param {string} data.account - 用户账户
 * @param {string} data.password - 用户密码
 * @return {Promise} - Promise对象
 */
export const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: "/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};

/**
 * @description: 获取用户喜欢的商品列表
 * @param {Object} data - 用户喜欢的商品列表数据
 * @param {number} data.limit - 限制最多获取的商品数量
 * @return {Promise} - Promise对象
 */
export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: "/goods/relevant",
    params: {
      limit,
    },
  });
};
