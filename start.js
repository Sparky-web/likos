const childProcess = require("child_process");
const report = require("yurnalist");
const fs = require('fs/promises');

(async () => {
    const spinner = report.activity()
    spinner.tick("Запускаю админ-панель")
    await new Promise(resolve => {
        const backend = childProcess.exec(`cd backend && npm run develop`);
        backend.on('exit', code => {
            report.warn(`Процесс папки backend завершен с кодом: ${code}`);
        });
        backend.stdout.on("data", data => {
            report.info(`BACKEND: ${data}`)
            if(data.match(/http(s)?:\/\/.*:\d{2,5}\/admin/ig)) {
                resolve()
            }
        })
    })

    spinner.tick("Запускаю frontend")

    await new Promise(resolve => {
        const frontend = childProcess.exec(`cd frontend && npm start`);
        frontend.on('exit', code => report.warn(`Процесс папки frontend завершен с кодом: ${code}`))
        frontend.stdout.on('data', data => {
            report.info(`FRONTEND: ${data}`)
            if(data.match(/success Building development bundle/ig)) {
                resolve()
            }
        })  
    })
    spinner.end()
    const backendPort = await fs.readFile("./backend/.env").then(r => r.toString().split("=")[1])

    report.info(`
Админ-панель работет на адресе: http://127.0.0.1:${backendPort}
Фронтенд работает на адресе: http://127.0.0.1:8000
`)
})()



