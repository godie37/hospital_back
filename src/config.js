require('dotenv').config();

module.exports={
    app : {
        port: process.env.PORT || 4000,
    },

    mysql : {
        host: process.env.MYSQL_HOST || 'localhost',
        database: process.env.MYSQL_DB || 'test',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        port: process.env.MYSQL_PORT || 3306
    }
}

 