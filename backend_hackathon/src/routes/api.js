const {Router}=require('express');
const ruta=Router();
const UsuarioModelo=require('../models/usuarios');
const cryptojs=require('crypto-js');
const SolicitudModelo=require('../models/solicitudes');
const jwt=require('jsonwebtoken');
const secretCrypto='estaeslallavesecretadelcriptadordenodejs'//hay que pasar a entorno
const secretJwt='estaeslallavesecretaparalosjsonwebtokens'//importar a entorno
const sessionVerify=(req, res, next)=>
{
    const token=req.headers.authorization;
    if(!token)
    {
        return res.status(401).json({response:"failed", error:"acceso no autorizado"});
    }
    jwt.verify(token, secretJwt, (err, decoded)=>
    {
        if(err)
        {
            console.log("Error :"+err);
        }
        console.log(decoded);
        next();
    })
};
ruta.post('/validarcurp', (req, res)=>//api
{
    //en este valor se puede pedir la validacion de una curp
});
ruta.post('/registro', (req, res)=>//api
{
    //se implementara una busqueda por curp para evitar cuentas repetidas
    UsuarioModelo.findOne({curp:req.body.curp})
    .then((resultados)=>
    {
        if(resultados)
        {
            res.json({response:"failed", error:"CURP ya restrado"})
        }
        else
        {
            var objeto=Object.keys(req.body)[0];
            req.body=JSON.parse(objeto);
            var nuevoUsuario=new UsuarioModelo({
                nombre:req.body.nombre,
                password:cryptojs.AES.encrypt(req.body.password, secretCrypto).toString(),
                curp:req.body.curp,
                apellidos:req.body.apellidos,
                nivelEstudios:req.body.nivelEstudios,
                contacto:req.body.contacto,
            });
            nuevoUsuario.save()
            .then(()=>
            {
                delete nuevoUsuario.password;
                res.json({response:"success", data:nuevoUsuario});
            })
            .catch((err)=>
            {
                console.log("Error 67:"+err);
                res.json({response:"failed", error:"Error al registrar al usuario"});
            });
        }
    })
    .catch((err)=>
    {
        console.log("Error 74:"+err);
        res.json({response:"failed", error:"Ocurrio un error al verificar el registro"});
    });
});
ruta.post('/acceder', (req, res)=>//api
{
    var objeto=Object.keys(req.body)[0];
    req.body=JSON.parse(objeto);
    UsuarioModelo.findOne({curp:req.body.curp})
    .then((resultado)=>
    {
        if(resultado)
        {
            if(req.body.password==cryptojs.AES.decrypt(resultado.password, secretCrypto).toString(cryptojs.enc.Utf8))
            {
                var usuario={
                    curp:resultado.curp,
                    nombre:`${resultado.nombre} ${resultado.apellidos}`
                };
                var token=jwt.sign(usuario, secretJwt);
                res.json({token});
            }
            else
            {
                res.json({response:"failed", error:"Las claves no coinciden"});
            }
        }
        else
        {
            res.json({response:"failed", error:"No se pudieron obtener los datos de usuario"})
        }
    })
    .catch((err)=>
    {
        console.log("Error 106:"+err);
        res.json({response:"failed", error:"No se pudieron obtener los datos de usuario"});
    })
});
ruta.post('/optenerValidaciones', sessionVerify, (req, res)=>//api
{
    SolicitudModelo.find({curp:req.body.curp})
    .then((resultados)=>
    {
        res.json({response:"success", data:resultados});
    })
    .catch((err)=>
    {
        console.log("Error137:"+err);
        res.json({response:"failed", error:"No hay solicitudes registradas"})
    });
});
ruta.post('/solicitarValidacion', sessionVerify, (req, res)=>//api
{
    var nuevaSolicitud=new SolicitudModelo({
        usuarioId:req.body.usuarioId,
        fechaSolicitud:new Date(),
        reporte:req.body.reporte
    });
    nuevaSolicitud.save()
    .then((registro)=>
    {
        res.json({response:"success", data:nuevaSolicitud});
    })
    .catch((err)=>
    {
        res.json({response:"failed"});
    });
});
module.exports=ruta;