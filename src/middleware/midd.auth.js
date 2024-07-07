import session from 'express-session';
import 'dotenv/config';

export const authSession = session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    expires: new Date(Date.now() + 2629800000)
})

export const authCheck = (req, res, next) => {
    if (req.session.autenticado) {
        next();
    } else {
        res.redirect('/login');
    }
}

export const authCheckRolInterno = (req, res, next) => {
    if (req.session.user.rol_id == 1) {
        next();
    } else {
        res.status(401).send('No cuenta con los permisos para ingresar');
    }
}

export const authCheckRolExterno = (req, res, next) => {
    if (req.session.user.rol_id == 2) {
        next();
    } else {
        res.status(401).send('No cuenta con los permisos para ingresar');
    }
}