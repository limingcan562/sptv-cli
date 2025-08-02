# SPTV-CLI

**轻松将 npm 包同步到 Verdaccio 注册表**

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/sptv-cli)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Verdaccio](https://img.shields.io/badge/verdaccio-v6.1.6-orange.svg)](https://verdaccio.org/)

[English](README.md) | [中文](README_CN.md)

## 📦 概述

日常中，我们出于安全性


## 🚀 安装

```bash
# 全局安装
npm install -g sptv-cli
```

## 📖 使用方法

### 主命令（完整工作流）

主命令执行完整的工作流：复制包 → 扫描有效包 → 同步到 Verdaccio。

```bash
# 基本用法（使用当前目录作为源）
sptv-cli -d <目标目录>

# 指定源目录
sptv-cli -i <源目录> -d <目标目录>

# 指定 Verdaccio 数据库路径
sptv-cli -i <源目录> -d <目标目录> -j <verdaccio数据库路径>

# 保存包列表到文件
sptv-cli -i <源目录> -d <目标目录> -s
```

**选项:**

| 选项 | 描述 | 默认值 |
|------|------|--------|
| `-i, --input <path>` | 包含包的源目录 | 当前目录 |
| `-d, --destination-path <path>` | 复制包的目标目录 | - |
| `-j, --verdaccio-db-json-path <path>` | .verdaccio-db.json 文件所在路径 | 目标路径 |
| `-s, --save` | 保存包列表到文件 | false |

### 复制目录命令

将目录复制到另一个位置。

```bash
sptv-cli copy <源目录> <目标目录>
```

### 同步命令

仅同步包到 Verdaccio，不进行复制。

```bash
sptv-cli sync <源目录> <verdaccio路径> [-s]
```

**选项:**

| 选项 | 描述 | 默认值 |
|------|------|--------|
| `-s, --save` | 保存包列表到文件 | false |

## 🔧 示例

```bash
# 从当前目录复制并同步包
sptv-cli -d ./backup

# 复制并同步特定包
sptv-cli -i ./packages -d ./verdaccio-storage -j ./verdaccio-storage

# 仅复制目录
sptv-cli copy ./src ./backup

# 仅同步到 Verdaccio
sptv-cli sync ./packages ./verdaccio-storage -s
```

## �� 许可证

ISC License 