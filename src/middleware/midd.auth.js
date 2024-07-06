import session from 'express-session';
import 'dotenv/config';

export const authSession = session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 86400 * 1000))
})

export const authCheck = (req, res, next) => {
    // if (req.session.autenticado) {
        next();
    // } else {
    //     res.status(401).send('No cuenta con los permisos para ingresar');
    // }
}

export const authCheckRolInterno = (req, res, next) => {
    if (req.session.rol == 1) {
        next();
    } else {
        res.status(401).send('No cuenta con los permisos para ingresar');
    }
}

export const authCheckRolExterno = (req, res, next) => {
    if (req.session.rol == 2) {
        next();
    } else {
        res.status(401).send('No cuenta con los permisos para ingresar');
    }
}