const childProcess = require("child_process")



const childProcess2 = childProcess.exec(`cd backend && npm run develop`);
childProcess2.on('exit', function (code) {
    console.log(`Процесс папки backend завершен с кодом: ${code}`);
});
const childProcess1 = childProcess.exec(`cd frontend && npm start`);
childProcess1.on('exit', function (code) {
    console.log(`Процесс папки frontend завершен с кодом: ${code}`);
});
childProcess1.stdout.on('data', (data) => {
    console.log(`frontend stdout: ${data}`);
});

childProcess2.stdout.on('data', (data) => {
    console.log(`backend stdout: ${data}`);
});


