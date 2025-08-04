import fs from 'fs-extra'
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import config from './config.js';

let releasedPackage = [];
let noReleasedPackage = [];


/**
 * 保存结果到JS文件（数组形式）
 */
function saveResultsToFile(searchRoot, packageArr) {
    const outputFilePath = path.join(config.logDir, config.logName);
    // 构建TXT内容，包含统计信息和路径列表
    const date = new Date();
    let content = `-------- Folder search results --------\n`;
    content += `creation time: ${date.toLocaleString()}\n`;
    content += `Search root directory: ${searchRoot}\n`;
    content += `Number of eligible folders: ${packageArr.length}\n`;
    content += `Number of packages released verdaccio: ${releasedPackage.length}\n`;
    content += `The package released by verdaccio: ${noReleasedPackage.length}\n\n`;
    // content += '-------------------------------------\n\n';
    content += `-------- List of packages published by verdaccio --------\n`;

    noReleasedPackage.forEach((folderPath, index) => {
        content += `${index + 1}. ${folderPath}\n`;
    });
    
    try {
        fs.writeFileSync(outputFilePath, content, 'utf8');
        return outputFilePath;
    } catch (err) {
        throw `Failed to save result file: ${err.message}`;
    }
}



export default (packageArr, commandName, save) => {
    console.log('');
    console.log(`${chalk.cyan('============= Synchronize package to verdaccio =============')}`);
    const spinner = ora('Start syncing...').start();
    const dPath = `${config.verdaccioStorageJsonPath}/${config.verdaccioDataName}`;

    try {
        // 判断verdaccio的数据文件存不存在
        if (!fs.existsSync(dPath)) {
            const _jPathText = `\n  Please use ${chalk.bold('-j')} to pass in the directory where ${chalk.bold(config.verdaccioDataName)} is located.`

            throw `${chalk.bold('Synchronization failed!')}\n  The ${chalk.bold(config.verdaccioDataName)} file does not exist.${!commandName ? _jPathText : ''}`;
        }

        const fileContent = fs.readFileSync(dPath, 'utf8');

        // 解析为JSON对象
        const data = JSON.parse(fileContent);

        // 只添加原本list里没有的包
        if (data.list) {
            packageArr.forEach(item => {
                if (!data.list.includes(item)) {
                    noReleasedPackage.push(item);
                    data.list.push(item);
                    
                } else {
                    releasedPackage.push(item);
                }
            });
        } else {
            data.list = packageArr;
            noReleasedPackage = packageArr;
        }

        // 保存结果
        if (save) {
            const savedPath = saveResultsToFile(config.inputPath, packageArr);
            if (savedPath) {
                console.log(`\n${chalk.green('The results have been saved to:')} ${savedPath}`);
            }
        }

        // 将修改后的内容写回文件
        fs.writeFileSync(dPath, JSON.stringify(data, null, 2), 'utf8');
        spinner.succeed(chalk.green(chalk.bold('Synchronization complete!')));
        console.log(chalk.bgGreenBright('You can now restart your verdaccio service!'));
        console.log('');
        
    } catch (error) {
        // spinner.fail(chalk.red(error));
        spinner.stop();
        throw error; // 重新抛出错误，让调用者能够捕获
    }
}