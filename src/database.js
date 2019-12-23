const mysql = require('mysql');
//Este modulo mysql no soporta promesas async entonces requerimos 'util' que no permite hacerlo como herramienta de ayuda, y de el hacemos destructuring para obtener 'promisify'.
const {promisify} = require('util');
//Utilizamos nuestra conexión a la base de datos 'database', es nuestro objeto que importamos con destructuring. 
const {database} = require('./keys');
const colors = require('colors');


const pool =  mysql.createPool(database);

//utlizamos este método para cuando nosotros llamemos al módulo desde otra parte ya este tenga conexión hecha.
pool.getConnection((err, connection) => {
    if (err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has to many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();
    console.log('Db is conected'.bgCyan);
    return;
});

//Estamos convirtiendo en promesas lo que antes si o si eran callbacks largos y complejos. Luego de esto podemos utilizar al fin 'ASYNC y AWAIT'.
pool.query = promisify(pool.query);

module.exports = pool;