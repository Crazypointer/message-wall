import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index";
//注册自己的组件
import YIKE from "@/components/yike/index";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(YIKE);
app.use(pinia);
app.mount("#app");
