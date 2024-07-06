import { createPool } from "mysql2/promise";
import 'dotenv/config';

const pool = createPool({
   host: process.env.MYSQL_HOST || 'localhost',
   user:process.env.MYSQL_USER || 'root',
   password: process.env.MYSQL_PASS || '',
   database: process.env.MYSQL_DB || 'hospital',
   connectionLimit: 5,
   waitForConnections: true,
   queueLimit: 0
})

pool.getConnection()
   .then(connection => {
      pool.releaseConnection(connection)
      console.log('Conectado a la db')
   })
   .catch(err => console.error('No se puedo conectar', err))

export default pool