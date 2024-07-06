import pool from '../config/db.js';

// Listar. :::::::::::::::::::::::::::::::: - OK
export async function listar(tabla, res) {

    try {
        const connection = await pool.getConnection()

        const [rows] = await connection.query(`SELECT * FROM ${tabla}`)
        connection.release()
        return rows

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error en la consulta')
    }

}


// Mostrar uno. ::::::::::::::::::::::::::::: - OK
export async function mostrarUno(tabla, username) {
    try {
        const connection = await pool.getConnection();
        const result = await connection.query(
            `SELECT * FROM ${tabla} WHERE username = '${username}'`
        );
        connection.release();
        return result; // Devolver el resultado de la consulta en lugar de usar success()
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error en la consulta')
    }
}

// const connection = await pool.getConnection()
// pool.query(`SELECT * FROM ${tabla} WHERE username= '${username}'`)
// connection.release();



// Nuevo. ::::::::::::::::::::::::::::  - OK
export async function cargar(tabla, data) {
    try {
        const connection = await pool.getConnection();
        pool.query(`INSERT INTO ${tabla} SET ?`, data,);
        connection.release();
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error en la consulta')
    }

}

// Updatge. ::::::::::::::::::::::::::::  - OK
export async function update(query) {
    const connection = await pool.getConnection()
    return new Promise((resolve, reject) => {
        pool.query(query, (error, result) => {
            connection.release()
            return error ? reject(error) : resolve(result);
        })
    })
}

// Eliminar. :::::::::::::::::::::::::::: - OK
export async function eliminar(tabla, data) {
    const connection = await pool.getConnection()
    console.log('DATA.......:::::::::::  -->', data);
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${tabla} WHERE username= "${data}"`, (error, result) => {
            connection.release()
            return error ? reject(error) : resolve(result);
        })
    })
}
export async function validacion(tabla, username, mail) {
    const query = (`SELECT * FROM ${tabla} WHERE username= "${username}" `);
    console.log("VALIDACION..:::::  --> ", query);

    const connection = await pool.getConnection()
    return new Promise((resolve, reject) => {
        pool.query(query, (error, result) => {
            connection.release()
            return error ? reject(error) : resolve(result);
        })
    })
}
