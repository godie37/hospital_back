import {
    listar,
    mostrarUno,
    cargar,
    update,
    eliminar,
} from '../services/mysql.js';
import { success, error as _error } from '../utils/respuestas.js';
const tablaUserUser = 'usuarios__usuarios';




// Listar Usuarios.:::::::::::::::::::::::::::::::: - OK
async function listarUsuarios(req, res) {
    try {
        const items = await listar(tablaUserUser, res);
        res.json(items)
    } catch (error) {
        _error(req, res, error, 500);
    }
};


// Mostrar un usuario.:::::::::::::::::::::::::::::: - OK
async function mostrarUnUsuario(req, res) {
    try {
        const items = await mostrarUno(tablaUserUser, req.params.username);
        success(req, res, items, 200);
    } catch (error) {
        _error(req, res, error, 500);
    }
};


// nuevo usuario.::::::::::::::::::::::::::::::: - OK
async function nuevoUsuario(req, res) {
    try {
        await cargar(tablaUserUser, req.body);
        success(req, res, 'Usuario cargado Correctamente...::::::::::::::::::::::::::::::', 200);
    } catch (error) {
        _error(req, res, error, 500);
    }
}


// update usuario.:::::::::::::::::::::::::::::::
async function updateUsuario(req, res) {
    // Crea un arreglo con los campos a validar
    const campos = ["nombre", "apellido", "nombre_completo", "username", "email", "password", "rol_id"];
    let query = `UPDATE ${tablaUserUser} SET `;

    //Concatena los campos de la query
    for (const campo of campos) {
        if (req.body[campo]) {
            query += `${campo} = "${req.body[campo]}", `;
        }
    }

    // Elimina los dos últimos caracteres (", ")
    query = query.slice(0, -2);

    // Agrega la condición WHERE
    query += ` WHERE nombre= "${req.params.nombre}"`;

    try {
        await update(query);
        success(req, res, 'Usuario actualizado Correctamente...++++++++++++++++++++++++++', 201);
    } catch (error) {
        _error(req, res, error, 500);
    }
}



// // Eliminar un usuario.:::::::::::::::::::::::::::: - OK
async function eliminarUsuario(req, res) {
    console.log('res.params.id   :::::::  ', req.params.id)
    try {
        const items = await eliminar(tablaUserUser, req.params.id);
        success(req, res, 'Item eliminado satisfactoriamente...', 200);
    } catch (error) {
        console.log(error);
        _error(req, res, error, 500);
    }
}



export default {
    listarUsuarios,
    mostrarUnUsuario,
    nuevoUsuario,
    updateUsuario,
    eliminarUsuario,
}