import express from 'express';
import { __dirname } from '../app.js'

import {
   iniciarSesionPost,
   crearUsuarioPost,
   cambioPasswordPost,
   logoutPost
} from '../controllers/ctrl.auth.js';

const router = express.Router();

router.get('/login', (req, res) => {
   res.sendFile(__dirname + '/public/pages/auth/login.html');
});
router.post('/login', iniciarSesionPost);

router.get('/register', (req, res) => {
   res.sendFile(__dirname + '/public/pages/auth/register.html');
});
router.post('/register', crearUsuarioPost);

router.get('/reset_password', (req, res) => {
   res.sendFile(__dirname + '/public/pages/auth/reset_password.html');
});
router.post('/reset_password', cambioPasswordPost);

router.post('/logout', logoutPost);



export default router;