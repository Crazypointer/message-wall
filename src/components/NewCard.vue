<template>
  <div class="new-card">
    <!--  -->
    <div class="colors" v-if="id == 0">
      <p
        class="color-li"
        v-for="(e, index) in cardColor1"
        :key="index"
        :style="{ background: e }"
        :class="{ colorselected: index == colorSelected }"
        @click="changeColor(index)"
      ></p>
    </div>
    <!-- 新建照片卡片 -->
    <div class="add-photo" v-if="id == 1">
      <input type="file" name="file" id="file" multiple="multiple" @change="showPhoto" />
      <div class="add-bt" v-if="url == ''">
        <span class="iconfont icon-tianjia"></span>
      </div>
      <div class="change-bt" v-if="url != ''">
        <span class="iconfont icon-tianjia"></span>
      </div>
      <div class="photo-div">
        <img :src="url" alt="" />
      </div>
    </div>
    <!-- 新建便签卡片 -->
    <div class="card-main" :style="{ background: id == 0 ? cardColor[colorSelected] : cardColor[5] }">
      <textarea placeholder="留言..." class="message" maxlength="96" v-model="message"></textarea>
      <input type="text" placeholder="签名" class="name" v-model="name" />
    </div>
    <div class="labels">
      <p class="title">选择标签</p>
      <div class="label">
        <p
          class="label-li"
          v-for="(e, index) in label[id]"
          :key="index"
          :class="{ labelselected: index == labelSelected }"
          @click="changeLabel(index)"
        >
          {{ e }}
        </p>
      </div>
    </div>
    <div>
      <p class="title">免责声明</p>
      <p class="mzsm">
        一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
        1、反对宪法所确定的基本原则的；<br />
        2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br />
        3、损害国家荣誉和利益的； <br />
        4、煽动民族仇恨、民族歧视，破坏民族团结的；<br />
        5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
        6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
        7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
        8、侮辱或者诽谤他人，侵害他人合法权益的；<br />
        9、含有法律、行政法规禁止的其他内容的信息。<br />
      </p>
    </div>
    <div class="footbt">
      <YkButton size="max" normal="secondary" @click="closeModal(0)">丢弃</YkButton>
      <YkButton size="max" class="submit" @click="submit()">确认</YkButton>
    </div>
  </div>
</template>

<script setup>
// label: 从data中导入的数据 根据id=0或者1渲染出相应的全部的标签
import { cardColor, cardColor1, label } from "@/utils/data";
import YkButton from "./YkButton.vue";
import { getObjectURL } from "@/utils/yksg";
import { insertWallApi, uploadImgApi } from "@/api/index";
import { ref } from "vue";
import { useStore } from "vuex";
import { getCurrentInstance } from "vue";
const store = useStore();
const props = defineProps({
  //当前在留言墙还是照片墙
  id: {
    default: 0,
  },
});

let colorSelected = ref(0);
let labelSelected = ref(0); //当前选中的标签类型
let message = ref(""); //留言信息
let name = ref("Tree"); //签名
const user = store.state.user;
let url = ref("");

