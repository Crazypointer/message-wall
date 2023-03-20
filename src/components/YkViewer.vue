<template>
  <transition name="view">
    <!-- v-if="isView" -->
    <div class="yk-viewer" v-if="isView">
      <div class="bg">
        <div class="viewer-photo">
          <!-- {{ baseUrl + photos[nowNumber].imgurl }} -->
          <img :src="baseUrl + photos[nowNumber].imgurl" />
        </div>
        <div class="switch sw-left" @click="changeNumber(0)" v-show="nowNumber > 0">
          <span class="iconfont icon-xiangzuo"></span>
        </div>
        <div class="switch sw-right" @click="changeNumber(1)" v-show="nowNumber < photos.length - 1">
          <span class="iconfont icon-xiangyou"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { baseUrl } from "@/utils/env";
const props = defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
  nowNumber: {
    type: Number,
    required: true,
  },
  isView: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// 定义事件
const emit = defineEmits(["viewSwitch"]);
// 发送事件
const changeNumber = (e) => {
  emit("update:bool", e);
};
</script>
<style lang="less" scoped>
.view {
  &-enter {
    &-from {
      opacity: 0;
    }
    &-active {
      transition: all 0.2s ease-out;
    }
    &-to {
      opacity: 1;
    }
  }
  &-leave {
    &-from {
      opacity: 1;
    }
    &-active {
      transition: all 0.2s ease-in;
    }
    &-to {
      opacity: 0;
    }
  }
}
.yk-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  .bg {
    top: 0;
    left: 0;
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    height: 100%;
    width: 100%;
  }
  .viewer-photo {
    position: absolute;
    padding: 82px 454px 30px 96px;
    box-sizing: border-box;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      max-width: 100%;
    }
  }
  .switch {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: @gray-3;
    color: @gray-10;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0.5;
    transition: @tr;
    .iconfont {
      font-size: 24px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .sw-left {
    left: 20px;
  }
  .sw-right {
    right: 380px;
  }
}
</style>
