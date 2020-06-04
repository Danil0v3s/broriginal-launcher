Promise = require('bluebird');
const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const defaultReq = require('request');
const util = require('util');
const request = util.promisify(defaultReq);
const { exec } = require('child_process');
const { createWriteStream, existsSync, mkdirSync } = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// .\GrfCL.exe -log false -merge "C:\\Users\\PC\\AppData\\Roaming\\GRF Editor\\Encryption\\rdata.grf" "C:\\Users\\PC\\AppData\\Roaming\\GRF Editor\\Encryption\\new.grf"
let mainWindow;

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

async function findDownloadSize(url) {
    let res = await request({
        method: 'HEAD',
        uri: url
    });

    return Number(res.toJSON().headers['content-length']);
}

async function manageDownloads(window) {
    const response = await request({ method: 'GET', uri: 'http://localhost:8080/updates.json', headers: { contentType: 'application/json' } })
    const availableFiles = JSON.parse(response.toJSON().body);
    let downloadTotalSize = 0
    let downloadedSize = 0
    let progress = 0

    for (const file of availableFiles) {
        downloadTotalSize += await findDownloadSize('http://localhost:8080/' + file);
    }

    for (const file of availableFiles) {
        const dirname = path.dirname(file);
        const filename = path.basename(file)
        const downloadPath = path.join(__dirname, '../../', dirname)
        if (!existsSync(downloadPath)) {
            mkdirSync(downloadPath, { recursive: true });
        }

        const file_url = 'http://localhost:8080/' + file;
        const out = createWriteStream(path.join(downloadPath, filename));

        const req = defaultReq({
            method: 'GET',
            uri: file_url
        });

        req.pipe(out);

        req.on('data', function (chunk) {
            downloadedSize += chunk.length;
            let currentProgress = Number((100.0 * downloadedSize / downloadTotalSize).toFixed(0))

            if (currentProgress > progress || currentProgress + 1 >= 100) {
                progress = currentProgress
                setTimeout(() => {
                    window.webContents.send('asynchronous-message', {
                        downloadStatus: {
                            loading: true,
                            progress
                        }
                    })
                }, 200)
            }

        });

        req.on('end', function () {
            //Do something
        });

        req.on('response', function (data) {
            if (progress => 100) {
                window.webContents.send('asynchronous-message', {
                    downloadStatus: {
                        loading: false
                    }
                })
            }
        });
    }
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 576,
        frame: false,
        resizable: false,
        movable: true,
        webPreferences: { nodeIntegration: true }
    });

    // and load the index.html of the app.

    const startUrl = isDev ? 'http://localhost:3000' : url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.removeMenu();
    mainWindow.webContents.once('did-finish-load', () => {
        manageDownloads(mainWindow)
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.handle('login', async (event, ...args) => {
    const params = `"-t:${args[0]} ${args[1]} server -1rag1"`
    exec(`start "" "bROriginal - SSO.exe" ${params}`, { cwd: path.join(__dirname, 'CLIENTE') }, (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
    });
    return true
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.