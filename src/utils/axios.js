import { baseUrl } from "./env";
import axios from "axios";
const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  // headers: { "X-Custom-Header": "foobar" },
});
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);
// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);
export default service;
