<script setup>
//定义组件传入属性
defineProps({
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="home-panel">
    <div class="container">
      <!-- 主标题和副标题 -->
      <div class="head">
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <!-- 插槽 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>