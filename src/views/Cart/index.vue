<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()

// 单选回调
const singleCheck = (i, selected) => {
  // store cartList 数组 无法知道要修改谁的选中状态？
  // 除了selected补充一个用来筛选的参数 - skuId
  cartStore.singleCheck(i.skuId, selected)
}
// 全选回调
const allCheck = (selected) => {
  cartStore.allCheck(selected)
}
// 删除回调
const delCart = (i) => {
  cartStore.delCart(i.skuId)
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-toop-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <!-- 选择框 -->
                <el-checkbox :model-value="cartStore.isAll" @change="allCheck" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="i in cartStore.cartList" :key="i.skuId">
              <td>
                <!-- 单选框 -->
                <!-- //!此处change事件后依然是一个函数而非函数的调用，所以不用加括号，如果不用箭头函数的形式，selected就传不过去了 
                -->
                <el-checkbox :model-value="i.selected" @change="(selected) => singleCheck(i, selected)" />
              </td>
              <td>
                <div class="goods">
                  <!-- 商品图片 -->
                  <RouterLink :to="`/detail/${i.id}`"><img :src="i.picture" alt="" /></RouterLink>
                  <!-- 商品名称 -->
                  <div>
                    <p class="name ellipsis">{{ i.name }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <!-- 单价 -->
                <p>&yen;{{ i.price }}</p>
              </td>
              <td class="tc">
                <!-- 数量 -->
                <el-input-number v-model="i.count" />
              </td>
              <td class="tc">
                <!-- 小计 -->
                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <!-- 操作 -->
                <p>
                  <!-- 删除按钮 -->
                  <el-popconfirm title="确认删除吗?" confirm-button-text="是" cancel-button-text="否" @confirm="delCart(i)">
                    <template #reference>
                      <el-button>删除</el-button>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <!-- 购物车为空时的占位符 -->
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary" @click="$router.push('/')">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <!-- 选中商品的数量和价格 -->
          共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
          <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
        </div>
        <div class="total">
          <!-- 结算按钮 -->
          <el-button size="large" type="primary" @click="$router.push('/checkout')">下单结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: $xtxColor;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: $priceColor;
  }

  .green {
    color: $xtxColor;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }

}
</style>