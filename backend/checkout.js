const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'PostgresSQL 15'
});

connection.connect();


//ejecutar consultas en sql

connection.query('SELECT * FROM mi_tabla', (error, results, fields) => {
    if (error) throw error;
    console.log(results);
});
