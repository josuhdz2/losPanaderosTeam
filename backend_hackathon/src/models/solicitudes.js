const {model, Schema}=require('mongoose');
const solicitudSchema=new Schema({
    usuarioId:{type:String},
    estado:{type:Boolean, default:false},
    revisado:{type:Boolean, default:false},
    fechaSolicitud:{type:Date},
    fechaRevision:{type:Date},
    reporte:{type:String}
});
module.exports=model('solicitud', solicitudSchema);//exportacion del modelo de solicitudes