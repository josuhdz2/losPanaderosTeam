const {ipcMain}=require('electron');
const { DiagnosticoPage } = require('./diagnosticoPage');
let ventana;
function MateriasPage(window)
{
    ventana=window;
    window.loadFile('../src/pages/materiasPage.html')
}
ipcMain.on('cargarDiagnostico', (e, data)=>
{
    DiagnosticoPage(ventana)
});
module.exports={MateriasPage};