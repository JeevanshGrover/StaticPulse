import { countLOC } from './analyzers/loc.js';
import { checkReadme } from './analyzers/readme.js';
import { checkEnvExample } from './analyzers/envExample.js';
import { countConsoleLogs } from './analyzers/consoleLog.js';
import { countTodos } from './analyzers/todo.js';
import { analyzeDependencies } from './analyzers/dependency.js';
import { checkLicense } from './analyzers/license.js';
import { scanRepo } from './analyzers/fileScanner.js';

async function runAnalyzers(repoPath) {
    // run independently so one failure doesn't kill the whole pipeline
    const [fileInfo, loc, hasReadme, hasEnvExample, consoleLogs, todos, depInfo, hasLicense] =
        await Promise.all([
            scanRepo(repoPath).catch(() => ({
                totalFiles: 0,
                totalFolders: 0
            })),
            countLOC(repoPath).catch(() => 0),
            checkReadme(repoPath).catch(() => false),
            checkEnvExample(repoPath).catch(() => false),
            countConsoleLogs(repoPath).catch(() => 0),
            countTodos(repoPath).catch(() => 0),
            analyzeDependencies(repoPath).catch(() => ({ dependencies: [], dependencyCount: 0, devDependencyCount: 0 })),
            checkLicense(repoPath).catch(() => false),
        ]);

    return {
        fileCount: fileInfo.totalFiles,
        folderCount: fileInfo.totalFolders,
        loc,
        hasReadme,
        hasEnvExample,
        consoleLogs,
        todos,
        dependencyCount: depInfo.dependencyCount,
        devDependencyCount: depInfo.devDependencyCount,
        dependencies: depInfo.dependencies,
        hasLicense,
    };
}

export { runAnalyzers };