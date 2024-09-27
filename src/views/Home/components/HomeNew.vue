<script setup>
import { getNewAPI } from "@/apis/homeAPI";
import { onMounted, ref } from "vue";
import HomePanel from "./HomePanel.vue";

const newData = ref([]);
const getNew = async () => {
  const res = await getNewAPI();
  newData.value = res.result;
};
onMounted(() => getNew())
</script>

<template>
  <!-- 下面是插槽主体内容模版 -->
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <ul class="goods-list">
      <li v-for="item in newData" :key="item.id">
        <RouterLink :to="`/detail/${item.id}`">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <!-- &yen;是“￥” -->
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>

</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    margin-right: 10px;
    //过渡效果
    transition: all 0.3s;

    &:hover {
      transform: translate3d(3px, -3px, -3px);
      //垂直 水平 模糊 扩散
      box-shadow: 6px 10px 5px 0px rgba(0, 0, 0, 0.5)
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      //文本太长的基本套路
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>