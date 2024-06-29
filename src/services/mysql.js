const mysql = require('mysql');
const config = require('../config');

//Datos de conexion a la DB.
const dbconfig = {
    host: config.mysql.host,
    database: config.mysql.database,
    user: config.mysql.user,
    password: config.mysql.password,
    port: config.mysql.port
}

// Funcion para conectar a la DB y sino puede muestre el error.
let conexion;
function conMysql() {
    conexion = mysql.createConnection(dbconfig);
    // Midelware si hay error.
    conexion.connect((err) => {
        if (err) {
            console.log('[DB_ERROR: ]', err);
            setTimeout(conMysql, 200);
        } else {
            console.log('- DB Conectada:::::::::::::::::::::::::::::::::::::::::::::');
        }
    });
    // Midelware reconexion si hay error.
    conexion.on('error', err => {
        console.log('[DB_ERROR: ]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    })
}

conMysql();

// Listar. :::::::::::::::::::::::::::::::: - OK
function listar(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            // SIMPLIFICO EL IF/ELSE RESOLVE.
            return error ? reject(error) : resolve(result);
        })
    });
}


// Mostrar. ::::::::::::::::::::::::::::: - OK
function mostrarUno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id= ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

// Nuevo. ::::::::::::::::::::::::::::  - OK
function cargar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Updatge medico.::::::::::::::::::::::::::::  - OK
function update(query) {
    return new Promise((resolve, reject) => {
        conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

// Eliminar un medico.:::::::::::::::::::::::::::: - OK
function eliminarMedico(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id= ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

module.exports = {
    listar,
    mostrarUno,
    cargar,
    update,
    eliminarMedico,
}