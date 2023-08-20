const {ipcMain}=require('electron');
const { LoginPage } = require('./loginPage');
let ventana;
function RegisterPage(window)
{
    ventana=window;
    window.loadFile('../src/pages/registerPage.html');
}
ipcMain.on('registroCompletado', (e, data)=>
{
    LoginPage(ventana);
})
module.exports={RegisterPage};