let baseUrl = ""; //域名地址
let routerMode = "hash";
let baseImgPath;
if (process.env.NODE_ENV == "devlopment") {
  baseUrl = "http://1.14.73.195:3000";
  baseImgPath = "http://1.14.73.195:3000";
} else {
  baseUrl = "http://1.14.73.195:3000";
  baseImgPath = "http://1.14.73.195:3000";
}

export { baseUrl, routerMode, baseImgPath };
