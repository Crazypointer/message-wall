let baseUrl = ''; //域名地址
let routerMode = 'hash';
let baseImgPath;
if (process.env.NODE_ENV == 'devlopment') {
  baseUrl = 'http://localhost:3000';
  baseImgPath = 'http://localhost:3000';
} else {
  baseUrl = 'http://localhost:3000';
  baseImgPath = 'http://localhost:3000';
}

export { baseUrl, routerMode, baseImgPath };
