//const { createPool } = require('mysql2');



const mysql= require('mysql2');
const {promisify} = require('util');
//const mysql2 = require('mysql2/promise');
const {database} = require('./keys');

const pool = mysql.createPool(database);
//const pool = mysql2.createPool(database); 

pool.getConnection((err, connection) => {

    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSE');
        }

        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTION');
        }

        if(err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DATABASE IS CONNECTED');
    return;
} );
//pool query 
pool.query = promisify(pool.query);

module.exports = pool; 







