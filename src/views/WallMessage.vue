<template>
  <div class="wall-message">
    <!-- id=0表示留言墙 1表示照片墙 -->
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{ lbselected: nlabel == -1 }" @click="selectNode(-1)">全部</p>
      <p class="label-list" v-for="(e, index) in label[id]" :key="index" :class="{ lbselected: nlabel == index }" @click="selectNode(index)">
        {{ e }}
      </p>
    </div>
    <div class="card" :style="{ width: nWidth + 'px' }" v-show="id == 0">
      <!-- 这是主页面显示的每张卡片的组件 -->
      <NoteCard
        v-for="(info, index) in cards"
        :key="index"
        :note="info"
        :width="'288px'"
        class="card-inner"
        :class="{ cardselected: index == cardSelected }"
        @toDetail="selectCard(index)"
        v-show="id == 0"
      ></NoteCard>
    </div>
    <!-- 照片墙的组件 -->
    <div class="photo" v-show="id == 1">
      <!-- selectCard -->
      <PhotoCard
        class="photo-card"
        v-for="(img, index) in cards"
        :key="index"
        :photo="img"
        @toDetail="selectCard(index)"
        v-show="id == 1"
      ></PhotoCard>
    </div>
    <!-- 图片预览 -->
    <!-- bug cardSelected始终为-1 -->
    <YkViewer :isView="view" :photos="cards" :nowNumber="cardSelected" @viewSwitch="viewSwitch"></YkViewer>

    <!-- 卡片状态 -->
    <div class="none-msg" v-if="isLoading == 0">
      <img :src="none[id].url" alt="" />
      <p>{{ none[id].msg }}</p>
    </div>

    <!-- 加载动画结构 -->
    <div class="loading" v-show="isLoading == -1">
      <div id="lottile"></div>
      <p>加载中...</p>
    </div>
    <p class="bottom-tip" v-show="isLoading == 2">没有更多了...</p>
    <!-- 新建按钮 用于添加留言或者照片 -->
    <div class="add" :style="{ bottom: addBottom + 'px' }" @click="addCard" v-show="!modal">
      <span class="iconfont icon-tianjia"></span>
    </div>
    <!-- 右侧弹出的卡片组件 -->
    <!-- 新建或者查看留言（照片）对应的弹出界面 -->
    <YkModal :title="title" @close="closeModal" :isModal="modal">
      <!-- 父组件传递id给子组件 -->
      <!-- 父组件通过子组件传递回来的addClose事件来控制关闭，通过clickbt事件来唤出新建留言卡片的页面 -->
      <NewCard :id="id" @addClose="closeModal" @clickbt="newCard" v-if="cardSelected == -1"></NewCard>

      <!-- 当前留言卡片的属性组件 当用户点击的是主页的留言时会弹出该卡片 -->
      <!-- 查看留言对应的弹出界面 -->
      <CardDetail :card="cards[cardSelected]" v-if="cardSelected != -1"></CardDetail>
    </YkModal>
  </div>
</template>
<script>
import { wallType, label, none } from "@/utils/data";

import lottie from "lottie-web";
import loading from "@/assets/images/loading.json";
import NoteCard from "@/components/NoteCard.vue";
import YkModal from "@/components/YkModal.vue";
import NewCard from "@/components/NewCard.vue";
import CardDetail from "@/components/CardDetail.vue";
import PhotoCard from "@/components/PhotoCard.vue";
import YkViewer from "@/components/YkViewer.vue";
import { findWallPageApi } from "@/api";

