/**
 * 各个功能的安装方法，方法名前缀 installXxx
 */
import { installESlintPrettier } from './installESlintPrettier';
import { installHuskyLintStaged } from './installHuskyLintStaged';
import { installCommitizen } from './installCommitizen';
import { installCommitlint } from './installCommitlint';
import { installTypeScript } from './installTypeScript';
import { installBabel } from './installBabel';
import { installRollup } from './installRollup';
export declare const installMethods: {
    installESlintPrettier: typeof installESlintPrettier;
    installHuskyLintStaged: typeof installHuskyLintStaged;
    installCommitizen: typeof installCommitizen;
    installCommitlint: typeof installCommitlint;
    installTypeScript: typeof installTypeScript;
    installBabel: typeof installBabel;
    installRollup: typeof installRollup;
};
