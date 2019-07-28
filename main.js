const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');

const port = 40004;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    backgroundColor: '#FFF',
    webPreferences: {nodeIntegration: true},
    icon: 'dist/GamerPalsWebsite/favicon.ico'
  });

  mainWindow.loadURL(`http://localhost:${port}`);
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const openPopup = (event, url) => {
    event.preventDefault()
    let win = new BrowserWindow({
      frame: true
    });
    win.on('closed', () => {
      win = null;
    });
    win.removeMenu();

    win.once('ready-to-show', () => win.show())
    win.loadURL(url)
    event.newGuest = win
  }

  mainWindow.webContents.on('new-window', (event, url) => openPopup(event, url));
  mainWindow.webContents.on('will-navigate', (event, url) => openPopup(event, url));

  app.server = localServer;
}

function createServer() {
  const server = express();
  server.get('/*', function(req,res) {
    console.log('serve file: ' + req.originalUrl);
    if (req.originalUrl.indexOf('.') === -1)
      res.sendFile(path.join(__dirname, '/dist/GamerPalsWebsite/index.html'));
    else
      res.sendFile(path.join(__dirname, '/dist/GamerPalsWebsite', req.originalUrl));
  });
  server.listen(port);

  return server;
}

const localServer = createServer();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