export default {
  components: {
    NoteCard,
    YkModal,
    NewCard,
    CardDetail,
    PhotoCard,
    YkViewer,
  },
  data() {
    return {
      wallType, //0位为留言墙 1为照片墙
      label, //从data.js中导入的label类型数组 需要传到newCard中去
      none, //从data.js中导入的none数组 用于当页面没有留言/照片的时候显示
      nlabel: -1, //当前选中的标签
      cards: [], //卡片信息 数组 从数据库里查到的
      photoArr: [], //存图片链接的数组
      nWidth: 0, //卡片宽度
      addBottom: 30, //add按钮离底部的高度
      title: "写留言", //当前卡片是写留言 还是联系撕掉
      modal: false, //是否调用弹窗
      cardSelected: -1, //当前选中的卡片 -1
      view: false, //预览大图
      isLoading: -1, //是否在加载中 -1为加载中、0为没有拿到数据
      page: 1,
      pagesize: 5,
    };
  },
  computed: {
    //留言墙和照片墙的切换id
    id() {
      //获取地址栏的id 通过id区分留言墙还是照片墙
      return this.$route.query.id;
    },
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    // newName, oldName 两个值
    id() {
      //路由跳转，全部设置为默认值
      this.modal = false; //关闭详情弹窗
      this.view = false; //关闭图片预览
      this.nlabel = -1; //选择的标签变为默认的-1
      this.cardSelected = -1; //标签变为未选中的状态
      this.getUser();
      this.getWallCard(this.id);
    },
  },
  methods: {
    //选中标签
    selectNode(e) {
      this.nlabel = e;
      this.cards = [];
      this.page = 1;
      this.getWallCard(this.id);
    },
    //获取卡片node的宽度
    noteWidth() {
      let wWidth = document.body.clientWidth;
      this.nWidth = Math.floor((wWidth - 120) / 300) * 300;
    },
    scrollBottom() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTo;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight + 230 >= scrollHeight) {
        this.addBottom = scrollTop + clientHeight + 230 - scrollHeight;
      } else {
        this.addBottom = 30;
      }
      //加载更多
      if (scrollTop + clientHeight === scrollHeight) {
        this.getWallCard(this.id);
      }
    },

    //切换弹窗打开或关闭
    closeModal() {
      //关闭后，卡片选择状态变为-1 未选中卡片
      this.cardSelected = -1;
      //关闭弹窗
      this.modal = false;
      //如果是照片墙
      if (this.id == 1) {
        this.view = false;
      }
    },
    //新建card
    addCard() {
      this.title = "写留言";
      this.modal = true;
    },
    //选择卡片
    selectCard(index) {
      this.title = "";
      if (this.cardSelected != index) {
        this.cardSelected = index;
        this.modal = true;
        if (this.id == 1) {
          this.view = true;
        }
      } else {
        this.cardSelected = -1;
        this.modal = false;
        if (this.id == 1) {
          this.view = false;
        }
      }
    },
    //切换图片
    viewSwitch(e) {
      console.log("点击了切换图片");
      //0 向左， 1向右
      if (e == 0) {
        this.cardSelected--;
      } else {
        this.cardSelected++;
      }
    },
    //前端插入卡片
    newCard(e) {
      console.log("插入新的卡片");
      this.cards.unshift(e);
      this.closeModal();
    },
    //加载动画
    loading() {
      // lottie
      if (this.isLoading === -1) {
        this.$nextTick(async () => {
          var params1 = {
            container: document.getElementById("lottile"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: loading,
          };
          lottie.loadAnimation(params1);
        });
      }
    },
    //获取卡片  传入的id是指留言墙还在照片墙对应的id
    getWallCard(id) {
      if (this.page > 0) {
        this.isLoading = -1;
        let data = {
          type: id,
          page: this.page,
          pagesize: this.pagesize,
          userId: this.user.id, //用来匹配是否点赞
          label: this.nlabel, //表示当前选中的标签
        };

        findWallPageApi(data).then((res) => {
          this.cards = this.cards.concat(res.message);
          if (res.message.length) {
            this.page++;
          } else {
            this.page = 0;
            this.isLoading = 2;
          }
          //this.cards.length 代表有数据 则加载动画就关闭 isLoading==1 加载， == 2显示没有更多， ==0停止动画
          if (this.cards.length > 0) {
            this.isLoading = 1;
            if (this.page === 0) {
              this.isLoading = 2;
            }
          } else {
            this.isLoading = 0;
          }
          // 如果为图片 就单独拿出来
          if (this.id === 1) {
            for (let i = 0; i < this.cards.length; i++) {
              this.photoArr.push(this.cards[i].imgurl);
            }
          }
        });
      }
    },
    getUser() {
      let timer = setInterval(() => {
        if (this.user) {
          this.getWallCard(this.id);
          clearInterval(timer);
        }
      }, 10);
    },
  },
  created() {},
  mounted() {
    this.noteWidth();
    this.loading();
    this.getUser();
    // this.getWallCard(this.id);

    //监听屏幕变化
    window.addEventListener("resize", this.noteWidth);
    window.addEventListener("scroll", this.scrollBottom);
  },
  unmounted() {
    //监听屏幕变化
    window.addEventListener("resize", this.noteWidth);
    window.addEventListener("scroll", this.scrollBottom);
  },
};
</script>
<style lang="less" scoped>
.wall-message {
  min-height: 700px;
  padding-top: 52px;
  .title {
    font-size: 56px;
    padding-top: 48px;
    padding-bottom: @padding-8;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }
  .slogan {
    color: @gray-2;
    text-align: center;
  }
  .label {
    display: flex;
    justify-content: center;
    padding-top: 40px;

    .label-list {
      padding: 0 14px;
      line-height: 28px;
      margin: @padding-4;
      color: @gray-2;
      cursor: pointer;
    }
    .lbselected {
      color: @gray-1;
      font-weight: 600;
      border: 1px solid @gray-1;
      border-radius: 16px;
    }
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    padding-top: 28px;
    margin: auto;
    transition: @tr;
    .card-inner {
      margin: 6px;
    }
    .cardselected {
      border: 1px solid @primary-color;
    }
  }
  .photo-card {
    margin-bottom: 4px;
    break-inside: avoid;
  }
  .photo {
    width: 88%;
    margin: auto;
    columns: 6;
    column-gap: 4px;
  }
  .add {
    width: 56px;
    height: 56px;
    background: #202020;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: @tr;
    .icon-tianjia {
      color: @gray-10;
      font-size: 24px;
    }
  }
  .none-msg {
    width: 100%;
    text-align: center;
    padding-top: 80px;
    position: absolute;
    top: 280px;
    img {
      display: inline;
    }
    p {
      font-family: serif;
      font-weight: 700;
      font-size: 24px;
      color: @gray-3;
    }
  }
  .loading {
    text-align: center;
    width: 100%;
    p {
      margin-top: -72px;
      font-family: serif;
      font-size: 24px;
      color: @gray-3;
    }
  }
  #lottile {
    margin-top: 20px;
    height: 200px;
  }
  .bottom-tip {
    text-align: center;
    color: @gray-3;
    padding: 20px;
  }
}
</style>
