const { app, BrowserWindow, ipcMain, Menu, screen } = require("electron");
const { session } = require("electron");
const { channels } = require("./shared/constants.js");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = () => {
    // get current display screen
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: displayWidth, height: displayHeight } =
        primaryDisplay.workAreaSize;

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        // width: displayWidth,
        // height: displayHeight,
        
        width: 1600,
        height: 900,
        
        minWidth: 1366,
        minHeight: 768,
        
        title: "Risk MS",
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () =>
                        mainWindow.webContents.send("update-counter", 1),
                    label: "Increment",
                },
                {
                    click: () =>
                        mainWindow.webContents.send("update-counter", -1),
                    label: "Decrement",
                },
            ],
        },
        {
            label: "Tools",
            submenu: [
                {
                    accelerator: "F12",
                    click: () => mainWindow.webContents.openDevTools(),
                    label: "Open Dev Tools",
                },
            ],
        },
    ]);

    Menu.setApplicationMenu(menu);

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// app.on('ready', createWindow);

app.whenReady().then(() => {
    // Why does this code make renderer able to use 'axios' ???
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                "Content-Security-Policy": [],
            },
        });
    });

    // ipcMain.on(channels.IPC, async (event, arg) => {
    //     const msgTemplate = (pingPong) => `IPC test: ${pingPong}`;
    //     console.log(msgTemplate(arg));
    //     event.reply(channels.IPC, msgTemplate("pong"));
    // });

    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
