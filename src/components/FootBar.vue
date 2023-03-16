<template>
  <div class="foot-bar">
    <div class="foot-bar-inner">
      <div class="foot-left">
        <div class="logo">
          <img src="@/assets/images/yksg.svg" alt="" class="logo-img" />
          <p class="logo-name">One Time</p>
        </div>
        <p class="top-p">一刻时光是一款为便于与用户交流的留言平台。</p>
        <p class="top-p">用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅可以用于交流，也是一场记录。</p>
        <p class="state">
          <span>声明</span>
          <span>备案/许可证AICP备12345678号</span><span>网站备案/许可证AICP备</span>
        </p>
      </div>
      <div class="link">
        <p class="title">链接</p>
        <div class="line-inner">
          <a href="#" target="_blank" class="link-name">One</a>
          <a href="#" target="_blank" class="link-name">Two</a>
        </div>
      </div>
      <div class="foot-right">
        <p class="title">打赏</p>
        <div class="right-inner">
          <div>
            <img src="../assets/images/wx.png" alt="" />
            <p class="ds-title">微信支付</p>
          </div>
          <div>
            <img src="../assets/images/zfb.png" alt="" />
            <p class="ds-title">支付宝支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.foot-bar {
  width: 100%;
  height: 200px;
  background-color: @gray-1;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 40px;

  .foot-bar-inner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    p {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .foot-left {
    .logo {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      .logo-name {
        font-size: 20px;
        color: @gray-10;
        font-weight: 600;
        padding-left: 10px;
      }
    }
    .top-p {
      font-size: @size-12;
      padding-bottom: 4px;
      width: 400px;
    }
    .state {
      font-size: @size-12;
      padding-top: 26px;
      span {
        padding-right: 20px;
      }
    }
  }
  .title {
    font-size: @size-16;
    padding-bottom: 12px;
  }
  .link {
    padding-left: 50px;
    flex: 1;
    .line-inner {
      a {
        color: rgba(255, 255, 255, 0.5);
        padding-right: 20px;
        font-size: @size-12;
      }
    }
  }
  .foot-right {
    .right-inner {
      display: flex;
      img {
        width: 100px;
        padding-right: 40px;
      }
      color: rgba(255, 255, 255, 0.5);
    }
    .ds-title {
      font-size: @size-12;
      padding-top: 8px;
    }
  }
}
</style>
