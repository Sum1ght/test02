import { delCartAPI, findNewCartListAPI, insertCartAPI } from "@/apis/cartAPI";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { mergeCartAPI } from "@/apis/cartAPI";
export const useCartStore = defineStore(
  "cart",
  () => {
    //获取用户信息
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userData.token);
    //获取购物车数据
    const cartList = ref([]);
    const getCartList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };
    getCartList();
    //定义add
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        // 登录之后的加入购车逻辑
        await insertCartAPI({ skuId, count });
        getCartList();
      } else {
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => skuId === item.skuId);
        if (item) {
          // 找到了
          item.count++;
        } else {
          // 没找到
          cartList.value.push(goods);
        }
      }
    };
    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 调用接口实现接口购物车中的删除功能
        await delCartAPI([skuId]);
        getCartList();
      } else {
        // 思路：
        // 1. 找到要删除项的下标值 - findIndex
        // 2. 使用数组的过滤方法 - splice
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
    };
    // 清除购物车
    const clearCart = () => {
      cartList.value = [];
    };
    //合并购物车
    const mergeCart = async () => {
      const data = cartList.value.map((item) => {
          return {
            skuId: item.skuId,
            count: item.count,
            selected: item.selected,
          };
      });
        const headers = {
          Authorization: userStore.userData.token,
          'Content-Type': "application/json",
        };
      await mergeCartAPI(headers,data);
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 全选功能
    const allCheck = (selected) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 计算属性
    // 1. 总的数量 所有项的count之和
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    // 2. 总价 所有项的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );
    // 3. 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );
    // 5. 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      clearCart,
      mergeCart,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      getCartList,
    };
  },
  {
    persist: true,
  }
);
