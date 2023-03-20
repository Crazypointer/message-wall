import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { signIpApi } from "@/api/index";
import { useRoute } from "vue-router";

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
// 组合式写法
export const useinfoStore = defineStore("info", () => {
  const route = useRoute();
  const user = ref("");
  //留言墙和照片墙的切换id
  const id = ref(0);
  function getIp() {
    signIpApi().then((res) => {
      user.value = res.ip;
    });
  }
  function getId() {
    id.value = route.query.id;
  }
  return { id, user, getIp, getId };
});
