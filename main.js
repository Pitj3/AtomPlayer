const {app, BrowserWindow} = require('electron');

const srt2vtt = require('srt-to-vtt');
const fs = require('fs');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 773,
    frame: false
  });

  fs.createReadStream('assets/cosmos.srt').pipe(srt2vtt()).pipe(fs.createWriteStream('assets/cosmos.vtt'));

  mainWindow.loadFile('src/index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
