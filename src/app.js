
const express= require('express');
const config= require('./config');
const morgan= require('morgan');
const cors= require('cors');
const medicos= require('./routes/rutasMed');
const usuarios= require('./routes/rutasUser');


const app= express();
app.use(cors());

// Middelware.:::::::::::::::::::::::::::::::::::::::::
app.use(morgan('dev')); // para usar morgan
app.use(express.json());  // para que reconozca JSON

app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); // Para que pueda acceder a la carpeta public


// Configuracion.
app.set('port', config.app.port)

// Rutas.:::::::::::::::::::::::::::::::::::::::::::::::
app.use('/',medicos);
app.use('/',usuarios);




module.exports= app;

