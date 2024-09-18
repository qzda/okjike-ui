# okjike-ui 🚧

即刻网页版用户脚本。

## 功能

- 以瀑布流的方式浏览时间线。

![timeline](./image/timeline.png)

## 安装

[Github 源](https://raw.githubusercontent.com/qzda/okjike-ui/main/dist/okjike-ui.js)

需要浏览器装有 [Tampermonkey](https://www.tampermonkey.net/index.php) 插件。

## 开发

本项目使用[Bun](https://bun.sh/)构建。

```bash
bun i
bun dev
# $ NODE_ENV=dev bun run ./build.ts
# 🧹  Cleaned up dist directory.
# 🔥  Built user-script.
# 📦  Bundled     => dist/okjike-ui-0.0.1.js
```

将`dist/okjike-ui-0.0.1.js`文件添加到 Tampermonkey 中。
