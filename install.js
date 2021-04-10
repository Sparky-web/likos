const fs = require("fs/promises");
const rimraf = require("rimraf");
const path = require('path');
const readline = require('readline');
const childProcess = require("child_process")
const report = require("yurnalist")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(`${question}: `, (input) => resolve(input) );
    });
}

(async () => {
    await new Promise(res => {
        rimraf(path.join(__dirname + "/backend/.tmp"), res)
    })

    await fs.mkdir(path.join(__dirname + "/backend/.tmp"))
    await fs.copyFile(path.join(__dirname + "/install-files/data.db"), path.join(__dirname + "/backend/.tmp/data.db"))

    const backendPort = await ask("Введите порт, на котором будет работать админ-панель (1337)") || 1337

    await fs.writeFile(path.join(__dirname + "/frontend/.env"),
`GATSBY_BACKEND_URL=http://localhost:${backendPort}
`)

    await fs.writeFile(path.join(__dirname + "/backend/.env"),
`PORT=${backendPort}
`)


    const installModules = (path) => new Promise(res => {
        const workerProcess = childProcess.exec(`cd ${path} && npm install --force`);
        workerProcess.on('exit', function (code) {
            report.warn(`Установка пакетов npm для папки ${path} завершена с кодом: ${code}`);
            res()
        });
    })

    const spinner = report.activity();
    spinner.tick("Установка пакетов npm для папки frontend...")
    report.warn('Это может занять некоторое время.');
    await installModules("frontend")

    spinner.tick("Установка пакетов npm для папки backend...")
    report.warn('Это тоже может занять некоторое время.');
    await installModules("backend")

    spinner.end();

    const shouldStart = await ask("Установка завершена, запустить start.js? (y/N)" )
        .then(s => s.toLowerCase())

    if(shouldStart === "y") {
        const process = childProcess.exec("node start.js")
        process.stdout.on("data", console.log)
    }

})()