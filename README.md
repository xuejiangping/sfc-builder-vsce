# sfc-builder-vsce

这是一个基于 [sfc-builder-cli](https://gitee.com/xue6474/sfc-builder-cli.git) 的 VSCode 插件，该插件可以在我们编辑保存`.vue`文件时，自动 将选项式 api 风格的 vue 单文件组件构建为 全局组件,非常适合 cdn 等非工程化开发环境使用。

## 介绍

[sfc-builder-cli](https://gitee.com/xue6474/sfc-builder-cli.git)使用`vue` 官方工具包[@vue/compiler-sfc](`@vue/compiler-sfc`) 模块，编译 `vue` 文件为 `script`、`template`、`style` 元信息，再将它们构建为全局组件

我们只需要在项目的 `html` 中引入构建后的 `index.js`、`index.css`，即完成单文件组件到全局注册。

所有组件构建信息 会记录在`build.json`中，提供了组件的长期存储， 且基于组件文件 hash,不会重复构建,提高了构建效率

工具已完全构建，无任何外部依赖，非常适合内网、非工程化环境开发使用

`sfc-builder-cli`详情查看: https://gitee.com/xue6474/sfc-builder-cli.git

## 依赖

= `sfc-builder-cli` 是完全构建产物，除了基本的 node 环境依赖，不会引入任何外部依赖，可以完全在内网环境中使用

## 插件配置

`configuration.properties` 中包含以下配置:

- `sfc-builder.id_type`: `id`生成的方式,默认为`dirName`。
  如：`src/components/A/index.vue` 生成组件的 id 为`xue-a`.

- `sfc-builder.id_pre`: 组件的 id 的前缀，默认为 `xue`.

- `sfc-builder.output_path`:构建产物的输出目录，默认为 当前工作目录
  构建产物包含 `index.js` ,` index.css` ,`_build.json`

> tip: 若 output_path 为 相对路径，则会以当前工作目录为根目录拼接

## 使用方法

1.  启用插件
    在 vscode 中，输入 `ctrl+shift+p` 打开命令面板，然后输入 `sfc-builder-build`命令并执行，即可启用插件。插件默认关闭的，只有命令启动后才会开始监听构建。所以，并不会影响工程化环境下正常的 vue 组件开发
    插件启动后，会监听正在编辑且保存的 vue 文件，并自动执行 cli 工具构建

2.  清理构建目录
    在 命令面板中 输入 `sfc-builder-clear`命令并执行，即可清理构建目录（outputPath）

---

## For more information

**Enjoy!**
