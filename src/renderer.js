const electron = require('electron');
const { ipcRenderer: ipc } = electron;

document.getElementById('start').addEventListener('click', () => {
    ipc.send('start-game');
});

ipc.on('game-started', (event, game) => {
    // initiate game logic
    console.log('game started!');
});