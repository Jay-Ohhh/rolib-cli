import download from 'download';
export declare const pkgPath = "package.json";
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
export declare function getProjectPath(projectName: string): string;
/**
 * 下载
 */
export declare function downloadFile(url: string, destination: string, options?: download.DownloadOptions): Promise<void>;
