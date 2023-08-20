const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const bodyParser=require('body-parser');
const UsuarioModelo=require('./models/usuarios');
const SolicitudModelo=require('./models/solicitudes');
const RutasAPI=require('./routes/api');
const cors=require('cors');
const { verify } = require('jsonwebtoken');
const app=express();
const port=process.env.PORT||3000;
const database="mongodb://127.0.0.1:27017/hackathon";//hay que pasar a entorno
const secretSesion='estaeslallaveparalacreaciondesesionesconexpress';
const adminVerify=(req, res, next)=>
{
    if(req.session.usuario)
    {
        next();
    }
    else
    {
        res.redirect('/')
    }
}
mongoose.set('strictQuery', false);
mongoose.connect(database)
.then(()=>
{
    console.log('Conexion a base de datos...');
})
.catch((err)=>
{
    console.log('Ha ocurrido un error: '+err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.use(cors());
app.use(session(
    {
        secret:secretSesion,
        resave:true,
        saveUninitialized:true
    }
));
app.set('view engine', 'ejs');
app.set('views','src/views/');
app.use('/api', RutasAPI);
app.get('/', (req, res)=>
{
    res.render('index.ejs');
});
app.get('/cerrarSesion', (req, res)=>
{
    req.session.usuario=null;
    res.redirect('/');
});
app.get('/home', adminVerify, (req, res)=>
{
    SolicitudModelo.find({revisado:false})
    .then((resultados)=>
    {
        res.render('home.ejs', {datos:resultados});
    })
    .catch((err)=>
    {
        console.log("Error 151:"+err);
        res.render('error.ejs', {mensaje:"No se lograron cargar los datos"});
    });
})
app.post('/accederAdmin', (req, res)=>
{
    //acceso a los administradores
    console.log(req.body);
    if(req.body.user=="lospanaderos" && req.body.password=="lospanaderos")
    {
        req.session.usuario="accesoPermitido";
        res.redirect('/home');
    }
    else
    {
        res.render('error.ejs', {mensaje:"Los datos no son correspondientes"});
    }
});
app.get('/solicitud/:id', adminVerify, (req, res)=>
{
    SolicitudModelo.findById(req.params.id)
    .then((resultados)=>
    {
        if(resultados)
        {
            UsuarioModelo.findById(resultados.usuarioId)
            .then((resultado)=>
            {
                if(resultado)
                {
                    res.render('solicitud.ejs', {usuario:resultado, solicitud:resultados});
                }
                else
                {
                    res.render('error.ejs', {mensaje:"No se encontro la informacion solicitada"});
                }
            })
            .catch((err)=>
            {
                console.log("Error 176:"+err);
                res.render('error.ejs', {mensaje:"No se encontraron los datos solicitados"});
            });
        }
        else
        {
            res.render('error.ejs', {mensaje:"No se encontraron los datos solicitados"});
        }
    })
    .catch((err)=>
    {
        console.log("Error 187:"+err);
        res.render('error.ejs', {mensaje:"Ha ocurrido un error"});
    })
});
app.get('/validar/:id', adminVerify, (req, res)=>
{
    SolicitudModelo.findByIdAndUpdate(req.params.id, {$set:{estado:true, revisado:true}})
    .then(()=>
    {
        res.redirect('/home')
    })
    .catch((err)=>
    {
        console.log(err)
        res.redirect('/home');
    })
});
app.get('/rechazar/:id', adminVerify, (req, res)=>
{
    SolicitudModelo.findByIdAndUpdate(req.params.id, {$set:{revisado:true}})
    .then(()=>
    {
        res.redirect('/home')
    })
    .catch((err)=>
    {
        console.log(err)
        res.redirect('/home');
    })
})
app.listen(port, ()=>
{
    console.log('Servicio en linea...'+port);
});