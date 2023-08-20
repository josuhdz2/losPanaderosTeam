const {dialog}=require('electron');
const fs=require('fs');
function actualizar(config)
{
    fs.writeFile('./src/registroTemario.json', JSON.stringify(config), (err)=>
    {
        if(err)
        {
            dialog.showErrorBox("Error", "No se pudo actualizar la configuracion")
        }
    })
}
module.exports={actualizar}