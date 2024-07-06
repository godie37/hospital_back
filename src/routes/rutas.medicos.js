import express from 'express';
import { __dirname } from '../app.js'

const router = express.Router();

import {
   mostrarMedicosGet,
   mostrarEspecialidadesGet,
   crearMedicoPost,
   medicoByIdGet,
   editarMedicoPost,
   eliminarMedicoPost,
   solicitarTurnoPost,
   buscarAgendaPost
} from '../controllers/ctrl.medicos.js';

import {
   validacionMedico
} from '../middleware/midd.medicos.js'

import {
   authCheckRolInterno,
   authCheckRolExterno
} from '../middleware/midd.auth.js'

// Listar médicos
router.get('/medicos', authCheckRolInterno, (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/lista_medicos.html');
})
router.get('/api/medicos', mostrarMedicosGet)
// Recupero todas las especialidades de los médicos
router.get('/api/especialidades', mostrarEspecialidadesGet)


// Crear médico
router.get('/medicos/crear', authCheckRolInterno, (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/abm_medicos.html');
})
router.post('/medicos/crear', authCheckRolInterno, validacionMedico, crearMedicoPost)


// Editar médico
router.get('/medicos/edit/:id', authCheckRolInterno, (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/abm_medicos.html');
})
// Recupero datos del médico
router.get('/api/medico/:id', medicoByIdGet)
router.post('/medicos/edit/:id', authCheckRolInterno, validacionMedico, editarMedicoPost)


// Eliminar médico
router.post('/medicos/delete/:id', authCheckRolInterno, eliminarMedicoPost)


// Turnero
router.get('/turnero', authCheckRolExterno, (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/turnero.html');
})

router.post('/turnero', authCheckRolExterno, solicitarTurnoPost)


// Agenda
router.get('/agenda', authCheckRolInterno, (req, res) => {
   res.sendFile(__dirname + '/public/pages/medicos/agenda.html');
})

router.post('/agenda', authCheckRolInterno, buscarAgendaPost)

export default router;