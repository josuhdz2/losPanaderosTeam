const {model, Schema}=require('mongoose');
const usuarioSchema=new Schema({
    curp:{type:String},
    nombre:{type:String, required:true},
    apellidos:{type:String, required:true},
    nivelEstudios:{type:String, required:true},
    contacto:{type:String},
    password:{type:String, required:true}
});
module.exports=model('usuario', usuarioSchema);//exportacion del modelo de usuario