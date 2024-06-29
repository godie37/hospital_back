const express= require('express');

const controler= require('../controllers/controllerMed');


const router= express.Router();


router.get('/api/medicos', controler.listarMedicos);
router.get('/api/medicos/:id', controler.mostrarUnMedico);
router.post('/api/medicos/new', controler.nuevoMedico);
router.put('/api/medicos/:matricula', controler.updateMedico);
router.delete('/api/medicos/eliminar', controler.eliminarMedico);


module.exports= router;