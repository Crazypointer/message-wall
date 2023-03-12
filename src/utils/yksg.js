//时间转换
export const dateOne = (e) => {
  let d = new Date(e);
  let Y = d.getFullYear();
  let M = d.getMonth() + 1;
  let D = d.getDate();
  if (M < 10) {
    M = "0" + M;
  }
  if (D < 10) {
    D = "0" + D;
  }
  let date = Y + "." + M + "." + D;
  // console.log("js+" + date);
  return date;
};
// html5利用getObjectURL获取图片路径上传图片
export const getObjectURL = (file) => {
  let url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};
