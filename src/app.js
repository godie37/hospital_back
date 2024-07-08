
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path'



import { fileURLToPath } from 'url';
import { dirname } from 'path';

import {
   authSession,
   authCheck
} from './middleware/midd.auth.js'

import usuarios from './routes/rutasUser.js';
import rutasMedicos from './routes/rutas.medicos.js';
import rutasGrales from './routes/rutas.general.js';
import rutasAuth from './routes/rutas.login.js';

const port = process.env.PORT || 4000
const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// Middelware.:::::::::::::::::::::::::::::::::::::::::
app.use(morgan('dev')); // para usar morgan
app.use(express.json());  // para que reconozca JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Para que pueda acceder a la carpeta public

app.use(authSession)


// Rutas.:::::::::::::::::::::::::::::::::::::::::::::::
app.use('/', rutasAuth);
app.use('/', rutasGrales);
app.use('/', authCheck, rutasMedicos);
app.use('/listarMedicos', (req, res)=>{
   res.sendFile(__dirname + '/public/pages/listarUser.html');
});
app.use('/', authCheck, usuarios);


app.listen(port, () => {
   console.log('Server OK')
})

