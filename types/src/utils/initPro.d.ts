/**
 * 初始化项目目录
 */
export declare function initProjectDir(projectName: string): Promise<void>;
/**
 * 命令行交互
 */
export declare function selectFeature(): Promise<void>;
/**
 * 安装用户选择的功能
 * @param features 功能列表
 */
export declare function installFeatures(features: string[]): Promise<void>;
/**
 * 整个项目安装结束，给用户提示信息
 */
export declare function end(projectName: string): void;
