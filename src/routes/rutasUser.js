const express= require('express');

const controler= require('../controllers/controllerUser');


const router= express.Router();


router.get('/api/usuarios', controler.listarUsuarios);
router.get('/api/usuarios/:username', controler.mostrarUnUsuario);
router.post('/api/usuarios/new', controler.nuevoUsuario);
router.put('/api/usuarios/update/:nombre', controler.updateUsuario);
router.delete('/api/usuarios/eliminar/:username', controler.eliminarUsuario);
router.delete('/api/validar', controler.validar);




module.exports= router;