#!/usr/bin/env node

// import fs from 'fs/promises';
import { program, Command, Option } from 'commander';
import config from './src/config.js';
import chalk from 'chalk';
import copyPackages from './src/copyPackages.js';
import getAllPackagesName from './src/getAllPackagesName.js'
import syncPackages from './src/syncPackages.js';

// 配置 Commander.js
program.enablePositionalOptions();

// 配置命令行参数
program
.name(config.pkg.name)
.requiredOption('-i, --input <path>', 'To be copied source path')
.requiredOption('-d, --destination-path <path>', 'verdaccio storage directory')
.option('-j, --verdaccio-db-json-path [path]', `Path where file ${config.verdaccioDataName} is located`)
.option('-s, --save', 'Output the obtained package name')
.version(config.logo, '-v', 'View current version')
.description(chalk.magenta(`=================================================\n>>>>> ${config.pkg.description} <<<<<< \n=================================================`))
.action(async options => {
    config.inputPath = options.input;
    config.verdaccioStorageJsonPath = options.verdaccioDbJsonPath || options.destinationPath;


    // 复制包到verdaccio storage
    copyPackages(options.input, options.destinationPath);

    // 获取符合verdaccio发布的包的名字
    const packageArr = getAllPackagesName(config.inputPath, options.save);

    // 同步包到verdaccio storage
    syncPackages(config.verdaccioStorageJsonPath, packageArr);
});

// 拷贝某目录到目标目录
const copyDirCommand = new Command('copy-dir')
.description('Copy directory')
.requiredOption('-i, --input <path>', 'To be copied source path')
.requiredOption('-d, --destination-path <path>', 'Destination directory')
.action(async function (options) {
    // 复制文件夹
    copyPackages(options.input, options.destinationPath);
});

program.addCommand(copyDirCommand);

// 检查是否提供了必要的参数
if (process.argv && process.argv.length < 3) {
    program.help();
}
    
// 解析命令行参数
program.parse();