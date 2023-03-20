<!-- 弹框组件 -->
<template>
  <transition name="modal">
    <div class="yk-modal" v-if="isModal">
      <div class="yk-modal-head">
        <p class="modal-name">{{ title }}</p>
        <span class="iconfont icon-guanbi" @click="closeModal"></span>
      </div>
      <div class="yk-modal-main">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
// import { defineProps, defineEmits } from "vue";
const props = defineProps({
  title: {
    default: "标题",
  },
  //由父级控制这个开关变量
  isModal: {
    default: false,
  },
});
const emit = defineEmits(["close"]);
function closeModal() {
  emit("close");
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.modal {
  &-enter {
    &-from {
      transform: translateX(360px);
    }
    &-active {
      transition: all 0.2s ease-out;
    }
    &-to {
      transform: translateX(0px);
    }
  }
  &-leave {
    &-from {
      transform: translateX(0px);
    }
    &-active {
      transition: all 0.2s ease-in;
    }
    &-to {
      transform: translateX(360px);
    }
  }
}
.yk-modal {
  width: 360px;
  height: 100%;
  position: fixed;
  top: 52px;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  .yk-modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: @padding-20;
    .modal-name {
      font-size: 16px;
      color: @gray-1;
      font-weight: 600;
    }
    .icon-guanbi {
      color: @gray-2;
      cursor: pointer;
    }
  }
  .yk-modal-main {
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 116px;
    overflow-x: auto;
    margin: 2px;
  }
  .yk-modal-main::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .yk-modal-main::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
  }

  .yk-modal-main::-webkit-scrollbar-track {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0);
  }
}
</style>
