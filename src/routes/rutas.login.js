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
   if (!req.session.autenticado) {
      res.sendFile(__dirname + '/public/pages/auth/login.html');
   } else {
      res.redirect('/inicio')
   }
});
router.post('/login', iniciarSesionPost);

router.get('/register', (req, res) => {
   if (!req.session.autenticado) {
      res.sendFile(__dirname + '/public/pages/auth/register.html');
   } else {
      res.redirect('/inicio')
   }
});
router.post('/register', crearUsuarioPost);

router.get('/reset_password', (req, res) => {
   if (!req.session.autenticado) {
      res.sendFile(__dirname + '/public/pages/auth/reset_password.html');
   } else {
      res.redirect('/inicio')
   }
});
router.post('/reset_password', cambioPasswordPost);

router.post('/logout', logoutPost);



export default router;