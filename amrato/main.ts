import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import * as windowStateKeeper from "electron-window-state";

import { version } from "./package.json";

let win: BrowserWindow;

function createWindow() {

    const mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600
    });

    win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        fullscreen: mainWindowState.isFullScreen,
        title: `Amrato v${version}`,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (mainWindowState.isMaximized) {
        win.maximize();
    }

    mainWindowState.manage(win);

    // load the dist folder from Angular
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    // The following is optional and will open the DevTools:
    // win.webContents.openDevTools()

    win.on("closed", () => {
        win = null;
    });
}

app.allowRendererProcessReuse = true;

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// initialize the app's main window
app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

