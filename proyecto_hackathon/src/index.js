const {app, BrowserWindow, ipcMain, Menu, dialog}=require('electron');
const {readFileSync}=require('fs')
const { DashboardPage } = require('./app/dashboardPage');
const file = readFileSync('./src/registroTemario.json', 'utf-8');
const jsonConfig = JSON.parse(file);
console.log(jsonConfig)
let window;
const createWindow=()=>
{
    window=new BrowserWindow(
        {
            fullscreen:false,
            webPreferences:
            {
                nodeIntegration:true,
                contextIsolation:false
            }
        }
    );
    /*window.setMenu(Menu.buildFromTemplate(
        [
            {
                label:'Acerca de',
                click()
                {
                    dialog.showMessageBox({//lanzamiento de mensaje
                        tittle:'Aprende Digital 1.0',
                        message: 'Sistema desarrollado por Los Panaderos',
                        type:'info'
                    });
                }
            }
        ]
    ))*/
}
app.whenReady().then(()=>
{
    createWindow();
    DashboardPage(window)
})
.catch((err)=>
{
    console.log(err);
})