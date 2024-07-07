import { Router } from 'express';

import controler from '../controllers/controllerUser.js';


const router= Router();


router.get('/api/usuarios', controler.listarUsuarios);
router.get('/api/usuarios/:username', controler.mostrarUnUsuario);
router.post('/api/usuarios/new', controler.nuevoUsuario);
router.put('/api/usuarios/update/:nombre', controler.updateUsuario);
router.delete('/api/usuarios/eliminar/:id', controler.eliminarUsuario);




export default router;