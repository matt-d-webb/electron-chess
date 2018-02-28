const electron = require('electron');
const path = require('path');
const { 
    app, 
    BrowserWindow, 
    ipcMain: ipc, 
    Menu,
    globalShortcut
} = electron;


let mainWindow;
let gameWindow;
let gameStarted = false;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 400
    });
    const name = electron.app.getName();
    const menuTemplate =  [
        {
            label: name,
            submenu: [{
                label: `About ${name}`,
                click: () => {
                    new BrowserWindow({
                        width:200,
                        height: 200
                    });
                },
                role: 'about'
            },{
                type: 'separator'
            }, {
                label: 'Quit',
                click: () => app.quit(),
                accelerator: `Cmd+Q`
            }]
        }
    ];
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
        gameWindow = null;
    });
    //const menu = Menu.buildFromTemplate(menuTemplate);
    //Menu.setApplicationMenu(menu);
    mainWindow.webContents.openDevTools()

    ipc.on('start-game', () => {
        if(!gameStarted) {
            // game already started!
            console.log('game started already!');
        }
        gameStarted = true;
        setTimeout(() => {
            mainWindow.webContents.send('game-started');
            gameWindow = new BrowserWindow({
                width: 100,
                height: 100
            });
            gameWindow.loadURL(`file://${__dirname}/modules/game/game.html`);
            gameWindow.on('closed', () => {
                gameWindow = null;
            });
        }, 2000);
    });
});



