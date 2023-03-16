<script>
import TopBar from "@/components/TopBar.vue";
import FootBar from "@/components/FootBar.vue";
import { signIpApi } from "@/api/index";
export default {
  components: {
    TopBar,
    FootBar,
  },

  methods: {
    getUser() {
      signIpApi().then((res) => {
        let user = {
          id: res.ip,
        };
        this.$store.commit("getUser", user);
      });
    },
  },
  created() {
    this.getUser();
  },
};
</script>
<template>
  <div class="wall-index">
    <TopBar></TopBar>
    <video src="../assets/images/qm1.mp4" class="bg-video" loop="loop" muted="muted" autoplay="autoplay"></video>
    <router-view></router-view>
    <FootBar></FootBar>
  </div>
</template>

<style lang="less" scoped>
.wall-index {
  .bg-video {
    height: 840px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
