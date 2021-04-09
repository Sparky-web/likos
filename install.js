const fs = require("fs/promises");
const rimraf = require("rimraf");
const path = require('path');
const readline = require('readline');
const childProcess = require("child_process")

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

    const port = await ask("Введите порт, на котором будет работать админ-панель (1337)") || 1337

    await fs.writeFile(path.join(__dirname + "/frontend/.env"),
`GATSBY_BACKEND_URL=http://localhost:${port}
GATSBY_BUILD_URL=http://localhost:${port}
`)

    await fs.writeFile(path.join(__dirname + "/backend/.env"),
`PORT=${port}
`)



    const installModules = (path) => new Promise(res => {
        const workerProcess = childProcess.exec(`cd ${path} && npm install`,function
            (error, stdout, stderr) {

            if (error) {
                console.log(error.stack);
                console.log('Error code: '+error.code);
                console.log('Signal received: '+error.signal);
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        });
        workerProcess.on('exit', function (code) {
            console.log(`Установка пакетов npm для папки ${path} завершена с кодом: ${code}`);
            res()
        });
    })

    console.log("Установка пакетов npm для папки frontend... <o/")
    await installModules("frontend")

    console.log("Установка пакетов npm для папки backend... \\o>")
    await installModules("backend")

    const shouldStart = await ask("Установка завершена, запустить start.js? (y/N)" )
        .then(s => s.toLowerCase())

    if(shouldStart === "y") {
        const process = childProcess.exec("node start.js")
        process.stdout.on("data", console.log)
    }

})()