<script setup>
import { label, cardColor } from "@/utils/data";
import { computed } from "vue";
import { baseUrl } from "@/utils/env";
import { insertFeedbackApi } from "@/api/index";
import { useinfoStore } from "@/store/infoStore";
const infoStore = useinfoStore();
const props = defineProps({
  photo: {
    default: {},
  },
});

const emit = defineEmits(["toDetail"]);
const card = computed(() => {
  return props.photo;
});

//点击喜欢
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
function toDetail() {
  emit("toDetail");
}
</script>
<template>
  <div class="yk-photo-card">
    <img :src="baseUrl + photo.imgurl" alt="" class="photo-img" />
    <div class="photo-bg" @click="toDetail"></div>
    <div class="photo-like" @click="clickLike">
      <span class="iconfont icon-aixin1" :class="{ islike: card.islike[0].count > 0 }"></span>
      <span class="like-data">{{ props.photo.like[0].count }}</span>
    </div>
  </div>
</template>
<style lang="less">
.yk-photo-card {
  position: relative;
  .photo-img {
    width: 100%;
  }
  .photo-bg {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .photo-like {
    position: absolute;
    top: 8px;
    left: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    height: 28px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
    opacity: 0;
    transition: @tr;
    cursor: pointer;
    .icon-aixin1 {
      color: @gray-3;
      padding-right: 4px;
    }
    .like-data {
      color: @gray-1;
    }
    .islike {
      color: @like;
    }
  }
  &:hover {
    .photo-bg {
      opacity: 1;
    }
    .photo-like {
      opacity: 1;
    }
  }
}
</style>
