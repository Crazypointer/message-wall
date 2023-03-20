<template>
  <div class="yk-note-card" :style="{ width: width, background: cardColor[card.color] }">
    <div class="top">
      <p class="date">{{ dateOne(card.moment) }}</p>
      <p class="label">{{ label[card.type][card.label] }}</p>
    </div>
    <p class="message" @click="toDetail">
      {{ card.message }}
    </p>
    <div class="foot">
      <div class="foot-left">
        <div class="icon" @click="clickLike">
          <span class="iconfont icon-aixin1" :class="{ islike: card.islike[0].count > 0 }"></span>
          <span class="value">{{ card.like[0].count }}</span>
        </div>

        <div class="icon" v-show="card.comcount[0].count > 0">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{ card.comcount[0].count }}</span>
        </div>
      </div>
      <div class="name">{{ card.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { label, cardColor } from "@/utils/data";
import { dateOne } from "@/utils/yksg";
import { insertFeedbackApi } from "@/api/index";
import { computed } from "vue";
import { useinfoStore } from "@/store/infoStore";
const infoStore = useinfoStore();

const props = defineProps({
  width: {
    default: "100%",
  },
  note: {
    default: {},
  },
});
const card = computed(() => {
  return props.note;
});
function clickLike() {
  if (card.value.islike[0].count == 0) {
    let data = {
      wallId: card.value.id,
      userId: infoStore.user,
      type: 0,
      moment: new Date(),
    };
    insertFeedbackApi(data).then(() => {
      //反馈完成
      card.value.like[0].count++;
      card.value.islike[0].count++;
    });
  }
}

const emit = defineEmits(["toDetail"]);
function toDetail() {
  emit("toDetail");
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */

.yk-note-card {
  height: 240px;
  // background: rgba(252, 175, 162, 0.3);
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    p {
      font-size: 12px;
      color: @gray-3;
    }
  }
  .message {
    height: 140px;
    // font-family: HanziPenSC-W3;
    font-size: 15px;
    color: @gray-1;
  }
  .foot {
    display: flex;
    //挤到两边去
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 16px;
    //没有限制100% 则宽度为内容宽度
    width: 100%;
    padding: 0 20px;
    .foot-left {
      display: flex;
      .value {
        font-size: @size-12;
        color: @gray-3;
        line-height: 16px;
        padding-left: @padding-4;
      }
      .iconfont {
        font-size: 16px;
        color: @gray-3;
      }
      .icon {
        display: flex;
        align-items: center;
        padding-right: @padding-8;
      }
      .icon-aixin1 {
        cursor: pointer;
        transition: @tr;
        &:hover {
          color: @like;
        }
      }
      .islike {
        color: @like;
      }
    }
  }
  .name {
    // font-family: HanziPenSC-W5;
    font-size: 14px;
    color: @gray-1;
    font-weight: 500;
  }
}
</style>
