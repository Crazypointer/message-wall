<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="dismiss">联系墙主撕掉该便签</p>
      <p class="report">举报</p>
    </div>
    <!-- 这个NoteCard是留言详情界面引入的Card组件 -->
    <NoteCard :note="card"></NoteCard>
    <div class="form">
      <textarea name="" class="message" placeholder="请输入..." v-model="discuss"></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="签名" v-model="name" />
        <YkButton :class="{ notallowed: !isDis }" @click="submit">确定</YkButton>
      </div>
    </div>
    <p class="title">评论{{ cards.comcount[0].count }}</p>
    <CommentsInfo :card="cards"></CommentsInfo>
  </div>
</template>

<script setup>
import CommentsInfo from './CommentsInfo.vue';
import NoteCard from './NoteCard.vue';
import YkButton from './YkButton.vue';
import { ref, computed } from 'vue';
import { insertCommentApi } from '@/api/index';
import { useinfoStore } from '@/store/infoStore';
const infoStore = useinfoStore();
const props = defineProps(['card']);
const name = ref('匿名');
//用cards来代替card 因为card不能被直接修改
const cards = computed(() => {
  return props.card;
});
const discuss = ref('');
const isDis = () => {
  //禁止评论的按钮
  if (discuss.value && name.value) {
    return true;
  } else return false;
};
function submit() {
  if (isDis) {
    if (name.value == '') {
      name.value = '匿名';
    }
    //如果有头像就用用户头像，没有就用随机头像 3个颜色里面随机一个
    let img = Math.floor(Math.random() * 3);
    let data = {
      wallId: cards.value.id,
      userId: infoStore.user,
      imgurl: img,
      moment: new Date(),
      name: name.value,
      comment: discuss.value,
    };
    console.log(data);
    insertCommentApi(data).then(() => {
      // comments.value.unshift(data);
      cards.value.comcount[0].count++;
      // 清空评论框
      discuss.value = '';
      // 清空签名框
      name.value = '';
    });
  }
}
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
  .bt {
    display: flex;
    padding-top: 6px;
    justify-content: space-between;
  }
}
</style>
