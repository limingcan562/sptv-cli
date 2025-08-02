# SPTV-CLI

**Sync your npm packages to Verdaccio registry with ease**

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/sptv-cli)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Verdaccio](https://img.shields.io/badge/verdaccio-v6.1.6-orange.svg)](https://verdaccio.org/)

[English](README.md) | [中文](README_CN.md)

## 📦 Overview

SPTV-CLI is a powerful command-line tool designed to synchronize packages to Verdaccio registry. It provides multiple commands for copying directories, scanning packages, and syncing them to Verdaccio storage. This tool is designed to work with **Verdaccio v6.1.6** for optimal compatibility.

## ✨ Features

- **Package Synchronization**: Automatically sync packages to Verdaccio registry
- **Directory Copying**: Copy directories with progress indicators
- **Package Scanning**: Scan directories for valid packages (containing package.json and .tgz files)
- **Error Handling**: Comprehensive error handling with graceful failure
- **Progress Indicators**: Beautiful CLI progress indicators and colored output
- **Flexible Commands**: Multiple command options for different use cases

## 🚀 Installation

```bash
# Install globally
npm install -g sptv-cli

# Or use npx
npx sptv-cli --help
```

## 📖 Usage

### Main Command (Full Workflow)

The main command performs a complete workflow: copy packages → scan for valid packages → sync to Verdaccio.

```bash
# Basic usage (uses current directory as source)
sptv-cli -d <destination-directory>

# Specify source directory
sptv-cli -i <source-directory> -d <destination-directory>

# With Verdaccio database path
sptv-cli -i <source-directory> -d <destination-directory> -j <verdaccio-db-path>

# Save package list to file
sptv-cli -i <source-directory> -d <destination-directory> -s
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-i, --input <path>` | Source directory containing packages | Current directory |
| `-d, --destination-path <path>` | Destination directory for copied packages | - |
| `-j, --verdaccio-db-json-path <path>` | Path where .verdaccio-db.json is located | Destination path |
| `-s, --save` | Save package list to file | false |

### Copy Directory Command

Copy a directory to another location.

```bash
sptv-cli copy <source-directory> <destination-directory>
```

### Sync Command

Sync packages to Verdaccio without copying.

```bash
sptv-cli sync <source-directory> <verdaccio-path> [-s]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-s, --save` | Save the package list to file | false |

## 🔧 Examples

```bash
# Copy and sync packages from current directory
sptv-cli -d ./backup

# Copy and sync specific packages
sptv-cli -i ./packages -d ./verdaccio-storage -j ./verdaccio-storage

# Only copy directory
sptv-cli copy ./src ./backup

# Only sync to Verdaccio
sptv-cli sync ./packages ./verdaccio-storage -s
```

## 📄 License

ISC License 