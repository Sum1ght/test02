import { useIntersectionObserver } from "@vueuse/core";
//定义全局指令
//*实现图片懒加载
export const lazyPlugin = {
  install(app) {
    app.directive("img-lazy", {
      mounted(el, binding) {
        //el 元素
        //binding 指令对象
        // console.log(el, binding.value);
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          //   console.log(isIntersecting);
          isIntersecting && (el.src = binding.value) && stop();
        });
      },
    });
  },
};
