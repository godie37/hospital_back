import session from 'express-session';
import 'dotenv/config';

export const authSession = session({
    secret: 'prueba',
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


export const validacionRegister = (req, res, next) => {
    let erroresValidacion = {};

    const { nombre, apellido, username, email, password, confirm_password } = req.body

    if (nombre == '') {
        erroresValidacion.nombre = 'El campo nombre es requerido'
    }
    if (apellido == '') {
        erroresValidacion.apellido = 'El campo apellido es requerido'
    }
    if (username == '') {
        erroresValidacion.username = 'El campo username es requerido'
    }
    if (email == '') {
        erroresValidacion.email = 'El campo email es requerido'
    }
    if (password == '') {
        erroresValidacion.password = 'El campo password es requerido'
    }
    if (confirm_password == '') {
        erroresValidacion.confirm_password = 'El campo confirmar password es requerido'
    }

    if (Object.keys(erroresValidacion).length > 0) {
        return res.status(500).json({ 'estado': 'validacion', mensajes: JSON.stringify(erroresValidacion) })
    } else {
        next()
    }
}

export const validacionLogin = (req, res, next) => {
    let erroresValidacion = {};

    const { username, password } = req.body;

    if (username == '') {
        erroresValidacion.username = 'El nombre de usuario es requerido'
    }
    if (password == '') {
        erroresValidacion.password = 'El campo password es requerido'
    }

    if (Object.keys(erroresValidacion).length > 0) {
        return res.status(500).json({ 'estado': 'validacion', mensajes: JSON.stringify(erroresValidacion) })
    } else {
        next()
    }
}

export const validacionResetPass = (req, res, next) => {
    let erroresValidacion = {};

    const { email, password,confirm_password } = req.body;

    if (email == '') {
        erroresValidacion.email = 'El campo email es requerido'
    }
    if (password == '') {
        erroresValidacion.password = 'El campo password es requerido'
    }
    if (confirm_password == '') {
        erroresValidacion.confirm_password = 'El campo confirmar password es requerido'
    }

    if (Object.keys(erroresValidacion).length > 0) {
        return res.status(500).json({ 'estado': 'validacion', mensajes: JSON.stringify(erroresValidacion) })
    } else {
        next()
    }
}