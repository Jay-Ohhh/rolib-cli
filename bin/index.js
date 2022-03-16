#!/usr/bin/env node
// （固定第一行）必加，主要是让系统看到这一行的时候，会沿着对应路径查找 node 并执行（去安装node的bin目录去找node执行器，一般我们都放在环境变量中）。调试阶段时，为了保证 js-plugin-cli 指令可用。

// 注意 package.json 的name不能和现有的npm包名重复
/**
 * 可以打印 options 和 commands:
 * node bin/index --help 或 -h 
 * OWJ --help 或 -h
 */

/**
 * 当我们的自定义指令的名字就是项目名称的时候，可以简写为以下形式：
{
  ...
  "bin": "bin/demo-cli",
  ...
}
 */

// 将构建目录(lib)下的 index.js 作为脚手架的入口
require('../dist/index')