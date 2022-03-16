import path from 'path';
import download from 'download';
import ora from 'ora'; // 要想支持commonjs，下载version5
import chalk from 'chalk';

// 使用 fs-extra 或 fs 模块
// 字符串路径被解释为标识绝对或相对文件名的 UTF-8 字符序列。 相对路径将相对于通过调用 process.cwd() 确定的当前工作目录进行解析。

// package.json 路径
export const pkgPath = 'package.json';
export interface PackageJSON {
  name: string;
  version: string;
  description: string;
  scripts: {
    [key: string]: string;
  };
}

/**
 * 获取项目的绝对路径
 * @param projectName
 * @returns
 */
export function getProjectPath(projectName: string): string {
  return path.resolve(process.cwd(), projectName);
}

/**
 * 下载
 */

export async function downloadFile(url: string, destination: string, options?: download.DownloadOptions) {
  // Spinner初始设置
  const spinner = ora(chalk.cyan('Downloading...'));
  // 开始执行等待动画
  spinner.start();
  try {
    await download(url, destination, options);
  } catch (e) {
    // 下载失败提示
    spinner.fail(chalk.red(`Download failed.\n${e}`));
    // 当你镜像链接处于 404 或者其他状态，它会返回你相应的报错信息并退出进程
    process.exit();
  }
  spinner.succeed(chalk.green('Download successfully.'));
}
