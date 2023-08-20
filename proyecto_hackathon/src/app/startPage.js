const {ipcMain}=require('electron');
const {actualizar}=require('../setConfig');
const {readFileSync}=require('fs');
const { LoginPage } = require('./loginPage');
const { RegisterPage } = require('./registerPage');
const file = readFileSync('./src/registroTemario.json', 'utf-8');
let jsonConfig = JSON.parse(file);
let ventana;
function StartPage(window)
{
    ventana=window;
    window.loadFile('../src/pages/startPage.html');
}
ipcMain.on('navigate', (e, data)=>//se reciben objetos pero se mandan strings
{
    if(data=='login')
    {
        LoginPage(ventana);
    }
    else if(data=='register')
    {
        RegisterPage(ventana);
    }
});
module.exports={StartPage};