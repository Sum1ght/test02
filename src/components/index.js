import ImageView from './ImageView/index.vue'
import GoodItem from './GoodItem/index.vue'

export const componentPlugin = {
  install (app) {
    // app.component('组件名字'，组件配置对象)
    app.component('ImageView', ImageView)
    app.component('GoodItem', GoodItem)
  }
}