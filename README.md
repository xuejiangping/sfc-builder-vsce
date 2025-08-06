# sfc-builder-vsce

这是一个基于 [sfc-builder-cli](https://gitee.com/xue6474/sfc-builder-cli.git)命令行项目的 VSCode 插件，该工具可以将选项式 api 风格的 vue 单文件组件构建为 全局组件的插件,非常适合 cdn 等非工程化开发环境项目使用。

## Features

[sfc-builder-cli](https://gitee.com/xue6474/sfc-builder-cli.git) 使用 vue 官方工具 @vue/compiler-sfc 模块，编译 `vue` 文件得到 `script`、`template`、`style` 中的内容，再将它们构建为全局组件。只需要在项目根 `html` 中引入编译后的 `index.js`、`index.css`，即完成单文件组件到全局注册。

> 详情请查看仓库: https://gitee.com/xue6474/sfc-builder-cli.git

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## 插件配置

`configuration.properties` 中包含以下配置:

- `sfc-builder.id_type`: `id`生成的方式,默认为`dirName`,比如：`src/components/A/index.vue` 生成组件的 id 为`id_pre-a`.
- `sfc-builder.id_pre`: 生成的全局组件 id 的前缀,默认为 `xue`.
- `sfc-builder.output_path`: 生成组件的`index.js` ,` index.css` ,`_build.json`的 输出目录，默认为 当前项目工作目录.

> Tip: 若 output_path 为 相对目录，则会以当前工作目录为根目录拼接

### 1.0.0

---

## Following extension guidelines

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

## For more information

**Enjoy!**
