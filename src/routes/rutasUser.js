import { Router } from 'express';
import { __dirname } from '../app.js'
import controler from '../controllers/controllerUser.js';


const router= Router();

router.get('/api/usuarios', controler.listarUsuarios);
router.get('/api/usuarios/:username', controler.mostrarUnUsuario);
router.post('/api/usuarios/new', controler.nuevoUsuario);
router.put('/api/usuarios/update/:id', controler.updateUsuario);
router.delete('/api/usuarios/eliminar/:id', controler.eliminarUsuario);




export default router;