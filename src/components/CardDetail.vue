<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="dismiss">联系墙主撕掉该便签</p>
      <p class="report">举报</p>
    </div>
    <!-- 这个NoteCard是留言详情界面引入的Card组件 -->
    <!-- :note="card" 是指需要将当前的card变量传递到子组件的note变量中 -->
    <!-- Bug:在照片页面下 card没有值 传不到下面的note去 导致下面的组件无法渲染 -->
    <NoteCard :note="card"></NoteCard>
    <div class="form">
      <textarea
        name=""
        class="message"
        placeholder="请输入..."
        v-model="discuss"
      ></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="签名" v-model="name" />
        <YkButton :class="{ notallowed: !isDis }" @click="submit"
          >确定</YkButton
        >
      </div>
    </div>
    <p class="title">评论{{ cards.comcount[0].count }}</p>
    <div class="comment">
      <div class="comment-li" v-for="(e, index) in comments" :key="index">
        <div
          class="user-head"
          :style="{ backgroundImage: headColor[e.imgurl] }"
        ></div>
        <div class="comm-m">
          <div class="m-top">
            <p class="name">{{ e.name }}</p>
            <p class="date">{{ dateOne(e.moment) }}</p>
          </div>
          <div class="mm">{{ e.comment }}</div>
        </div>
      </div>
      <p class="more" @click="getComment" v-show="nowpage > 0">加载更多</p>
    </div>
  </div>
</template>

<script>
import NoteCard from "./NoteCard.vue";
import YkButton from "./YkButton.vue";

import { headColor } from "@/utils/data";
import { dateOne } from "@/utils/yksg";
import { insertCommentApi, findCommentPageApi } from "@/api";
export default {
  data() {
    return {
      comments: [],
      headColor,
      dateOne,
      discuss: "", //输入的内容
      name: "匿名", //评论者名称
      user: this.$store.state.user,
      nowpage: 1, //当前页
      pagesize: 2, //一页几条
    };
  },
  props: {
    card: {
      default: {},
    },
  },
  computed: {
    isDis() {
      return !!(this.discuss && this.name);
    },
    //用cards来代替card 因为card不能被直接修改
    cards() {
      console.log(this.card)
      return this.card;
    },
  },
  components: {
    NoteCard,
    YkButton,
  },
  watch: {
    card() {
      //卡片发生变化
      this.nowpage = 1;
      this.comments = [];
      this.getComment();
    },
  },
  methods: {
    submit() {
      if (this.isDis) {
        if (this.name == "") {
          this.name = "匿名";
        }
        //如果有头像就用用户头像，没有就用随机头像 3个颜色里面随机一个
        let img = Math.floor(Math.random() * 3);

        let data = {
          wallId: this.cards.id,
          userId: this.user.id,
          imgurl: img,
          moment: new Date(),
          name: this.name,
          comment: this.discuss,
        };
        insertCommentApi(data).then(() => {
          this.comments.unshift(data);
          this.cards.comcount[0].count++;
          // 清空评论框
          this.discuss = "";
          // 清空签名框
          this.name = "";
        });
        console.log(data);
      }
    },
    //获取评论
    getComment() {
      if (this.nowpage > 0) {
        let data = {
          id: this.card.id,
          page: this.nowpage,
          pagesize: this.pagesize,
        };
        findCommentPageApi(data).then((res) => {
          this.comments = this.comments.concat(res.message);
          // console.log(this.comments);
          if (res.message.length === this.pagesize) {
            this.nowpage++;
          } else {
            this.nowpage = 0;
          }
        });
      }
    },
  },
  mounted() {
    // this.getComment();
  },
};
</script>
<style lang="less" scoped>
.card-detail {
  position: relative;
  padding: 0 20px;
  overflow: hidden;
  .top-bt {
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px;
    padding-top: 40px;
    display: flex;
    .dismiss {
      color: @primary-color;
      font-size: 16px;
      padding-right: 30px;
      cursor: pointer;
    }
    .report {
      font-size: 16px;
      color: @warning-color;
      cursor: pointer;
    }
  }

  .form {
    .message {
      background: none;
      height: 56px;
      border: 1px solid rgba(148, 148, 148, 1);
      resize: none;
      padding: @padding-8;
      width: 100%;
      margin-top: 12px;
    }
    .name {
      width: 200px;
      padding: @padding-8;
      background: none;
      border: 1px solid rgba(148, 148, 148, 1);
      line-height: 20px;
    }
  }
  .title {
    font-weight: 600;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .more {
    color: @gray-2;
    text-align: center;
    cursor: pointer;
    padding: 20px;
  }
  .bt {
    display: flex;
    padding-top: 6px;
    justify-content: space-between;
  }

  .comment-li {
    display: flex;
    padding-bottom: 30px;
    .user-head {
      flex: none;
      width: 28px;
      height: 28px;
      border-radius: 20px;
    }
    .comm-m {
      padding-left: 8px;
    }
    .m-top {
      display: flex;
      align-items: center;
      .name {
        font-weight: 600;
      }
      .date {
        font-size: 12px;
        padding-left: 4px;
        color: @gray-3;
      }
    }
  }
  .mm {
    padding-top: 4px;
  }
}
</style>
