// create 命令的具体任务
import { initProjectDir, selectFeature, end } from '@/utils/initPro';

export async function create(projectName: string) {
  // 初始化目录
  await initProjectDir(projectName);
  // 命令行交互选择下载包
  await selectFeature();
  // 结束提示
  await end(projectName);
}
