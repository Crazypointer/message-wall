import fetch from "@/utils/axios";
//获取访问者ip
export const signIpApi = () => fetch.post("/signip");

//新建留言
export const insertWallApi = (data) => fetch.post("/insertwall", data);

//查询留言墙
export const findWallPageApi = (data) => fetch.post("/findwallPage", data);

//新建反馈
export const insertFeedbackApi = (data) => fetch.post("/insertfeedback", data);

//新建评论
export const insertCommentApi = (data) => fetch.post("/insertcomment", data);

//分页获取评论
export const findCommentPageApi = (data) => fetch.post("/findcommentPage", data);

//上传图片
export const uploadImgApi = (data) => fetch.post("/profile", data);
