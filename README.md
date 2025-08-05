# SPTV-CLI

**Sync your npm packages to Verdaccio registry with ease**

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/sptv-cli)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Verdaccio](https://img.shields.io/badge/verdaccio-v6.1.6-orange.svg)](https://verdaccio.org/)

[English](README.md) | [中文](README_CN.md)

## 🎬 Demo Preview

![sptv-cli Demo](https://github.com/your-username/sptv-cli/raw/main/demo.gif)

*Click the GIF above to view the complete demo*

## 📦 Overview

SPTV-CLI is a powerful command-line tool designed to synchronize packages to Verdaccio registry. It provides multiple commands for copying directories, scanning packages, and syncing them to Verdaccio storage. This tool is designed to work with **Verdaccio v6.1.6** for optimal compatibility.

### 🔴 Common Issues with Verdaccio Usage

1. **Manual Publishing Complexity**: Each package needs to be manually published to Verdaccio via `npm publish`, which becomes overwhelming with large numbers of packages
2. **Complex Dependencies**: Packages may have complex interdependencies, making manual publishing prone to missing dependent packages
3. **Version Management Difficulties**: Hard to ensure package versions in internal Verdaccio match those in external networks
4. **Repetitive Work**: Every project update requires re-publishing all related packages manually
5. **High Error Rate**: Manual operations are error-prone, potentially causing package publishing failures or version inconsistencies
6. **Low Efficiency**: The entire process is time-consuming and labor-intensive, affecting development efficiency

### ✅ Problems Solved by sptv-cli

1. **Automated Synchronization**: One-click automatic synchronization of external packages to internal Verdaccio, eliminating manual publishing
2. **Intelligent Dependency Scanning**: Automatically scans and identifies package dependencies, ensuring all dependent packages are synchronized
3. **Batch Processing**: Supports batch processing of multiple packages, greatly improving synchronization efficiency
4. **Version Consistency**: Ensures package versions in internal Verdaccio are completely consistent with external networks
5. **Error Handling**: Provides comprehensive error handling mechanisms to ensure synchronization process stability
6. **Progress Visualization**: Real-time display of synchronization progress, keeping users informed of operation status
7. **Flexible Configuration**: Supports multiple configuration options to adapt to different usage scenarios

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
# Basic usage (uses current directory for both input and verdaccio path)
sptv-cli sync

# Specify source directory only
sptv-cli sync <source-directory>

# Specify both source and verdaccio path
sptv-cli sync <source-directory> <verdaccio-path>

# With save option
sptv-cli sync <source-directory> <verdaccio-path> -s
```

**Arguments:**

| Argument | Description | Default |
|----------|-------------|---------|
| `input` | Source directory containing packages | Current directory |
| `verdaccio-path` | Path where verdaccio data file is located | Current directory |

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

# Only sync to Verdaccio (using current directory)
sptv-cli sync

# Only sync to Verdaccio with specific paths
sptv-cli sync ./packages ./verdaccio-storage -s
```

## 📄 License

ISC License 