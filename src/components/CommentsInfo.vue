<template>
  <div class="comment">
    <div class="comment-li" v-for="(e, index) in comments" :key="index">
      <div class="user-head" :style="{ backgroundImage: headColor[e.imgurl] }"></div>
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
</template>
<script setup>
import { headColor } from '@/utils/data';
import { dateOne } from '@/utils/yksg';
import { ref, computed, onMounted } from 'vue';
import { findCommentPageApi } from '@/api';
import { useinfoStore } from '@/store/infoStore';
const infoStore = useinfoStore();
const props = defineProps(['card']);
//用cards来代替card 因为card不能被直接修改
const cards = computed(() => {
  return props.card;
});
//评论
let comments = ref([]);
//输入的内容
const discuss = ref('');
//评论者名称
const name = ref('匿名');

const isDis = () => {
  //禁止评论的按钮
  if (discuss.value && name.value) {
    return true;
  } else return false;
};
const nowpage = ref(1);
const pagesize = ref(5);
//分页获取评论
function getComment() {
  if (nowpage.value >= 0) {
    let data = {
      id: props.card.id,
      page: nowpage.value,
      pagesize: pagesize.value,
    };
    findCommentPageApi(data).then(res => {
      // console.log(res.message);
      //去重插入
      comments.value = deduplication(comments.value, res.message);
      // comments.value = comments.value.concat(res.message);
      if (res.message.length == pagesize.value) {
        nowpage.value++;
      } else {
        nowpage.value = 0;
      }
      // console.log(comments.value);
    });
  }
}
//去重
function deduplication(res, data) {
  for (let i = 0; i < data.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < res.length; j++) {
      if (data[i].id === res[j].id) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      res.push(data[i]);
    }
  }
  return res;
}

onMounted(() => {
  getComment();
});
</script>

<style lang="less" scoped>
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
    .mm {
      padding-top: 4px;
    }
  }
}
.more {
  color: @gray-2;
  text-align: center;
  cursor: pointer;
  padding: 20px;
}
</style>
