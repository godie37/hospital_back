const db= require('../services/mysql');
const respuesta= require('../utils/respuestas');
const tablaUserUser= 'usuarios__usuarios';


// Listar Usuarios.:::::::::::::::::::::::::::::::: - OK
async function listarUsuarios (req, res) {
    try {
        const items= await db.listar(tablaUserUser);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
};


// Mostrar un usuario.:::::::::::::::::::::::::::::: - OK
async function mostrarUnUsuario (req, res) {
    try{
        const items= await db.mostrarUno(tablaUserUser, req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(error){
        respuesta.error(req, res, error, 500);
    }
};


// nuevo usuario.::::::::::::::::::::::::::::::: - OK
async function nuevoUsuario(req, res){
    try {
        await db.cargar(tablaUserUser, req.body);
        respuesta.success(req, res, 'Usuario cargado Correctamente...::::::::::::::::::::::::::::::', 200);        
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
}


// update usuario.:::::::::::::::::::::::::::::::
async function updateUsuario(req, res){
    // Arreglo con los campos a validar
    const campos = ["nombre", "apellido", "nombre_completo", "username", "email", "password", "rol_id"];
    let query = `UPDATE ${tablaUserUser} SET `;

    //Concateno los campos de la query
    for (const campo of campos) {
        if (req.body[campo]) {
            query += `${campo} = "${req.body[campo]}", `;
        }
    }

    // Elimino los dos últimos caracteres (", ")
    query = query.slice(0, -2);

    // Agrego la condición WHERE
    query += ` WHERE id= ${req.params.id}`;

    console.log(query);

    try {
        await db.update(query);
        respuesta.success(req, res, 'Usuario actualizado Correctamente...++++++++++++++++++++++++++', 201);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
}



// // Borrar un usuario.:::::::::::::::::::::::::::: - OK
async function eliminarUsuario (req, res) {
    try{
        const items= await db.eliminarUsuario(tablaUserUser, body.id);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente...', 200);
    }catch(error){
        console.log(respuesta.error);
        respuesta.error(req, res, error, 500);
    }
}



module.exports= {
    listarUsuarios,
    mostrarUnUsuario,
    nuevoUsuario,
    updateUsuario,
    eliminarUsuario,
}