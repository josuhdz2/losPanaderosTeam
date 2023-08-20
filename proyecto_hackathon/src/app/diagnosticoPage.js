const {ipcMain}=require('electron');
let ventana;
function DiagnosticoPage(window)
{
    ventana=window;
    window.loadFile('../src/pages/diagnosticosPage.html');
}
module.exports={DiagnosticoPage};