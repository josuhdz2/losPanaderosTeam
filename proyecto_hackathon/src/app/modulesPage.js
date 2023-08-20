const {ipcMain}=require('electron');
const { MateriasPage } = require('./materiasPage');
let ventana;
function ModulesPage(window)
{
    ventana=window;
    window.loadFile('../src/pages/modulesPage.html');
}
ipcMain.on('cargaModulo', (e, data)=>
{
    MateriasPage(ventana);
})
module.exports={ModulesPage};