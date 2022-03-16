const shell = require('shelljs')
const fse = require('fs-extra')
const symbols = require('log-symbols')
const chalk = require('chalk')
const path = require('path')
const clear = require('console-clear');
const download = require('download')
const ora = require('ora')
const execa = require('execa')
const { execArgv } = require('process')
const { exec } = require('child_process')


async function t () {
  console.log(shell.exec(`npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"`));
}

const pkgPath = `${process.cwd()}/package.json`
async function t2 () {
  // const json = await fse.readJson(pkgPath)
  await fse.writeFile(`${process.cwd()}/t1.js`, babelConfig, { spaces: 2 })
}

a1()
async function a1 () {
  clear()
  console.log('eslint @typescript-eslint/parser prettier eslint-config-prettier eslint-plugin-prettier'.split(' '));
  return
  const a = ora(chalk.blue("")).start();
  a.text = "AAA"
  await execa('npm i -D saaasfaas').catch(e => {
    console.log(e.stderr);
    a.fail('bbb')
    process.exit()
  })
  console.log(222);
  a.succeed('bbb')
}


