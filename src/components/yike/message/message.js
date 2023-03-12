import { createVNode, render } from "vue";
import YkMessage from "./YkMessage.vue";
const divVNode = createVNode("div", { class: "xtx-message-container" });
render(divVNode, document.body);

const div = divVNode.el;
const YKMessage = ({ message, type }) => {
  //创建一个虚拟dom
  const comVNode = createVNode(YkMessage, { message, type });
  //渲染到body页面中去
  render(comVNode, div);
  //设置6秒后自动卸载
  setTimeout(() => {
    render(null, div);
  }, 6000);
};
export default YKMessage;
