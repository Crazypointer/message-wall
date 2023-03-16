<template>
  <button :class="[size, normal]" class="yk-button"><slot></slot></button>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  size: {
    default: "base",
  },
  normal: {
    default: "primary",
  },
});
props;
</script>
<style lang="less" scoped>
.yk-button {
  border: none;
  text-align: center;
  cursor: pointer;
}
.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 24px;
}
.base {
  min-width: 80px;
  height: 36px;
  border-radius: 24px;
  padding: 0 20px;
}
.small {
  min-width: 72px;
  height: 32px;
  border-radius: 24px;
  padding: 0 20px;
}
.primary {
  background-color: @gray-1;
  color: @gray-10;
}
.secondary {
  color: @gray-1;
  background: none;
  border: 1px solid @gray-1;
}
.cprimary {
  background-color: @primary-color;
  color: @gray-10;
  font-weight: 600;
}
.csecondary {
  color: @gray-1;
  background-color: @gray-10;
}
.notallowed {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
