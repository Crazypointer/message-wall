import Message from "./message/message.js";
import YkMessage from "./message/YkMessage.vue";
//Vue3  注册全局组件库的写法
//app.component(组件名，组件文件)

//导出一个配置 用于app.use() 安装组件库使用
export default {
  install(app) {
    app.component(YkMessage, Message);
    //全局挂载 原型函数 通过组件实例调用属性 this.$message
    app.config.globalProperties.$message = Message;
  },
};
