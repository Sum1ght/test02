<script setup>
import { getHotAPI } from "@/apis/homeAPI";
import { onMounted, ref } from "vue";
import HomePanel from "./HomePanel.vue";

const hotData = ref([]);
const getHot = async () => {
  const res = await getHotAPI();
  hotData.value = res.result;
};
onMounted(() => getHot())
</script>

<template>
  <!-- 复用面板组件 -->
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul class="goods-list">
      <li v-for="item in hotData" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>/
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

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
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>