const {ipcMain}=require('electron');
let ventana;
function ValidacionPage(window)
{
    ventana=window;
    window.loadFile('../src/pages/validacionPage.html');
}
module.exports={ValidacionPage};