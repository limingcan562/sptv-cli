
import fs from 'fs-extra'
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';


// 存储结果的数组
const resultPaths = [];
// 统计信息
let totalFoldersProcessed = 0;
// 搜索根目录（用于计算相对路径）
let searchRoot;

/**
 * 检查文件夹是否同时包含package.json和.tgz文件
 */
function checkFolder(folderPath) {
    try {
        const files = fs.readdirSync(folderPath);
        const hasPackageJson = files.includes('package.json');
        const hasTgzFile = files.some(file => file.endsWith('.tgz'));
        return hasPackageJson && hasTgzFile;
    } catch (err) {
        throw err;
    }
}


/**
递归搜索文件夹
*/
function searchFolders(currentPath) {
    try {
        const stats = fs.statSync(currentPath);
        
        if (stats.isDirectory()) {
            totalFoldersProcessed++;
            
            // 检查当前文件夹是否符合条件
            if (checkFolder(currentPath)) {
                // 计算相对于搜索根目录的路径
                const relativePath = path.relative(searchRoot, currentPath);
                resultPaths.push(relativePath);
            }
            
            // 递归处理子目录
            const entries = fs.readdirSync(currentPath, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.isDirectory()) {
                    searchFolders(path.join(currentPath, entry.name));
                }
            }
        }
    } catch (err) {
        throw err;
    }
}

// 开始执行
export default (rootDir, save) => {
    searchRoot = path.resolve(rootDir);

    console.log('');
    console.log(`${chalk.cyan('=========== Retrieving eligible package names =============')}`);
    // console.log('');

    const spinner = ora('Retrieving eligible package names...').start();

    
    try {
        searchFolders(searchRoot, spinner);
        spinner.succeed(chalk.green(chalk.bold('Complete search!')));
        
        // 显示结果
        console.log(`\n${chalk.bold('Search results:')}`);
        console.log(`  A total of ${chalk.cyan(totalFoldersProcessed)} folders were processed.`);
        console.log(`  Found ${chalk.cyan(resultPaths.length)} folders that match the criteria. \n`);
        
        // resultPaths.forEach((path, index) => {
        //     console.log(`${index + 1}. ${path}`);
        // });
        
        return resultPaths;
        
    } catch (err) {
        // spinner.fail(chalk.red(err));
        spinner.stop();
        throw err; // 重新抛出错误，让调用者能够捕获
    }

}