const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  pluginOptions: {
    // 第三方插件配置
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/commons.less")], // less所在文件路径
    },
  },
};