function changeColor(index) {
  colorSelected.value = index;
}
function changeLabel(index) {
  labelSelected.value = index;
}
const emit = defineEmits(["addClose"]);
//关闭窗口 data传信息
function closeModal(data) {
  // console.log(data);
  emit("addClose", data);
}
const instance = getCurrentInstance();
//提交新建的留言
function submit() {
  let aname = "匿名";
  if (name.value) {
    aname = name.value;
  }
  let data = {
    type: props.id, //0为留言墙 1为照片墙
    message: message.value, // 新建留言卡片的时候输入的内容
    name: aname, //新建卡片时的昵称
    userId: user.id, //访问用户的ip
    moment: new Date(), //新建时刻
    label: labelSelected.value, //所选择的留言所属标签
    color: 5, //卡片颜色
    imgurl: "",
  };
  if (message.value != "" && props.id == 0) {
    data.color = colorSelected.value;
    insertWallApi(data).then((res) => {
      let cardD = {
        type: props.id, //0为留言墙 1为照片墙
        message: message.value, // 新建留言卡片的时候输入的内容
        name: aname, //新建卡片时的昵称
        userId: user.id, //访问用户的ip
        moment: new Date(), //新建时刻
        label: labelSelected.value, //所选择的留言所属标签
        color: colorSelected.value, //卡片颜色
        imgurl: "",
        id: res.message.insertId,
        islike: [{ count: 0 }],
        like: [{ count: 0 }],
        comcount: [{ count: 0 }],
        report: [{ count: 0 }],
        dismiss: [{ count: 0 }],
      };
      console.log("新建留言处的");
      console.log(cardD);
      message.value = "";
      emit("clickbt", cardD);
      instance.proxy.$message({ type: "success", message: "感谢你的记录！" });
    });
  } else if (props.id == 1 && url) {
    uploadPhoto(data);
  }
}
//图片显示
function showPhoto() {
  let aa = getObjectURL(document.getElementById("file").files[0]);
  url.value = aa;
}
// 图片提交后端
function uploadPhoto(data) {
  let file = document.getElementById("file");
  if (file.files.length > 0) {
    let formData = new FormData();
    formData.append("file", file.files[0]);

    //提交后端
    console.log(formData);
    uploadImgApi(formData).then((res) => {
      // 数据存数据库
      data.imgurl = res;
      insertWallApi(data).then((result) => {
        let cardD = {
          type: props.id, //0为留言墙 1为照片墙
          message: message.value, // 新建留言卡片的时候输入的内容
          name: data.name, //新建卡片时的昵称
          userId: user.id, //访问用户的ip
          moment: new Date(), //新建时刻
          label: labelSelected.value, //所选择的留言所属标签
          color: 5, //卡片颜色
          imgurl: res,
          id: result.message.insertId,
          islike: [{ count: 0 }],
          like: [{ count: 0 }],
          comcount: [{ count: 0 }],
          report: [{ count: 0 }],
          dismiss: [{ count: 0 }],
        };
        message.value = "";
        emit("clickbt", cardD);
        instance.proxy.$message({ type: "success", message: "感谢你的记录！" });
      });
    });
  }
}
uploadPhoto;
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.new-card {
  padding: 0 @padding-20 100px;
  position: relative;
  .colors {
    padding-bottom: @padding-12;
    display: flex;
    align-items: center;
    .color-li {
      width: 24px;
      height: 24px;
      margin-right: @padding-8;
      cursor: pointer;
    }
    .colorselected {
      border: 1px solid rgba(59, 115, 240, 1);
    }
  }
  .add-photo {
    padding-bottom: 20px;
    position: relative;
    #file {
      position: absolute;
      z-index: 10;
      top: -10px;
      height: 74px;
      width: 64px;
      opacity: 0;
      cursor: pointer;
    }
    .add-bt {
      width: 64px;
      height: 64px;
      border: 1px solid @gray-3;
      border-radius: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .icon-tianjia {
      font-size: 24px;
    }
    .photo-div {
      max-height: 200px;
      width: 100%;
      // background: #f0f0f0;
      overflow: hidden;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
      .change-bt {
        position: absolute;
        top: 12px;
        left: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .icon-tianjia {
        color: #fff;
      }
    }
  }
  .card-main {
    width: 100%;
    height: 240px;
    padding: 12px;
    transition: @tr;
    .message {
      background: none;
      border: none;
      resize: none;
      width: 100%;
      height: 172px;
      padding: @padding-8;
      font-size: 15px;
    }
    .name {
      background: none;
      border: 1px solid #fff;
      width: 100%;
      padding: @padding-8;
      line-height: 20px;
      font-size: 15px;
    }
  }
  .title {
    padding-top: 30px;
    color: @gray-1;
    font-weight: 600;
  }

  .label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 320px;

    .label-li {
      padding: 2px 10px;
      border-radius: 20px;
      margin: 16px 4px 0 0;
      cursor: pointer;
      color: @gray-2;
      transition: @tr;
    }
    .labelselected {
      background: #ebebeb;
      color: @gray-1;
      font-weight: 600;
    }
  }
  .mzsm {
    padding-top: 10px;
    font-size: 12px;
    color: @gray-2;
  }
  .footbt {
    padding: @padding-20;
    // position: absolute;
    position: fixed;
    bottom: 52px;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    .submit {
      margin-left: 20px;
      width: 200px;
    }
  }
}
</style>
