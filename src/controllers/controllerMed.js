const db = require('../services/mysql');
const respuesta = require('../utils/respuestas');
const tablaMedMed = 'medicos__medicos';


// Listar medicos.:::::::::::::::::::::::::::::::: - OK
async function listarMedicos(req, res) {
    try {
        const items = await db.listar(tablaMedMed);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
};


// Mostrar un medico.:::::::::::::::::::::::::::::: - OK
async function mostrarUnMedico(req, res) {
    try {
        const items = await db.mostrarUno(tablaMedMed, req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
};


// nuevo medico.::::::::::::::::::::::::::::::: - OK
async function nuevoMedico(req, res) {
    try {
        await db.cargar(tablaMedMed, req.body);
        respuesta.success(req, res, 'Medico cargado Correctamente...::::::::::::::::::::::::::::::', 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
}


// update medico.:::::::::::::::::::::::::::::::
async function updateMedico(req, res) {
    // Arreglo con los campos a validar
    const campos = ["nombre", "apellido", "nombre_completo", "especialidad_id", "dias_atencion", "horario_atencion", "foto_perfil"];
    let query = `UPDATE ${tablaMedMed} SET `;

    //Concateno los campos de la query
    for (const campo of campos) {
        if (req.body[campo]) {
            query += `${campo} = "${req.body[campo]}", `;
        }
    }

    // Elimino los dos últimos caracteres (", ")
    query = query.slice(0, -2);

    // Agrego la condición WHERE
    query += ` WHERE matricula= ${req.params.matricula}`;

    console.log(query);

    try {
        await db.update(query);
        respuesta.success(req, res, 'Medico actualizado Correctamente...++++++++++++++++++++++++++', 201);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
}


// // Borrar un medico.:::::::::::::::::::::::::::: - OK
async function eliminarMedico(req, res) {
    try {
        const items = await db.eliminarMedico(tablaMedMed, body.id);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente...', 200);
    } catch (error) {
        console.log(respuesta.error);
        respuesta.error(req, res, error, 500);
    }
}



module.exports = {
    listarMedicos,
    mostrarUnMedico,
    nuevoMedico,
    updateMedico,
    eliminarMedico,
}