<script>
import { label, cardColor } from "@/utils/data";
import { baseUrl } from "@/utils/env";
import { insertFeedbackApi } from "@/api/index";
export default {
  data() {
    return {
      label,
      cardColor,
      baseUrl,
      user: this.$store.state.user,
    };
  },
  props: {
    photo: {
      default: {},
    },
  },
  methods: {
    toDetail() {
      this.$emit("toDetail");
    },
    //点击喜欢
    clickLike() {
      if (this.card.islike[0].count == 0) {
        let data = {
          wallId: this.card.id,
          userId: this.user.id,
          type: 0,
          moment: new Date(),
        };
        insertFeedbackApi(data).then(() => {
          //反馈完成
          this.card.like[0].count++;
          this.card.islike[0].count++;
        });
      }
    },
  },
  //监听计算属性
  computed: {
    card() {
      return this.photo;
    },
  },
  created() {
    // console.log(this.card)
  },
};
</script>
<template>
  <div class="yk-photo-card">
    <img :src="baseUrl + photo.imgurl" alt="" class="photo-img" />
    <div class="photo-bg" @click="toDetail"></div>
    <div class="photo-like" @click="clickLike">
      <span class="iconfont icon-aixin1" :class="{ islike: card.islike[0].count > 0 }"></span>
      <span class="like-data">{{ photo.like[0].count }}</span>
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
