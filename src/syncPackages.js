import fs from 'fs-extra'
import ora from 'ora';
import chalk from 'chalk';
import config from './config.js';

export default async (packageArr) => {
    console.log('');
    console.log(`${chalk.cyan('============= Synchronize package to verdaccio =============')}`);
    const spinner = ora('Start syncing...').start();
    const dPath = `${config.verdaccioStorageJsonPath}/${config.verdaccioDataName}`;

    try {
        // 判断verdaccio的数据文件存不存在
        if (!fs.existsSync(dPath)) {
            throw `${chalk.bold('Synchronization failed!')}\n  The ${chalk.bold(config.verdaccioDataName)} file does not exist.\n  Please use ${chalk.bold('-j')} to pass in the directory where ${chalk.bold(config.verdaccioDataName)} is located.`;
        }


        const fileContent = fs.readFileSync(dPath, 'utf8');

        // 解析为JSON对象
        const data = JSON.parse(fileContent);

        // 检查并修改list属性
        data.list = packageArr;

        // 将修改后的内容写回文件
        fs.writeFileSync(dPath, JSON.stringify(data, null, 2), 'utf8');
        spinner.succeed(chalk.green(chalk.bold('Synchronization complete!')));
        console.log(chalk.bgGreenBright('You can now restart your verdaccio service!'));
        console.log('');
        
    } catch (error) {
        spinner.fail(chalk.red(error));
    }
}