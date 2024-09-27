<script setup>
import { getProductAPI } from '@/apis/homeAPI';
import GoodItem from "@/components/GoodItem/index.vue";
import { onMounted, ref } from 'vue';
import HomePanel from "./HomePanel.vue";

//获取产品数据 包括每个一级种类和它下属的货物
const productData = ref([])
const getProduct = async () => {
  const res = await getProductAPI()
  productData.value = res.result
}
//初始化
onMounted(() => getProduct())
</script>

<template>
  <div class="home-product">
    <!-- 每个一级种类面板 -->
    <HomePanel :title="item.name" v-for="item in productData" :key="item.id">
      <div class="box">
        <!-- 首部大图 -->
        <RouterLink class="cover" to="/">
          <img v-img-lazy="item.picture" />
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!-- 后面的具体货物 -->
        <ul class="goods-list">
          <li v-for="good in item.goods" :key="good.id">
            <GoodItem :good />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>

</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 20px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>