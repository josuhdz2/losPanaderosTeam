const {ipcMain}=require('electron');
const { ModulesPage } = require('./modulesPage');
const { StartPage } = require('./startPage');
const { ValidacionPage } = require('./validacionPage');
let ventana;
function DashboardPage(window)
{
    ventana=window;
    window.loadFile('../src/pages/dashboard.html');
}
ipcMain.on('entrarPrimaria', (e, data)=>
{
    ModulesPage(ventana);
});
ipcMain.on('ingresar', (e, data)=>
{
    StartPage(ventana);
});
ipcMain.on('cargarValidacionPage', (e, data)=>
{
    ValidacionPage(ventana);
})
module.exports={DashboardPage};