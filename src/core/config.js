import chalk from 'chalk';
import pkg from '../../package.json' with { type: "json" };
import path from 'path';


export default {
    logo: `
    
███████ ██████  ████████ ██    ██        ██████ ██      ██ 
██      ██   ██    ██    ██    ██       ██      ██      ██ 
███████ ██████     ██    ██    ██ █████ ██      ██      ██ 
     ██ ██         ██     ██  ██        ██      ██      ██ 
███████ ██         ██      ████          ██████ ███████ ██ 
                                                           
                                                           
${chalk.green(`v${pkg.version}`)}
`,
    pkg,
    inputPath: '',
    logDir: path.resolve('./'), // 打印出来的日志目录
    logName: 'packages-name.txt', // 打印出来的日志名称
    verdaccioStorageJsonPath: '', // verdaccio 存放.verdaccio-db.json的位置
    verdaccioDataName: '.verdaccio-db.json' // 存放 verdaccio 包信息的文件名字（list字段对应的就是localhost:4873 发布的包）
}