import fs from 'fs-extra'
import ora from 'ora';
import chalk from 'chalk';


export default (inputSrc, outputSrc) => {
    const srcPath = inputSrc;
    const destPath = outputSrc;

    console.log('');
    console.log(`${chalk.cyan('====================== Copy directory ======================')}`);
    // console.log('');
    console.log(chalk.magenta(`=> Source folder: ${srcPath}`));
    console.log(chalk.magenta(`=> Destination folder: ${destPath}`));
    
    const spinner = ora('Start copying...').start();
    
    try {
        fs.copySync(srcPath, destPath);
        spinner.succeed(chalk.green(chalk.bold(`Copy completed!`)));
        console.log('');
    } catch (err) {
        spinner.fail(chalk.red(err));
    }
}