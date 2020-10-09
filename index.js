#!/usr/bin/env node

const pkg = require("./package.json")
const program = require('commander')
const inquirer = require('inquirer')
const shelljs = require('shelljs')

const initAction = () => {
    inquirer.prompt([{
        type: 'input',
        message: '请输入项目名称',
        name: 'name'
    }]).then(answers => {
        console.log('项目名称为：', answers.name)
        console.log('正在拷贝项目，请稍后')

        const remote = "https://github.com/MinjieChang/management-web.git"

        const curName = "management-web"

        const tarName = answers.name

        shelljs.exec(`
            git clone ${remote} --depth=1
            mv ${curName} ${tarName}
            rm -rf ./${tarName}/.git
            cd ${tarName}
            cnpm i
        `, (err, stdout, stderr) => {
            if(err) {
                return console.error(`exec error ${err}`)
            }
            console.log(stdout)
            console.log(stderr)
        })
    })
}

program.version(pkg.version)

program.command('init').description('创建项目').action(initAction)

program.parse(process.argv)