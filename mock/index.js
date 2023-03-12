let Mock = require("mockjs");
export const note = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "data|20": [
    {
      //创建时间
      moment: new Date(),
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": 1,
      "userId|+1": 10,
      "message|24-96": "@cword", //留言内容
      "label|0-10": 0,
      name: "@cname",
      "like|0-120": 0,
      "comment|0-120": 0, //评论条数
      "imgurl|0-4": 0, //背景色
      //dismiss 撤销留言
      "dismiss|0-20": 0,
      //举报
      "report|0-20": 0,
      type: 0, //  类型为留言
    },
  ],
});
export const comment = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "data|20": [
    {
      //创建时间
      moment: new Date(),
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": 1,
      "userId|+1": 10,
      "message|24-96": "@cword",
      name: "@cname",
      "imgurl|0-2": 0,
    },
  ],
});
export const photo = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "data|20": [
    {
      //创建时间
      moment: new Date(),
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": 1,
      "userId|+1": 10,
      "message|24-96": "@cword", //留言内容
      "label|0-10": 0,
      name: "@cname",
      "like|0-120": 0,
      "comment|0-120": 0, //评论条数
      "imgurl|0-5": 0, //背景色
      //dismiss 撤销留言
      "dismiss|0-20": 0,
      //举报
      "report|0-20": 0,
      type: 1, //类型为照片
    },
  ],
});
