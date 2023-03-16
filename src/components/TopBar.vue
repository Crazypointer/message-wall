<script setup>
import YkButton from "./YkButton.vue";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

//因为我们在 setup 里面没有访问 this，
//所以我们不能再直接访问 this.$router 或 this.$route。
//作为替代，我们使用 useRouter 和 useRoute 函数：
const router = useRouter();
const route = useRoute();

const id = computed(() => {
  //获取地址栏的id 通过id区分留言墙还是照片墙
  return route.query.id;
});
//切换墙
function changeWall(e) {
  router.push({
    query: { id: e },
  });
}
// export default {

//   computed: {
//     id() {

//       return this.$route.query.id;
//     },
//   },
// };
</script>

<template>
  <div class="top-bar">
    <div class="logo">
      <img src="@/assets/images/yksg.svg" alt="" class="logo-img" />
      <p class="logo-name">One Time</p>
    </div>
    <div class="menu">
      <YkButton size="base" :normal="id == 0 ? 'cprimary' : 'csecondary'" class="menu-message" @click="changeWall(0)">留言墙</YkButton>
      <YkButton size="base" :normal="id == 1 ? 'cprimary' : 'csecondary'" class="menu-photo" @click="changeWall(1)">照片墙</YkButton>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 200px;
    display: flex;
    align-items: center;
    .logo-name {
      font-size: 20px;
      color: @gray-1;
      font-weight: 600;
      padding-left: 10px;
    }
  }
  .user {
    width: 200px;

    .user-head {
      float: right;
      border-radius: 50%;
      height: 36px;
      width: 36px;
      background-image: linear-gradient(180deg, #7eb7ff 2%, #1e85e2 100%);
    }
  }
  .menu {
    .menu-message {
      margin-right: 24px;
    }
  }
}
</style>
