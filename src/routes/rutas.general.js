import express from 'express';
import { __dirname } from '../app.js'

const router = express.Router();


// Index
router.use('/inicio', (req, res) => {
   res.sendFile(__dirname + '/public/pages/index.html');
});

// CAPS
router.get('/caps', (req, res) => {
   res.sendFile(__dirname + '/public/pages/caps.html');
})

// Contacto
router.get('/contacto', (req, res) => {
   res.sendFile(__dirname + '/public/pages/contacto.html');
})

// Recupero session
router.get('/api/session', (req, res) => {
   res.status(200).json({ 'session': req.session })
})

export default router;