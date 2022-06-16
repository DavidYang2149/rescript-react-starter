#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const { log } = console;

if (process.argv.length < 3) {
  log('\x1b[31m%s\x1b[0m', '========================= 🚨 E R R O R 🚨 =========================');
  log('\x1b[31m%s\x1b[0m', '🚨 Warning:');
  log('');
  log('Please specify the project directory:');
  log('\x1b[32m%s\x1b[0m', 'rescript-react-starter <project-directory>');
  log('');
  log('For example:');
  log('npx rescript-react-starter my-project');
  log('\x1b[31m%s\x1b[0m', '=========================== 🚨 E N D 🚨 ===========================');

  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPOSITORY = 'https://github.com/DavidYang2149/rescript-react-starter';

const gitCloneOrderArray = ['git', 'clone', '--depth', '1', GIT_REPOSITORY, projectPath];
const gitCloneCommand = gitCloneOrderArray.map((item) => item.replace(/\s/g, '')).join(' ');

if (projectName !== '.') {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      log('\x1b[31m%s\x1b[0m', '========================= 🚨 E R R O R 🚨 =========================');
      log(projectName);
      log(
        '\x1b[31m%s\x1b[0m',
        `🚨 The folder ${projectName} already exist in the current directory, please give it another name.`,
      );
      log('\x1b[31m%s\x1b[0m', '=========================== 🚨 E N D 🚨 ===========================');
    }

    log('\x1b[31m%s\x1b[0m', '========================= 🚨 E R R O R 🚨 =========================');
    log(err);
    log('\x1b[31m%s\x1b[0m', '=========================== 🚨 E N D 🚨 ===========================');
    process.exit(1);
  }
}

async function main() {
  try {
    log('========================= 🚀 S T A R T 🚀 =========================');
    log('Using npm.');
    log('');
    log('Installing dependencies:');
    log('\x1b[32m%s\x1b[0m', '- rescript');
    log('\x1b[32m%s\x1b[0m', '- react');
    log('\x1b[32m%s\x1b[0m', '- react-dom');
    log('');
    log('Installing devDependencies:');
    log('\x1b[32m%s\x1b[0m', '- parcel');
    log('');
    log('⭐ ReScript React Starter Kit ⭐');
    log('🥰 Create by davidyang2149');
    log('🚀 From https://github.com/DavidYang2149/rescript-react-starter');
    log('');
    log(`🚀 Creating project ${projectName}...`);
    log('');
    log('🚚 Downloading files:');
    execSync(gitCloneCommand);

    if (projectName !== '.') {
      process.chdir(projectPath);
    }

    log('');
    log('📦 Installing dependencies:');
    execSync('npm install');
    log('');
    log('🔥 Removing useless files:');
    execSync('npx rimraf ./.git');
    log('');
    execSync(`npx rimraf ${projectPath}/bin`);
    log('');
    log('\x1b[36m%s\x1b[0m', 'Successfully installed!');
    log('');
    log('\x1b[35m%s\x1b[0m', '🎉 The installation is done, ready to use. Happy coding!');
    log('========================= 🎉 E N D 🎉 =========================');
  } catch (error) {
    log('\x1b[31m%s\x1b[0m', '========================= 🚨 E R R O R 🚨 =========================');
    log(error);
    log('\x1b[31m%s\x1b[0m', '=========================== 🚨 E N D 🚨 ===========================');
  }
}

main();
