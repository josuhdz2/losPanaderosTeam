const {ipcMain}=require('electron');
const { DashboardPage } = require('./dashboardPage');
let ventana;
function LoginPage(window)
{
    ventana=window;
    window.loadFile('../src/pages/loginPage.html');
}
ipcMain.on('autorizado', (e, data)=>
{
    ventana.reload();
});
module.exports={LoginPage};