<template>
  <transition name="down">
    <div class="yk-message" v-show="isShow">
      <div class="yk-m-i">
        <i class="iconfont" :class="style[type].icon"></i>
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>
<script>
// import { defineComponent } from "@vue/composition-api";
import { onMounted, ref } from "vue";
export default {
  name: "YkMessage",
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      //warn 警告 error 报错  success 成功
      default: "warn",
    },
  },
  setup() {
    //定义一个对象 包含三种情况的样式 对象key就是类型字符串
    const style = {
      warning: {
        icon: "icon-warning",
      },
      error: {
        icon: "icon-error",
      },
      success: {
        icon: "icon-success",
      },
    };
    //定义一个数据用来控制显示和隐藏 默认是隐藏 组件挂载完毕显示
    // const isShow = ref(false);
    const isShow = ref(true);
    onMounted(() => {
      //需要使用钩子函数 等dom渲染完成后 再进行复制如果在setup中直接赋值 则会被直接渲染
      isShow.value = true;
      setTimeout(() => {
        isShow.value = false;
      }, 3000);
    });
    return { style, isShow };
  },
};
</script>
<style lang="less" scoped>
.down {
  &-enter {
    &-from {
      transform: translateY(-30px);
      opacity: 0;
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  &-leave {
    &-from {
      transform: translateY(0px);
      opacity: 1;
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
}
.yk-message {
  width: 100%;
  height: 40px;
  position: fixed;
  z-index: 9999;
  top: 20px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  .yk-m-i {
    padding: 0 20px;
    color: @gray-1;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    i {
      margin-right: 6px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
  }
  .icon-success {
    color: @primary-color;
  }
  .icon-warning {
    color: @warning-color;
  }
  .icon-error {
    @error-color: #f35428;
  }
}
</style>
