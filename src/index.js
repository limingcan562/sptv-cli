#!/usr/bin/env node

// import fs from 'fs/promises';
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';

import config from './core/config.js';
import copyPackages from './core/copyPackages.js';
import getAllPackagesName from './core/getAllPackagesName.js'
import syncPackages from './core/syncPackages.js';

const spinner = ora('');

// 配置 Commander.js
program.enablePositionalOptions();

// 配置命令行参数
program
.name(config.pkg.name)
.option('-i, --input <path>', 'To be copied source path', process.cwd())
.option('-d, --destination-path <path>', 'verdaccio storage directory')
.option('-j, --verdaccio-db-json-path [path]', `Path where file ${config.verdaccioDataName} is located`)
.option('-s, --save', 'Output the obtained package name')
.version(config.logo, '-v', 'View current version')
.description(chalk.magenta(`=================================================\n>>>>> ${config.pkg.description} <<<<<< \n=================================================`))
.action(async options => {
    config.inputPath = options.input;
    config.verdaccioStorageJsonPath = options.verdaccioDbJsonPath || options.destinationPath;

    try {
        // 复制包到verdaccio storage
        copyPackages(options.input, options.destinationPath);

        // 获取符合verdaccio发布的包的名字
        const packageArr = getAllPackagesName(config.inputPath, options.save);

        // 同步包到verdaccio storage
        await syncPackages(packageArr);
    } catch (error) {
        spinner.fail(chalk.red(error));
        process.exit(1);
    }
});

// 拷贝某目录到目标目录
program
.command('copy')
.description('Copy directory')
.argument('<input>', 'To be copied source path')
.argument('<destination>', 'Destination directory')
.action(async function (input, destination) {
    try {
        // 复制文件夹
        copyPackages(input, destination);
    } catch (error) {
        spinner.fail(chalk.red(error));
        process.exit(1);
    }
});

// 同步包到 verdaccio
program
.command('sync')
.description('Sync packages to verdaccio')
.argument('[input]', 'Source directory containing packages', process.cwd())
.argument('[verdaccio-path]', 'Path where verdaccio data file is located', process.cwd())
.option('-s, --save', 'Save the package list to file')
.action(async function (input, verdaccioPath, options) {
    // 设置配置
    config.inputPath = input;
    config.verdaccioStorageJsonPath = verdaccioPath;

    try {
        // 获取符合verdaccio发布的包的名字
        const packageArr = getAllPackagesName(config.inputPath, options.save);
            
        // 同步包到verdaccio storage
        syncPackages(packageArr, this.name());
    } catch (error) {
        spinner.fail(chalk.red(error));
        process.exit(1);
    }
});

// 检查是否提供了必要的参数
if (process.argv && process.argv.length < 3) {
    program.help();
}
    
// 解析命令行参数
program.parse();