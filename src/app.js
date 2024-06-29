
const express= require('express');
const config= require('./config');
const morgan= require('morgan');
const medicos= require('./routes/rutasMed');
const usuarios= require('./routes/rutasUser');


const app= express();


// Middelware.:::::::::::::::::::::::::::::::::::::::::
app.use(morgan('dev')); // para usar morgan
app.use(express.json());  // para que reconozca JSON
app.set("view engine", "ejs"); // para capturar datos ingresados por pantalla.

// Configuracion.
app.set('port', config.app.port)

// Rutas.:::::::::::::::::::::::::::::::::::::::::::::::
app.use('/',medicos);
app.use('/',usuarios);




module.exports= app;

