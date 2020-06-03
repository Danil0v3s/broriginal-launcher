const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function manageDownloads(window) {
    let progress = 0;

    setInterval(function () {
        progress += 1;

        window.webContents.send('asynchronous-message', {
            downloadStatus: {
                loading: true,
                progress
            }
        });

        if (progress > 100) {
            window.webContents.send('asynchronous-message', {
                downloadStatus: {
                    loading: false
                }
            });
            clearInterval(this);
        }
    }, 300);
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
    mainWindow.webContents.on('did-finish-load', () => {
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
    exec(`start "" "bROriginal - SSO.exe" ${params}`, { cwd: 'D:\\Ragnarok\\PROJETO BRORIGINAL\\CLIENTE' }, (err, stdout, stderr) => {
        console.log(err, stdout, stderr);
    });
    return true
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.